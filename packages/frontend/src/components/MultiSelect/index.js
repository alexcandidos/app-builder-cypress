import ClayMultiSelect from '@clayui/multi-select'
import { useField } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const MultiSelect = () => {
  const { defaultValue, fieldName, registerField } = useField('myInput')
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [items, setItems] = useState([
    {
      label: 'one',
      value: '1'
    }
  ])

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])

  return (
    <ClayMultiSelect
      ref={inputRef}
      inputName="myInput"
      inputValue={value}
      items={items}
      onChange={setValue}
      onItemsChange={setItems}
      spritemap={spritemap}
    />
  )
}

export default MultiSelect
