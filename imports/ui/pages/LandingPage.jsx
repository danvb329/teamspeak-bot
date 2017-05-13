import React from 'react';

class LandingPage extends React.Component {
  render() {
    const SUPPORTED_BOT_SERVERS = [{
      name: 'Tibia',
      url: 'http://www.tibia.com/news/?subtopic=latestnews',
    }, {
      name: 'Medivia',
      url: 'https://medivia.online/'
    }]
    return (
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                About
              </h1>
              <div className="">
                <article className="message">
                  <div className="message-body">
                    <span>Change names, world transfers, premmys, even addons are expensive, so why dont have a warbot + other tools for free? </span> <br />
                    <ul className="menu-list">
                      <li><a>Currently supportting</a></li>
                      <li>
                        <ul>
                          {SUPPORTED_BOT_SERVERS.map(({ name, url}) => (
                            <li key={name}><a target="_blank" href={url}>{ name }</a></li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

export default LandingPage;
