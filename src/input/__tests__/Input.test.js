import React from 'react'
import Input from '../src/Input'
import renderer from 'react-test-renderer'

test('sandbox', () => {
  const component = renderer.create(<Input />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
