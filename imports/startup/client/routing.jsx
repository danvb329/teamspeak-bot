import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MasterLayout from '/imports/ui/layouts/master-layout';

import HomePage from '/imports/ui/pages/home/home';
import ListsPage from '/imports/ui/pages/lists/lists';
import SendPokePage from '/imports/ui/pages/poke/send-poke-page';
import CreateListsPage from '/imports/ui/pages/lists/create-list';
import ListItemsPage from '/imports/ui/pages/lists/list-items-page';
import DragChannelsPages from '/imports/ui/pages/channels/drag-channels-page.jsx';

const Routes = routes =>
  <Router history={browserHistory}>
    <Route path="/" component={MasterLayout} >
      <IndexRoute component={HomePage}/>
      <Route path="poke" component={SendPokePage} />
      <Route path="list" component={ListsPage} />
      <Route path="list/create" component={CreateListsPage} />
      <Route path="list/:listId" component={ListItemsPage} />
      <Route path="channels/drag-all" component={DragChannelsPages} />
   </Route>
  </Router>

export default Routes;
