import { languages as LangKeys } from '@app-builder-cypress/common'
import React, { useContext } from 'react'
import * as yup from 'yup'

import AppContext, { actions } from '../../../../AppContext'
import { Input, Select } from '../../../../components/Input'

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

const languages = Object.keys(LangKeys.languages).map((key) => {
  const language = LangKeys.languages[key]
  return {
    label: language.value,
    value: language.key2
  }
}).sort((a, b) => a.label.localeCompare(b.label))

export default function StepEnvironment () {
  const [{ scenario: { settings = {} } }, dispatch] = useContext(AppContext)
  const { customEndpoint, defaultLanguageId, endpoint, languageId, testDescription, testName } = settings
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
        value={defaultLanguageId}
        onChange={onChange}
        name="defaultLanguageId"
        label="Instance Language"
        options={languages} />
      <Select
        value={languageId}
        onChange={onChange}
        name="languageId"
        label="Portal Language"
        options={languages} />
      <Select
        value={endpoint}
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
