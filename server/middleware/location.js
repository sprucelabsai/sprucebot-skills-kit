module.exports = async (ctx, next) => {
	if (ctx.request.locationId) {
		console.log('load the location')
	}
	await next()
}
