import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MasterLayout from '/imports/ui/layouts/MasterLayout';

import AccessPage from '/imports/ui/pages/AccessPage';
import LandingPage from '/imports/ui/pages/LandingPage';
import NewClientContainer from '/imports/ui/containers/NewClientContainer';
import ClientPageContainer from '/imports/ui/containers/ClientPageContainer';
import ClientsPageContainer from '/imports/ui/containers/ClientsPageContainer';
import UpdateClientContainer from '/imports/ui/containers/UpdateClientContainer';
import ClientStatusContainer from '/imports/ui/containers/ClientStatusContainer';
import ServerQueryUsersContainer from '/imports/ui/containers/ServerQueryUsersContainer';
import NewServerQueryUserContainer from '/imports/ui/containers/NewServerQueryUserContainer';

const Routes = routes =>
  <Router history={browserHistory}>
    <Route path="/" component={MasterLayout} >
      <IndexRoute component={LandingPage}/>
      <Route path="login" component={AccessPage} />
      <Route path="register" component={AccessPage} />
      <Route path="client/new" component={ClientsPageContainer} container={NewClientContainer} />
      <Route path="clients/:clientId" component={ClientPageContainer} container={UpdateClientContainer} />
      <Route path="clients/:clientId/server/status" component={ClientPageContainer} container={ClientStatusContainer} />
      <Route path="clients/:clientId/server/query" component={ClientPageContainer} container={ServerQueryUsersContainer} />
      <Route path="clients/:clientId/server/query/new" component={ClientPageContainer} container={NewServerQueryUserContainer} />
   </Route>
  </Router>

export default Routes;
