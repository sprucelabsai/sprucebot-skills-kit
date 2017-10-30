import React, { Component } from 'react'
import {
	Container,
	BotText,
	Loader,
	Card,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Paragraph as P,
	A,
	Avatar,
	Button,
	Switch
} from 'react-sprucebot'

export default class Styleguide extends Component {
	render() {
		return (
			<Container>
				<Card>
					<H1>Headings</H1>
					<H1>I'm an H1</H1>
					<H2>I'm an H2</H2>
					<H3>I'm an H3</H3>
					<H4>I'm an H4</H4>
					<H5>I'm an H5</H5>
					<H6>I'm an H6</H6>
					<P>I'm a paragraph of some text</P>
					<A href="#">I'm an anchor tag</A>
				</Card>
				<Card>
					<H1>Sub Headings</H1>
					<H1 header>Header</H1>
					<H2 subheader>Sub Headings</H2>
				</Card>
				<Card>
					<H1>Top Avatar</H1>
					<Avatar image="https://hello.sprucebot.com/avatar.jpg" />
				</Card>
				<Card>
					<H1>Bot Text</H1>
					<BotText>I'm Some bot text</BotText>
				</Card>
				<Card>
					<H1>Buttons</H1>
					<Button className="btn__submit">I'm a button</Button>
					<Button primary>I'm a primary button</Button>
					<Button primary disabled>
						I'm a primary disabled button
					</Button>
					<Button alt>I'm an alt button</Button>
					<Button alt disabled>
						I'm an alt disabled button
					</Button>
					<Button secondary>I'm a secondary button</Button>
					<Button secondary alt disabled>
						I'm a secondary disabled alt button
					</Button>
					<Button caution>I'm a caution button</Button>
				</Card>
				<Card>
					<H1>Fine Print</H1>
					<P fine>I'm some fine print</P>
				</Card>
				<Card>
					<H1>Button Links</H1>
					<Button link>I'm a button link</Button>
				</Card>
				<Card>
					<H1>Progress</H1>
					<Button busy />
					<Loader />
				</Card>
				<Card>
					<H1>Switches</H1>
					<Switch>
						<Button />
					</Switch>
					<Switch on>
						<Button />
					</Switch>
					<P>
						Switch button. Note: adding the 'on' class will animate it on,
						removing it will animate it off
					</P>
				</Card>
				<Card>
					<H1>Form Headings</H1>
					<P>Use this for headings or large titles above form elements</P>
				</Card>
			</Container>
		)
	}
}
