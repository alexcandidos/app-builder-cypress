import { fieldTypes } from '@app-builder-cypress/common'
import Button from '@clayui/button'
import { Col, Row } from '@clayui/layout'
import ClayPanel from '@clayui/panel'
import React, { useContext, useEffect, useState } from 'react'

import AppContext, { actions as Actions } from '../../../AppContext'
import { LocalizedInput, MultiInputSelection, Select, Toggle } from '../../../components/Input'
import Modal from '../../../components/Modal'
import Table from '../../../components/Table'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ObjectModule = () => {
  const [{ scenario: { formView } }, dispatch] = useContext(AppContext)
  const [initialState, setInitialState] = useState()
  const [editIndex, setEditIndex] = useState()
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState(formView)

  const renderChecked = (value) => value ? 'X' : '-'
  const renderLocalized = (value) => typeof value === 'string' ? value : JSON.stringify(value)

  const columns = [
    { key: 'type', value: 'Field Type' },
    { key: 'label', render: renderLocalized, value: 'Label' },
    { key: 'predefinedValue', render: renderLocalized, value: 'Predefined Value' },
    { key: 'placeholder', render: renderLocalized, value: 'Placeholder' },
    { key: 'repeatable', render: renderChecked, value: 'Repeatable' },
    { key: 'inline', render: renderChecked, value: 'Inline' },
    { key: 'multiple', render: renderChecked, value: 'Multiple' },
    { key: 'showAsSwitcher', render: renderChecked, value: 'Show as Switcher' },
    { key: 'showLabel', render: renderChecked, value: 'Show Label' }
  ]

  const onChange = (name, value) => {
    const newState = {
      ...state,
      [name]: value
    }
    setState(newState)
    dispatch({ payload: newState, type: Actions.SYNC_FORM_VIEW })
  }

  const actions = [{
    action: ({ id, originalItem }) => {
      setInitialState(originalItem)
      setVisible(true)
      setEditIndex(id)
    },
    name: 'Edit'
  },
  {
    name: 'divider'
  },
  {
    action: ({ originalItem }) => {
      dispatch({
        payload: {
          ...formView,
          fieldTypes: [...formView.fieldTypes, originalItem]
        },
        type: Actions.SYNC_FORM_VIEW
      })
    },
    name: 'Duplicate'
  }, {
    action: (item) => {
      dispatch({
        payload: {
          ...formView,
          fieldTypes: formView.fieldTypes.filter((_, index) => index !== item.id)
        },
        type: Actions.SYNC_FORM_VIEW
      })
    },
    name: 'Remove'
  }]

  const fieldTypes = formView.fieldTypes
    .map((value, id) => ({ id, ...value.config, ...value, originalItem: value }))

  return (
    <>
      <ClayPanel
        displayTitle={'Form View'}
        displayType="unstyled"
        spritemap={spritemap}
      >
        <ClayPanel.Body>
          <LocalizedInput
            name="name"
            defaultValue={state.name}
            onChange={onChange}
            label="Name"
          />

          <Table
            actions={actions}
            columns={columns}
            items={fieldTypes} />

        </ClayPanel.Body>
      </ClayPanel>
      <FieldModal
        editIndex={editIndex}
        visible={visible}
        setVisible={() => {
          setVisible(!visible)
          setEditIndex()
        }}
        initialState={initialState}
      />
    </>
  )
}

const FieldModal = ({
  editIndex, initialState, setVisible, visible
}) => {
  const [{ scenario: { formView } }, dispatch] = useContext(AppContext)
  const [state, setState] = useState({
    config: {
      inline: true,
      multiple: false,
      repeatable: false,
      required: false,
      showAsSwitcher: true,
      showLabel: false
    },
    type: 'text'
  })

  useEffect(() => {
    if (initialState) {
      setState(initialState)
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
    console.log(fieldTypes)
    const name = fieldTypes.find(({ type }) => type === state.type).name
    const newState = {
      ...state,
      name
    }
    if (initialState) {
      newFieldTypes = formView.fieldTypes.map((fieldType, index) => {
        if (index === editIndex) {
          return newState
        }
        return fieldType
      })
    } else {
      newFieldTypes = newState
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
    <>
      <Button onClick={setVisible}>Add Field</Button>
      <Modal title="Create Form" visible={visible} setVisible={setVisible} onSubmit={onSubmit}>
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
    </>
  )
}

export default ObjectModule
