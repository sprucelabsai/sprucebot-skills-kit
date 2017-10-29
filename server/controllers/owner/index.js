module.exports = router => {
	router.get('/location/:locationId/save', async ctx => {
		const newCode = ctx.sb.utilites.rewards.generateDiscountCode()
		const rewards = await ctx.sb.services.rewards.generateRewardWithCode(
			ctx.req.params.locationId,
			newCode
		)
	})

	// assuming appointments are stored in a local postrges/mysql/sqllite database
	router.get('/location/:locationId/save', async ctx => {
		const appointments = ctx.sb.models.appointment.find({
			locationId: ctx.req.params.locationId
		})
		return ctx.res.json(appointments.map(a => a.toPublic()))
	})

	// post only
	router.post('/location/:locationId/rewards/save', async ctx => {
		const appointments = ctx.sb.models.appointment.find({
			locationId: req.params.locationId
		})
		return res.json(appointments.map(a => a.toPublic()))
	})
}
