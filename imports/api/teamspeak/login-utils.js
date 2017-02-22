import { TEAMSPEAK_SERVER } from './utils';
import { BOT_CREDENTIALS, SERVER_ID } from './constans';

export const loginToServerQuery = () => {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('login', BOT_CREDENTIALS, (error, result) => {
      TEAMSPEAK_SERVER.send('use', SERVER_ID , (error, result) => {
        if (error) reject(error);
        const client_nickname = 'ETHAN_BOT';
        TEAMSPEAK_SERVER.send('clientupdate', { client_nickname });
        resolve(true)
      })
    });
  });
}
