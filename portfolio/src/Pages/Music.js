import React, { useEffect, useRef } from 'react';
import './Music.css';

const Music = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Container is intersecting");
          imageRef.current.classList.add('slide-in');
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Fallback: If the image doesn't slide in after 2 seconds, force it to slide in
    const timer = setTimeout(() => {
      if (imageRef.current && !imageRef.current.classList.contains('slide-in')) {
        console.log("Forcing slide-in");
        imageRef.current.classList.add('slide-in');
      }
    }, 2000);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className='music-container' ref={containerRef}>
      <div className='background-image' ref={imageRef}></div>
      <div className='content'>
        <h2>Music Section</h2>
        {/* Add your text content here */}
      </div>
    </div>
  );
}

export default Music;
