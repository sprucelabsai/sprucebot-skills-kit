module.exports = async (ctx, next) => {
	console.log(
		'****did-update-profile',
		ctx.event.Location.name,
		ctx.event.User.name,
		ctx.event.payload.changes
	)
	await next()
}
