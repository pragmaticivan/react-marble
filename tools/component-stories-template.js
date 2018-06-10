'use strict'

function storyTemplate(componentName) {
  return `
  .add('${componentName}', () => (
    <${componentName}>${componentName}</${componentName}>
  ))`
}

module.exports = ({ packageName, componentNames = [] }) => {
  return `
import { storiesOf } from '@storybook/react'
import React from 'react'
import { ${componentNames.join(', ')} } from '../../${packageName}'
storiesOf('${packageName}', module)${componentNames
    .map(componentName => storyTemplate(componentName))
    .join('')}
`.trim()
}
