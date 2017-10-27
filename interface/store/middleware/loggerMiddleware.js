const loggingEnabled = true

export default function loggerMiddleware() {
	return () => {
		return next => action => {
			if (loggingEnabled) {
				const { type, types, ...rest } = action
				console.log(`Action ${type || types}`, rest)
			}
			next(action)
		}
	}
}
