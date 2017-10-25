require('dotenv').config()

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const Config = require('./config/config')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

class Sprucebot {
	constructor(configObj) {
		console.log(configObj)
		// Check against defaults to see if dev has updated their env vars
		const dqStr = 'you should'
		if (
			configObj.apiKey.indexOf(dqStr) >= 0 ||
			configObj.skillId.indexOf(dqStr) >= 0 ||
			configObj.host.indexOf(dqStr) >= 0 ||
			configObj.skillName.indexOf(dqStr) >= 0
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
		} else if (!configObj.skillName) {
			throw new Error(`${configParamErrorBaseStr} a skillName key/value pair`)
		}
		this.apiKey = configObj.apiKey
		this.host = configObj.host
		this.skillId = configObj.skillId
		this.skillName = configObj.skillName
		console.log(
			`🌲 Sprucebot🌲 Skills Kit instantiated with : \napiKey : ${this
				.apiKey}, \nhost : ${this.host}, \nskillId : ${this
				.skillId} \nskillName : ${this
				.skillName} \n---------------------------------`
		)
	}
}

// create new sprucebot api accesss
const sprucebot = new Sprucebot({
	apiKey: Config.API_KEY,
	host: Config.HOST || 'https://api.sprucebot.com',
	skillId: Config.SKILL_ID,
	skillName: Config.SKILL_NAME
})


app.prepare()
	.then(() => {
		const server = new Koa()
		const router = new Router()

		// BEGIN {custom-routes}
		/*router.get('/a', async ctx => {
			await app.render(ctx.req, ctx.res, '/b', ctx.query)
			ctx.respond = false
		})

		router.get('/b', async ctx => {
			await app.render(ctx.req, ctx.res, '/a', ctx.query)
			ctx.respond = false
		})*/
		// END {custom-routes}

		router.get('*', async ctx => {
			await handle(ctx.req, ctx.res)
			ctx.respond = false
		})

		server.use(async (ctx, next) => {
			ctx.res.statusCode = 200
			await next()
		})

		server.use(router.routes())
		server.listen(port, (err) => {
			if (err) throw err
			console.log(`> Ready on http://localhost:${port}`)
		})
	})
