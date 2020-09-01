import ClayDatePicker from '@clayui/date-picker'
import ClayForm, { ClayInput } from '@clayui/form'
import ClayPanel from '@clayui/panel'
import React from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

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

const ObjectModule = ({ form, onChange }) => {
  return (
    <ClayPanel
      displayTitle={'Object / Portal'}
      displayType="unstyled"
      spritemap={spritemap}
    >
      <ClayPanel.Body>
        <ClayForm.Group>
          <label>{'Object Name'}</label>
          <ClayInput
            onChange={onChange}
            name="object.name"
            placeholder="Name"
          />
        </ClayForm.Group>
        <ClayForm.Group>
          <label>{'Country'}</label>
          <ClayInput
            onChange={onChange}
            placeholder="Country"
          />
        </ClayForm.Group>

        <ClayForm.Group>
          <label>{'Date'}</label>
          <ClayDatePickerWithState />
        </ClayForm.Group>

        <ClayForm.Group>
          <label>{'State'}</label>
          <select
            className="form-control"
            onChange={onChange}
          >
            <option disabled selected>
              {'-- select an option --'}
            </option>
            <option>{'Happy'}</option>
            <option>{'Mad'}</option>
            <option>{'Sad'}</option>
          </select>
        </ClayForm.Group>
      </ClayPanel.Body>
    </ClayPanel>
  )
}

export default ObjectModule
