import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MasterLayout from '/imports/ui/layouts/master-layout';

const HomePage = () => (
  <div>Hello</div>
);

const Routes = routes =>
  <Router history={browserHistory}>
    <Route path="/" component={MasterLayout} >
      <IndexRoute component={HomePage}/>
   </Route>
  </Router>

export default Routes;
