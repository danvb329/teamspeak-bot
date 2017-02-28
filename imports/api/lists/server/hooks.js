import Lists from '/imports/api/collections/lists';
import ListsItems from '/imports/api/collections/list-items';
import ItemsDeaths from '/imports/api/collections/items-deaths';
import MasterChannel from '/imports/api/collections/master-channel';
import { createChannel, deleteChannel } from '/imports/api/teamspeak/channels';

ListsItems.before.insert((userId, doc) => {
  ItemsDeaths.insert({
    itemId: doc._id,
    deathsList: [],
  });
});

Lists.before.insert((userId, doc) => {
  const type = doc.listType;
  const queryType = type === 'other' ? 'botDescription' : type;
  const listTypeParent = MasterChannel.findOne({ type: queryType });
  createChannel({
    cpid: listTypeParent.cid,
    channel_name: doc.listName,
    channel_flag_permanent: 1,
  }).then(({ cid }) =>  Lists.update(doc._id, { $set: { cid }}));
});

Lists.before.remove(function (userId, doc) {
  const { cid } = doc;
  deleteChannel({ cid }).then(() => ListsItems.remove({
    listId: doc._id,
  }));
});

ListsItems.before.remove(function (userId, doc) {
  ItemsDeaths.remove({
    itemId: doc._id
  });
});
