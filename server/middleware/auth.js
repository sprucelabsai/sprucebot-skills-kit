const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = router => {
	// jwt validation
	const auth = async (id, ctx, next) => {
		if (!next) {
			next = ctx
			ctx = id
			id = null
		}

		let token = id || ctx.cookies.get('jwt')
		if (token) {
			try {
				var decoded = jwt.verify(token, config.API_KEY.toString().toLowerCase())
				ctx.auth = await ctx.sb.user(decoded.locationId, decoded.userId)
			} catch (err) {
				ctx.throw('INVALID_AUTHENTICATION')
			}
		}

		await next()
	}

	router.use(auth)
	router.param('jwt', auth)

	// authorize paths for team, owner, and guest
	router.use('/api/*/teammate/*', async (ctx, next) => {
		let role = ctx.auth && ctx.auth.role
		if (role !== 'teammate' && role !== 'owner') {
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})

	router.use('/api/*/owner/*', async (ctx, next) => {
		let role = ctx.auth && ctx.auth.role
		if (role !== 'owner') {
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})

	router.use('/api/*/guest/*', async (ctx, next) => {
		let role = ctx.auth && ctx.auth.role
		if (role) {
			ctx.throw('NOT_AUTHORIZED')
		}
		await next()
	})
}
