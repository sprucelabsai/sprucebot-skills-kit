import React, { Component } from 'react'
import Emojify from 'react-emojione'
import PropTypes from 'prop-types'
import Loader from './Loader'

// TODO refactor into styled component
export default class Button extends Component {
	render() {
		const props = Object.assign({}, this.props)
		const {
			tag,
			busy,
			disabled,
			primary,
			secondary,
			alt,
			link,
			caution,
			className,
			children
		} = props
		delete props.tag
		delete props.primary
		delete props.secondary
		delete props.alt
		delete props.children
		delete props.busy
		delete props.caution
		delete props.link

		if (primary && secondary) {
			return (
				<button className="btn__primary">
					'primary' and 'secondary' are mutually exclusive.
				</button>
			)
		} else if (primary && alt) {
			return (
				<button className="btn__primary">
					'primary' and 'alt' are mutually exclusive.
				</button>
			)
		}

		let btnClass = primary ? 'primary' : ''
		btnClass += secondary ? 'secondary' : ''
		btnClass += alt && btnClass.length > 0 ? '__alt' : ''
		btnClass += alt && btnClass.length === 0 ? 'alt' : ''
		btnClass += disabled ? ' btn__disabled' : ''
		btnClass += caution ? ' btn__caution' : ''
		btnClass += link ? ' btn__link' : ''

		const Tag = tag

		return (
			<Tag className={`btn__${btnClass} ${className || ''}`} {...props}>
				{busy ? (
					<Loader blue={false} fullWidth={false} />
				) : (
					<Emojify>{children}</Emojify>
				)}
			</Tag>
		)
	}
}

Button.propTypes = {
	tag: PropTypes.string,
	primary: PropTypes.bool,
	alt: PropTypes.bool,
	secondary: PropTypes.bool,
	busy: PropTypes.bool
}

Button.defaultProps = {
	tag: 'button',
	primary: false,
	alt: false,
	secondary: false,
	busy: false
}
