import React from 'react'
import { Container, H1, BotText } from 'react-sprucebot'

export default class Error extends React.Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null
		return { statusCode, err }
	}

	render() {
		return (
			<Container>
				<div className="error">
					<H1>Oh dang. I'm sorry.</H1>
					{this.props.statusCode &&
						this.props.statusCode === 404 && (
							<BotText>
								I can't find the page you are looking for. I really apologize
								about that.
							</BotText>
						)}
					{!this.props.statusCode ||
						(this.props.statusCode !== 404 && (
							<BotText>
								I had one job; run the website. Apparently I can't even do that.
								I've let the humans know as they're probably better equipped to
								fix this than I am.
							</BotText>
						))}
				</div>
			</Container>
		)
	}
}
