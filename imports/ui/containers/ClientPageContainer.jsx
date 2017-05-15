import React from 'react';
import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import Clients from '/imports/api/clients/clients';
import ClientsPage from '/imports/ui/pages/ClientsPage';
import Loader from '/imports/ui/components/shared/Loader';
import trackerComposer from '/imports/ui/composers/tracker';

class ClientPageContainer extends React.Component {
  render() {
    return (
      <div>
        <ClientsPage {...this.props} />
      </div>
    )
  }
};

function mapper({ params }, onData) {
  const clientsHandler = Meteor.subscribe('Clients.publications.clientsByOwner');
  if (clientsHandler.ready()) {
    const client = Clients.findOne({ _id: params.clientId });
    const clients = Clients.find().fetch();

    onData(null, { client, clients })
  }
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading client"/>,
})(ClientPageContainer);
