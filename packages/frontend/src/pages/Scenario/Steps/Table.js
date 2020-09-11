import React, { useContext, useEffect, useState } from 'react'

import { SYNC_TABLE_VIEW } from '../../../actions'
import AppContext from '../../../AppContext'
import { DualBox, LocalizedInput } from '../../../components/Input'

export default function App () {
  const [
    {
      scenario:
      {
        formView: { fieldTypes },
        settings: { defaultLanguageId },
        tableView
      }
    }, dispatch] = useContext(AppContext)
  const [state, setState] = useState(tableView)
  const [dualBox, setDualBox] = useState([[], []])

  const onChange = (name, value) => {
    const newState = {
      ...state,
      [name]: value
    }
    setState(newState)
    dispatch({ payload: newState, type: SYNC_TABLE_VIEW })
  }

  useEffect(() => {
    const selectedFieldTypes = state.selectedFields
    const availableFieldTypes = fieldTypes
      .map(({ config: { label: { [defaultLanguageId]: label } } }) => ({ label, value: label }))
      .filter(field => !selectedFieldTypes.some(b => b.label === field.label))

    setDualBox([availableFieldTypes, selectedFieldTypes])
  }, [state, defaultLanguageId, fieldTypes])

  return (
    <div>
      <LocalizedInput
        defaultValue={tableView.name}
        name="name"
        onChange={onChange}
        label="Name"
      />
      <DualBox
        options={dualBox}
        onChange={(values) => onChange('selectedFields', values[1])}
        left={{ label: 'Available Fields' }}
        right={{ label: 'Selected Fields' }}
      />
    </div>
  )
}
