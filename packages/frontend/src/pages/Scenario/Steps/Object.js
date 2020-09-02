import ClayPanel from '@clayui/panel'
import React from 'react'

import { LocalizedInput } from '../../../components/Input'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ObjectModule = ({ form, onChange }) => {
  return (
    <ClayPanel
      displayTitle={'Object / Portal'}
      displayType="unstyled"
      spritemap={spritemap}
    >
      <ClayPanel.Body>
        <LocalizedInput
          name="name"
          onChange={onChange}
          label="Object Name"
          type="localized"
        />
        <LocalizedInput
          name="defaultLanguageId"
          onChange={onChange}
          label="Portal Language"
          type="localized"
        />
        <LocalizedInput
          name="languageId"
          onChange={onChange}
          label="Portal Instance Language"
          type="localized"
        />
      </ClayPanel.Body>
    </ClayPanel>
  )
}

export default ObjectModule
