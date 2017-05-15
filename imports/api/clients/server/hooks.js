import Clients from '../clients';
import ServerQueryUser from '/imports/api/server-query/server-query';

Clients.before.remove((userId, doc) => {
  ServerQueryUser.find({ clientId: doc._id}).fetch().map(({ _id }) => {
    ServerQueryUser.remove({ _id });
  });
});
