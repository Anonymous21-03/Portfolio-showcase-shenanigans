import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './Home.css'

const SWIPE_THRESHOLD = 100
const CARD_COUNT = 5
const MAX_RADIUS = 200

const cardData = [
  { text: 'React', color: '#61DAFB', contrastColor: '#002b55' },
  { text: 'JavaScript', color: '#F7DF1E', contrastColor: '#333300' },
  { text: 'CSS', color: '#264DE4', contrastColor: '#FFFFFF' },
  { text: 'HTML', color: '#E34F26', contrastColor: '#FFFFFF' },
  { text: 'Node.js', color: '#339933', contrastColor: '#FFFFFF' },
  { text: 'Express', color: '#000000', contrastColor: '#FFFFFF' },
  { text: 'MongoDB', color: '#47A248', contrastColor: '#FFFFFF' },
  { text: 'Redux', color: '#764ABC', contrastColor: '#FFFFFF' },
  { text: 'Vue', color: '#4FC08D', contrastColor: '#003300' },
  { text: 'Angular', color: '#DD0031', contrastColor: '#FFFFFF' },
  { text: 'Python', color: '#3776AB', contrastColor: '#FFFFFF' },
  { text: 'Ruby', color: '#CC342D', contrastColor: '#FFFFFF' },
  { text: 'PHP', color: '#787CB5', contrastColor: '#FFFFFF' },
  { text: 'Java', color: '#007396', contrastColor: '#FFFFFF' },
  { text: 'C#', color: '#239120', contrastColor: '#FFFFFF' },
  { text: 'C++', color: '#00599C', contrastColor: '#FFFFFF' },
  { text: 'Swift', color: '#FA7343', contrastColor: '#FFFFFF' },
  { text: 'Kotlin', color: '#0095D5', contrastColor: '#FFFFFF' },
  { text: 'TypeScript', color: '#3178C6', contrastColor: '#FFFFFF' },
  { text: 'Go', color: '#00ADD8', contrastColor: '#FFFFFF' }
]

const generateRandomPosition = () => ({
  x: Math.random() * (40) - 40,
  y: Math.random() * (40) - 40,
  rotation: Math.random() * 5 - 30,
  scale: Math.random() * 0.1 + 0.95
})

const animations = [
  'slideInCardLeft',
  'slideInCardRight',
  'slideInCardTop',
  'slideInCardBottom'
]
const generateRandomAnimation = () =>
  animations[Math.floor(Math.random() * animations.length)]

const Home = () => {
  const [cardIndex, setCardIndex] = useState(0)
  const [cardPositions, setCardPositions] = useState(() =>
    Array(CARD_COUNT).fill().map(generateRandomPosition)
  )
  const [cardAnimations, setCardAnimations] = useState(() =>
    Array(CARD_COUNT).fill().map(generateRandomAnimation)
  )
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const [isLeaving, setIsLeaving] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    cardData[0].contrastColor
  )

  const resetCardPosition = useCallback(() => {
    setCurrentPosition({ x: 0, y: 0 })
  }, [])

  const throwCard = useCallback(() => {
    setIsLeaving(true)
    const throwDistance = currentPosition.x * 10
    const throwHeight = currentPosition.y * 3
    const finalPosition = {
      x: currentPosition.x + throwDistance,
      y: currentPosition.y + throwHeight
    }
    setCurrentPosition(finalPosition)

    setTimeout(() => {
      setIsReloading(true)
      setCardIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % cardData.length
        setBackgroundColor(cardData[newIndex].contrastColor)
        return newIndex
      })
      setCardPositions(prevPositions => {
        const newPositions = [
          ...prevPositions.slice(1),
          generateRandomPosition()
        ]
        setCardAnimations(prevAnimations => {
          const newAnimations = [
            ...prevAnimations.slice(1),
            generateRandomAnimation()
          ]
          setIsLeaving(false)
          resetCardPosition()
          setTimeout(() => setIsReloading(false), 50)
          return newAnimations
        })
        return newPositions
      })
    }, 300)
  }, [currentPosition, resetCardPosition])

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

  const cardElements = useMemo(
    () =>
      Array(CARD_COUNT)
        .fill()
        .map((_, index) => {
          const cardDataIndex = (cardIndex + index) % cardData.length
          const { text, color } = cardData[cardDataIndex]
          return (
            <div
              key={cardDataIndex}
              className={`card ${index === 0 ? 'top-card' : ''} ${
                index === 0 && isLeaving ? 'leaving' : ''
              } ${isReloading ? 'reloading' : ''}`}
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
            translate(${
              index === 0 ? currentPosition.x : cardPositions[index].x
            }px, 
                      ${
                        index === 0 ? currentPosition.y : cardPositions[index].y
                      }px)
            rotate(${
              index === 0
                ? currentPosition.x * 0.1
                : cardPositions[index].rotation
            }deg)
            scale(${(1 - index * 0.05) * (cardPositions[index].scale || 1)})
            perspective(1000px)
            rotateX(${cardPositions[index].y * 0.1}deg)
            rotateY(${cardPositions[index].x * -0.1}deg)
          `,
                transition: isDragging
                  ? 'none'
                  : 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                opacity: 1 - index * 0.1,
                zIndex: CARD_COUNT - index,
                top: `${index * 5}px`,
                animationName: cardAnimations[index],
                backgroundColor: color // Set card background color
              }}
            >
              <div className='card2'>{text}</div>
            </div>
          )
        }),
    [
      cardIndex,
      cardPositions,
      cardAnimations,
      currentPosition,
      isDragging,
      isLeaving,
      isReloading,
      handleStart
    ]
  )

  return (
    <div className='home-container' style={{ backgroundColor }}>
      <div className='intro'>
        <span>Unleashing</span>
        <span>the</span>
        <span>Creativity</span>
      </div>
      <div className='cards-container'>{cardElements}</div>
    </div>
  )
}

export default Home
