import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ 
  scrollToSection, 
  homeRef, 
  aboutRef, 
  timelineRef, 
  technologiesRef, 
  certificatesRef, 
  contactRef 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <div className='logo'>
        <div className='png'></div>
        <div className='logo-text'>RAHUL.IO</div>
      </div>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className='menu-list'>
          <li className='menu-item' onClick={() => { closeMenu(); scrollToSection(homeRef); }}>Home</li>
          <li className='menu-item' onClick={() => { closeMenu(); scrollToSection(aboutRef); }}>About</li>
          <li className='menu-item' onClick={() => { closeMenu(); scrollToSection(timelineRef); }}>Education</li>
          <li className='menu-item' onClick={() => { closeMenu(); scrollToSection(technologiesRef); }}>Technologies</li>
          <li className='menu-item' onClick={() => { closeMenu(); scrollToSection(certificatesRef); }}>Certification</li>
          <li className='menu-item' onClick={() => { closeMenu(); scrollToSection(contactRef); }}>Contact</li>
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