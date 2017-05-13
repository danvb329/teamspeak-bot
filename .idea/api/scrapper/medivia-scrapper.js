import _ from 'lodash';
import cheerio from 'cheerio';
import { scrapeByUrl } from './utils';
import { capitalizeString } from '../utils';
import { sortByProfessions, buildCharacterDescription } from '../utils';

const MEDIVIA_ONLINE_LEGACY = 'https://medivia.online/community/online/legacy';
const MEDIVIA_DEATHS_STATS = 'http://mediviastats.info/recent-deaths.php';
const MEDIVIA_CHARACTER_PAGES = 'https://medivia.online/community/character/';

const getOnlineData = ($) => {
  return (i, li) => {
    const userInfo = [];
    // To dont get the headers titles
    if (i === 0) return;

    $(li).find('div').each((index, div) => {
      userInfo.push($(div).text());
    });

    return {
      lastLogin: userInfo[0],
      name: userInfo[1],
      vocation: userInfo[2],
      level: userInfo[3]
    };
  }
};


const getOnlineItems = (items, onlineUsers) =>
  _.filter(onlineUsers, ({ name }) => _.includes(items, name));


const parseChannelDescription = ({ items, totalItems, listType, onlineItems }) => {
  let description = `\n ${onlineItems.length}/${totalItems} ${capitalizeString(listType)} Online \n`;
  const sortedItems = sortByProfessions(onlineItems);
  sortedItems.forEach(enemie => description += buildCharacterDescription(enemie));
  return description;
};

const readOnlineBody = (body) => {
  let $ = cheerio.load(body);
  return $($('ul')[1]).find('li').map(getOnlineData($))
};

export async function getEnemysChannelDescription({ items, list} = {}) {
  const itemsNames = items.map(({ name }) => name);
  const onlineUsers = await scrapeByUrl(MEDIVIA_ONLINE_LEGACY, readOnlineBody);
  const onlineItems = getOnlineItems(itemsNames, onlineUsers);
  return {
    onlinePlayers: onlineItems,
    onlineItems: onlineItems.length,
    description: parseChannelDescription({
      items,
      onlineItems,
      totalItems: items.length,
      listType: list.listType,
    }),
  }
}

const getDeathsData = ($) => {
  return (i, tr) => {
    const deathInfo = [];
    if (i === 0) return;
    $(tr).find('td').each((index, td) => {
      deathInfo.push($(td).text());
    });
    if (deathInfo.length === 0) return;
    return {
      date: deathInfo[0],
      name: deathInfo[1],
      deathMessage: deathInfo[2],
    }
  }
};

const readDeathList = ($, { itemId, name }) => {
  return (index, div) => {
    const deathData = [];
    $(div).find('div').each((index, div) => {
      deathData.push($(div).text());
    });
    if (deathData[1] && deathData[0].indexOf('minutes') > -1) {
      return {
        name,
        itemId,
        timeago: deathData[0],
        killedBy: deathData[1],
      };
    }
  }
};

const readCharacterDeaths = ({ itemId, name}) => {
  return (body) => {
    let $ = cheerio.load(body);
    return $('.title:contains("Death list")')
           .parent()
           .find('div > .black-link').map(readDeathList($, { itemId, name}))
           .get()
  }
}

const readItemRecidence = (body) => {
  let $ = cheerio.load(body);
   return $('.title:contains("Information")')
          .parent()
          .find('.med-width-50:contains("residence:")')
          .last()
          .next()
          .text()
};

export async function getDeathItemsFromMedivia({ itemsName = [] } = {}) {
  const response = [];
  for (let item of itemsName) {
    const deathsListFromScrapper = await scrapeByUrl(
      `${MEDIVIA_CHARACTER_PAGES}${item.name}`,
      readCharacterDeaths({
      itemId: item._id,
      name: item.name
    }));
    const itemRecidence = await scrapeByUrl(
      `${MEDIVIA_CHARACTER_PAGES}${item.name}`,
      readItemRecidence
    );
    response.push({
      deathsListFromScrapper: deathsListFromScrapper.map((death) => {
        return Object.assign({}, death, { itemRecidence });
      }),
      itemId: item._id,
    });
  }
  return response;
}

getGuildMembers = ($) => (index, a) => $(a).text();


const readGuildMembers = (body) => {
  let $ = cheerio.load(body);
  return $('.med-guild')
          .find('div').find('a')
          .map(getGuildMembers($))
          .get();
}

export async function getItemsByGuildUrl(url) {
  return await scrapeByUrl(url, readGuildMembers);
}
