import {
	GET_LOCATION_REQUEST,
	GET_LOCATION_SUCCESS,
	GET_LOCATION_ERROR
} from '../actions/locations'

export default function reducer(state = null, action) {
	switch (action.type) {
		case GET_LOCATION_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_LOCATION_SUCCESS:
			return {
				...state,
				location: action.result,
				loading: false
			}
		case GET_LOCATION_ERROR:
			return {
				...state,
				error: action.error,
				loading: false
			}
		default:
			return state
	}
}
