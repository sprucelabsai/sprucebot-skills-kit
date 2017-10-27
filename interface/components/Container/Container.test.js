import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Container from './Container'

describe('Container Component', () => {
	test('it renders', () => {
		const tree = renderer
			.create(<Container>Container children</Container>)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
