module.exports = router => {
	router.post('save/profile', ctx => {
		console.log('needs a guest')
		ctx.services.loyalty.sync(ctx.user)
	})
}
