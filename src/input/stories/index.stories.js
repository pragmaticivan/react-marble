import { storiesOf } from '@storybook/react'
import React from 'react'
import { Input } from '../../input'

storiesOf('Input', module)
  .add('Input text', () => (
    <div>
      <Input
        classes={'form-control'}
        readonly={false}
        placeholder={'Name'}
        fieldIndex={0}
        value={'Editable'}
      />
      <Input
        classes={'form-control'}
        readonly={true}
        placeholder={'Name'}
        value={'Read only'}
      />
    </div>
  ))
  .add('Input password', () => (
    <div>
      <Input isTogglePassword />
    </div>
  ))
