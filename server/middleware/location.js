module.exports = router => {
	router.param('locationId', async (id, ctx, next) => {
		try {
			ctx.location = await ctx.sb.location(id)
		} catch (err) {
			console.error('location middleware failed with error', err)
			ctx.throw('LOCATION_NOT_FOUND')
		}
		await next()
	})
}
