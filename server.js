require('dotenv').config()
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const Config = require('./config/config')

const port = parseInt(Config.PORT, 10) || 3333
const dev = Config.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

class Sprucebot {
	constructor(configObj) {
		// Check against defaults to see if dev has updated their env vars
		if (
			configObj.apiKey.indexOf(' ') >= 0 ||
			configObj.skillId.indexOf(' ') >= 0 ||
			configObj.host.indexOf(' ') >= 0
		) {
			throw new Error(
				'Oi! You need to create an .env file at the root of this repository! 😠  Jk, but for real, you should take a peak at .env.sample and then customize your own but just call it .env . Alternatively, if you prefer, you can use an awesome tool like PM2, Nodemon, or ForeverJS to manage this server-process and environment.'
			)
		}

		// Check required configs for instantiating the class
		const configParamErrorBaseStr =
			'Sprucebot Class requires a single configuration object including'
		if (!configObj.apiKey) {
			throw new Error(`${configParamErrorBaseStr} an apiKey key/value pair`)
		} else if (!configObj.host) {
			throw new Error(`${configParamErrorBaseStr} a host key/value pair`)
		} else if (!configObj.skillId) {
			throw new Error(`${configParamErrorBaseStr} a skillId key/value pair`)
		}
		this.apiKey = configObj.apiKey
		this.host = configObj.host
		this.skillId = configObj.skillId
		console.log(
			`🌲 Sprucebot🌲 Skills Kit instantiated with : \napiKey : ${this
				.apiKey}, \nhost : ${this.host}, \nskillId : ${this
				.skillId} \n---------------------------------`
		)
	}
}

// create new sprucebot api accesss
const sprucebot = new Sprucebot({
	apiKey: Config.API_KEY,
	host: Config.HOST || 'https://api.sprucebot.com',
	skillId: Config.SKILL_ID
})

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url, true)

		// Render the route using next.js route handling
		handle(req, res, parsedUrl)
	}).listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
