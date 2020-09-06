import React, { useState } from 'react'

import FormContainer from '../../components/FormContainer'
import MultiStep from '../../components/MultiStep'
import StepForm from './Steps/Form'
import StepObject from './Steps/Object'

const Scenario = () => {
  const [step, setStep] = useState(0)

  const steps = [
    {
      active: step === 0,
      complete: step > 0,
      onClick: () => setStep(0),
      title: 'Object'
    },
    {
      active: step === 1,
      complete: step > 1,
      onClick: () => setStep(1),
      title: 'Table'
    },
    {
      active: step === 2,
      complete: step > 2,
      onClick: () => setStep(2),
      title: 'Form'
    }
  ]

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <FormContainer onSubmit={onSubmit}>
        <MultiStep steps={steps} />
        {step === 0 && <StepForm />}
        {step === 1 && <StepObject />}
      </FormContainer>
    </>
  )
}

export default Scenario
