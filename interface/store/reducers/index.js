import { combineReducers } from 'redux'
import user from './user'
import location from './location'

export default combineReducers({
	user,
	location
})
