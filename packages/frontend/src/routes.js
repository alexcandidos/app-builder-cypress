import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ApplicationBar from './components/ApplicationBar'
import List from './pages/Scenario/List'
import Scenario from './pages/Scenario/Scenario'

const Routes = () => (
  <BrowserRouter>
    <ApplicationBar />
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/scenario/:id?" exact component={Scenario} />
    </Switch>
  </BrowserRouter>
)

export default Routes
