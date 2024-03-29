import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav-background">
      <ul className="nav-list">
        <li className='nav-item'>
          <Link to="/">Home</Link>
        </li>
        <li className='nav-item'>
          <Link to="/teamstats">Statistics</Link>
        </li>
        <li className='nav-item'>
            <Link to="/results">Results</Link>
        </li>
        <li className='nav-item'>
          <Link to="/schedule">Schedule</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;