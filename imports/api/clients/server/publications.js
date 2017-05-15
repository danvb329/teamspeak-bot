import { Meteor } from 'meteor/meteor';
import Clients from '../clients';

Meteor.publish('Clients.publications.clientsByOwner', function() {
  const ownerId = this.userId;
  if (!ownerId) return this.ready();
  return Clients.find({ ownerId });
});

Meteor.publish('Clients.publications.clientById', function(_id) {
  if (!_id) return this.ready();
  return Clients.find({ _id });
});
