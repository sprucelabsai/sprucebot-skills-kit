require('dotenv')
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
		const configParamErrorBaseStr =
			'Sprucebot Class requires a single configuration object including'
		// Check required configs for class
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
			`Sprucebot Instantiated with \napiKey : ${this.apiKey}, \nhost : ${this
				.host}, \nskillId : ${this.skillId}`
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
