import React from 'react'
import { render } from 'enzyme'

import Index from './index'

test('renders page with styleguide', () => {
	const tree = render(<Index />)

	expect(tree).toMatchSnapshot()
})
