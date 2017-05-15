import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { removeClient } from '/imports/api/clients/methods';

class Menu extends React.Component {
  isActive(paths) {
    return paths.indexOf(this.props.pathName) > -1 ? 'is-active' : '';
  }

  onDeleteClient(_id) {
    if (confirm('Are you sure? all data will be lost')) {
      removeClient.call({ _id }, (error, result) => {
        if (error) {
          Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-frown-o');
        } else {
          Bert.alert('Client Removed', 'success', 'fixed-top', 'fa-check');
          browserHistory.push('/client/new');
        }
      });
    }
  }

  render() {
    const { clients } = this.props;
    return (
      <aside className="menu clients-menu">
        <p className="menu-label">
          General
        </p>
        <ul className="menu-list">
          <li>
            <Link
              to="/client/new"
              className={this.isActive(['clients', '/clients'])}
            >
              Create Clients
            </Link>
          </li>
        </ul>
        <p className="menu-label">
          Current Clients
        </p>
        <ul className="menu-list">
          {clients.map(({ _id, hostname }) => (
            <div key={_id}>
              <li>
                <Link
                  to={"/clients/" + _id}
                  className={this.isActive([])}
                >
                  <strong>{hostname}</strong>
                  <button
                    onClick={() => this.onDeleteClient(_id)}
                    className="delete delete-right"
                  ></button>
                </Link>
                <ul>
                  <li>
                    <Link
                      to={"/clients/" + _id + "/server/query"}
                      className={this.isActive([])}>
                      QueryServer Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/clients/" + _id + "/server/status"}
                      className={this.isActive([])}>
                      Server Status
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          ))}
        </ul>
      </aside>
    )
  }
}

export default Menu;
