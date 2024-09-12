// src/components/Header.js
import React from 'react';
import './Header.css'; // Import the CSS file

const Header = ({ username }) => {
  return (
    <header className="app-header">
      <h3 className='brand'>Book Service</h3>
      {username && <h3 className='user'>{username}</h3>}
    </header>
  );
};

export default Header;