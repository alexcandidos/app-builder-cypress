import { createContext } from 'react'

import * as actions from './actions'
const { ADD_FIELD_TYPE } = actions

const AppContext = createContext()

const initialState = {
  scenario: {
    formView: {
      fieldTypes: [
        {
          displayType: 'multiple',
          help: 'Its recommended inform the School Name',
          label: 'School Name',
          placeholder: 'School name here',
          predefinedValue: 'Keven',
          repeatable: true,
          required: true,
          fieldType: 'text'
        },
        {
          help: 'Student Grade',
          label: 'School Grade',
          // multiple: true,
          options: ['First Grade', 'Second Grade', 'Third Grade'],
          predefinedOptions: 'Second Grade',
          showLabel: true,
          // repeatable: true,
          required: true,
          name: 'Select from List',
          fieldType: 'select'
        }
      ]
    }
  }
}

const createReducer = () => {
  return (state = initialState, action) => {
    switch (action.type) {
      case ADD_FIELD_TYPE: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            formView: {
              ...state.scenario.formView,
              fieldTypes: [...state.scenario.formView.fieldTypes, action.payload]
            }
          }
        }
      }

      default:
        return state
    }
  }
}

export default AppContext

export { initialState, createReducer, actions }
