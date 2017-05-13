import { TEAMSPEAK_SERVER } from './utils';

export async function getClients() {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('clientlist', (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

export async function moveClient(clientData) {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('clientmove', clientData, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}
