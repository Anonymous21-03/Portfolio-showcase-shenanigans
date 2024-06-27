import React, { useEffect } from 'react';
import './Timeline.css';

const Timeline = () => {
  const educationData = [
    {
      year: '2020',
      institution: 'High School',
      description: 'Completed high school with honors in science and mathematics.',
    },
    {
      year: '2022',
      institution: 'Community College',
      description: "Earned an Associate's degree in Computer Science.",
    },
    {
      year: '2024',
      institution: 'University',
      description: "Currently pursuing a Bachelor's degree in Data Science.",
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className='timeline-container'>
      <h1>My Educational Journey</h1>
      <div className='timeline'>
        {educationData.map((item, index) => (
          <div key={index} className='timeline-item'>
            <div className='timeline-content'>
              <h2>{item.year}</h2>
              <h3>{item.institution}</h3>
              <p>{item.description}</p>
            </div>
            <div className='timeline-dot'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
