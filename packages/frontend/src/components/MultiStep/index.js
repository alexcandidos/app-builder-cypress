import ClayMultiStepNav from '@clayui/multi-step-nav'
import React from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const MultiStep = ({ steps }) => {
  return (
    <ClayMultiStepNav>
      {steps.map(({ active, complete, onClick, subTitle, title }, i) => (
        <ClayMultiStepNav.Item
          active={active}
          complete={complete}
          expand={i + 1 !== steps.length}
          key={i}
        >
          <ClayMultiStepNav.Title>{title}</ClayMultiStepNav.Title>
          <ClayMultiStepNav.Divider />
          <ClayMultiStepNav.Indicator
            complete={complete}
            label={1 + i}
            onClick={onClick}
            spritemap={spritemap}
            subTitle={subTitle}
          />
        </ClayMultiStepNav.Item>
      ))}
    </ClayMultiStepNav>
  )
}

export default MultiStep
