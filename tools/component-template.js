'use strict'

module.exports = ({ componentName }) => {
  return `
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
export default class ${componentName} extends PureComponent {
  static propTypes = {}
  render() {
    return <div>${componentName}</div>
  }
}
`.trim()
}
