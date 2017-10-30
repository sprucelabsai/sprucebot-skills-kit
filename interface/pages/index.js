import React from 'react'
import Link from 'next/link'
import Sprucebot from 'react-sprucebot'

import Page from '../containers/Page'
import Styleguide from '../containers/Styleguide'
import { components } from 'react-sprucebot'
const { Container, H1, H2, H3, BotText, Pre, Card, Paragraph } = components

const DeveloperPage = props => (
	<div>
		<Container>
			<H1>Hello Sprucebot Skills Developer!</H1>
			<BotText>I come pre-configured with a few different pages:</BotText>
			<ul>
				<li>
					<Link href="/marketing">
						<a>Marketing Page</a>
					</Link>
				</li>
				<li>
					<Link href="/owner">
						<a>Owner Page</a>
					</Link>
				</li>
				<li>
					<Link href="/teammate">
						<a>Teammate</a>
					</Link>
				</li>
				<li>
					<Link href="/guest">
						<a>Guest</a>
					</Link>
				</li>
			</ul>
			<H2>Getting Started</H2>
			{codeExample(props)}
		</Container>
		<H2>🌲 🤖</H2>
		<Styleguide />
	</div>
)

export default Page(DeveloperPage)

function codeExample({ actions, ...props }) {
	return (
		<Card>
			<H3>interfaces/pages/index.js</H3>
			<Pre>
				{`
import React from 'react'
import Page from 'sprucebot/Page'
import { Container } from 'react-sprucebot'

const MyCustomPage = props => (
  <Container>
    Add some custom jsx here
  </Container>
)

export default Page(MyCustomPage)
	`}
			</Pre>
			<H3>Available Props</H3>
			<Paragraph>
				Try adding query string ?userId=1 to the url and watch how these props
				change
			</Paragraph>
			<ul>
				{Object.keys(props).map(key => (
					<Pre key={key}>
						{key} :{' '}
						{typeof props[key] === 'function'
							? 'function()'
							: JSON.stringify(props[key])}
					</Pre>
				))}
			</ul>

			<H3>Built-in Actions</H3>
			<Paragraph>
				All client side requests are routed through the Skill's server API. The
				kit comes with these basics since every skill needs them. To start
				creating your own actions that makes calls to your Skill's API, [read
				the guide]().
			</Paragraph>
			<ul>
				{Object.keys(actions).map(key => (
					<Pre key={key}>{key} : function()</Pre>
				))}
			</ul>
		</Card>
	)
}
