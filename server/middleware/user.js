module.exports = router => {
	router.param('userId', async (id, ctx, next) => {
		try {
			ctx.user = await ctx.sb.user(ctx.auth.Location.id, id)
		} catch (err) {
			console.error('user middleware failed with error', err)
			ctx.throw('USER_NOT_FOUND')
		}
		await next()
	})
}
