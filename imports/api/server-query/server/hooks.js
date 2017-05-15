import _ from 'lodash';
import ServerQueryUser from '/imports/api/server-query/server-query';

ServerQueryUser.before.insert((userId, doc) => {
  const isFirst = ServerQueryUser.find({ clientId: doc.clientId }).count() === 0;
  if (isFirst) _.assign(doc, { isDefault: true });
});
