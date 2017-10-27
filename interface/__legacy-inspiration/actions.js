// import { get } from 'axios'
// import { parse } from 'query-string'

// export const REQUEST_LOCATION_USER_ROLE = 'REQUEST_LOCATION_USER_ROLE'
// export const RECEIVE_LOCATION_USER_ROLE = 'RECEIVE_LOCATION_USER_ROLE'
// export const FAILED_LOCATION_USER_ROLE = 'FAILED_LOCATION_USER_ROLE'

// export const REQUEST_GUESTS = 'REQUEST_GUESTS'
// export const RECEIVE_GUESTS = 'RECEIVE_GUESTS'
// export const FAILED_GUESTS = 'FAILED_GUESTS'

// function requestLocationUserAndRole(locationId, userId) {
// 	return { type: REQUEST_LOCATION_USER_ROLE, locationId, userId }
// }

// function receiveLocationUserAndRole(location, user, role) {
// 	return { type: RECEIVE_LOCATION_USER_ROLE, user, location, role }
// }

// function failedLocationUserAndRole(error) {
// 	return { type: FAILED_LOCATION_USER_ROLE, error }
// }

// function requestGuests(locationId) {
// 	return { type: REQUEST_GUESTS, locationId }
// }

// function receiveGuests(guests) {
// 	return { type: RECEIVE_GUESTS, guests }
// }

// function failedGuests(error) {
// 	return { type: FAILED_GUESTS, error }
// }

// export function fetchLocationUserAndRole(
// 	locationId = parse(window.location.search).locationId,
// 	userId = parse(window.location.search).userId,
// 	allowCache = true
// ) {
// 	return async function(dispatch, getState) {
// 		try {
// 			//if we are cache'able?
// 			if (allowCache) {
// 				const state = getState()
// 				//we have a match, bail (state does not change)
// 				if (state.skill.location && state.skill.user && state.skill.role) {
// 					return dispatch(
// 						receiveLocationUserAndRole(state.location, state.user, state.role)
// 					)
// 				}
// 			}

// 			//let the world know we are starting
// 			dispatch(requestLocationUserAndRole(locationId, userId))
// 			const { data: { location, user, role } } = await get(
// 				`/locations/${locationId}/users/${userId}.json`
// 			)
// 			return dispatch(receiveLocationUserAndRole(location, user, role))
// 		} catch (err) {
// 			return dispatch(failedLocationUserAndRole(err))
// 		}
// 	}
// }

// export function fetchGuests(allowCache = true) {
// 	return async function(dispatch, getState) {
// 		try {
// 			const state = getState()

// 			if (allowCache) {
// 				//we have a match, bail (state does not change)
// 				if (state.skill.guests) {
// 					return dispatch(receiveGuests(state.skill.guests))
// 				}
// 			}

// 			//let the world know we are starting
// 			const locationId = state.skill.locationUserAndRole.location.id
// 			dispatch(requestGuests())
// 			const { data: guests } = await get(`/locations/${locationId}/guests.json`)
// 			return dispatch(
// 				receiveGuests(
// 					guests.map(guest => {
// 						return Object.assign(
// 							{ online: guest.status === 'online', visits: guest.visits },
// 							guest.User
// 						)
// 					})
// 				)
// 			)
// 		} catch (err) {
// 			console.log(err)
// 			alert(err.message)
// 			return dispatch(failedGuests(err))
// 		}
// 	}
// }
