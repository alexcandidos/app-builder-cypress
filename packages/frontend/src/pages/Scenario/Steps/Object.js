import ClayPanel from '@clayui/panel'
import React, { useContext } from 'react'

import AppContext, { actions } from '../../../AppContext'
import { Input } from '../../../components/Input'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ObjectModule = () => {
  const [{ scenario: { object } }, dispatch] = useContext(AppContext)

  const onChange = ({ target: { name, value } }) => {
    dispatch({
      payload: {
        ...object,
        [name]: value
      },
      type: actions.SYNC_OBJECT
    })
  }

  return (
    <ClayPanel
      displayTitle={'Object / Portal'}
      displayType="unstyled"
      spritemap={spritemap}
    >
      <ClayPanel.Body>
        <Input
          name="name"
          defaultValue={object.name}
          onChange={onChange}
          label="Object Name"
        />
      </ClayPanel.Body>
    </ClayPanel>
  )
}

export default ObjectModule
