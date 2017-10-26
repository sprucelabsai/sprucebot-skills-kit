import React from 'react'
import Link from 'next/link'
import Page from '../containers/Page'
import Styleguide from '../containers/Styleguide'

import Container from '../components/Container/Container'

const DeveloperPage = ({ userAgent, getState }) => (
	<div>
		<Container>
			<h1>Hello Sprucebot Skills Developer!</h1>
			<h2>I come pre-configured with a few different pages:</h2>
			<ul>
				<li>
					<Link href="/marketing">Marketing Page</Link>
				</li>
				<li>
					<Link href="/owner">Owner Page</Link>
				</li>
			</ul>
			<h2>I also come with some handy props!</h2>
			<ul>
				<li>userAgent: {userAgent}</li>
				<li>user: {getState().user}</li>
			</ul>
		</Container>
		<h2>🌲 🤖</h2>
		<Styleguide />
	</div>
)

export default Page(DeveloperPage)
