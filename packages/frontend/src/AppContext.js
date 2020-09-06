import { createContext } from 'react'

import * as actions from './actions'
const { ADD_FIELD_TYPE, SYNC_APP, SYNC_ENVIRONMENT, SYNC_FORM_VIEW, SYNC_KEY, SYNC_OBJECT, SYNC_TABLE_VIEW } = actions

const AppContext = createContext()

const initialState = {
  scenario: {
    app: {
      config: {
        product: false,
        standalone: false,
        widget: false
      },
      name: {}
    },
    environment: {
      endpoint: ''
    },
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
      ],
      name: {}
    },
    object: {
      name: {}
    },
    tableView: {
      name: {},
      selectedFields: []
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

      case SYNC_FORM_VIEW: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            formView: {
              ...action.payload
            }
          }
        }
      }

      case SYNC_TABLE_VIEW: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            tableView: {
              ...action.payload
            }
          }
        }
      }

      case SYNC_ENVIRONMENT: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            environment: {
              ...action.payload
            }
          }
        }
      }

      case SYNC_APP: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            app: {
              ...action.payload
            }
          }
        }
      }

      case SYNC_OBJECT: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            object: {
              ...action.payload
            }
          }
        }
      }

      case SYNC_KEY: {
        const { key, value } = action.payload
        return {
          ...state,
          scenario: {
            ...state.scenario,
            [key]: {
              ...state.scenario[key],
              ...value
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
