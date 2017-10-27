// import * as Actions from './actions'

// const locationUserAndRoleInitialState = {
// 	user: null,
// 	location: null,
// 	role: null,
// 	fetching: 0,
// 	error: null
// }

// export function locationUserAndRole(
// 	state = locationUserAndRoleInitialState,
// 	action
// ) {
// 	switch (action.type) {
// 		case Actions.REQUEST_LOCATION_USER_ROLE:
// 			return Object.assign({}, state, {
// 				fetching: ++state.fetching
// 			})
// 		case Actions.RECEIVE_LOCATION_USER_ROLE:
// 			return Object.assign({}, state, {
// 				fetching: state.fetching < 1 ? 0 : --state.fetching,
// 				user: action.user,
// 				location: action.location,
// 				role: action.role
// 			})
// 		case Actions.FAILED_LOCATION_USER_ROLE:
// 			return Object.assign({}, state, {
// 				fetching: state.fetching < 1 ? 0 : --state.fetching,
// 				error: action.error
// 			})
// 		default:
// 			return state
// 	}
// }

// const guestsInitialState = {
// 	guests: null,
// 	fetching: 0,
// 	error: null
// }

// export function guests(state = guestsInitialState, action) {
// 	switch (action.type) {
// 		case Actions.REQUEST_GUESTS:
// 			return Object.assign({}, state, {
// 				fetching: ++state.fetching
// 			})
// 		case Actions.RECEIVE_GUESTS:
// 			return Object.assign({}, state, {
// 				fetching: state.fetching < 1 ? 0 : --state.fetching,
// 				guests: action.guests
// 			})
// 		case Actions.FAILED_GUESTS:
// 			return Object.assign({}, state, {
// 				fetching: state.fetching < 1 ? 0 : --state.fetching,
// 				error: action.error
// 			})
// 		default:
// 			return state
// 	}
// }
