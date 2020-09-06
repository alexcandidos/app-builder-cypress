import ClayMultiSelect from '@clayui/multi-select'
import React, { useState } from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const MultiSelect = () => {
  const [value, setValue] = useState('')
  const [items, setItems] = useState([
    {
      label: 'one',
      value: '1'
    }
  ])

  return (
    <ClayMultiSelect
      inputValue={value}
      items={items}
      onChange={setValue}
      onItemsChange={setItems}
      spritemap={spritemap}
    />
  )
}

export default MultiSelect
