import React from 'react'
import Page from '../containers/Page'
import { Container, H1, BotText } from 'react-sprucebot'

class UnauthorizedPage extends React.Component {
	static getInitialProps() {
		return {
			public: true // does not require the user to be of a certain role
		}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill
	}

	render() {
		return (
			<Container>
				<div className="unauthorized">
					<H1>Permission Denied</H1>
					<BotText>
						Well, this is kinda awkward, but you can't be wherever it was you
						were trying to be.
					</BotText>
				</div>
			</Container>
		)
	}
}

export default Page(UnauthorizedPage)
