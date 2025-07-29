import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

const Navigation = () => {
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  // Função simples para obter a altura real do viewport
  const getViewportHeight = useCallback(() => {
    // Usa visualViewport que funciona para todos os dispositivos
    if (window.visualViewport && window.visualViewport.height > 0) {
      return window.visualViewport.height
    }

    // Fallback para navegadores antigos
    return window.innerHeight
  }, [])

  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY
    const currentViewportHeight = getViewportHeight()
    const height = document.documentElement.scrollHeight - currentViewportHeight

    setDocumentHeight(height)

    setIsAtTop(scrollY <= 6)
    setIsAtBottom(Math.abs(scrollY - height) <= 6)
  }, [getViewportHeight])

  useEffect(() => {
    const onResize = () => {
      updateScroll()
    }

    const onVisualViewportChange = () => {
      updateScroll()
    }

    const onScroll = () => {
      updateScroll()
    }

    // Atualização inicial
    updateScroll()

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // Listener para visualViewport
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onVisualViewportChange)
      window.visualViewport.addEventListener('scroll', onVisualViewportChange)
    }

    // Intervalo para garantir precisão
    const intervalId = setInterval(updateScroll, 1000)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          onVisualViewportChange
        )
        window.visualViewport.removeEventListener(
          'scroll',
          onVisualViewportChange
        )
      }
    }
  }, [updateScroll])

  const scrollTo = useCallback(
    (offset: number) => {
      const currentViewportHeight = getViewportHeight()

      // Calcula a posição atual baseada na altura real do viewport
      const currentSection = Math.round(window.scrollY / currentViewportHeight)

      // Calcula a posição alvo
      const targetPosition =
        currentSection * currentViewportHeight + offset + 10

      window.scrollTo({
        top: Math.max(0, Math.min(targetPosition, documentHeight)),
        behavior: 'smooth'
      })
    },
    [documentHeight, getViewportHeight]
  )

  const scrollUp = useCallback(() => {
    const currentViewportHeight = getViewportHeight()
    scrollTo(-currentViewportHeight)
  }, [scrollTo, getViewportHeight])

  const scrollDown = useCallback(() => {
    const currentViewportHeight = getViewportHeight()
    scrollTo(currentViewportHeight)
  }, [scrollTo, getViewportHeight])

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
