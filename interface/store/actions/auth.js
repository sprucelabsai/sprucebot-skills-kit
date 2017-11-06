export const GO_AUTH_REQUEST = 'auth/GO_AUTH_REQUEST'
export const GO_AUTH_SUCCESS = 'auth/GO_AUTH_SUCCESS'
export const GO_AUTH_ERROR = 'auth/GO_AUTH_ERROR'

export function go(jwt) {
	return {
		types: [GO_AUTH_REQUEST, GO_AUTH_SUCCESS, GO_AUTH_ERROR],
		promise: client => client.get(`/api/1.0/auth/${jwt}.json`)
	}
}
