export const GET_LOCATION_REQUEST = 'location/GET_LOCATION_REQUEST'
export const GET_LOCATION_SUCCESS = 'location/GET_LOCATION_SUCCESS'
export const GET_LOCATION_ERROR = 'location/GET_LOCATION_ERROR'

export function getUser(userId) {
	return {
		types: [GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR],
		promise: client => client.get(`/locations/${locationId}`)
	}
}

export function patchUser(userId, values) {
	return {
		types: [GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR],
		promise: client => client.get(`/locations/${locationId}`)
	}
}
