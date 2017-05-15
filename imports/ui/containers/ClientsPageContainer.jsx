import React from 'react';
import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import Clients from '/imports/api/clients/clients';
import ClientsPage from '/imports/ui/pages/ClientsPage';
import Loader from '/imports/ui/components/shared/Loader';
import trackerComposer from '/imports/ui/composers/tracker';

class ClientsPageContainer extends React.Component {
  render() {
    return (
      <div>
        <ClientsPage {...this.props} />
      </div>
    )
  }
};

function mapper(props, onData) {
  const clientsHandler = Meteor.subscribe('Clients.publications.clientsByOwner');
  if (clientsHandler.ready()) {
    const clients = Clients.find().fetch();
    onData(null, { clients })
  }
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading clients"/>,
})(ClientsPageContainer);
