import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className='contact-container'>
      <h1 className='contact-title'>Connect with me</h1>
      <div className='button-container'>
        <a href='#' className='glass-btn' aria-label="Facebook">
          <div className='content'>
            <i className='fab fa-facebook-f'></i>
          </div>
        </a>
        <a href='#' className='glass-btn' aria-label="Instagram">
          <div className='content'>
            <i className='fab fa-instagram'></i>
          </div>
        </a>
        <a href='#' className='glass-btn' aria-label="LinkedIn">
          <div className='content'>
            <i className='fab fa-linkedin-in'></i>
          </div>
        </a>
        <a href='#' className='glass-btn' aria-label="GitHub">
          <div className='content'>
            <i className='fab fa-github'></i>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
