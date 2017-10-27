export const GET_LOCATION_REQUEST = 'location/GET_LOCATION_REQUEST'
export const GET_LOCATION_SUCCESS = 'location/GET_LOCATION_SUCCESS'
export const GET_LOCATION_ERROR = 'location/GET_LOCATION_ERROR'

export default function getUser(locationId) {
	return {
		types: [GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR],
		promise: client => client.get(`/locations/${locationId}`)
	}
}
