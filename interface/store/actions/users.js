export const GET_USER_REQUEST = 'users/GET_USER_REQUEST'
export const GET_USER_RESPONSE = 'users/GET_USER_RESPONSE'
export const GET_USER_ERROR = 'users/GET_USER_ERROR'

export const UPDATE_USER_REQUEST = 'users/UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'users/GET_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'users/UPDATE_USER_ERROR'

export const LIST_GUESTS_REQUEST = 'users/LIST_GUESTS_REQUEST'
export const LIST_GUESTS_SUCCESS = 'users/LIST_GUESTS_SUCCESS'
export const LIST_GUESTS_ERROR = 'users/LIST_GUESTS_ERROR'

export const LIST_TEAMMATES_REQUEST = 'users/LIST_TEAMMATES_REQUEST'
export const LIST_TEAMMATES_SUCCESS = 'users/LIST_TEAMMATES_SUCCESS'
export const LIST_TEAMMATES_ERROR = 'users/LIST_TEAMMATES_ERROR'

export function update(userId, values) {
	return {
		types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR],
		promise: (client, auth) =>
			client.patch(`/api/1.0/${auth.role}/users/${userId}.json`, values)
	}
}

export function get(userId) {
	return {
		types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR],
		promise: (client, auth) =>
			client.get(`/api/1.0/teammate/users/${userId}.json`)
	}
}

export function guests(query) {
	return {
		types: [LIST_GUESTS_REQUEST, LIST_GUESTS_SUCCESS, LIST_GUESTS_ERROR],
		promise: (client, auth) => {
			return client.get(`/api/1.0/teammate/guests.json`, query)
		}
	}
}

export function teammates(query) {
	return {
		types: [
			LIST_TEAMMATES_REQUEST,
			LIST_TEAMMATES_SUCCESS,
			LIST_TEAMMATES_ERROR
		],
		promise: (client, auth) => {
			return client.get(`/api/1.0/teammate/teammates.json`, query)
		}
	}
}
