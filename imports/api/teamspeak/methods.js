import { Meteor } from 'meteor/meteor';
import TeamSpeakClient from 'node-teamspeak';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { initTeamspeak } from '/imports/api/teamspeak/connect';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const initClient = new ValidatedMethod({
  name: 'Teamspeak.methods.initClient',
  validate: new SimpleSchema({
    hostname: { type: String },
    hostnamePort: { type: String },
  }).validator(),
  run({ hostname, hostnamePort}) {
    try {
      return initTeamspeak({ hostname, hostnamePort });
    } catch (e) {
      throw new Meteor.Error(500, e.message, e.message);
    }
  },
});
