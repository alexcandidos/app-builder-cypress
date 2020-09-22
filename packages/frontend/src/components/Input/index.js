import ClayButton from '@clayui/button'
import ClayDatePicker from '@clayui/date-picker'
import ClayForm, {
  ClayDualListBox,
  ClayInput,
  ClaySelectWithOption,
  ClayToggle
} from '@clayui/form'
import ClayIcon from '@clayui/icon'
import { Col, Row } from '@clayui/layout'
import React, { useEffect, useState } from 'react'

import LocalizedInput from '../LocalizedInput'
import MultiInput from '../MultiSelect'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

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
        options={options} />
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

const DualBox = ({ options, left, right, onChange = () => {} }) => {
  const [items, setItems] = useState([[], []])
  const [leftSelected, setLeftSelected] = useState([])
  const [rightSelected, setRightSelected] = useState([])

  useEffect(() => {
    setItems(options)
  }, [options])

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

const MultiLanguageOptions = ({ defaultValue = [{}], onChange, name, label }) => {
  const [options, setOptions] = useState(defaultValue)

  const onAddOption = () => {
    const newOptions = [...options, {}]
    setOptions(newOptions)
    syncOnChange(newOptions)
  }

  const onRemoveOption = (index) => {
    const newOptions = options.filter((_opt, optionIndex) => optionIndex !== index)
    setOptions(newOptions)
    syncOnChange(newOptions)
  }

  const onOptionChange = (value, index) => {
    const newOptions = options.map((option, optionIndex) => {
      if (optionIndex === index) {
        return value
      }
      return option
    })
    setOptions(newOptions)
    syncOnChange(newOptions)
  }

  const syncOnChange = (newOptions) => {
    onChange(name, newOptions)
  }

  return (
    <div>
      {options.map((value, index) => (
        <Row key={index}>
          <Col lg={10}>
            <LocalizedInput
              name={name}
              onChange={(_, value) => onOptionChange(value, index)}
              label={`${label} ${index + 1}`}
              defaultValue={value}
            />
          </Col>
          <Col>
            <ClayButton.Group className="mt-4">
              {index !== 0 &&
              <ClayButton
                onClick={() => onRemoveOption(index)}
                displayType="danger"
                className="mr-2">
                <ClayIcon spritemap={spritemap} symbol="times" />
              </ClayButton>}
              <ClayButton onClick={onAddOption}>
                <ClayIcon spritemap={spritemap} symbol="plus" />
              </ClayButton>
            </ClayButton.Group>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export {
  Input, LocalizedInput, Select, ClayDatePickerWithState, DualBox, MultiInputSelection, Toggle, MultiLanguageOptions
}
