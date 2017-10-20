import React, { Component } from 'react'

export default class Input extends Component {
	render() {
		const props = Object.assign({}, this.props)
		const { error, label } = props

		delete props.error
		delete props.label

		return (
			<div className="input__wrapper">
				{label && <span className="input__mini__label">{label}</span>}
				<input {...props} />
				{error && <span className="input__error">{error}</span>}
			</div>
		)
	}
}
