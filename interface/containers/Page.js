import { Page, withStore } from 'react-sprucebot'
import actions from './../store/actions'
import reducers from './../store/reducers'
import config from 'config'
import { lang } from 'react-sprucebot'
import defaultLang from './../lang/default'
import overrideLang from './../lang/override'

//setup lang
lang.mixin(defaultLang, overrideLang)

export default Wrapped =>
	withStore(Page(Wrapped), {
		actions,
		reducers,
		config: { ...config }
	})
