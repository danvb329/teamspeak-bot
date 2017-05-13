import Lists from '/imports/api/collections/lists';
import ListsItems from '/imports/api/collections/list-items';
import MasterChannel from '/imports/api/collections/master-channel';

Meteor.publish('getAllLists', () => Lists.find());

Meteor.publish('getListItemsById', function(_id) {
  if (!_id) return this.ready();
  return ListsItems.find({ listId: _id })
});


Meteor.publish('serverMaster', () => MasterChannel.find());
