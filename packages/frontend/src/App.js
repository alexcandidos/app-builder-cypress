import 'react-toastify/dist/ReactToastify.css'

import React, { useReducer } from 'react'
import { ToastContainer } from 'react-toastify'

import AppContext, { createReducer, initialState } from './AppContext'
import ApplicationBar from './components/ApplicationBar'
import Routes from './routes'

function App () {
  const reducer = createReducer()
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={[state, dispatch]}>
      <ToastContainer />
      <ApplicationBar />
      <Routes />
    </AppContext.Provider>
  )
}

export default App
