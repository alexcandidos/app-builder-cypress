import Button from '@clayui/button'
import ClayPanel from '@clayui/panel'
import { Scope } from '@unform/core'
import React, { useState } from 'react'

import InputField from '../../../components/Input'
import Modal from '../../../components/Modal'
import MultiSelect from '../../../components/MultiSelect'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ObjectModule = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <ClayPanel
        displayTitle={'Form View'}
        displayType="unstyled"
        spritemap={spritemap}
      >
        <ClayPanel.Body>
          <Scope path="formView">
            <InputField
              name="name"
              label="Object Name"
              type="localized"
            />
          </Scope>
          <Button onClick={() => setVisible(!visible)}>Add Field</Button>
        </ClayPanel.Body>
      </ClayPanel>
      <Modal visible={visible} setVisible={setVisible}>
        <Scope path="formView">
          <InputField
            name="label"
            label="Label"
            type="localized"
          />
          <InputField
            name="help"
            label="Portal Language"
            type="localized"
          />
          <InputField
            name="predefinedValue"
            label="Predefined Value"
            type="localized"
          />
          <InputField
            name="placeholder"
            label="Placeholder"
            type="localized"
          />
          <MultiSelect></MultiSelect>
        </Scope>
      </Modal>
    </>
  )
}

export default ObjectModule
