import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './Home.css'

const SWIPE_THRESHOLD = 5
const CARD_COUNT = 5
const MAX_RADIUS = 200

const cardData = [
  { text: 'React', color: '#61DAFB', contrastColor: '#E6F7FE', intro: 'Building UIs' },
  { text: 'JavaScript', color: '#F7DF1E', contrastColor: '#FFFDE6', intro: 'Scripting the Web' },
  { text: 'CSS', color: '#264DE4', contrastColor: '#E6E9FC', intro: 'Styling with Flair' },
  { text: 'HTML', color: '#E34F26', contrastColor: '#FCE9E6', intro: 'Structuring Content' },
  { text: 'Node.js', color: '#339933', contrastColor: '#E8F5E8', intro: 'Powering Servers' },
  { text: 'Express', color: '#000000', contrastColor: '#F2F2F2', intro: 'Routing Made Easy' },
  { text: 'MongoDB', color: '#47A248', contrastColor: '#EAF5EA', intro: 'Storing Data' },
  { text: 'Redux', color: '#764ABC', contrastColor: '#F0E9FA', intro: 'Managing State' },
  { text: 'Vue', color: '#4FC08D', contrastColor: '#EAF8F3', intro: 'Progressive Apps' },
  { text: 'Angular', color: '#DD0031', contrastColor: '#FBE6EA', intro: 'Scaling Apps' },
  { text: 'Python', color: '#3776AB', contrastColor: '#E8F0F8', intro: 'Coding Versatility' },
  { text: 'Ruby', color: '#CC342D', contrastColor: '#FAE8E7', intro: 'Programmer\'s Best Friend' },
  { text: 'PHP', color: '#787CB5', contrastColor: '#F0F1F8', intro: 'Dynamic Web Pages' },
  { text: 'Java', color: '#007396', contrastColor: '#E6F0F3', intro: 'Enterprise Solutions' },
  { text: 'C#', color: '#239120', contrastColor: '#E7F4E6', intro: '.NET Development' },
  { text: 'C++', color: '#00599C', contrastColor: '#E6EEF5', intro: 'High Performance' },
  { text: 'Swift', color: '#FA7343', contrastColor: '#FEF0EA', intro: 'iOS Development' },
  { text: 'Kotlin', color: '#0095D5', contrastColor: '#E6F4FA', intro: 'Modern Android' },
  { text: 'TypeScript', color: '#3178C6', contrastColor: '#E7F0F9', intro: 'Typed JavaScript' },
  { text: 'Go', color: '#00ADD8', contrastColor: '#E6F6FB', intro: 'Efficient Concurrency' }
];

const generateRandomPosition = () => ({
  x: Math.random() * (40) - 40,
  y: Math.random() * (40) - 40,
  rotation: Math.random() * 5 - 30,
  scale: Math.random() * 0.1 + 0.95
})

const generateInitialPosition = () => {
  const directions = ['left', 'right', 'top', 'bottom'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  const offset = 1000 + Math.random() * 1000; // Random offset between 1000 and 1500
  switch (direction) {
    case 'left': return { x: -offset, y: 0 };
    case 'right': return { x: offset, y: 0 };
    case 'top': return { x: 0, y: -offset };
    case 'bottom': return { x: 0, y: offset };
    default: return { x: 0, y: 0 };
  }
};

const Home = () => {
  const [cardIndex, setCardIndex] = useState(0)
  const [cardPositions, setCardPositions] = useState(() =>
    Array(CARD_COUNT).fill().map(generateRandomPosition)
  )
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const [isLeaving, setIsLeaving] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    cardData[0].contrastColor
  )
  const [introText, setIntroText] = useState(cardData[0].intro)
  const [autoThrowActive, setAutoThrowActive] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [initialPositions] = useState(() =>
    Array(CARD_COUNT).fill().map(generateInitialPosition)
  )

  const resetCardPosition = useCallback(() => {
    setCurrentPosition({ x: 0, y: 0 })
  }, [])

  const throwCard = useCallback((fromAutoThrow = false) => {
    if (isLeaving || isReloading) return;

    setIsLeaving(true)
    let throwDistance, throwHeight;
    
    if (fromAutoThrow) {
      throwDistance = (Math.random() - 0.5) * 300;
      throwHeight = (Math.random() - 0.5) * 100;
      setCurrentPosition({ x: throwDistance, y: throwHeight });
    } else {
      throwDistance = currentPosition.x * 10;
      throwHeight = currentPosition.y * 3;
    }

    const finalPosition = {
      x: throwDistance,
      y: throwHeight
    }

    setTimeout(() => {
      setCurrentPosition(finalPosition)
    }, 50)

    setTimeout(() => {
      setIsReloading(true)
      setCardIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % cardData.length
        setBackgroundColor(cardData[newIndex].contrastColor)
        setIntroText(cardData[newIndex].intro)
        return newIndex
      })
      setCardPositions(prevPositions => {
        const newPositions = [
          ...prevPositions.slice(1),
          generateRandomPosition()
        ]
        setIsLeaving(false)
        resetCardPosition()
        setTimeout(() => setIsReloading(false), 50)
        return newPositions
      })
    }, 300)
  }, [currentPosition, resetCardPosition, isLeaving, isReloading, setBackgroundColor])

  const handleStart = useCallback((clientX, clientY) => {
    setIsDragging(true)
    setStartPosition({ x: clientX, y: clientY })
    setCurrentPosition({ x: 0, y: 0 })
  }, [])

  const handleMove = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return

      const deltaX = clientX - startPosition.x
      const deltaY = clientY - startPosition.y
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      if (distance <= MAX_RADIUS) {
        setCurrentPosition({ x: deltaX, y: deltaY })
      } else {
        const angle = Math.atan2(deltaY, deltaX)
        const constrainedX = Math.cos(angle) * MAX_RADIUS
        const constrainedY = Math.sin(angle) * MAX_RADIUS
        setCurrentPosition({ x: constrainedX, y: constrainedY })
      }
    },
    [isDragging, startPosition]
  )

  const handleEnd = useCallback(() => {
    if (isDragging) {
      const distance = Math.sqrt(
        currentPosition.x ** 2 + currentPosition.y ** 2
      )
      setIsDragging(false)
      if (distance > SWIPE_THRESHOLD) {
        throwCard()
      } else {
        resetCardPosition()
      }
    }
  }, [isDragging, currentPosition, throwCard, resetCardPosition])

  const autoThrow = useCallback(() => {
    if (!isDragging && !isLeaving && !isReloading) {
      throwCard(true);
    }
  }, [isDragging, isLeaving, isReloading, throwCard])

  useEffect(() => {
    let interval;
    if (autoThrowActive) {
      interval = setInterval(autoThrow, 3000);
    }
    return () => clearInterval(interval);
  }, [autoThrowActive, autoThrow]);

  useEffect(() => {
    const handleGlobalMouseMove = e =>
      isDragging && handleMove(e.clientX, e.clientY)
    const handleGlobalTouchMove = e => {
      if (isDragging) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('touchmove', handleGlobalTouchMove, {
      passive: false
    })
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('touchmove', handleGlobalTouchMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleMove, handleEnd])

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const cardElements = useMemo(
    () =>
      Array(CARD_COUNT)
        .fill()
        .map((_, index) => {
          const cardDataIndex = (cardIndex + index) % cardData.length;
          const { text, color } = cardData[cardDataIndex];
          const initialPosition = initialPositions[index];
          
          return (
            <div
              key={cardDataIndex}
              className={`card ${index === 0 ? 'top-card' : ''} ${
                index === 0 && isLeaving ? 'leaving' : ''
              } ${isReloading ? 'reloading' : ''} ${
                initialLoadComplete ? 'initial-load' : ''
              }`}
              onMouseDown={
                index === 0 ? e => handleStart(e.clientX, e.clientY) : undefined
              }
              onTouchStart={
                index === 0
                  ? e => handleStart(e.touches[0].clientX, e.touches[0].clientY)
                  : undefined
              }
              style={{
                transform: `
                  translate(${initialLoadComplete ? (index === 0 ? currentPosition.x : cardPositions[index].x) : initialPosition.x}px, 
                            ${initialLoadComplete ? (index === 0 ? currentPosition.y : cardPositions[index].y) : initialPosition.y}px)
                  rotate(${initialLoadComplete ? (index === 0 ? currentPosition.x * 0.1 : cardPositions[index].rotation) : 0}deg)
                  scale(${initialLoadComplete ? (1 - index * 0.05) * (cardPositions[index].scale || 1) : 1})
                `,
                transition: isDragging
                  ? 'none'
                  : `all ${0.5 + index * 0.1}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
                opacity: isLeaving && index === 0 ? 0 : 1,
                zIndex: CARD_COUNT - index,
                top: initialLoadComplete ? `${index * 5}px` : '0px',
                backgroundColor: color,
                transitionDelay: !initialLoadComplete ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className='card2'>{text}</div>
            </div>
          );
        }),
    [
      cardIndex,
      cardPositions,
      currentPosition,
      isDragging,
      isLeaving,
      isReloading,
      handleStart,
      initialLoadComplete,
      initialPositions,
    ]
  );

  return (
    <div className='home-container' style={{ backgroundColor }}>
      <div className='content-wrapper'>
        <div className='intro'>
          <span>{introText}</span>
        </div>
        <div className='cards-container'>
          {cardElements}
          <div className='card-instruction'>
            Psst! These cards aren't just eye candy. Give 'em a swipe and watch the magic unfold!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home