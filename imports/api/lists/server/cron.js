import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import Lists from '/imports/api/collections/lists';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import ListsItems from '/imports/api/collections/list-items';
import { findChannel, channelEdit, createChannel } from '/imports/api/teamspeak/channels';
import { cronListsForMedivia, deathListCronMedivia } from '/imports/api/medivia/cron-data';
import { LIST_ONLINE_CHANNEL_NAME } from '../constants';
const worldGameData = Meteor.settings.worldGameData;

SyncedCron.add({
  name: 'CHECK LISTS',
  schedule: (parser) => parser.text('every 10 seconds'),
  job: async function() {
    try {
      const listQuery = Lists.find().fetch();
      if (listQuery.length === 0) return;
      for (let list of listQuery) {
        const { listName, listType, cid } = list;
        const itemsQuery = ListsItems.find({ listId: list._id }).fetch();
        if (worldGameData.medivia) {
          const onlinePlayers = await cronListsForMedivia({
            listName,
            listType,
            list,
            itemsQuery,
            cid,
          });
          Lists.update({ _id: list._id }, {$set: { onlinePlayers }});
        } else {
          // run for ther parser
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
});

SyncedCron.add({
  name: 'CHECK DEATHS LISTS',
  schedule: (parser) => parser.text('every 10 seconds'),
  job: async function() {
    try {
      const listQuery = Lists.find().fetch();
      const serverName = worldGameData.serverName;
      if (listQuery.length === 0) return;
      for (let list of listQuery) {
        deathListCronMedivia({
          list,
          serverName,
          listQuery,
        });
      }
    } catch (error) {
      console.warn(error);
    }
  }
});
