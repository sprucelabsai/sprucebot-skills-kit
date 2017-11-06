module.exports = router => {
	// generic listing of user based on role
	const list = role => {
		return async (ctx, next) => {
			const { page, limit } = ctx.utilities.paging.normalize({
				page: ctx.query.page,
				limit: ctx.query.limit
			})
			let params = {
				page,
				limit,
				role: role
			}

			if (ctx.query.status) {
				params.status = ctx.query.status
			}

			const users = await ctx.sb.users(ctx.auth.Location.id, params)
			ctx.body = JSON.stringify(users)
			next()
		}
	}

	/**
     * List of teammates (including owners)
     */
	router.get('/api/1.0/teammate/teammates.json', list('ownerteammate'))

	/**
     * List of guests
     */
	router.get('/api/1.0/teammate/guests.json', list('guest'))
}
