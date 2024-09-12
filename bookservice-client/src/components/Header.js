// src/components/Header.js
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

const Header = ({ username }) => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  const handleMouseEnter = () => {
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    setShowPopover(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <header className="app-header">
      <Link to="/"><h3 className='brand'>Book Service</h3></Link>
      {username && (
        <div className="user-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <h3 className='user'>{username}</h3>
          {showPopover && (
            <div className="popover">
              <div>Hi {username}</div>
              <Link to="/profile">Profile</Link>
              <div onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;