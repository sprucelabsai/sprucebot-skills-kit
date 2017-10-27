import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Loader extends Component {
	render() {
		const { blue, fullWidth } = this.props
		const dotClassName = blue ? 'loader_dot_blue' : 'loader_dot'
		const fullWidthStyle = fullWidth
			? { display: 'block', margin: '20px', textAlign: 'center' }
			: {}

		return (
			<span className="loader_wrapper" style={fullWidthStyle}>
				<span className={dotClassName} />
				<span className={dotClassName} />
				<span className={dotClassName} />
			</span>
		)
	}
}

Loader.propTypes = {
	blue: PropTypes.bool,
	fullWidth: PropTypes.bool
}

Loader.defaultProps = {
	blue: true,
	fullWidth: true
}
