import React from 'react'
import Page from '../../containers/Page'
import TeamDashboard from '../../components/TeamDashboard'
import { Container } from 'react-sprucebot'

class OwnerDashboard extends React.Component {
	static getInitialProps({ props }) {
		return {}
	}

	componentDidMount() {
		this.props.skill.ready() // Show the skill

		// load everything
		this.props.actions.users.guests()
		this.props.actions.users.teammates()
	}

	render() {
		let {
			auth,
			users: {
				guestsLoading = true,
				guestsError,
				guests,
				teammatesLoading = true,
				teammatesError,
				teammates
			}
		} = this.props

		const dashboardProps = {
			guestsLoading,
			guestsError,
			guests,
			teammatesLoading,
			teammatesError,
			teammates,
			user: auth.User,
			status: auth.status,
			location: auth.Location
		}

		return (
			<Container className="owner-dashboard">
				<TeamDashboard {...dashboardProps} />
			</Container>
		)
	}
}

export default Page(OwnerDashboard)
