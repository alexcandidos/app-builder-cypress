import ClayPanel from '@clayui/panel'
import { Scope } from '@unform/core'
import React from 'react'

import InputField from '../../../components/Input'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ObjectModule = ({ form, onChange }) => {
  return (
    <ClayPanel
      displayTitle={'Object / Portal'}
      displayType="unstyled"
      spritemap={spritemap}
    >
      <ClayPanel.Body>
        <Scope path="object">
          <InputField
            name="name"
            onChange={onChange}
            label="Object Name"
            type="localized"
          />
        </Scope>
        <Scope path="portal">
          <InputField
            name="defaultLanguageId"
            onChange={onChange}
            label="Portal Language"
            type="localized"
          />
          <InputField
            name="languageId"
            onChange={onChange}
            label="Portal Instance Language"
            type="localized"
          />
        </Scope>
      </ClayPanel.Body>
    </ClayPanel>
  )
}

export default ObjectModule
