import {
	GET_USER_REQUEST,
	GET_USER_REPSONSE,
	GET_USER_ERROR
} from '../actions/getUser'

export default function userReducer(state = null, action) {
	switch (action.type) {
		case GET_USER_REQUEST:
			return {
				...state,
				loading: true
			}
		case GET_USER_REPSONSE:
			return {
				...state,
				user: action.result,
				loading: false
			}
		case GET_USER_ERROR:
			return {
				...state,
				error: action.error,
				loading: false
			}
		default:
			return state
	}
}
