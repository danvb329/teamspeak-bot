import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    Meteor.logout(() => {
      Bert.alert('Good Bye', 'success', 'fixed-top', 'fa-check');
      browserHistory.push('/');
    });
  }

  render() {
    const { authenticated } = this.props;
    return (
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-item">
            <img src="/images/teamspeak-logo.jpeg" alt="Teamspeak Logo" />
          </a>
        </div>
        <div className="nav-center">
          <a className="nav-item" target="_blank" href="https://github.com/Ethaan/teamspeak-bot">
            <span className="icon">
              <i className="fa fa-github"></i>
            </span>
          </a>
          <a className="nav-item" target="_blank" href="https://twitter.com/EasyWithEthan">
            <span className="icon">
              <i className="fa fa-twitter"></i>
            </span>
          </a>
        </div>
        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="nav-right nav-menu">
          {
            authenticated ?
            <div className="nav-item">
              <Link className="nav-item" to="/client/new">
                Clients
              </Link>
              <a className="nav-item" onClick={this.logout}>
                Logout
              </a>
            </div> :
            <div className="nav-item">
              <Link className="nav-item" to="/login">
                Login
              </Link>
              <Link className="nav-item" to="/register">
                Register
              </Link>
            </div>
          }
        </div>
      </nav>
    )
  }
}

export default Navbar;
