import { createContext } from 'react'

import * as actions from './actions'
const {
  ADD_FIELD_TYPE,
  LOAD_SCENARIO,
  SYNC_APP,
  SYNC_FORM_VIEW,
  SYNC_KEY,
  SYNC_OBJECT,
  SYNC_SETTINGS,
  SYNC_TABLE_VIEW
} = actions

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

    formView: {
      fieldTypes: [],
      name: {}
    },
    object: {
      name: ''
    },
    settings: {
      customEndpoint: '',
      defaultLanguageId: 'en-US',
      endpoint: 'http://localhost:8080',
      languageId: 'en-US'
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

      case SYNC_SETTINGS: {
        return {
          ...state,
          scenario: {
            ...state.scenario,
            settings: {
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

      case LOAD_SCENARIO: {
        return {
          ...state,
          scenario: action.payload
        }
      }

      default:
        return state
    }
  }
}

export default AppContext

export { initialState, createReducer, actions }
