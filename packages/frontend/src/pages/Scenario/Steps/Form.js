import Button from '@clayui/button'
import ClayPanel from '@clayui/panel'
import React, { useState } from 'react'

import { LocalizedInput, MultiInputSelection, Select, Toggle } from '../../../components/Input'
import Modal from '../../../components/Modal'
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

const FieldModal = () => {
  const [visible, setVisible] = useState(true)
  const [state, setState] = useState({
    inline: true,
    multiple: false,
    repeatable: false,
    showAsSwitcher: true,
    showLabel: false
  })

  const onChange = (name, value) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const onToggle = (name) => {
    setState({
      ...state,
      [name]: !state[name]
    })
  }

  return (
    <>
      <Button onClick={() => setVisible(!visible)}>Add Field</Button>
      <Modal title="Create Form" visible={visible} setVisible={setVisible} onSubmit={(e) => console.log()}>
        <Select label="Field Type" options={fieldTypes} />
        <LocalizedInput
          name="label"
          onChange={onChange}
          label="Label"
        />
        <LocalizedInput
          name="help"
          onChange={onChange}
          label="Portal Language"
          type="localized"
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
        <Toggle label="Repeatable"
          onToggle={() => onToggle('repeatable')}
          toggled={state.repeatable}
        />
        <Toggle
          label="Inline"
          onToggle={() => onToggle('inline')}
          toggled={state.inline} />
        <Toggle
          label="Multiple"
          onToggle={() => onToggle('multiple')}
          toggled={state.multiple} />
        <Toggle
          label="Show As Switcher"
          onToggle={() => onToggle('showAsSwitcher')}
          toggled={state.showAsSwitcher} />
        <Toggle
          label="Show Label"
          onToggle={() => onToggle('showLabel')}
          toggled={state.showLabel} />

        <MultiInputSelection label="Options" />
      </Modal>
    </>
  )
}

const ObjectModule = () => {
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
            label="Object Name"
            type="localized"
          />
        </ClayPanel.Body>
      </ClayPanel>
      <FieldModal></FieldModal>
    </>
  )
}

export default ObjectModule
