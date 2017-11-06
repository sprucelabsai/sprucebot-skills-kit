import React from 'react'
import Page from '../../containers/Page'
import { Container, H1, BotText, Paragraph as P } from 'react-sprucebot'

class GuestPage extends React.Component {
	static getInitialProps({ store }) {
		const auth = store.getState().auth || {}
		return {
			user: auth.User,
			location: auth.Location,
			status: auth.status
		}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Container>
				<div className="guest">
					<H1>Welcome {this.props.user.firstName}!</H1>
					{this.props.status === 'online' && (
						<BotText>
							You are at {this.props.location.name} as we speak!
						</BotText>
					)}
					{this.props.status !== 'online' && (
						<BotText>
							Next time you get to {this.props.location.name}, you should join
							the wifi!
						</BotText>
					)}
				</div>
			</Container>
		)
	}
}

export default Page(GuestPage)
