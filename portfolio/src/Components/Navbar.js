import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <div className='png'></div>
        <div className='logo-text'>RAHUL.IO</div>
      </div>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className='menu-list'>
          <li className='menu-item'>Home</li>
          <li className='menu-item'>About</li>
          <li className='menu-item'>Portfolio</li>
          <li className='menu-item'>Contact</li>
        </ul>
      </div>
      <div className='menu-toggle' onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar;