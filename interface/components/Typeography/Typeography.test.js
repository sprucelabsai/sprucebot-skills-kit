import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('p tag', () => {
	const { Paragraph } = require('./Typeography')

	test('it renders', () => {
		const tree = renderer.create(<Paragraph />).toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('it fine prints', () => {
		const tree = renderer.create(<Paragraph fine />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})

describe('h1 tag', () => {
	const { H1, H2 } = require('./Typeography')
	test('it renders', () => {
		const tree = renderer.create(<H1 />).toJSON()
		expect(tree).toMatchSnapshot()
	})

	test('it renders header and subheader', () => {
		const tree = renderer
			.create(
				<div>
					<H1 header />
					<H2 subheader />
				</div>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
