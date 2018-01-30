import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {
	Container,
	BotText,
	Loader,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	SectionHeading,
	Paragraph as P,
	A,
	Avatar,
	Button,
	Form,
	Switch,
	Input,
	Select,
	SubmitWrapper,
	List,
	ListItem,
	Tabs,
	TabPane,
	LinkPile,
	Pager,
	StatsSlider,
	ButtonGrid,
	GridButton,
	Stars,
	ImageCropper,
	Callout,
	Feed,
	TrainingGuide
} from 'react-sprucebot'

const Pre = styled.pre`
	font-size: 0.8em;
	text-align: left;
	width: 100%;
	overflow-x: scroll;
	background-color: black;
	color: green;
	padding: 20px;
	font-family: Courier, 'New Courier', monospace;
	tab-size: 4;
`

const Dark = styled.pre`
	background-color: #333;
	padding: 3px;
`

const demoGuest = {
	id: 'b8d62e17-a511-4b9b-ae8a-56710f89af48',
	role: 'guest',
	status: 'offline',
	visits: 1,
	LocationId: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
	UserId: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
	User: {
		id: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
		firstName: 'Niki',
		name: 'Niki R.',
		profileImageUUID: null,
		profileImages: {
			profile60: 'https://hello.sprucebot.com/avatar.jpg',
			'profile60@2x': 'https://hello.sprucebot.com/avatar.jpg',
			profile150: 'https://hello.sprucebot.com/avatar.jpg',
			'profile150@2x': 'https://hello.sprucebot.com/avatar.jpg'
		},
		defaultProfileImages: {
			profile60:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
			'profile60@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
			profile150:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
			'profile150@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
		}
	},
	isConnected: true,
	lastRecordedVisit: '2017-12-01T23:05:35.705Z',
	updatedAt: '2017-12-02T00:06:05.448Z',
	Location: {
		id: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
		name: 'Spruce',
		addressLine1: '4347 Tennyson St',
		addressLine2: null,
		addressCity: 'Denver',
		addressState: 'CO',
		addressZip: '80212',
		addressCountry: 'US',
		geo: { lat: 39.775644, lng: -105.044258 },
		OrganizationId: 'fcdd548b-fe3b-42dc-8c66-6810411cd84d'
	}
}
let NOW
if (process.env.NODE_ENV === 'test') {
	NOW = new Date(946710000000) // Snapshot testing requires an unchanging date
} else {
	NOW = new Date()
}

export default class Styleguide extends Component {
	constructor(props) {
		super(props)
		this.state = {
			calloutOn: false
		}
	}
	render() {
		const HR = <hr style="border-top-width:10px;" />
		const { calloutOn } = this.state
		return (
			<div>
				<H1>Importing Components</H1>
				<Container>
					<BotText>
						All the components you need to build your skill are available in the
						'react-sprucebot' module. Any modules you create yourself are
						subject to rejection from the Skills Marketplace.
					</BotText>
					<Pre>{`import {
	Container,
	BotText,
	Loader,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	SectionHeading,
	Paragraph as P,
	A,
	Avatar,
	Button,
	Form,
	Switch,
	Input,
	Select,
	SubmitWrapper,
	List,
	ListItem,
	Tabs,
	TabPane,
	LinkPile,
	Pager,
	StatsSlider,
	ButtonGrid,
	GridButton,
	Stars,
	ImageCropper,
	Callout,
	Feed
} from 'react-sprucebot'`}</Pre>
				</Container>
				<H1>Headings</H1>
				<Container>
					<BotText>
						Notice the use of the Component with a capitalized tag, e.g. 'H' vs
						'h'. This is intentional and is actively enforced.
					</BotText>
					<H1>I'm an H1</H1>
					<Pre>{`<H1>I'm an H1</H1>`}</Pre>
					<H2>I'm an H2</H2>
					<Pre>{`<H2>I'm an H2</H2>`}</Pre>
					<H3>I'm an H3</H3>
					<Pre>{`<H3>I'm an H3</H3>`}</Pre>
					<H4>I'm an H4</H4>
					<Pre>{`<H4>I'm an H4</H4>`}</Pre>
					<H5>I'm an H5</H5>
					<Pre>{`<H5>I'm an H5</H5>`}</Pre>
					<H6>I'm an H6</H6>
					<Pre>{`<H6>I'm an H6</H6>`}</Pre>
					<P>I'm a paragraph of some text</P>
					<Pre>{`<P>I'm a paragraph of some text</P>`}</Pre>
					<A href="#">I'm an anchor tag</A>
					<Pre>{`<A href="#">I'm an anchor tag</A>`}</Pre>
					<SectionHeading>Section Heading</SectionHeading>
					<Pre>{`<SectionHeading>Section Heading</SectionHeading>`}</Pre>
					<BotText>
						Use SectionHeading to break up sections of your page and to label
						forms, similar to a fieldset.
					</BotText>
				</Container>
				<H1>Sub Headings</H1>
				<Container>
					<H1 with_subheader>Header</H1>
					<H2 subheader>Sub Headings</H2>
					<Pre
					>{`<H1 with_subheader>Header</H1>\n<H2 subheader>Sub Headings</H2>`}</Pre>
				</Container>
				<H1>Bot Text</H1>
				<Container>
					<BotText>
						I'm some bot text. I'm great for quick hints, tips, shout outs, etc.
						This text comes right from Sprucebot, so make sure it's on brand.
					</BotText>
					<Pre
					>{`<BotText>I'm some bot text. I'm great for quick hints, tips, shout outs, etc. This text comes right from Sprucebot, so make sure it's on brand.</BotText>`}</Pre>
				</Container>
				<H1>Paragraphs</H1>
				<Container>
					<P>I'm a normal paragraph tag</P>
					<Pre>{`<P>I'm a normal paragraph tag</P>`}</Pre>
					<P fine>I'm some fine print</P>
					<Pre>{`<P fine>I'm some fine print</P>`}</Pre>
				</Container>
				<H1>Top Avatar</H1>
				<Container>
					<BotText>
						Avatars usually go next to users when output in a list. Adding the
						"top" property will make it big and center. Great for the tops of
						profile or dashboard pages.
					</BotText>
					<Avatar top image="https://hello.sprucebot.com/avatar.jpg" />
					<Pre
					>{`<Avatar top image="https://hello.sprucebot.com/avatar.jpg" />`}</Pre>
				</Container>
				<H1>Buttons</H1>
				<Container>
					<Button primary>I'm a primary button</Button>
					<Pre>{`<Button primary>I'm a primary button</Button>`}</Pre>
					<Button primary href="https://sprucebot.com">
						I'm a primary button turned link
					</Button>
					<Pre
					>{`<Button primary href="https://sprucebot.com">I'm a primary button turned link.</Button>`}</Pre>
					<Button primary disabled>
						I'm a primary disabled button
					</Button>
					<Pre
					>{`<Button primary disabled>I'm a primary disabled button</Button>`}</Pre>
					<Button secondary>I'm a secondary button</Button>
					<Pre>{`<Button secondary>I'm a secondary button</Button>`}</Pre>
					<Button secondary disabled>
						I'm a secondary disabled button
					</Button>
					<Pre
					>{`<Button secondary disabled>I'm a secondary disabled button</Button>`}</Pre>
					<Button alt>I'm an alt button</Button>
					<Pre>{`<Button alt>I'm an alt button</Button>`}</Pre>
					<Button alt disabled>
						I'm an alt disabled button
					</Button>
					<Pre
					>{`<Button alt disabled>I'm an alt disabled button</Button>`}</Pre>
					<Button secondary alt>
						I'm a secondary alt button
					</Button>
					<Pre
					>{`<Button secondary alt >I'm a secondary alt button</Button>`}</Pre>
					<Button secondary alt disabled>
						I'm a secondary alt disabled button
					</Button>
					<Pre
					>{`<Button secondary alt disabled>I'm a secondary alt disabled button</Button>`}</Pre>
					<Button caution>I'm a caution button</Button>
					<Pre>{`<Button caution>I'm a caution button</Button>`}</Pre>
					<Button link>I'm a button link</Button>
					<Pre>{`<Button link>I'm a button link</Button>`}</Pre>
				</Container>

				<H1>Loaders</H1>
				<Container>
					<BotText>
						Loaders can be dark or light. Default, they are dark. But, if you
						need to put a loader on a dark dark background, set dark={false}.
					</BotText>
					<Loader />
					<Pre>{`<Loader />`}</Pre>
					<Dark>
						<Loader dark={false} />
					</Dark>
					<Pre>{`<Loader dark={false} />`}</Pre>
					<Button busy>Content does not matter</Button>
					<Pre>{`<Button busy>Content does not matter</Button>`}</Pre>
				</Container>
				<H1>Switches</H1>
				<Container>
					<Switch
						onChange={(on, e) => {
							console.log('on:', on, 'event:', e)
						}}
					/>
					<Pre>{`<Switch
	onChange={(on, e) => {
		console.log('on:', on, 'event:', e)
	}}
/>`}</Pre>
					<Switch on />
					<Pre>{`<Switch on />`}</Pre>
				</Container>
				<H1>Forms</H1>
				<Container>
					<BotText>
						Forms and elements currently do not do any validation nor formatting
						for you. You must manually set 'error' to display an error message.
					</BotText>
					<Form>
						<SectionHeading>Profile</SectionHeading>
						<Input label="Your Name" />
						<Input
							onChange={(value, e) => {
								console.log('value:', value, 'event:', e)
							}}
							label="Email"
							finePrint="This is helpful fine print."
							defaultValue="founders@sprucelabs.ai"
						/>
						<SectionHeading>Another Section</SectionHeading>
						<BotText>
							Most properties on an Input are passed through, so you can do more
							than just text!
						</BotText>
						<Input
							type="number"
							label="Age"
							error="This is an error message."
						/>
						<Input type="password" label="Password" />
						<Select
							label="Dropdowns Rock!"
							onChange={(value, e) => {
								console.log('value:', value, 'event:', e)
							}}
						>
							<option value="uno">Test 1</option>
							<option value="dos">Test 2</option>
						</Select>
						<Input
							multiline
							label="Growing multiline input"
							defaultValue="You can type in here and I'll auto-size to match the height. How easy and simple and cool and taking up more space now is that?"
						/>
						<SubmitWrapper>
							<Button alt href="http://hello.sprucebot.com">
								Back to Dashboard
							</Button>
							<Button primary>Save Changes</Button>
						</SubmitWrapper>
					</Form>
					<Pre>{`<Form>
	<SectionHeading>Profile</SectionHeading>
	<Input label="Your Name" />
	<Input
		label="Email"
		finePrint="This is helpful fine print."
		defaultValue="founders@sprucelabs.ai"
	/>
	<SectionHeading>Another Section</SectionHeading>
	<BotText>
		Most properties on an Input are passed through, so you can do more than just text!
	</BotText>
	<Input
		onChange={(value, e) => {
			console.log('value:', value, 'event:', e)
		}}
		type="number"
		label="Age"
		error="This is an error message."
	/>
	<Input type="password" label="Password" />
	<Select
		label="Dropdowns Rock!"
		onChange={(value, e) => {
			console.log('value:', value, 'event:', e)
		}}
	>
		<option value="uno">Test 1</option>
		<option value="dos">Test 2</option>
	</Select>
	<Input
		multiline
		label="Growing multiline input"
		defaultValue="You can type in here and I'll auto-size to match the height. How easy and simple and cool and taking up more space now is that?"
	/>
	<SubmitWrapper>
		<Button alt href="http://hello.sprucebot.com">
			Back to Dashboard
		</Button>
		<Button primary>Save Changes</Button>
	</SubmitWrapper>
</Form>`}</Pre>
				</Container>
				<H1>Lists</H1>
				<Container>
					<SectionHeading>A Friend List</SectionHeading>
					<BotText>
						Lists are very useful for showing guests, teammates, etc.
					</BotText>
					<List>
						<ListItem
							title="Taylor"
							subtitle="Last Visit: Today"
							rightTitle="Owner"
							rightSubtitle="Visits: 7"
							avatar="https://hello.sprucebot.com/avatar.jpg"
						/>
						<ListItem
							online={false}
							title="Ryan"
							subtitle="Last Visit: 10 days ago"
							rightTitle="Owner"
							rightSubtitle="Visits: 7"
							avatar="https://hello.sprucebot.com/avatar.jpg"
						/>
					</List>
					<Pre>{`<List>
	<ListItem
		title="Taylor"
		subtitle="Last Visit: Today"
		rightTitle="Owner"
		rightSubtitle="Visits: 7"
		avatar="https://hello.sprucebot.com/avatar.jpg"
	/>
	<ListItem
		online={false}
		title="Ryan"
		subtitle="Last Visit: 10 days ago"
		rightTitle="Owner"
		rightSubtitle="Visits: 7"
		avatar="https://hello.sprucebot.com/avatar.jpg"
	/>
</List>`}</Pre>

					<SectionHeading>A Flexible List!</SectionHeading>
					<BotText>
						But, lists can do more than that! Actually, a LOT more than that!
					</BotText>
					<List>
						<ListItem>This is the most basic list item.</ListItem>
						<ListItem
							title="Awesome title!"
							subtitle="Fantastic subtitle!"
							rightInput={
								<Button
									remove
									onClick={e => {
										console.log('event:', e)
									}}
								/>
							}
						/>
						<ListItem rightInput={<Switch />}>I can even do switches!</ListItem>
						<ListItem>
							<Input label="An input!" />
						</ListItem>
						<ListItem>
							<Select label="And a select!">
								<option>Nuke 'em Rico</option>
								<option>With pleasure!</option>
							</Select>
						</ListItem>
					</List>
					<Pre>{`<List>
	<ListItem>This is the most basic list item.</ListItem>
	<ListItem
		title="Awesome title!"
		subtitle="Fantastic subtitle!"
		rightInput={
			<Button
				remove
				onClick={e => {
					console.log('event:', e)
				}}
			/>
		}
	/>
	<ListItem rightInput={<Switch />}>I can even do switches!</ListItem>
	<ListItem>
		<Input label="An input!" />
	</ListItem>
	<ListItem>
		<Select label="And a select!">
			<option>Nuke 'em Rico</option>
			<option>With pleasure!</option>
		</Select>
	</ListItem>
</List>`}</Pre>
				</Container>
				<H1>Tabs</H1>
				<Container>
					<Tabs
						onChange={(idx, e) => {
							console.log('tab:', idx, 'event:', e)
						}}
					>
						<TabPane title="First">First Pane</TabPane>
						<TabPane selected title="Second">
							<BotText>Tabs are fantastic! You can use them so easily!</BotText>
						</TabPane>
						<TabPane title="Third">Third Pane</TabPane>
					</Tabs>
					<Pre>{`<Tabs
	onChange={(idx, e) => {
		console.log('tab:', idx, 'event:', e)
	}}
>
	<TabPane title="First">First Pane</TabPane>
	<TabPane selected title="Second">
		<BotText>Tabs are fantastic! You can use them so easily!</BotText>
	</TabPane>
	<TabPane title="Third">Third Pane</TabPane>
</Tabs>`}</Pre>
				</Container>
				<H1>Link Pile</H1>
				<Container>
					<BotText>
						LinkPile's are great for dashboards or control panels. It shrinks
						the margin between buttons to make them look more cohesive.
					</BotText>
					<SectionHeading>Controls</SectionHeading>
					<LinkPile>
						<Button primary>Button 1</Button>
						<Button alt>Button 2</Button>
						<Button secondary>Button 3</Button>
						<Button secondary alt>
							Button 4
						</Button>
					</LinkPile>
					<Pre>{`<LinkPile>
	<Button primary>Button 1</Button>
	<Button alt>Button 2</Button>
	<Button secondary>Button 3</Button>
	<Button secondary alt>
		Button 4
	</Button>
</LinkPile>`}</Pre>
				</Container>
				<H1>Search</H1>
				<Container>
					<Input type="search" placeholder="Search for something" />
					<Pre
					>{`<Input type="search" placeholder="Search for something" />`}</Pre>
				</Container>
				<H1>Pager</H1>
				<Container>
					<BotText>
						The pager is pretty simple. It will track your page (zero based),
						but you'll need to implement `onChange`` to make your API requests.
						Also, don't forget to add `totalPages`.
					</BotText>
					<Pager
						totalPages={5}
						titles={page =>
							['Page 1', 'Custom', 'What the?', 'You know', 'What'][page]}
						onChange={(page, e) => {
							console.log('page:', page, 'event:', e)
						}}
					/>
					<Pre>{`<Pager
	totalPages={5}
	titles={page =>
		['Page 1', 'Custom', 'What the?', 'You know', 'What'][page]}
		onChange={(page, e) => {
			console.log('page:', page, 'event:', e)
		}}
		/>`}</Pre>
				</Container>
				<H1>Stats Slider</H1>
				<Container>
					<SectionHeading>KPI's</SectionHeading>
					<StatsSlider
						stats={[
							{
								dir: 1,
								title: 'Hourly',
								value: '$23.50'
							},
							{
								dir: -1,
								title: 'Services',
								value: 10
							},
							{
								dir: 1,
								title: 'Avg. Ticket',
								value: '$25.23'
							},
							{
								dir: 0,
								title: 'Returns',
								value: 0
							}
						]}
					/>
					<Pre>{`<StatsSlider
	stats={[
		{
			dir: 1,
			title: 'Hourly',
			value: '$23.50'
		},
		{
			dir: -1,
			title: 'Services',
			value: 10
		},
		{
			dir: 1,
			title: 'Avg. Ticket',
			value: '$25.23'
		},
		{
			dir: 0,
			title: 'Returns',
			value: 0
		}
	]}
/>`}</Pre>
				</Container>
				<H1>Button Grid</H1>
				<Container>
					<SectionHeading>Select Your Options</SectionHeading>
					<BotText>
						Set the line-height of .btn_grid .btn to control height of button.
						The text will stay centered.
					</BotText>
					<ButtonGrid>
						<GridButton subtitle="It's good">Option 1</GridButton>
						<GridButton subtitle="It's better!">Option 2</GridButton>
						<GridButton subtitle="Def worth a look" selected>
							Option 3
						</GridButton>
					</ButtonGrid>
					<Pre>{`<ButtonGrid>
	<GridButton subtitle="It's good">Option 1</GridButton>
	<GridButton subtitle="It's better!">Option 2</GridButton>
	<GridButton subtitle="Def worth a look" selected>
		Option 3
	</GridButton>
</ButtonGrid>`}</Pre>
				</Container>
				<H1>Stars</H1>
				<Container>
					<BotText>Please take a moment to rate this rating component.</BotText>
					<Stars
						max={4}
						score={2}
						onChange={(score, e) => {
							console.log('score:', score, 'event:', e)
						}}
					/>
					<Pre>{`<Stars
	max={4}
	score={2}
	onChange={(score, e) => {
		console.log('score:', score, 'event:', e)
	}}
/>`}</Pre>
				</Container>
				<H1>Image Cropper</H1>
				<Container>
					<BotText>
						Our ImageCropper is currently using{' '}
						<a
							onClick={e => e.stopPropagation()}
							href="https://github.com/DominicTobias/react-image-crop"
						>
							react-image-crop
						</a>. Tap the button below and give it a shot.
					</BotText>
					<ImageCropper
						tapToCrop={true}
						src="https://s3.amazonaws.com/sprucebot/ticket.png"
						onSave={img => console.log(img)}
						crop={{ x: 25, y: 25, width: 50, height: 50 }}
					/>
					<Pre>{`<ImageCropper
	tapToCrop={true}
	src="https://s3.amazonaws.com/sprucebot/ticket.png"
	onSave={img => console.log(img)}
	crop={{ x: 25, y: 25, width: 50, height: 50 }}
/>`}</Pre>
				</Container>
				<H1>Callouts</H1>
				<Container>
					<BotText>
						If you have some information you need to call out (think modal
						dialog), you can use the {`<Callout />`} component.
					</BotText>
					<Callout on={calloutOn}>
						<H2>Some important sub-form</H2>
						<BotText>
							Things like nested forms or multi-step processes benefit greatly
							from a callout. It lets you see where you were, but brings focus
							to what you're about to do.
						</BotText>
						<List>
							<ListItem
								rightInput={
									<Switch
										onChange={calloutOn => this.setState({ calloutOn })}
									/>
								}
							>
								Try the call out! ->
							</ListItem>
						</List>
					</Callout>
					<Pre>{`<Callout on={calloutOn}>
	<H2>Call this out</H2>
	<BotText>
		Things like nested forms or multi-step processes benefit greatly
		from a callout. It lets you see where you were, but brings focus
		to what you're about to do.
	</BotText>
	<List>
		<ListItem
			rightInput={
				<Switch
					onChange={calloutOn => this.setState({ calloutOn })}
				/>
			}
		>
			Try the call out! ->
		</ListItem>
	</List>
</Callout>`}</Pre>
				</Container>
				<H1>The Feed</H1>
				<Container>
					<BotText>
						The Feed is used by nearly every Skill to visualize events and
						facilitate conversation around those events.
					</BotText>
					<Feed
						data={[
							{
								createdAt: moment(NOW).subtract(34, 'hour'),
								id: 'bbc55a55-2e13-4322-a2c5-0fec1abc79be',
								message:
									'Randy C. has arrived! 💥 This <FeedItem /> has bigAvatar set to true.',
								user: demoGuest,
								bigAvatar: true,
								attachments: [
									{
										title: 'Membership level',
										value: 'Gold'
									},
									{
										title: 'Total Points',
										value: 1253
									}
								]
							},
							{
								createdAt: moment(NOW).subtract(25, 'hour'),
								id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
								message: 'Ryan J. has arrived! 💥 bigAvatar is not true.',
								user: demoGuest,
								attachments: [
									{
										title: 'Membership level',
										value: 'Turquoise'
									},
									{
										title: 'Total Points',
										value: 2393
									},
									{
										title: 'Favorite Color',
										value: 'blue'
									},
									{
										title: 'Note',
										fullWidth: true,
										value:
											'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed dolor ac felis scelerisque hendrerit ac et dui. Sed vel tortor vitae magna luctus aliquam sit amet ut eros. Duis et viverra nulla, et mattis nunc." - Taylor R. Sept. 3rd'
									}
								]
							},
							{
								createdAt: NOW,
								id: 'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee',
								message:
									'Shane M. has arrived! 💥 We also added more to this message to demo long alerts.',
								user: demoGuest,
								attachments: [
									{
										title: 'Membership level',
										value: 'Platinum'
									},
									{
										title: 'Total Points',
										value: 5302
									},
									{
										title: 'Visits',
										value: 5
									},
									{
										title: 'Idle chit-chat',
										value: 'A little'
									}
								]
							}
						]}
					/>
					<Pre>{`<Feed data={[
	{
		createdAt: moment(NOW).subtract(34, 'hour'),
		id: 'bbc55a55-2e13-4322-a2c5-0fec1abc79be',
		message:
			'Randy C. has arrived! 💥 This <FeedItem /> has bigAvatar set to true.',
		user: demoGuest,
		bigAvatar: true,
		attachments: [
			{
				title: 'Membership level',
				value: 'Gold'
			},
			{
				title: 'Total Points',
				value: 1253
			}
		]
	},
	{
		createdAt: moment(NOW).subtract(25, 'hour'),
		id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
		message: 'Ryan J. has arrived! 💥 bigAvatar is not true.',
		user: demoGuest,
		attachments: [
			{
				title: 'Membership level',
				value: 'Turquoise'
			},
			{
				title: 'Total Points',
				value: 2393
			},
			{
				title: 'Favorite Color',
				value: 'blue'
			},
			{
				title: 'Note',
				fullWidth: true,
				value:
					'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed dolor ac felis scelerisque hendrerit ac et dui. Sed vel tortor vitae magna luctus aliquam sit amet ut eros. Duis et viverra nulla, et mattis nunc." - Taylor R. Sept. 3rd'
			}
		]
	},
	{
		createdAt: NOW,
		id: 'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee',
		message:
			'Shane M. has arrived! 💥 We also added more to this message to demo long alerts.',
		user: demoGuest,
		attachments: [
			{
				title: 'Membership level',
				value: 'Platinum'
			},
			{
				title: 'Total Points',
				value: 5302
			},
			{
				title: 'Visits',
				value: 5
			},
			{
				title: 'Idle chit-chat',
				value: 'A little'
			}
		]
	}
]} />`}</Pre>
				</Container>
				<H1>Training Guide</H1>
				<Container>
					<TrainingGuide
						onComplete={() => alert('Done!')}
						steps={[
							'This is a training guide.',
							'It "guides" you through many steps.',
							'One at a time',
							'and the last one shows a done.'
						]}
					/>
				</Container>
				<H1>More Coming Soon</H1>
				<Container>Coming soon...</Container>
			</div>
		)
	}
}
