import { Component } from 'react'

import withStore from '../store/withStore'
import * as actions from '../store/actions'
import Cookies from 'cookies'
import DevControls from '../containers/DevControls'
import config from 'config'

const Page = Wrapped => {
	// const ConnectedWrapped = connect(mapStateToProps, mapDispatchToProps)(Wrapped)
	const ConnectedWrapped = Wrapped

	// TODO move this into react-sprucebot??
	const skill = {
		height: 0,
		resized: function() {
			var height = 0

			function getBottom(elem) {
				var box = elem.getBoundingClientRect()

				var body = document.body
				var docEl = document.documentElement

				var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
				var clientTop = docEl.clientTop || body.clientTop || 0
				var top = box.top + scrollTop - clientTop
				var bottom = top + elem.clientHeight

				return bottom
			}

			Array.from(
				window.document.body.getElementsByClassName('container')
			).forEach(container => {
				let bottom = getBottom(container)
				if (bottom > height) {
					height = bottom
				}
			})

			if (height != this.height) {
				this.height = height
				window.parent.postMessage(
					{
						name: 'Skill:Resized',
						height
					},
					'*'
				)
			}
		},
		ready: function() {
			this.resized()
			window.parent.postMessage('Skill:Loaded', '*')
			this.resizedInterval = setInterval(this.resized.bind(this), 50)
		}
	}

	return class extends Component {
		// Everything here is run server side
		static async getInitialProps({ pathname, query, asPath, store, res, req }) {
			let props = { pathname, query, asPath }

			const cookies = new Cookies(req, res, { secure: true })
			const jwt = query.jwt || cookies.get('jwt')
			if (jwt) {
				try {
					await store.dispatch(actions.auth.go(jwt))

					// only save cookie if a new one has been passed
					if (query.jwt) {
						cookies.set('jwt', query.jwt)
					}
				} catch (err) {
					console.error(err)
					console.warn('Error fetching user from jwt')
				}
			}

			props = {
				devMode: config.DEV_MODE,
				...props,
				...store.getState()
			}

			if (ConnectedWrapped.getInitialProps) {
				props = {
					...props,
					...(await ConnectedWrapped.getInitialProps.call(this, ...arguments))
				}
			}

			let redirect = false
			if (props.auth) {
				props.auth.role =
					(config.DEV_MODE && cookies.get('devRole')) || props.auth.role
			}

			// make sure we have a user AND a location if we are not flagged as public
			if (!props.public && (!props.auth || !props.auth.role)) {
				redirect = '/unauthorized'
			} else if (!props.public) {
				// check role against first part of path
				const role = props.auth.role
				const firstPart = props.pathname.split('/')[1]

				// we are at '/' then redirect to the corresponding role's path
				if (props.pathname === '/') {
					redirect = `/${role}`
				} else if (role !== firstPart) {
					redirect = `/unauthorized`
				}
			}

			if (redirect) {
				res.redirect = redirect
				res.end()
				return
			}

			// We can only return a plain object here because it is passed to the browser
			// No circular dependencies
			return props
		}
		componentDidMount() {
			// make sure we are being loaded inside sb
			if (window.self === window.top) {
				console.error('NOT LOADED FROM SPRUCEBOT!! BAIL BAIL BAIL')
			}
		}

		render() {
			if (this.props.devMode) {
				return (
					<div>
						<DevControls auth={this.props.auth} />
						<ConnectedWrapped
							{...this.props}
							skill={skill}
							store={this.props.store}
						/>
					</div>
				)
			}
			return (
				<ConnectedWrapped
					{...this.props}
					skill={skill}
					store={this.props.store}
				/>
			)
		}
	}
}

export default Wrapped => withStore(Page(Wrapped))
