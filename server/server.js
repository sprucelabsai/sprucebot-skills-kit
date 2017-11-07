const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const cron = require('node-cron')
const { kebabCase } = require('lodash')
var bodyParser = require('koa-bodyparser')
const { version } = require('../package.json')

// Main Sprucebot Module
const Sprucebot = require('sprucebot-node')

const {
	API_KEY,
	API_HOST,
	ID,
	NAME,
	ICON,
	DESCRIPTION,
	PORT,
	SERVER_HOST,
	INTERFACE_HOST,
	API_SSL_ALLOW_SELF_SIGNED,
	nextConfig,
	errors
} = require('config')

// Setup NextJS App
const app = next(nextConfig)
const handle = app.getRequestHandler()
const glob = require('glob')
const path = require('path')

// Construct a new Sprucebot
const sprucebot = new Sprucebot({
	apiKey: API_KEY,
	skillId: ID,
	host: API_HOST,
	name: NAME,
	description: DESCRIPTION,
	skillUrl: SERVER_HOST,
	svgIcon: ICON,
	allowSelfSignedCerts: API_SSL_ALLOW_SELF_SIGNED
})

// Kick off sync with platform
sprucebot.sync().catch(err => {
	console.error(`Failed to sync your skill's settings with ${API_HOST}`)
	console.error(err)
})

app.prepare().then(async () => {
	const koa = new Koa()
	const router = new Router()

	/*=======================================
	=            Utilities/Services          =
	=======================================*/
	try {
		sprucebot.skillskit.factories.context(
			path.join(__dirname, 'services'),
			'services',
			koa.context
		)
		sprucebot.skillskit.factories.context(
			path.join(__dirname, 'utilities'),
			'utilities',
			koa.context
		)
	} catch (err) {
		console.error('Leading services & utilities failed.')
		console.error(err)
	}

	/*======================================
	=            	Cron	        	   =
	======================================*/
	const cronController = require('./controllers/cron')
	cronController(cron)

	// POST support
	koa.use(bodyParser())

	/*=========================================
	=            	Middleware	              =
	=========================================*/
	koa.use(async (ctx, next) => {
		ctx.sb = sprucebot
		await next()
	})

	// Error Handling
	koa.use(async (ctx, next) => {
		try {
			await next()
		} catch (err) {
			const errorResponse = errors[err.message] || errors['UNKNOWN']
			ctx.status = errorResponse.code
			ctx.body = errorResponse
		}
	})

	// custom
	try {
		sprucebot.skillskit.factories.wares(
			path.join(__dirname, 'middleware'),
			router
		)
	} catch (err) {
		console.error('Failed to boot middleware', err)
	}

	// Response headers
	koa.use(async (ctx, next) => {
		const date = Date.now()
		await next()
		const ms = Date.now() - date
		// console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)

		// On a redirect, headers have already been sent
		if (!ctx.res.headersSent) {
			ctx.set('X-Response-Time', `${ms}ms`)
			ctx.set('X-Powered-By', `Sprucebot v${version}`)
		}
	})

	// Response Code Handling
	koa.use(async (ctx, next) => {
		// default response code
		ctx.res.statusCode = 200
		await next()

		// If this is an API call with no body (no controller answered), respond with a 404 and a json body
		if (ctx.path.search('/api') === 0 && !ctx.body) {
			ctx.throw('ROUTE_NOT_FOUND')
		}
	})

	/*======================================
	=          Server Side Routes          =
	======================================*/
	try {
		sprucebot.skillskit.factories.routes(
			path.join(__dirname, 'controllers'),
			router
		)
		koa.use(router.routes())
	} catch (err) {
		console.error('Loading controllers failed.')
		console.error(err)
	}

	/*======================================
	=         		Event Listeners          =
	======================================*/
	let listenersByEventName
	try {
		listenersByEventName = sprucebot.skillskit.factories.listeners(
			path.join(__dirname, 'events')
		)
	} catch (err) {
		console.error('Loading event listeners failed.')
		console.error(err)
	}

	router.post('/hook', async (ctx, next) => {
		const body = ctx.request.body
		ctx.event = await ctx.sb.user(body.locationId, body.userId)

		await listenersByEventName[body.eventType](ctx, next)
		next()
	})

	/*======================================
	=          Client Side Routes          =
	======================================*/

	// The logic before handle() is to suppress nextjs from responding and letting koa finish the request
	// This allows our middleware to fire even after
	router.get('*', async ctx => {
		// if a controller already responded or we are making an API call, don't let next run at all
		if (ctx.body || ctx.path.search('/api') === 0) {
			return
		}
		ctx.body = await new Promise(resolve => {
			const _end = ctx.res.end
			ctx.res._end = _end

			// Hijack stream to set ctx.body
			const pipe = stream => {
				ctx.res.end = _end
				stream.unpipe(ctx.res)
				resolve(stream)
			}
			ctx.res.once('pipe', pipe)

			// Monkey patch res.end to set ctx.body
			ctx.res.end = body => {
				ctx.res.end = _end
				ctx.res.removeListener('pipe', pipe)
				if (ctx.res.redirect) {
					ctx.redirect(ctx.res.redirect)
					body = `Redirecting to ${ctx.res.redirect}`
					ctx.res.end()
				}
				resolve(body)
			}

			handle(ctx.req, ctx.res)
		})
	})

	/*======================================
	=              	Serve            	   =
	======================================*/
	// TODO better handling hosting only server or interface
	koa.listen(PORT, err => {
		if (err) throw err
		console.log(
			` 🌲  Skill launched at ${SERVER_HOST ? SERVER_HOST : INTERFACE_HOST}`
		)
	})
})
