import TeamSpeakClient from 'node-teamspeak';
import { SEVER_ADDRESS, PORT } from './constans';

export const TEAMSPEAK_SERVER = new TeamSpeakClient(SEVER_ADDRESS, PORT = 10022);
