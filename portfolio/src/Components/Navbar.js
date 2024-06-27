// Navbar.js

import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <div className='png'></div>
        <div className='logo-text'>RAHUL.DEV</div>
      </div>
      <div className='menu'>
        <ul className='menu-list'>
          <li className='menu-item'>Home</li>
          <li className='menu-item'>About</li>
          <li className='menu-item'>Portfolio</li>
          <li className='menu-item'>Contact</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
