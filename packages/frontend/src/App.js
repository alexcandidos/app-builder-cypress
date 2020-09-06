import React, { useReducer } from 'react'

import AppContext, { createReducer, initialState } from './AppContext'
import ApplicationBar from './components/ApplicationBar'
import Routes from './routes'

function App () {
  const reducer = createReducer()
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={[state, dispatch]}>
      <ApplicationBar />
      <Routes />
    </AppContext.Provider>
  )
}

export default App
