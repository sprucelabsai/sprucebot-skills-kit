module.exports = router => {
	router.get('/api/1.0/locations/:locationId.json', async (ctx, next) => {
		ctx.body = JSON.stringify(ctx.location)
		next()
	})

	router.get(
		'/api/1.0/locations/:locationId/users/:userId.json',
		async (ctx, next) => {
			ctx.body = JSON.stringify(ctx.user)
			next()
		}
	)
}
