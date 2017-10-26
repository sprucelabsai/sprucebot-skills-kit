import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe('p tag', () => {
	const { Paragraph } = require('./Typeography')

	test('it renders', () => {
		const tree = renderer.create(<Paragraph />).toJSON()
		expect(tree).toMatchSnapshot()
		expect(tree).toHaveStyleRule('font-size', '1em')
	})
})

describe('h1 tag', () => {
	const { H1 } = require('./Typeography')
	test('it renders', () => {
		const tree = renderer.create(<H1 />).toJSON()
		expect(tree).toMatchSnapshot()
		expect(tree).toHaveStyleRule('font-size', '1.5em')
	})
})
