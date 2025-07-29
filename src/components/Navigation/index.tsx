import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

const Navigation = () => {
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  // Função para obter a altura real do viewport usando visualViewport
  const getViewportHeight = useCallback(() => {
    // Usa apenas visualViewport para testar se está funcionando
    if (window.visualViewport && window.visualViewport.height > 0) {
      return window.visualViewport.height
    }

    // Se visualViewport não estiver disponível, retorna 0 para forçar erro
    console.warn('visualViewport não está disponível')
    return 0
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
      // Recalcula imediatamente quando o visualViewport mudar
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

    // Listener específico para visualViewport
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onVisualViewportChange)
      window.visualViewport.addEventListener('scroll', onVisualViewportChange)
    }

    // Intervalo para garantir que as medições estejam sempre corretas
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

      // Calcula a posição atual em relação ao viewport
      const currentSection = Math.round(window.scrollY / currentViewportHeight)

      // Calcula a posição alvo com margem de erro
      const marginError = 1 // pixels de margem para garantir que desça um pouco mais
      const targetPosition =
        currentSection * currentViewportHeight + offset + marginError

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
