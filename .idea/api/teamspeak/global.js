import { TEAMSPEAK_SERVER } from './utils';
import { loginToServerQuery } from './login-utils';

export const updateBanner = () => {
  const virtualserver_hostbanner_gfx_url = 'https://dummyimage.com/600x400/000/fff.png&text=ETHAN+BOT+TEST';
  const virtualserver_hostbanner_url = 'https://github.com/Ethaan/teamspeak-bot';
  return TEAMSPEAK_SERVER.send('serveredit', {
    virtualserver_name: 'Devastation BY ETHAN BOT',
    virtualserver_hostbanner_url,
    virtualserver_hostbanner_gfx_url,
  }, (error, result) => {
    if (error) {
      // console.log(error);
    } else {
      // console.log(result);
    }
  });
}
