import React, { Component } from 'react'
import Emojify from 'react-emojione'

export default class BotText extends Component {
	render() {
		if (!this.props.children || this.props.children.length === 0) {
			return ''
		}
		return (
			<p className="bot__text">
				<Emojify>{this.props.children}</Emojify>
			</p>
		)
	}
}
