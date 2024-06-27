import React, { useEffect, useState } from 'react'
import './About.css'
import doodleImage from './doodle.jpeg'

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const createStars = () => {
      const stars = document.querySelector('.stars')
      const starCount = 50

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.setProperty(
          '--star-tail-length',
          `${6 + Math.random() * 3}em`
        )
        star.style.setProperty('--top-offset', `${Math.random() * 100}%`)
        star.style.setProperty('--fall-duration', `${Math.random() * 6 + 6}s`)
        star.style.setProperty('--fall-delay', `${Math.random() * 10}s`)
        stars.appendChild(star)
      }
    }

    createStars()

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const aboutSection = document.querySelector('.about-container');
      const aboutSectionPosition = aboutSection.offsetTop;

      if (scrollPosition > aboutSectionPosition - window.innerHeight / 2) {
        setIsVisible(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className='about-container'>
      <div className='photo-section'>
        <div className='stars'></div>
        <div className={`image-container ${isVisible ? 'visible' : ''}`}>
          <img src={doodleImage} alt="Doodle" className='profile-image' />
          <div className='name'>Rahul Pardasani</div>
        </div>
      </div>
      <div className='text-section'>
        <div className={`greeting ${isVisible ? 'visible' : ''}`}>
          Su Swagatam
          <hr />
        </div>
        <div className={`text ${isVisible ? 'visible' : ''}`}>
          As a passionate college student, I'm developing a versatile skill set
          in data science and web development. I'm honing my abilities in
          Python, Pandas, and machine learning, while also crafting interactive
          web experiences with React. My projects explore the intersection of
          data analysis and user-friendly design. I'm excited to apply these
          skills in real-world scenarios and continue growing as a technologist.
        </div>
      </div>
    </div>
  )
}

export default About