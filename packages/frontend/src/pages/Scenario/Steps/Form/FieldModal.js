import { fieldTypes } from '@app-builder-cypress/common'
import { Col, Row } from '@clayui/layout'
import React, { useContext, useEffect, useState } from 'react'

import AppContext, { actions as Actions } from '../../../../AppContext'
import { LocalizedInput, MultiInputSelection, Select, Toggle } from '../../../../components/Input'
import Modal from '../../../../components/Modal'

const FieldModal = ({
  editIndex, initialState, setVisible, visible
}) => {
  const [{ scenario: { formView } }, dispatch] = useContext(AppContext)
  const initialConfig = {
    config: {
      repeatable: false,
      required: false,
      showLabel: true
    },
    type: 'text'
  }
  const [state, setState] = useState(initialConfig)

  useEffect(() => {
    if (initialState) {
      setState(initialState)
    } else {
      setState(initialConfig)
    }
  }, [initialState])

  const onChange = (name, value) => {
    let newState
    if (name === 'type') {
      newState = {
        ...state,
        [name]: value
      }
    } else {
      newState = {
        ...state,
        config: {
          ...state.config,
          [name]: value
        }
      }
    }
    setState(newState)
  }

  const onOptionChange = ({ target: { name, value } }) => {
    onChange(name, value)
  }

  const onToggle = (name) => {
    onChange(name, !state[name])
  }

  const onSubmit = async () => {
    let newFieldTypes
    const name = fieldTypes.find(({ type }) => type === state.type).name
    const newState = {
      ...state,
      name
    }
    if (editIndex >= 0) {
      newFieldTypes = formView.fieldTypes.map((fieldType, index) => {
        if (index === editIndex) {
          return newState
        }
        return fieldType
      })
    } else {
      newFieldTypes = [...formView.fieldTypes, newState]
    }

    dispatch({
      payload: {
        ...formView,
        fieldTypes: newFieldTypes
      },
      type: Actions.SYNC_FORM_VIEW
    })
  }

  const fieldTypeOptions = fieldTypes
    .map(({ name: label, options, type: value }) => ({ label, options, value }))

  const { options } = fieldTypeOptions.find(({ value }) => value === state.type)

  return (
    <Modal
      title={`${editIndex !== undefined ? 'Update' : 'Create'} Field Type`}
      visible={visible}
      setVisible={setVisible}
      onSubmit={onSubmit}
    >
      <Select
        label="Field Type"
        onChange={onOptionChange}
        defaultValue={state.type}
        name="type"
        options={fieldTypeOptions}
      />
      <LocalizedInput
        name="label"
        onChange={onChange}
        defaultValue={state.config.label}
        label="Label"
      />
      <LocalizedInput
        name="predefinedValue"
        onChange={onChange}
        defaultValue={state.config.predefinedValue}
        label="Predefined Value"
      />
      <LocalizedInput
        name="placeholder"
        onChange={onChange}
        defaultValue={state.config.placeholder}
        label="Placeholder"
      />
      <b>Options</b>
      <Row className="mt-4">
        {options
          .filter(({ type }) => type === 'boolean')
          .map(({ label, name }) => (
            <Col key={name}>
              <Toggle
                label={label}
                onToggle={() => onToggle(name)}
                toggled={state[name]} />
            </Col>
          ))}
      </Row>
      {['radio', 'select', 'checkbox_multiple'].includes(state.type) &&
            <MultiInputSelection label="Options" />}
    </Modal>
  )
}

export default FieldModal
