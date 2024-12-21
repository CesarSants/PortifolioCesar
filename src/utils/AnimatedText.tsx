import React, { useEffect, useState } from 'react'

type AnimatedTextProps = {
  textArray: string[]
  typingDelay?: number
  erasingDelay?: number
  newTextDelay?: number
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  textArray,
  typingDelay = 100,
  erasingDelay = 150,
  newTextDelay = 1000
}) => {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [arrayIndex, setArrayIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (charIndex < textArray[arrayIndex].length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + textArray[arrayIndex][charIndex])
          setCharIndex((prev) => prev + 1)
        }, typingDelay)
      } else {
        timeout = setTimeout(() => setIsTyping(false), newTextDelay)
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1))
          setCharIndex((prev) => prev - 1)
        }, erasingDelay)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true)
          setArrayIndex((prev) => (prev + 1) % textArray.length)
        }, typingDelay)
      }
    }

    return () => clearTimeout(timeout)
  }, [
    charIndex,
    isTyping,
    textArray,
    arrayIndex,
    typingDelay,
    erasingDelay,
    newTextDelay
  ])

  return <span className="texto-animado">{text}</span>
}

export default AnimatedText
