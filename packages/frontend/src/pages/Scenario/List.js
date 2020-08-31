import React from 'react'
import { withRouter } from 'react-router-dom'

import ListView from '../../components/ListView'

const List = ({ history }) => {
  return (
    <div>
      <ListView addButton={() => {
        history.push('/scenario')
      }}></ListView>
    </div>
  )
}

export default withRouter(List)
