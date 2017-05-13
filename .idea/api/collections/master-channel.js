import { Mongo } from 'meteor/mongo';

const MasterChannel = new Mongo.Collection('masterChannel');

export default MasterChannel;
