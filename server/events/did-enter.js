module.exports = (ctx, next) => {
	console.log('****did-enter', ctx.event.Location.name, ctx.event.User.name)
	next()
}
