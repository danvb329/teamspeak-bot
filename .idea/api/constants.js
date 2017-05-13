const TEAMSPEAK_SETTINGS = Meteor.settings.teamspeak;

export const VOCATIONS_ICONS = {
  'http://i.imgur.com/qAXsL2J.png': 'Druid',
  'http://i.imgur.com/rYWmtmw.png': 'Paladin',
  'http://i.imgur.com/jMWSztQ.png': 'Sorcerer',
  'http://i.imgur.com/sKqEwqU.png': 'Knight'
};

export const CHANNELS_TO_CREATE_ON_INIT = [
  {
    channel_name: TEAMSPEAK_SETTINGS.BOT_TOP_CHANNEL,
    type: 'isTop'
  },
  {
    channel_name: TEAMSPEAK_SETTINGS.BOT_MIDDLE_CHANNEL,
    type: 'isParent',
  },
  {
    channel_name: TEAMSPEAK_SETTINGS.BOT_BOTTOM_CHANNEL,
    type: 'isBottom',
  },
  {
    channel_name: TEAMSPEAK_SETTINGS.ENEMY_CHANNELS_PARENT_NAME,
    isEnemyParent: true,
  },
  {
    channel_name: TEAMSPEAK_SETTINGS.FRIENDS_CHANNELS_PARENT_NAME,
    isFriendParent: true,
  }
]
