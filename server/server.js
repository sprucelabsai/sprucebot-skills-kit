const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

// Main Sprucebot Module
// const Sprucebot = require('sprucebot') //once in NPM
const Sprucebot = require('../sprucebot')

const config = require('config')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

// Setup NextJS App
const app = next({ dir: './interface', dev })
const handle = app.getRequestHandler()

// Construct new Sprucebot Class
const sprucebot = new Sprucebot({
	apiKey: config.get('API_KEY'),
	host: config.get('HOST'),
	skillId: config.get('SKILL_ID'),
	skillName: config.get('SKILL_NAME')
})

app.prepare().then(() => {
	const server = new Koa()
	const router = new Router()

	/*=========================================
		=            Sprucebot Context          =
		=======================================*/
	//server.context.sb = sprucebot.server.context

	/*======================================
		=            Custom Routes Idea        =
		======================================*/

	// The below comment pattern could be used to identify blocks for file manipulation, just a thought... we'd want to figure out our own aytipical template string structure though, {}, <!-- -->, are too likely to be used so we wouldn't want those types of templates that we've seen before as the string sniff.

	// SB.CLI BEGIN {custom-routes}

	// SB.CLI BEGIN {custom-routes.a}
	/*router.get('/a', async ctx => {
				await app.render(ctx.req, ctx.res, '/b', ctx.query)
				ctx.respond = false
			})
			// SB.CLI END {custom-routes.b}

			// SB.CLI BEGIN {custom-routes.b}
			router.get('/b', async ctx => {
				await app.render(ctx.req, ctx.res, '/a', ctx.query)
				ctx.respond = false
			})*/
	// SB.CLI END {custom-routes.b}

	// SB.CLI END {custom-routes}

	router.get('*', async ctx => {
		await handle(ctx.req, ctx.res)
		ctx.respond = false
	})

	/*=========================================
		=            Server Middleware            =
		=========================================*/

	// Asynchronous Middleware

	// x-response-time
	server.use(async (ctx, next) => {
		const start = Date.now()
		const ms = Date.now() - start
		ctx.set('X-Response-Time', `${ms}ms`)
		await next()
	})

	// logger
	server.use(async (ctx, next) => {
		await next()
		// do stuff when the execution returns upstream, this will be last event in upstream
		const start = Date.now()
		const ms = Date.now() - start
		console.log(`${ctx.method} ${ctx.url} - ${ms}`)
	})

	// Sprucebot Middleware
	server.use(async (ctx, next) => {
		await sprucebot.middleware(ctx, next)
		console.log('add Sprucebot middleware')
		await next()
	})

	// Sprucebot Afterware
	server.use(async (ctx, next) => {
		await sprucebot.afterware(ctx, next)
		console.log('add Sprucebot afterware')
		await next()
	})

	server.use(async (ctx, next) => {
		ctx.res.statusCode = 200
		await next()
	})

	// Synchronous Middleware
	server.use(router.routes())

	server.listen(port, err => {
		if (err) throw err
		console.log(` 🌲  Sprucebot Skills Kit Ready on http://localhost:${port}`)
	})
})