import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Clients from './clients';

export const insertClient = new ValidatedMethod({
  name: 'Clients.methods.insert',
  validate: new SimpleSchema({
    hostname: { type: String },
    hostnamePort: { type: null },
    serverQueryPort: { type: null },
    tibiaServerToUse: { type: String },
    serverQueryHostname: { type: String },
  }).validator(),
  run(client) {
    const ownerId = this.userId;
    if (!ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new client');
    }

    Clients.insert(Object.assign(client, {
      ownerId,
      initialized: false,
    }));
  },
});

export const updateClient = new ValidatedMethod({
  name: 'Clients.methods.update',
  validate: new SimpleSchema({
    _id: { type: String },
    hostname: { type: String },
    hostnamePort: { type: null },
    serverQueryPort: { type: null },
    tibiaServerToUse: { type: String },
    serverQueryHostname: { type: String },
  }).validator(),
  run(client) {
    const { _id } = client;
    const ownerId = this.userId;

    const query = Clients.findOne({ _id });
    if (!ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to update a client!');
    }

    if (query.ownerId !== ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be the client owner in order to update it');
    }

    delete client._id
    Clients.update({ _id }, {
      $set: { ...client }
    });
  },
});

export const removeClient = new ValidatedMethod({
  name: 'Clients.methods.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const ownerId = this.userId;
    const query = Clients.findOne({ _id });

    if (!ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to remove the client');
    }

    if (query.ownerId !== ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be the client owner in order to remove it');
    }

    Clients.remove({ _id });
  },
});
