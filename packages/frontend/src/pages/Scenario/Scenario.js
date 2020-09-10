import ClayButton from '@clayui/button'
import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LOAD_SCENARIO } from '../../actions'
import axios from '../../api'
import AppContext from '../../AppContext'
import FormContainer from '../../components/FormContainer'
import MultiStep from '../../components/MultiStep'
import StepApp from './Steps/App'
import StepForm from './Steps/Form'
import StepObject from './Steps/Object'
import StepSettings, { schema as SettingsSchema } from './Steps/Settings'
import StepTable from './Steps/Table'

const Scenario = ({ history, match: { params } }) => {
  const [{ scenario }, dispatch] = useContext(AppContext)
  const [isValid, setValid] = useState(false)
  const [step, setStep] = useState(1)
  const { id } = params

  useEffect(() => {
    if (id) {
      axios.get(`scenario/${id}`).then(({ data: { scenario } }) => {
        dispatch({ payload: scenario, type: LOAD_SCENARIO })
      })
    }
  }, [id])

  const steps = [
    {
      active: step === 1,
      complete: step > 1,
      onClick: () => setStep(1),
      title: 'Settings'
    },
    {
      active: step === 2,
      complete: step > 2,
      onClick: () => setStep(2),
      title: 'Object'
    },
    {
      active: step === 3,
      complete: step > 3,
      onClick: () => setStep(3),
      title: 'Form View'
    },
    {
      active: step === 4,
      complete: step > 4,
      onClick: () => setStep(4),
      title: 'Table View'
    },
    {
      active: step === 5,
      complete: step > 5,
      onClick: () => setStep(5),
      title: 'App'
    }
  ]

  const stepIsValid = async () => {
    const { app, formView, object, settings, tableView } = scenario
    let value
    switch (step) {
      case 1: {
        value = await SettingsSchema.isValid(settings)
        break
      }

      case 2: {
        value = !!object.name
        break
      }

      case 3: {
        value = Object.values(formView.name).some(value => value)
        break
      }

      case 4: {
        value = Object.values(tableView.name).some(value => value)
        break
      }

      case 5: {
        value = Object.values(app.name).some(value => value)
        break
      }
    }
    setValid(value)
  }

  useEffect(() => {
    stepIsValid()
  }, [scenario])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await axios.put(`scenario/${id}`, scenario)
      } else {
        await axios.post('/scenario', scenario)
      }
      toast.success(`Scenario ${id ? 'updated' : 'created'} with Success`)
      history.push('/')
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
        {step === 5 ? <ClayButton disabled={!isValid} onClick={onSubmit} >
          {'Deploy'}
        </ClayButton> : <ClayButton disabled={!isValid} onClick={() => {
          setStep(step + 1)
          stepIsValid()
        }} >
          {'Next'}
        </ClayButton>}
      </div>
    </ClayButton.Group>
  )

  return (
    <FormContainer onSubmit={onSubmit} Footer={Footer}>
      <MultiStep steps={steps} />
      {step === 1 && <StepSettings />}
      {step === 2 && <StepObject />}
      {step === 3 && <StepForm />}
      {step === 4 && <StepTable />}
      {step === 5 && <StepApp />}
    </FormContainer>
  )
}

export default withRouter(Scenario)
