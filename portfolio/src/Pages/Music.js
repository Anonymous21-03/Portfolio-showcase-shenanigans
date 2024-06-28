import React, { useEffect, useRef } from 'react';
import './Music.css';

const Music = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Container is intersecting");
          contentRef.current.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Fallback: If the content doesn't become visible after 2 seconds, force it to be visible
    const timer = setTimeout(() => {
      if (contentRef.current && !contentRef.current.classList.contains('visible')) {
        console.log("Forcing content visibility");
        contentRef.current.classList.add('visible');
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
      <div className='content' ref={contentRef}>
        <h2>Music Section</h2>
        {/* Add your text content here */}
      </div>
    </div>
  );
}

export default Music;
