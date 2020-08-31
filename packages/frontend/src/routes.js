import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import List from './pages/Scenario/List'
import Scenario from './pages/Scenario/Scenario'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/scenario" exact component={Scenario} />
    </Switch>
  </BrowserRouter>
)

export default Routes
