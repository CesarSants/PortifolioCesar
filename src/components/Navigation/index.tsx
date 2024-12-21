import React, { useEffect, useState } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

const Navigation = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight

      setScrollPosition(scrollY)
      setDocumentHeight(height)

      setIsAtTop(scrollY <= 0)
      setIsAtBottom(Math.abs(scrollY - height) <= 0)
    }

    window.addEventListener('scroll', updateScroll)
    updateScroll()

    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  const scrollTo = (offset: number) => {
    const targetPosition =
      Math.round(window.scrollY / window.innerHeight) * window.innerHeight +
      offset +
      -2
    window.scrollTo({
      top: Math.max(0, Math.min(targetPosition, documentHeight)),
      behavior: 'smooth'
    })
  }

  const scrollUp = () => scrollTo(-window.innerHeight)
  const scrollDown = () => scrollTo(window.innerHeight)

  return (
    <NavigationContainer>
      {!isAtTop && (
        <NavigationButton onClick={scrollUp} data-direction="up">
          ↑
        </NavigationButton>
      )}
      {!isAtBottom && (
        <NavigationButton onClick={scrollDown} data-direction="down">
          ↓
        </NavigationButton>
      )}
    </NavigationContainer>
  )
}

export default Navigation
