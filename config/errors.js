module.exports = {
	UNKNOWN: {
		code: 500,
		status: 'failure',
		reason: 'A server side error occurred.',
		friendlyReason:
			"I honestly have no idea what went wrong, but I've let the humans know and they are on it!"
	},
	ROUTE_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'Invalid route. Check the path and request methods',
		friendlyReason: 'The droids you were looking for could not be found.'
	},
	LOCATION_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'Location could not be found.',
		friendlyReason: 'I could not find the location you are looking for.'
	},
	USER_NOT_FOUND: {
		code: 404,
		status: 'failure',
		reason: 'User could not be found.',
		friendlyReason: "No joke, I can't find that user."
	},
	INVALID_AUTHENTICATION: {
		code: 401,
		status: 'failure',
		reason: 'Authentication failed.',
		friendlyReason: "Sorry, you can't be here right now."
	},
	NOT_AUTHORIZED: {
		code: 403,
		status: 'failure',
		reason: 'Permission denied.',
		friendlyReason: 'Permission denied.'
	}
}
