export default function clientMiddleware(client) {
	return ({dispatch, getState}) => { // eslint-disable-line
		return next => action => {
			const { promise, types, ...rest } = action
			if (!promise) {
				return next(action)
			}

			const [REQUEST, SUCCESS, FAILURE] = types
			next({
				...rest,
				type: REQUEST
			})

			const { auth } = getState()
			const actionPromise = promise(client, auth)

			actionPromise
				.then(
					result => {
						return next({
							...rest,
							result,
							type: SUCCESS
						})
					},
					error =>
						next({
							...rest,
							error,
							type: FAILURE
						})
				)
				.catch(error => {
					console.log('MIDDLEWARE ERROR:', error)
					next({
						...rest,
						error,
						type: FAILURE
					})
				})

			return actionPromise
		}
	}
}
