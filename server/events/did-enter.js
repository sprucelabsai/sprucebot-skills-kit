module.exports = ctx => {
	const user = ctx.user
	const location = ctx.location

	ctx.sb.sendMessage(
		lid,
		uid,
		`Welcome baeck to ${location.name}, ${user.firstName}!`
	)

	ctx.next()
}
