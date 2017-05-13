import _ from 'lodash';
import { TEAMSPEAK_SERVER } from './utils';

export async function createChannel(channel) {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('channelcreate', _.omitBy(channel, _.isNil), (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

export async function findChannel(channelName) {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('channelfind', {
      pattern: channelName,
    }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

export async function getChannels() {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('channellist', (error, result) => {
      console.log(error);
      if (error) reject(error);
      resolve(result);
    });
  });
};

export async function channelEdit(chanelData) {
  return new Promise((resolve, reject) => {
    TEAMSPEAK_SERVER.send('channeledit', chanelData, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

export async function deleteChannel(cid) {
  return new Promise((resolve, reject) => {
    const channelDelete = Object.assign({}, cid, { force: 1 });
    TEAMSPEAK_SERVER.send('channeldelete', channelDelete, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}
