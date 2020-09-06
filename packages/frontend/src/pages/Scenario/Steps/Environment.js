import React from 'react'

import { Select } from '../../../components/Input'

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
  return (
    <div>
      <Select name="endpoint" label="Endpoint" options={options}></Select>
    </div>
  )
}
