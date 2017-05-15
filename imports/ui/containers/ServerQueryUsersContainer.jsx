import React from 'react';
import ReactTable from 'react-table';
import { compose } from 'react-komposer';
import { Link, browserHistory } from 'react-router';
import Loader from '/imports/ui/components/shared/Loader';
import trackerComposer from '/imports/ui/composers/tracker';
import ServerQueryUser from '/imports/api/server-query/server-query';
import { removeServerQueryUser } from '/imports/api/server-query/methods';

class ServerQueryUsersContainer extends React.Component {
  deleteUser(_id) {
    const { params } = this.props;
    removeServerQueryUser.call({ _id, clientId: params.clientId }, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
      } else {
        Bert.alert('User Removed', 'success', 'fixed-top', 'fa-check');
      }
    });
  }

  render() {
    const { users, params } = this.props;
    const columns = [{
      Header: 'username',
      accessor: 'username'
    }, {
      Header: 'password',
      accessor: 'password'
    }, {
      Header: 'delete',
      accessor: '_id',
      Cell: props => <a className="button is-danger" onClick={() => this.deleteUser(props.value)}>Delete</a>
    }];

    return (
      <div>
        <Link className="button is-primary" to={"/clients/" + params.clientId + "/server/query/new"}>Create New User</Link>
        <ReactTable
          data={users}
          columns={columns}
        />
      </div>
    )
  }
};

function mapper({ params }, onData) {
  const clientsHandler = Meteor.subscribe('ServerQuery.publications.usersByClientId', params.clientId);
  if (clientsHandler.ready()) {
    const users = ServerQueryUser.find().fetch();
    onData(null, { users })
  }
};

export default compose(trackerComposer(mapper), {
  loadingHandler: () => <Loader text="loading users"/>,
})(ServerQueryUsersContainer);
