import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MasterLayout from '/imports/ui/layouts/MasterLayout';

import AccessPage from '/imports/ui/pages/AccessPage';
import LandingPage from '/imports/ui/pages/LandingPage';
import ClientsPage from '/imports/ui/pages/ClientsPage';

const Routes = routes =>
  <Router history={browserHistory}>
    <Route path="/" component={MasterLayout} >
      <IndexRoute component={LandingPage}/>
      <Route path="login" component={AccessPage} />
      <Route path="register" component={AccessPage} />
      <Route path="clients" component={ClientsPage} />
   </Route>
  </Router>

export default Routes;
