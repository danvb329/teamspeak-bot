import React from 'react';
import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import Clients from '/imports/api/clients/clients';
import Loader from '/imports/ui/components/shared/Loader';
import { initClient } from '/imports/api/teamspeak/methods';
import trackerComposer from '/imports/ui/composers/tracker';

class ClientStatusContainer extends React.Component {
  render() {
    const { error } = this.props;
    return (
      <div>
        <article className="message">
          <div className="message-header">
            <p>Server Status Connection { error ? 'F A I L E D' : 'S U C C E S S'}</p>
            <button className="delete"></button>
          </div>
          <div className="message-body">
            {
              error ?
              <span className="tag is-danger">{error}</span> :
              <span className="tag is-success">Connected =D</span>
            }
          </div>
        </article>
      </div>
    )
  }
};

function mapper({ params }, onData) {
  const clientHandler = Meteor.subscribe('Clients.publications.clientById', params.clientId);
  if (clientHandler.ready()) {
    const query = Clients.findOne({ _id: params.clientId});
    const { hostname, hostnamePort } = query;
    Meteor.call('Teamspeak.methods.initClient', { hostname, hostnamePort }, (error, result) => {
      if (error) {
        onData(null, {
          error: error.reason
        });
      } else {
        onData(null, {})
      }
    });
  }
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="Loading Client Tests"/>,
})(ClientStatusContainer);
