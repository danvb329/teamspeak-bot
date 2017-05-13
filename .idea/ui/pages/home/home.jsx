import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="">
          <h1 className="home-item big-title">THE ETHAN FREE BOT </h1>
          <div className="home-item">
            <Link to="/list" className="home-item__link">Lists</Link>
          </div>
          <div className="home-item">
            <Link to="/poke" className="home-item__link">Send Pokes</Link>
          </div>
          <div className="home-item">
            <Link to="/channels/drag-all" className="home-item__link">Drag To Channel</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;
