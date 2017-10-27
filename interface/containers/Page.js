import { Component } from 'react'

import withStore from '../store/withStore'
import * as actions from '../store/actions'

const Page = Wrapped => {
	// const ConnectedWrapped = connect(mapStateToProps, mapDispatchToProps)(Wrapped)
	const ConnectedWrapped = Wrapped

	return class extends Component {
		static async getInitialProps({ pathname, query, asPath, store }) {
			let mergedProps = { pathname, query, asPath }

			if (query.locationId) {
				try {
					await store.dispatch(actions.getLocation(query.locationId))
				} catch (e) {
					console.error(e)
					console.warn('Error fetching location', query.userId)
				}
			}

			if (query.userId && query.locationId) {
				try {
					await store.dispatch(actions.getUser(query.locationId, query.userId))
				} catch (e) {
					console.error(e)
					console.warn('Error fetching user', query.userId)
				}
			}

			mergedProps = {
				...mergedProps,
				...store.getState()
			}

			if (Wrapped.getInitialProps) {
				mergedProps = {
					...mergedProps,
					...(await Wrapped.getInitialProps.call(this, ...arguments))
				}
			}

			// We can only return a plain object here
			// No circular dependencies
			return mergedProps
		}
		render() {
			return <ConnectedWrapped {...this.props} store={this.props.store} />
		}
	}
}

export default Wrapped => withStore(Page(Wrapped))
