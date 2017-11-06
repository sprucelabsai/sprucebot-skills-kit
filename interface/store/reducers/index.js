import { combineReducers } from 'redux'
import users from './users'
import locations from './locations'
import auth from './auth'

export default combineReducers({
	users,
	locations,
	auth
})
