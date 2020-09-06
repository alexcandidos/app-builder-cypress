import React, { useContext, useState } from 'react'

import { SYNC_TABLE_VIEW } from '../../../actions'
import AppContext from '../../../AppContext'
import { DualBox, LocalizedInput } from '../../../components/Input'

export default function App () {
  const [{ scenario: { formView: { fieldTypes }, tableView } }, dispatch] = useContext(AppContext)
  const [state, setState] = useState(tableView)

  const onChange = (name, value) => {
    const newState = {
      ...state,
      [name]: value
    }
    setState(newState)
    dispatch({ payload: newState, type: SYNC_TABLE_VIEW })
  }

  const selectedFieldTypes = state.selectedFields
  const availableFieldTypes = fieldTypes
    .map(({ label }) => ({ label, value: label }))
    .filter(field => !selectedFieldTypes.some(b => b.label === field.label))

  return (
    <div>
      <LocalizedInput
        defaultValue={state.name}
        name="name"
        onChange={onChange}
        label="Name"
      />
      <DualBox
        options={[availableFieldTypes, selectedFieldTypes]}
        onChange={(values) => onChange('selectedFields', values[1])}
        left={{ label: 'Available Fields' }}
        right={{ label: 'Selected Fields' }}
      />
    </div>
  )
}
