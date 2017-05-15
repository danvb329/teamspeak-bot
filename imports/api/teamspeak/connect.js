import TeamSpeakClient from 'node-teamspeak';

export const initTeamspeak = ({ hostname, hostnamePort }) => new TeamSpeakClient(hostname, hostnamePort)
