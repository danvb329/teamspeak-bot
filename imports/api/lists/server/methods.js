import Lists from '/imports/api/collections/lists';
import ListItems from '/imports/api/collections/list-items';
import { deleteChannel } from '/imports/api/teamspeak/channels';
import { getItemsByGuildUrl } from '/imports/api/scrapper/medivia-scrapper';

Meteor.methods({
  insertItemsByUrl: async function({ guildURL, listId }) {
    try {
      const guildMembers = await getItemsByGuildUrl(guildURL);
      return guildMembers.map(name => {
        const cleanName = name.replace(/-|\s/,"");
        ListItems.insert({
          listId,
          name: cleanName,
          pokeIfDie: true,
        });
      })
    } catch (error) {
      console.log(error);
    }
  },
  insertListItem(data) {
    return ListItems.insert(data);
  },
  deleteListItem(_id) {
    return ListItems.remove(_id);
  },
  updateListItem({ itemId, data } = {}) {
    return ListItems.update({
      _id: itemId,
    }, {
      $set: {
        ...data
      }
    });
  },
  createList(data) {
    return Lists.insert(data);
  },
  removeList(_id) {
    return Lists.remove(_id);
  },
  deleteChannel() {

  }
});
