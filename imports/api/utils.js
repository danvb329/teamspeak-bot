import _ from 'lodash';
import MasterChannel from '/imports/api/collections/master-channel';
import { VOCATIONS_ICONS, CHANNELS_TO_CREATE_ON_INIT } from './constants';
import { createChannel, getChannels, findChannel } from '/imports/api/teamspeak/channels';

export const sortByProfessions = (items) => {
  const sorting = [
    'Master Sorcerer',
    'Sorcerer',
    'Elite Knight',
    'Knight',
    'Elder Druid',
    'Druid',
    'Royal Paladin',
    'Paladin',
  ];

  return items.sort((a, b) => {
    return sorting.indexOf(a.vocation) < sorting.indexOf(b.vocation) ? -1 : 1;
  });
};

export const getVocationIcon = (vocation) => {
  const iconUrl = _.findKey(VOCATIONS_ICONS, voc => vocation.indexOf(voc) > -1);
  return `[IMG]${iconUrl}[/IMG]`;
};

export const buildCharacterDescription = (character) => {
  const { name, vocation, level } = character;
  return `${getVocationIcon(vocation)} ${name} - ${vocation} - ${level} \n`;
};

async function createInitialChannel({
  channel_name,
  isChild,
  channelOrderUI,
  cid,
  type,
  query,
}) {
  let cpid;
  let channel_order;
  const channels = await getChannels();
  const channel = query && MasterChannel.findOne({ _id: query });
  if (isChild) {
    cpid = channel.cid;
  } else {
    if (query) {
      let index;
      const channelFromQuery = await findChannel(channel.channel_name);
      for (let i = 0; i < channels.length; i++) {
        if (channels[i].cid === channelFromQuery.cid) {
          index = i + 1;
        }
      }
      channel_order = channels[index].channel_order;
    } else {
      channel_order =  channelOrderUI;
      channelOrder= channelOrderUI;
    }
  }
  const descriptionChannel = await createChannel({
    cpid,
    channel_name,
    channel_order,
    channel_flag_permanent: 1,
  });
  return new Promise((resolve, reject) => {
    MasterChannel.insert({
      type,
      channel_name,
      channelOrder,
      cid: descriptionChannel.cid,
    }, (error, result) => {
      if (error) reject(error);
      resolve(result)
    });
  })
};

export async function initBotChannels(channelOrderUI) {
  const parentChannelId = await createInitialChannel({
    channel_name: CHANNELS_TO_CREATE_ON_INIT[0].channel_name,
    channelOrderUI,
    type: 'parent'
  });
  const descriptionBotChannel = await createInitialChannel({
    channel_name: CHANNELS_TO_CREATE_ON_INIT[1].channel_name,
    type: 'botDescription',
    query: parentChannelId
  });
  const bottomChannelId = await createInitialChannel({
    channel_name: CHANNELS_TO_CREATE_ON_INIT[2].channel_name,
    type: 'bottom',
    query: descriptionBotChannel,
  });
  const enemyBotChannelParent = await createInitialChannel({
    channel_name: CHANNELS_TO_CREATE_ON_INIT[3].channel_name,
    type:'enemys',
    query: descriptionBotChannel,
    isChild: true,
  });
  const friendBotChannelParent = await createInitialChannel({
    channel_name: CHANNELS_TO_CREATE_ON_INIT[4].channel_name,
    type: 'friends',
    isChild: true,
    query: descriptionBotChannel
  });
};

export const capitalizeString = (str) => _.toUpper(str)
