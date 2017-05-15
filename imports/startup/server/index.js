import { Meteor } from 'meteor/meteor';

import '/imports/api/clients';
import '/imports/api/teamspeak';
import '/imports/api/server-query';

// import { SyncedCron } from 'meteor/percolate:synced-cron';
// import { loginToServerQuery } from '/imports/api/teamspeak/login-utils';

// import '/imports/api/lists/server/';
// import '/imports/api/teamspeak/server';

Meteor.startup(() => {
  // loginToServerQuery();
  // SyncedCron.start();
});
