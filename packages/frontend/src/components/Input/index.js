import ClayDatePicker from '@clayui/date-picker'
import ClayForm, { ClayInput } from '@clayui/form'
import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

import LocalizedInput from '../LocalizedInput'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

function Input ({ name, ...rest }) {
  const inputRef = useRef(null)
  const { defaultValue, fieldName, registerField } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])
  return <ClayInput ref={inputRef} defaultValue={defaultValue} {...rest} />
}

const ClayDatePickerWithState = (props) => {
  const [value, setValue] = React.useState('')

  return (
    <ClayDatePicker
      {...props}
      onValueChange={setValue}
      spritemap={spritemap}
      value={value}
    />
  )
}

const FormInput = (props) => {
  const { label, type = 'text' } = props
  return (
    <div>
      <ClayForm.Group>
        {type !== 'localized' && <label>{label}</label>}
        {type === 'text' && <Input {...props}/>}
        {type === 'localized' && <LocalizedInput {...props} />}
        {type === 'date' && <ClayDatePickerWithState />}
      </ClayForm.Group>
    </div>
  )
}

export default FormInput
