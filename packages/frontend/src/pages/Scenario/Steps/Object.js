import ClayPanel from '@clayui/panel'
import React, { useContext, useState } from 'react'

import AppContext, { actions } from '../../../AppContext'
import { LocalizedInput } from '../../../components/Input'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ObjectModule = () => {
  const [{ scenario: { object } }, dispatch] = useContext(AppContext)
  const [state, setState] = useState(object)

  const onChange = (name, value) => {
    const newState = {
      ...state,
      [name]: value
    }
    setState(newState)
    dispatch({ payload: newState, type: actions.SYNC_OBJECT })
  }

  return (
    <ClayPanel
      displayTitle={'Object / Portal'}
      displayType="unstyled"
      spritemap={spritemap}
    >
      <ClayPanel.Body>
        <LocalizedInput
          name="name"
          defaultValue={state.name}
          onChange={onChange}
          label="Object Name"
        />
      </ClayPanel.Body>
    </ClayPanel>
  )
}

export default ObjectModule
