import {
	GO_AUTH_REQUEST,
	GO_AUTH_SUCCESS,
	GO_AUTH_ERROR,
	AUTH_REMEMBER
} from '../actions/auth'

export default function reducer(state = null, action) {
	switch (action.type) {
		case GO_AUTH_REQUEST:
			return {
				...state,
				authing: true
			}
		case GO_AUTH_SUCCESS:
			return {
				...state,
				...action.result,
				authing: false
			}
		case GO_AUTH_ERROR:
			return {
				...state,
				error: action.error,
				authing: false
			}
		default:
			return state
	}
}
