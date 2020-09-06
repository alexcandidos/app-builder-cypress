import ClayDatePicker from '@clayui/date-picker'
import ClayForm, { ClayDualListBox, ClayInput, ClaySelectWithOption, ClayToggle } from '@clayui/form'
import React, { useState } from 'react'

import LocalizedInput from '../LocalizedInput'
import MultiInput from '../MultiSelect'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const moveBoxesOptions = [
  [
    {
      label: 'Discord',
      value: 'discord'
    },
    {
      label: 'Evernote',
      value: 'evernote'
    },
    {
      label: 'Facebook',
      value: 'facebook'
    },
    {
      label: 'LinkedIn',
      value: 'linkedin'
    }
  ],
  [
    {
      label: 'Reddit',
      value: 'reddit'
    },
    {
      label: 'Slack',
      value: 'slack'
    },
    {
      label: 'Twitter',
      value: 'twitter'
    }
  ]
]

const InputGroup = ({ children, label }) => (
  <ClayForm.Group>
    <label>{label}</label>
    {children}
  </ClayForm.Group>
)

function Input ({ label, ...rest }) {
  return (
    <InputGroup label={label}>
      <ClayInput {...rest} />
    </InputGroup>
  )
}

const ClayDatePickerWithState = ({ label, ...props }) => {
  const [value, setValue] = React.useState('')

  return (
    <InputGroup label={label}>
      <ClayDatePicker
        {...props}
        onValueChange={setValue}
        spritemap={spritemap}
        value={value}
      />
    </InputGroup>
  )
}

const Select = ({ label, options = [], ...props }) => {
  return (
    <InputGroup label={label}>
      <ClaySelectWithOption
        {...props}
        aria-label="Select Label"
        options={options}></ClaySelectWithOption>
    </InputGroup>
  )
}

const MultiInputSelection = ({ label, ...props }) => {
  return (
    <InputGroup label={label}>
      <MultiInput {...props} />
    </InputGroup>
  )
}

const Toggle = (props) => (
  <InputGroup>
    <ClayToggle {...props} />
  </InputGroup>
)

const DualBox = ({ options = moveBoxesOptions, left, right, onChange = () => {} }) => {
  const [items, setItems] = useState(options)
  const [leftSelected, setLeftSelected] = useState([])
  const [rightSelected, setRightSelected] = useState([])

  const onItemChange = (values) => {
    setItems(values)
    onChange(values)
  }

  return (
    <ClayDualListBox
      items={items}
      left={{
        label: 'In Use',
        onSelectChange: setLeftSelected,
        selected: leftSelected,
        ...left
      }}
      onItemsChange={onItemChange}
      right={{
        label: 'Available',
        onSelectChange: setRightSelected,
        selected: rightSelected,
        ...right
      }}
      size={8}
      spritemap={spritemap}
    />
  )
}

export {
  Input, LocalizedInput, Select, ClayDatePickerWithState, DualBox, MultiInputSelection, Toggle
}
