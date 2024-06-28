import React, { useEffect, useRef } from 'react'
import './Certificates.css'
import pwcImage from './certs/PwC-PowerBI.png'
import accentureImage from './certs/Accenture-DA&V.png'
import tataImage from './certs/Tata-DA&V.png'
import ethicalImage from './certs/Ethical.png'

const Certificates = () => {
  const certificates = [
    { title: 'Power BI - PwC Switzerland', issuer: 'Forage', year: 2024, image: pwcImage },
    { title: 'Data Analytics and Visualization - Accenture', issuer: 'Forage', year: 2024, image: accentureImage },
    { title: 'Data Visualization - Tata', issuer: 'Forage', year: 2024, image: tataImage },
    { title: 'Ethical Hacking and Penetration Testing', issuer: 'TechGyan', year: 2022, image: ethicalImage },
  ]

  useEffect(() => {
    const items = document.querySelectorAll('.cert-card');
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    const observeItems = () => {
      items.forEach((item) => {
        observer.observe(item);
      });
    };
  
    observeItems();
  
    const handleResize = () => {
      observeItems();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='cert-container'>
      <h2>My Certificates</h2>
      <div className='cert-grid'>
        {certificates.map((cert, index) => (
          <div key={index} className={`cert-card ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="cert-card-inner">
              <div className="cert-card-front">
                <h3>{cert.title}</h3>
                <p>Issuer: {cert.issuer}</p>
                <p>Year: {cert.year}</p>
              </div>
              <div className="cert-card-back">
                <img src={cert.image} alt={`${cert.title} Certificate`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Certificates
