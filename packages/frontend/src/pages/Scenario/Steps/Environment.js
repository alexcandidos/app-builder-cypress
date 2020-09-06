import React, { useContext } from 'react'

import AppContext, { actions } from '../../../AppContext'
import { Input, Select } from '../../../components/Input'

const options = [{
  label: 'localhost:8080',
  value: 'localhost:8080'
},
{
  label: 'cloud...8080',
  value: 'cloud...8080'
},
{
  label: 'other',
  value: 'other'
}]

export default function StepEnvironment () {
  const [{ scenario: { environment } }, dispatch] = useContext(AppContext)
  const { customEndpoint, endpoint } = environment
  const onChange = ({ target: { name, value } }) => {
    dispatch({
      payload: {
        ...environment,
        [name]: value
      },
      type: actions.SYNC_ENVIRONMENT
    })
  }

  return (
    <>
      <Select
        defaultValue={endpoint}
        onChange={onChange}
        name="endpoint"
        label="Endpoint"
        options={options} />
      {endpoint === 'other' &&
        <Input
          defaultValue={customEndpoint}
          label="Custom Endpoint"
          onChange={onChange}
          name="customEndpoint" />}
    </>
  )
}
