import { Meteor } from 'meteor/meteor';
import ServerQueryUser from '../server-query';

Meteor.publish('ServerQuery.publications.usersByClientId', function(clientId) {
  if (!clientId) return this.ready();
  return ServerQueryUser.find({ clientId });
});
