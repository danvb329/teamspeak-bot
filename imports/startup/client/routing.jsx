import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MasterLayout from '/imports/ui/layouts/master-layout';

import LandingPage from '/imports/ui/pages/LandingPage';

const Routes = routes =>
  <Router history={browserHistory}>
    <Route path="/" component={MasterLayout} >
      <IndexRoute component={LandingPage}/>
   </Route>
  </Router>

export default Routes;
