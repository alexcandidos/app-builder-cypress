import React, { useContext } from 'react'
import * as yup from 'yup'

import AppContext, { actions } from '../../../AppContext'
import { Input, Select } from '../../../components/Input'

const options = [{
  label: 'http://localhost:8080',
  value: 'http://localhost:8080'
},
{
  label: 'cloud...8080',
  value: 'cloud...8080'
},
{
  label: 'other',
  value: 'other'
}]

const schema = yup.object().shape({
  testDescription: yup.string().required(),
  testName: yup.string().required()
})

export { schema }

export default function StepEnvironment () {
  const [{ scenario: { settings = {} } }, dispatch] = useContext(AppContext)
  const { customEndpoint, endpoint, testDescription, testName } = settings
  const onChange = ({ target: { name, value } }) => {
    dispatch({
      payload: {
        ...settings,
        [name]: value
      },
      type: actions.SYNC_SETTINGS
    })
  }

  return (
    <>
      <Input
        name="testName"
        label="Test Name"
        onChange={onChange}
        defaultValue={testName} />
      <Input
        name="testDescription"
        onChange={onChange}
        label="Test Description"
        defaultValue={testDescription}
        component="textarea"
      />
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
