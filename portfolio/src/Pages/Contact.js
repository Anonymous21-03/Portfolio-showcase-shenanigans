import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div className='contact-container'>
      <h1 className='contact-title'>Connect with me</h1>
      <div className='wrapper'>
        <a href='https://www.facebook.com/rahul.pardasani.3' target='blank' className='icon facebook'>
          <div className='tooltip'>Facebook</div>
          <span><FontAwesomeIcon icon={faFacebookF} /></span>
        </a>
        <a href='https://www.instagram.com/anonymous_21.03/' target='blank' className='icon instagram'>
          <div className='tooltip'>Instagram</div>
          <span><FontAwesomeIcon icon={faInstagram} /></span>
        </a>
        <a href='https://www.linkedin.com/in/rahul-pardasani-0a6aab290/' target='blank' className='icon linkedin'>
          <div className='tooltip'>LinkedIn</div>
          <span><FontAwesomeIcon icon={faLinkedinIn} /></span>
        </a>
        <a href='https://github.com/Anonymous21-03/' target='blank' className='icon github'>
          <div className='tooltip'>GitHub</div>
          <span><FontAwesomeIcon icon={faGithub} /></span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
