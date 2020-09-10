import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import AppContext, { actions, initialState } from '../../AppContext'
import ListView from '../../components/ListView'

const List = ({ history }) => {
  const [, dispatch] = useContext(AppContext)
  return (
    <div>
      <ListView addButton={() => {
        dispatch({ payload: initialState.scenario, type: actions.LOAD_SCENARIO })
        history.push('/scenario')
      }}>

      </ListView>
    </div>
  )
}

export default withRouter(List)
