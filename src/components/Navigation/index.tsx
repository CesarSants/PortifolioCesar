import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

const Navigation = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)

  // Função para obter a altura real do viewport considerando dispositivos móveis
  const getViewportHeight = useCallback(() => {
    // Prioriza visualViewport se disponível (melhor para dispositivos móveis)
    if (window.visualViewport) {
      return window.visualViewport.height
    }

    // Fallback para navegadores que não suportam visualViewport
    return window.innerHeight
  }, [])

  // Função para detectar se é um dispositivo móvel
  const isMobileDevice = useCallback(() => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    )
  }, [])

  // Função para obter a altura do viewport usando dvh se disponível
  const getDvhHeight = useCallback(() => {
    if (typeof window !== 'undefined' && CSS.supports('height', '100dvh')) {
      // Cria um elemento temporário para medir 100dvh
      const tempElement = document.createElement('div')
      tempElement.style.height = '100dvh'
      tempElement.style.position = 'absolute'
      tempElement.style.visibility = 'hidden'
      tempElement.style.pointerEvents = 'none'
      document.body.appendChild(tempElement)

      const dvhHeight = tempElement.offsetHeight
      document.body.removeChild(tempElement)

      return dvhHeight
    }

    return getViewportHeight()
  }, [getViewportHeight])

  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY
    const currentViewportHeight = isMobileDevice()
      ? getDvhHeight()
      : getViewportHeight()
    const height = document.documentElement.scrollHeight - currentViewportHeight

    setScrollPosition(scrollY)
    setDocumentHeight(height)
    setViewportHeight(currentViewportHeight)

    setIsAtTop(scrollY <= 6)
    setIsAtBottom(Math.abs(scrollY - height) <= 6)
  }, [getViewportHeight, getDvhHeight, isMobileDevice])

  useEffect(() => {
    const onResize = () => {
      // Pequeno delay para garantir que as mudanças do viewport foram aplicadas
      setTimeout(updateScroll, 100)
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
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    // Listener específico para visualViewport (dispositivos móveis)
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
      const currentViewportHeight = isMobileDevice()
        ? getDvhHeight()
        : getViewportHeight()

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
    [documentHeight, getViewportHeight, getDvhHeight, isMobileDevice]
  )

  const scrollUp = useCallback(() => {
    const currentViewportHeight = isMobileDevice()
      ? getDvhHeight()
      : getViewportHeight()
    scrollTo(-currentViewportHeight)
  }, [scrollTo, getViewportHeight, getDvhHeight, isMobileDevice])

  const scrollDown = useCallback(() => {
    const currentViewportHeight = isMobileDevice()
      ? getDvhHeight()
      : getViewportHeight()
    scrollTo(currentViewportHeight)
  }, [scrollTo, getViewportHeight, getDvhHeight, isMobileDevice])

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
