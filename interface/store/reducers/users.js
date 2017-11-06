import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	GET_USER_ERROR,
	LIST_GUESTS_REQUEST,
	LIST_GUESTS_SUCCESS,
	LIST_GUESTS_ERROR,
	LIST_TEAMMATES_REQUEST,
	LIST_TEAMMATES_SUCCESS,
	LIST_TEAMMATES_ERROR
} from '../actions/users'

export default function reducer(state = null, action) {
	switch (action.type) {
		case GET_USER_REQUEST:
			return {
				...state,
				error: false,
				loading: true,
				loaded: false
			}
		case GET_USER_SUCCESS:
			return {
				...state,
				user: action.result,
				error: false,
				loading: false,
				loaded: true
			}
		case GET_USER_ERROR:
			return {
				...state,
				error: action.error,
				loading: false,
				loaded: true
			}
		case LIST_GUESTS_REQUEST:
			return {
				...state,
				guestsError: undefined,
				guestsLoading: true,
				guestsLoaded: false
			}
		case LIST_GUESTS_SUCCESS:
			return {
				...state,
				guests: action.result,
				guestsError: undefined,
				guestsLoading: false,
				guestsLoaded: true
			}
		case LIST_GUESTS_ERROR:
			return {
				...state,
				guestsError: action.error,
				guestsLoading: false,
				guestsLoaded: true
			}
		case LIST_TEAMMATES_REQUEST:
			return {
				...state,
				teammatesError: undefined,
				teammatesLoading: true,
				teammatesLoaded: false
			}
		case LIST_TEAMMATES_SUCCESS:
			return {
				...state,
				teammates: action.result,
				teammatesError: undefined,
				teammatesLoading: false,
				teammatesLoaded: true
			}
		case LIST_TEAMMATES_ERROR:
			return {
				...state,
				teammatesError: action.error,
				teammatesLoading: false,
				teammatesLoaded: true
			}
		default:
			return state
	}
}
