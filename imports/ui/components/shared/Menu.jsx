import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
  isActive(paths) {
    return paths.indexOf(this.props.pathName) > -1 ? 'is-active' : '';
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
                </Link>
                <ul>
                  <li>
                    <Link
                      to={"/clients/" + _id + "/server/query"}
                      className={this.isActive([])}>
                      QueryServer Users
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
