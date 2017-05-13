import { TEAMSPEAK_SERVER } from './utils';
import { BOT_CREDENTIALS, SERVER_ID } from './constans';

console.log(BOT_CREDENTIALS);
console.log(SERVER_ID);
export const loginToServerQuery = () => {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('login', BOT_CREDENTIALS, (error, result) => {
      TEAMSPEAK_SERVER.send('use', SERVER_ID , (error, result) => {
        if (error) reject(error);
        const client_nickname = 'ETHAN_BOT';
        TEAMSPEAK_SERVER.send('clientupdate', { client_nickname });
        TEAMSPEAK_SERVER.send('servergroupautoaddperm', {
          sgtype: 4428,
          permsid: 'i_needed_modify_power_client_talk_power',
          permvalue: 75,
          permskip: 0,
          permnegated: 0
        }, (error, result) => {
          if (error) {
            console.log('ERRROR');
            console.log(error);
          } else {
            console.log('RESULT');
            console.log(result);
          }
        });
        resolve(true)
      })
    });
  });
}
