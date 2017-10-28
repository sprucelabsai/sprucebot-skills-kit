import React from 'react'
import config from 'config'
import {
	createStore as createRedux,
	applyMiddleware,
	compose,
	bindActionCreators
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import withRedux from 'next-redux-wrapper'

import reducers from './reducers'
import apiClient from './apiClient'
import clientApiMiddleware from './middleware/clientApiMiddleware'
import loggerMiddleware from './middleware/loggerMiddleware'
import * as unboundActions from '../store/actions'

export function configureStore(initialState) {
	// Allow for redux debugger
	// https://github.com/zalmoxisus/redux-devtools-extension#usage
	const composeEnhancers =
		(typeof window !== 'undefined' &&
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
		compose
	const client = apiClient(config.HOST)
	const enhancer = composeEnhancers(
		applyMiddleware(thunk, clientApiMiddleware(client), loggerMiddleware())
	)

	const store = createRedux(reducers, initialState, enhancer)

	if (module.hot) {
		// Enable hot module replacement for reducers
		module.hot.accept(() => {
			const nextRootReducer = require('./reducers/index').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(unboundActions, dispatch)
})

/**
 * Higher order component
 * Decorates Component with props
 *  {store, client}
 * 
 * @export
 * @param {any} Component 
 * @returns 
 */

export default function withStore(Component) {
	return withRedux({
		createStore: configureStore,
		storeKey: '__SPRUCEBOT_STORE__',
		debug: false,
		mapStateToProps,
		mapDispatchToProps
	})(Component)
}

// export default function withStore(Component) {
// 	// Setup the redux store
// 	const client = apiClient('https://local-api.sprucebot.com/api/1.0')
// 	const store = configureStore(client)

// 	const baseProps = { client, store }

// 	const ComponentWithStore = props => (
// 		<Provider store={store}>
// 			<Component {...props} {...baseProps} />
// 		</Provider>
// 	)

// 	ComponentWithStore.getInitialProps = async props =>
// 		Component.getInitialProps &&
// 		Component.getInitialProps({ ...props, ...baseProps })

// 	return ComponentWithStore
// }
