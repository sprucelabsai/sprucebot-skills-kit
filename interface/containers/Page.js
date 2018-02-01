import { Page, withStore } from 'react-sprucebot'
import config from 'config'
import actions from './../store/actions'
import reducers from './../store/reducers'
import { lang } from 'react-sprucebot'
import defaultLang from './../lang/default'

let overridesLang = {}
try {
	overridesLang = require('./../lang/overrides')
} catch (err) {}

//setup lang
lang.mixin(defaultLang, overridesLang || {})

export default Wrapped =>
	withStore(Page(Wrapped), {
		actions,
		reducers,
		config: { ...config }
	})
