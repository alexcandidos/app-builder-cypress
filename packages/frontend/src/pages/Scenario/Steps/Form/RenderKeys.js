import ClayLabel from '@clayui/label'
import React from 'react'

const renderChecked = (value) => value ? 'Yes' : 'No'

const renderLocalized = (value) => {
  if (typeof value === 'object') {
    return <RenderKeys configs={value} />
  }
  return value
}

const renderValue = (value) => {
  const dataType = typeof value
  if (dataType === 'boolean') {
    return renderChecked(value)
  } else if (dataType === 'object') {
    return renderLocalized(value)
  }
  return value
}

const RenderKeys = ({ configs, valueAsLabel }) => {
  return Object.keys(configs).map((key) => {
    const value = renderValue(configs[key])

    return (
      <div key={key}>
        <ClayLabel displayType="info">{key}</ClayLabel>
        {valueAsLabel ? <ClayLabel>{value}</ClayLabel> : value}
      </div>
    )
  })
}

export { renderLocalized, RenderKeys }
