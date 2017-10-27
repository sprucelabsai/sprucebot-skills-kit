import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Button from './Button'

describe('Button Component', () => {
	const itRendersTree = tree => expect(renderer.create(tree)).toMatchSnapshot()

	test('it renders', () => {
		itRendersTree(<Button />)
	})

	test('it renders children', () => {
		itRendersTree(<Button>Button Children</Button>)
	})

	test('it renders html tagName', () => {
		itRendersTree(<Button tag="span" />)
	})

	test('it renders busy', () => {
		itRendersTree(<Button busy />)
	})

	test('it renders disabled', () => {
		itRendersTree(<Button disabled />)
	})

	test('it renders primary', () => {
		itRendersTree(<Button primary />)
	})

	test('it renders secondary', () => {
		itRendersTree(<Button secondary />)
	})

	test('it renders alt', () => {
		itRendersTree(<Button alt />)
	})

	test('it renders link', () => {
		itRendersTree(<Button link />)
	})

	test('it renders caution', () => {
		itRendersTree(<Button caution />)
	})

	test('it renders className', () => {
		itRendersTree(<Button className="test classnames" />)
	})

	test('it renders pimary && secondary', () => {
		itRendersTree(<Button primary secondary />)
	})

	test('it renders primary && alt', () => {
		itRendersTree(<Button primary alt />)
	})
})
