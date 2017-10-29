module.exports = async (ctx, next) => {
	if (ctx.request.locationId && ctx.request.userId) {
		console.log('load the user')
	}
	await next()
}
