module.exports = {
	'get :locationId/save': async (sb, req, res) => {
		const newCode = sb.utilites.rewards.generateDiscountCode()
		const rewards = await sb.services.rewards.generateRewardWithCode(
			req.params.locationId,
			newCode
		)
	},

	// assuming appointments are stored in a local postrges/mysql/sqllite database
	'get :locationId/appointments': async (sb, req, res) => {
		const appointments = sb.models.appointment.find({
			locationId: req.params.locationId
		})

		return res.json(appointments.map(a => a.toPublic()))
	},

	// post only
	'post :locationId/rewards/save': async (sb, req, res) => {
		// ...
	}
}
