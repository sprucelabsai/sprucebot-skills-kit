import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
	H1,
	BotText,
	Paragraph as P,
	Tabs,
	TabPane,
	SectionHeading,
	Loader,
	List,
	ListItem
} from 'react-sprucebot'

export default class TeamDashboard extends Component {
	userListItems(users) {
		return users.map((user, idx) => (
			<ListItem
				key={`item-${idx}`}
				online={user.status === 'connected'}
				title={user.User.name}
				subtitle={moment(new Date(user.lastRecordedVisit)).fromNow()}
				rightTitle={`${user.visits} visit${user.visits === 1 ? '' : 's'}`}
				avatar={
					user.User.profileImages
						? user.User.profileImages.profile60
						: user.User.defaultProfileImages.profile60
				}
			/>
		))
	}

	render() {
		return (
			<div>
				<H1>Welcome Back {this.props.auth.User.firstName}!</H1>
				{this.props.auth.status === 'online' && (
					<BotText>
						You are at {this.props.auth.Location.name} as we speak! That's so
						cool!
					</BotText>
				)}
				{this.props.auth.status !== 'online' && (
					<BotText>
						Next time you get to {this.props.auth.Location.name}, you should
						join the wifi!
					</BotText>
				)}
				<SectionHeading>Who's Online</SectionHeading>
				<Tabs>
					<TabPane title="Guests">
						{this.props.guestsLoading && <Loader />}
						{this.props.guestsError && (
							<BotText>Oh no! I could not load guests! </BotText>
						)}
						{this.props.guests && (
							<List>{this.userListItems(this.props.guests)}</List>
						)}
					</TabPane>
					<TabPane title="Teammates">
						{this.props.teammatesLoading && <Loader />}
						{this.props.teammatesError && (
							<BotText>Oh no! I could not load teammates! </BotText>
						)}
						{this.props.teammates && (
							<List>{this.userListItems(this.props.teammates)}</List>
						)}
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

TeamDashboard.propTypes = {
	guestsLoading: PropTypes.bool,
	guestsError: PropTypes.object,
	guests: PropTypes.array,
	teammatesLoading: PropTypes.bool,
	teammatesError: PropTypes.object,
	teammates: PropTypes.array,
	auth: PropTypes.object.isRequired
}

TeamDashboard.defaultProps = {
	guestsLoading: true,
	teammatesLoading: true
}
