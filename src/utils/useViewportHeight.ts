import { useEffect, useRef, useCallback, useState } from 'react'

interface ViewportState {
  currentHeight: number
  totalHeight: number
  userPosition: number
  userRelativePosition: number
  isAdjusting: boolean
}

export const useViewportHeight = () => {
  const [currentHeight, setCurrentHeight] = useState(0)
  const [totalHeight, setTotalHeight] = useState(0)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [userPosition, setUserPosition] = useState(0)

  const stateRef = useRef<ViewportState>({
    currentHeight: 0,
    totalHeight: 0,
    userPosition: 0,
    userRelativePosition: 0,
    isAdjusting: false
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastHeightChange = useRef(0)

  const getViewportHeight = useCallback(() => {
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      return window.visualViewport?.height || window.innerHeight
    }
    return window.innerHeight
  }, [])

  const getScrollPosition = useCallback(() => {
    return window.pageYOffset || document.documentElement.scrollTop
  }, [])

  const getTotalHeight = useCallback(() => {
    return document.documentElement.scrollHeight
  }, [])

  const calculateUserRelativePosition = useCallback(
    (scrollTop: number, totalHeight: number, viewportHeight: number) => {
      const maxScroll = Math.max(0, totalHeight - viewportHeight)
      if (maxScroll === 0) return 0
      return (scrollTop / maxScroll) * 100
    },
    []
  )

  const maintainUserPosition = useCallback(
    (
      heightDifference: number,
      userRelativePosition: number,
      newTotalHeight: number,
      newViewportHeight: number
    ) => {
      // Calcula a nova posição baseada na posição relativa anterior
      const maxScroll = Math.max(0, newTotalHeight - newViewportHeight)
      const targetScroll = (userRelativePosition / 100) * maxScroll

      // Aplica scroll suave para manter a posição relativa
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })

      console.log('ViewportScrollFix - POSIÇÃO MANTIDA:', {
        heightDifference: heightDifference + 'px',
        userRelativePosition: userRelativePosition.toFixed(1) + '%',
        targetScroll: Math.round(targetScroll) + 'px',
        timestamp: new Date().toLocaleTimeString()
      })
    },
    []
  )

  const monitorHeightChanges = useCallback(() => {
    const currentScroll = getScrollPosition()
    const currentTotalHeight = getTotalHeight()
    const currentViewportHeight = getViewportHeight()
    const now = Date.now()

    // Atualiza os estados para o componente
    setCurrentHeight(currentViewportHeight)
    setTotalHeight(currentTotalHeight)
    setUserPosition(currentScroll)

    // Se é a primeira vez, inicializa
    if (stateRef.current.totalHeight === 0) {
      stateRef.current.currentHeight = currentViewportHeight
      stateRef.current.totalHeight = currentTotalHeight
      stateRef.current.userPosition = currentScroll

      const initialRelativePosition = calculateUserRelativePosition(
        currentScroll,
        currentTotalHeight,
        currentViewportHeight
      )
      stateRef.current.userRelativePosition = initialRelativePosition
      lastHeightChange.current = now

      return
    }

    // Detecta mudanças na altura total da página
    const totalHeightChanged =
      Math.abs(currentTotalHeight - stateRef.current.totalHeight) > 2
    const timeSinceLastChange = now - lastHeightChange.current

    // Se a altura total mudou e não estamos ajustando, mantém a posição do usuário
    if (
      totalHeightChanged &&
      !stateRef.current.isAdjusting &&
      timeSinceLastChange > 150
    ) {
      const heightDifference = currentTotalHeight - stateRef.current.totalHeight
      const currentRelativePosition = stateRef.current.userRelativePosition

      // Marca que estamos ajustando
      stateRef.current.isAdjusting = true
      setIsAdjusting(true)
      lastHeightChange.current = now

      // Mantém a posição relativa do usuário
      maintainUserPosition(
        heightDifference,
        currentRelativePosition,
        currentTotalHeight,
        currentViewportHeight
      )

      // Remove flag após compensação
      setTimeout(() => {
        stateRef.current.isAdjusting = false
        setIsAdjusting(false)
      }, 300)
    }

    // Atualiza o estado
    stateRef.current.currentHeight = currentViewportHeight
    stateRef.current.totalHeight = currentTotalHeight
    stateRef.current.userPosition = currentScroll

    // Atualiza a posição relativa
    const newRelativePosition = calculateUserRelativePosition(
      currentScroll,
      currentTotalHeight,
      currentViewportHeight
    )
    stateRef.current.userRelativePosition = newRelativePosition
  }, [
    getScrollPosition,
    getTotalHeight,
    getViewportHeight,
    calculateUserRelativePosition,
    maintainUserPosition
  ])

  const startContinuousMonitoring = useCallback(() => {
    // Para o intervalo anterior se existir
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Inicia monitoramento contínuo a cada 16ms (60fps)
    intervalRef.current = setInterval(monitorHeightChanges, 16)
  }, [monitorHeightChanges])

  const stopContinuousMonitoring = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    // Inicializa
    const initialViewportHeight = getViewportHeight()
    const initialTotalHeight = getTotalHeight()
    const initialScroll = getScrollPosition()

    setCurrentHeight(initialViewportHeight)
    setTotalHeight(initialTotalHeight)
    setUserPosition(initialScroll)

    stateRef.current.currentHeight = initialViewportHeight
    stateRef.current.totalHeight = initialTotalHeight
    stateRef.current.userPosition = initialScroll

    const initialRelativePosition = calculateUserRelativePosition(
      initialScroll,
      initialTotalHeight,
      initialViewportHeight
    )
    stateRef.current.userRelativePosition = initialRelativePosition

    // Inicia monitoramento contínuo
    startContinuousMonitoring()

    // Adiciona listeners para mudanças de viewport
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      window.visualViewport?.addEventListener(
        'resize',
        startContinuousMonitoring
      )
    }

    window.addEventListener('resize', startContinuousMonitoring)

    return () => {
      if (typeof window !== 'undefined' && 'visualViewport' in window) {
        window.visualViewport?.removeEventListener(
          'resize',
          startContinuousMonitoring
        )
      }
      window.removeEventListener('resize', startContinuousMonitoring)

      // Para o monitoramento
      stopContinuousMonitoring()
    }
  }, [
    startContinuousMonitoring,
    stopContinuousMonitoring,
    calculateUserRelativePosition
  ])

  return {
    currentHeight,
    totalHeight,
    isAdjusting,
    userPosition,
    userRelativePosition: stateRef.current.userRelativePosition
  }
}
