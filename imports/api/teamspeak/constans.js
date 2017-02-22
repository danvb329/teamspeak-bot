import { Meteor } from 'meteor/meteor';

const TEAMSPEAK_SETTINGS = Meteor.settings.teamspeak;

const { server_address, port, server_id } = TEAMSPEAK_SETTINGS.queryServer;
const { client_login_name, client_login_password } = TEAMSPEAK_SETTINGS.credentials;

export const SEVER_ADDRESS = server_address;
export const PORT = port;

export const BOT_CREDENTIALS = {
  client_login_name: client_login_name,
  client_login_password: client_login_password,
};

export const SERVER_ID = { sid: server_id };
