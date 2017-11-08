import * as users from './users'
import * as locations from './locations'
import { actions } from 'react-sprucebot'

module.exports = {
	users,
	locations,
	...actions
}
