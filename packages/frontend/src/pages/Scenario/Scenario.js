import ClayButton from '@clayui/button'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import axios from '../../api'
import AppContext from '../../AppContext'
import FormContainer from '../../components/FormContainer'
import MultiStep from '../../components/MultiStep'
import StepApp from './Steps/App'
import StepEnvironment from './Steps/Environment'
import StepForm from './Steps/Form'
import StepObject from './Steps/Object'
import StepTable from './Steps/Table'

const Scenario = () => {
  const [state] = useContext(AppContext)
  const [step, setStep] = useState(1)

  const steps = [
    {
      active: step === 1,
      complete: step > 1,
      onClick: () => setStep(1),
      title: 'Object'
    },
    {
      active: step === 2,
      complete: step > 2,
      onClick: () => setStep(2),
      title: 'Form View'
    },
    {
      active: step === 3,
      complete: step > 3,
      onClick: () => setStep(3),
      title: 'Table View'
    },
    {
      active: step === 4,
      complete: step > 4,
      onClick: () => setStep(4),
      title: 'App'
    },
    {
      active: step === 5,
      complete: step > 5,
      onClick: () => setStep(5),
      title: 'Environment'
    }
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/scenario', state)
      toast.success('Scenario created with Success')
    } catch (e) {
      toast.error('Error on save Scenario')
    }
  }

  const Footer = () => (
    <ClayButton.Group>
      {step !== 1 && <div className="btn-group-item">
        <ClayButton onClick={() => setStep(step - 1)} displayType="secondary">
          {'Previous'}
        </ClayButton>
      </div>}
      <div className="btn-group-item">
        {step === 5 ? <ClayButton onClick={onSubmit} >
          {'Deploy'}
        </ClayButton> : <ClayButton onClick={() => setStep(step + 1)} >
          {'Next'}
        </ClayButton>}
      </div>
    </ClayButton.Group>
  )

  return (
    <FormContainer onSubmit={onSubmit} Footer={Footer}>
      <MultiStep steps={steps} />
      {step === 1 && <StepObject />}
      {step === 2 && <StepForm />}
      {step === 3 && <StepTable />}
      {step === 4 && <StepApp />}
      {step === 5 && <StepEnvironment />}
    </FormContainer>
  )
}

export default Scenario
