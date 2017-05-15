import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import ServerQueryUser from './server-query';

export const insertServerQueryUser = new ValidatedMethod({
  name: 'ServerQuery.methods.insertServerQueryUser',
  validate: new SimpleSchema({
    clientId: { type: String },
    username: { type: String },
    password: { type: String },
  }).validator(),
  run(user) {
    const ownerId = this.userId;
    if (!ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new client');
    }

    ServerQueryUser.insert(Object.assign(user, { ownerId }));
  },
});

export const removeServerQueryUser = new ValidatedMethod({
  name: 'ServerQuery.methods.removeServerQueryUser',
  validate: new SimpleSchema({
    _id: { type: String },
    clientId: { type: String },
  }).validator(),
  run({ _id, clientId }) {
    const query = ServerQueryUser.find({ clientId }).fetch();
    const ownerId = this.userId;
    if (!ownerId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to add a new client');
    }

    if (query.length === 1) {
      throw new Meteor.Error('unauthorized', 'Sorry but you cannot left this client with no ServerQuery users');
    }

    ServerQueryUser.remove({ _id });
  },
});
