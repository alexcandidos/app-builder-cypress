import Button from '@clayui/button'
import { Col, Row } from '@clayui/layout'
import ClayPanel from '@clayui/panel'
import React, { useContext, useState } from 'react'

import AppContext, { actions } from '../../../AppContext'
import { LocalizedInput, MultiInputSelection, Select, Toggle } from '../../../components/Input'
import Modal from '../../../components/Modal'
import Table from '../../../components/Table'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const fieldTypes = [
  {
    label: 'Text',
    value: 'text'
  },
  {
    label: 'Select from List',
    value: 'select'
  },
  {
    label: 'Single Selection',
    value: 'radio'
  },
  {
    label: 'Multiple Selection',
    value: 'checkbox_multiple'
  },
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Numeric',
    value: 'numeric'
  },
  { label: 'Upload', value: 'document_library' }
]

const ObjectModule = () => {
  const [visible, setVisible] = useState(false)
  const [initialState, setInitialState] = useState()
  const [{ scenario: { formView: { fieldTypes: list } } }, dispatch] = useContext(AppContext)
  const fieldTypes = list.map((value, id) => ({ id, ...value }))

  const renderChecked = (value) => value ? 'X' : '-'
  const renderLocalized = (value) => typeof value === 'string' ? value : JSON.stringify(value)

  const columns = [
    { key: 'label', render: renderLocalized, value: 'Label' },
    { key: 'fieldType', value: 'Field Type' },
    { key: 'predefinedValue', render: renderLocalized, value: 'Predefined Value' },
    { key: 'placeholder', render: renderLocalized, value: 'Placeholder' },
    { key: 'repeatable', render: renderChecked, value: 'Repeatable' },
    { key: 'inline', render: renderChecked, value: 'Inline' },
    { key: 'multiple', render: renderChecked, value: 'Multiple' },
    { key: 'showAsSwitcher', render: renderChecked, value: 'Show as Switcher' },
    { key: 'showLabel', render: renderChecked, value: 'Show Label' }
  ]

  const actions = [{
    action: (item) => {
      setInitialState(item)
      setVisible(true)
    },
    name: 'Edit'
  }]

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
            label="Name"
            type="localized"
          />

          <Table actions={actions} columns={columns} items={fieldTypes} />

        </ClayPanel.Body>
      </ClayPanel>
      <FieldModal
        visible={visible}
        setVisible={setVisible}
        initialState={initialState}
      />
    </>
  )
}

const FieldModal = ({ setVisible, visible }) => {
  const [, dispatch] = useContext(AppContext)
  const [state, setState] = useState({
    fieldType: 'text',
    inline: true,
    multiple: false,
    repeatable: false,
    required: false,
    showAsSwitcher: true,
    showLabel: false
  })

  const onChange = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const onOptionChange = ({ target: { name, value } }) => {
    onChange(name, value)
  }

  const onToggle = (name) => {
    setState({
      ...state,
      [name]: !state[name]
    })
  }

  const onSubmit = async () => {
    dispatch({
      payload: state,
      type: actions.ADD_FIELD_TYPE
    })
  }

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Add Field</Button>
      <Modal title="Create Form" visible={visible} setVisible={setVisible} onSubmit={onSubmit}>
        <Select label="Field Type" onChange={onOptionChange} name="fieldType" options={fieldTypes} />
        <LocalizedInput
          name="label"
          onChange={onChange}
          label="Label"
        />
        <LocalizedInput
          name="predefinedValue"
          onChange={onChange}
          label="Predefined Value"
          type="localized"
        />
        <LocalizedInput
          name="placeholder"
          onChange={onChange}
          label="Placeholder"
          type="localized"
        />
        <b>Options</b>
        <Row className="mt-4">
          <Col>
            <Toggle label="Repeatable"
              onToggle={() => onToggle('repeatable')}
              toggled={state.repeatable}
            />
          </Col>
          <Col>
            <Toggle
              label="Inline"
              onToggle={() => onToggle('inline')}
              toggled={state.inline} />
          </Col>
          <Col>
            <Toggle
              label="Multiple"
              onToggle={() => onToggle('multiple')}
              toggled={state.multiple} /></Col>
          <Col>
            <Toggle
              label="Show As Switcher"
              onToggle={() => onToggle('showAsSwitcher')}
              toggled={state.showAsSwitcher} /></Col>
          <Col>
            <Toggle
              label="Show Label"
              onToggle={() => onToggle('showLabel')}
              toggled={state.showLabel} />
          </Col>
          <Col>
            <Toggle label="Required"
              onToggle={() => onToggle('required')}
              toggled={state.required}
            />
          </Col>

        </Row>
        {['radio', 'select', 'checkbox_multiple'].includes(state.fieldType) &&
          <MultiInputSelection label="Options" />}
      </Modal>
    </>
  )
}

export default ObjectModule
