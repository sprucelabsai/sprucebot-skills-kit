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
				online={user.status === 'online'}
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
				<H1>
					{this.props.getText('teamDashboardWelcome', {
						user: this.props.auth
					})}
				</H1>
				<BotText>
					{this.props.getText('teamDashboardBotText', {
						user: this.props.auth
					})}
				</BotText>
				<SectionHeading>
					{this.props.getText('teammateDashboardHeading')}
				</SectionHeading>
				<Tabs>
					<TabPane title={this.props.getText('guestsTabTitle')}>
						{this.props.guestsLoading && <Loader />}
						{this.props.guestsError && (
							<BotText>{this.props.getText('errorLoadingGuests')}</BotText>
						)}
						{this.props.guests && (
							<List>{this.userListItems(this.props.guests)}</List>
						)}
					</TabPane>
					<TabPane title={this.props.getText('teammatesTabTitle')}>
						{this.props.teammatesLoading && <Loader />}
						{this.props.teammatesError && (
							<BotText>{this.props.getText('errorLoadingTeammates')}</BotText>
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
