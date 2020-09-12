import { Col, Row } from '@clayui/layout'
import React, { useContext, useState } from 'react'

import { SYNC_APP } from '../../../../actions'
import AppContext from '../../../../AppContext'
import { LocalizedInput, Toggle } from '../../../../components/Input'

export default function App () {
  const [{ scenario: { app } }, dispatch] = useContext(AppContext)
  const [state, setState] = useState(app)

  const onChange = (name, value) => {
    let val = { [name]: value }
    if (name === 'name') {
    } else {
      val = {
        config: {
          ...state.config,
          [name]: value
        }
      }
    }
    const newState = {
      ...state,
      ...val
    }

    setState(newState)
    dispatch({ payload: newState, type: SYNC_APP })
  }

  return (
    <div>
      <LocalizedInput
        name="name"
        defaultValue={state.name}
        onChange={onChange}
        label="Name"
      />
      <strong>Options</strong>
      <Row className="mt-4">
        <Col>
          <Toggle label="Product Menu"
            onToggle={() => onChange('product', !state.config.product)}
            toggled={state.config.product}
          />
        </Col>
        <Col>
          <Toggle label="Standalone"
            onToggle={() => onChange('standalone', !state.config.standalone)}
            toggled={state.config.standalone}
          />
        </Col>
        <Col>
          <Toggle label="Widget"
            onToggle={() => onChange('widget', !state.config.widget)}
            toggled={state.config.widget}
          />
        </Col>
      </Row>
    </div>
  )
}
