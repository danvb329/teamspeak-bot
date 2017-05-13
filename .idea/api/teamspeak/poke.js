import _ from 'lodash';
import moment from 'moment';
import { getClients } from './clients';
import { TEAMSPEAK_SERVER } from './utils';
import { capitalizeString } from '../utils';

export async function pokeClient(msg) {
  const clients = await getClients();
  return clients.forEach(({ clid }) => {
    TEAMSPEAK_SERVER.send('clientpoke', {
      msg,
      clid
    })
  });
};

export async function pokeIfImportantsMatch({ numberToMatch, onlineItems}) {
  const clients = await getClients();
  return clients.forEach(({ clid }) => TEAMSPEAK_SERVER.send('clientpoke', {
    msg: `Watch Out ${onlineItems} Important Enemys are Online`,
    clid
  }));
};

export async function pokeAboutNewOnlines({
  pokeableItems = [],
  lastOnlinePlayers = [],
  list = {},
  onlinePlayers = [],
} = {}) {
  const clients = await getClients();
  const newOnlines = _.compact(onlinePlayers.map(newOnline => {
    if (lastOnlinePlayers.indexOf(newOnline) === -1) return newOnline;
  }));
  const pokeNames = _.compact(newOnlines.map(newOnline => {
    if (pokeableItems.indexOf(newOnline) > -1) return newOnline;
  }));
  if (pokeNames.length > 0) {
    return clients.forEach(({ clid }) => {
      pokeNames.forEach(newOnlineNameToPoke => {
        TEAMSPEAK_SERVER.send('clientpoke', {
          msg: `${newOnlineNameToPoke} is ONLINE`,
          clid
        })
      })
    });
  }
};
