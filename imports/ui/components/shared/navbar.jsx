import React from 'react';

class Navbar extends React.Component {
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
          <a className="nav-item" href="https://github.com/Ethaan/teamspeak-bot">
            <span className="icon">
              <i className="fa fa-github"></i>
            </span>
          </a>
          <a className="nav-item" href="https://twitter.com/EasyWithEthan">
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
              <a className="nav-item">
                BOT Lists
              </a>
            </div> :
            <div className="nav-item">
              <a className="nav-item">
                Login
              </a>
              <a className="nav-item">
                Signup
              </a>
            </div>
          }
        </div>
      </nav>
    )
  }
}

export default Navbar;
