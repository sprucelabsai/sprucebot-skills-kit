import { Page, withStore } from 'react-sprucebot'
import actions from './../store/actions'
import reducers from './../store/reducers'
import config from 'config'

export default Wrapped =>
	withStore(Page(Wrapped), {
		actions,
		reducers,
		config: { ...config }
	})
