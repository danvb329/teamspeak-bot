import { pokeClient } from '../poke';
import { getChannels } from '../channels';
import { getClients, moveClient } from '../clients';
import { initBotChannels } from '/imports/api/utils';
import MasterChannel from '/imports/api/collections/master-channel';

Meteor.methods({
  createBotChannels: async function(order) {
    MasterChannel.remove({});
    const result = await initBotChannels(order)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
    return result;
  },
  pokeClient({ msg }) {
    return pokeClient(msg);
  },
  getAllChannels: async function() {
    return await getChannels();
  },
  dragToChannel: async function(cid) {
    const clients = await getClients();
    return clients.forEach(({clid}) => moveClient({ clid, cid }));
  }
});
