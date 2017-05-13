import _ from 'lodash';
import { capitalizeString } from '/imports/api/utils';
import ListsItems from '/imports/api/collections/list-items';
import ItemsDeaths from '/imports/api/collections/items-deaths';
import { findChannel, channelEdit, createChannel } from '/imports/api/teamspeak/channels';
import { getEnemysChannelDescription, getDeathItemsFromMedivia } from '/imports/api/scrapper/medivia-scrapper';
import { pokeAboutNewOnlines, pokeIfImportantsMatch, pokeClient } from '/imports/api/teamspeak/poke';

export async function deathListCronMedivia({
  list,
  serverName,
  listQuery,
}) {
  const { listName, listType } = list;
  const channel = await findChannel(listName);
  const itemsQuery = ListsItems.find({
    listId: list._id,
    pokeIfDie: true,
  }).fetch();
  const deathsData = await getDeathItemsFromMedivia({
    itemsName: itemsQuery,
  });
  deathsData.map(({ itemId, deathsListFromScrapper }) => {
    const itemDeathsOnDb = ItemsDeaths.findOne({ itemId });
    const userDeathsFromScrapper = _.filter(
      deathsListFromScrapper, ({ itemId }) => _.includes(
        itemDeathsOnDb.itemId,
        itemId
      )
    );
    const actualDeathsOnDb = itemDeathsOnDb.deathsList.length;
    const deathsFromScrapper = deathsListFromScrapper.length;
    if (actualDeathsOnDb != deathsFromScrapper) {
      const totalNewDeaths = deathsFromScrapper - actualDeathsOnDb;
      for (let i = 0; i < deathsFromScrapper; i++) {
        const newPoke = userDeathsFromScrapper[i];
        const listTypeForMessage = listType === 'friends' ? 'FRIEND' : 'ENEMY';
        const message =`${listTypeForMessage} ${newPoke.name} ${newPoke.killedBy} and his recidence is ${capitalizeString(newPoke.itemRecidence)} RUUN!!`;
        pokeClient(message);
      }
      ItemsDeaths.update({ _id: itemDeathsOnDb._id}, {
        $set: { deathsList: userDeathsFromScrapper }
      });
    }
  });
}

export async function cronListsForMedivia({
  itemsQuery,
  listName,
  listType,
  list,
  cid,
}) {
  const itemsOnlineData = await getEnemysChannelDescription({
    items: itemsQuery,
    list
  });
  const { onlineItems, description, onlinePlayers } = itemsOnlineData;
  channelEdit({
    cid,
    channel_name: `${listName} (${onlineItems})`,
    channel_topic: `${listName} Channel`,
    channel_description: description,
  });

  if (listType === 'enemys') {
    pokeAboutNewOnlines({
      pokeableItems: itemsQuery.map((item) => {
        if (item.pokeIfOnline) return item.name;
      }),
      lastOnlinePlayers: list.onlinePlayers && list.onlinePlayers.map((onlinePlayer) => (
        onlinePlayer.name
      )),
      onlinePlayers: onlinePlayers.map(({ name}) => name),
      list,
    });
    /* if (onlineItems >= list.numberOfImportants) {
      pokeIfImportantsMatch({
        onlineItems,
        importantOnline: itemsQuery.map((item) => {
          if (item.isImportant) return item;
        }),
      });
    } */
  }
  return onlinePlayers;
}
