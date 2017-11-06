export const GET_LOCATION_REQUEST = 'locations/GET_LOCATION_REQUEST'
export const GET_LOCATION_SUCCESS = 'locations/GET_LOCATION_SUCCESS'
export const GET_LOCATION_ERROR = 'locations/GET_LOCATION_ERROR'

export function get(locationId) {
	return {
		types: [GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR],
		promise: client => client.get(`/api/v1/user/locations/${locationId}.json`)
	}
}
