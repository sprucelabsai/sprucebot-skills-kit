export const GET_USER_REQUEST = 'user/GET_USER_REQUEST'
export const GET_USER_REPSONSE = 'user/GET_USER_REPSONSE'
export const GET_USER_ERROR = 'user/GET_USER_ERROR'

export default function getUser(locationId, userId) {
	return {
		types: [GET_USER_REQUEST, GET_USER_REPSONSE, GET_USER_ERROR],
		promise: client => client.get(`/locations/${locationId}/users/${userId}`)
	}
}
