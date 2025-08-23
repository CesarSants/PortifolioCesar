import { useEffect, useRef, useCallback, useState } from 'react'

interface ScrollState {
  lastTotalHeight: number
  lastViewportHeight: number
  isAdjusting: boolean
  lastAdjustmentTime: number
  userRelativePosition: number
  lastScrollTop: number
  targetScrollPosition: number
}

export const useViewportHeight = () => {
  const [currentHeight, setCurrentHeight] = useState(0)
  const [totalHeight, setTotalHeight] = useState(0)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [userPosition, setUserPosition] = useState(0)

  const stateRef = useRef<ScrollState>({
    lastTotalHeight: 0,
    lastViewportHeight: 0,
    isAdjusting: false,
    lastAdjustmentTime: 0,
    userRelativePosition: 0,
    lastScrollTop: 0,
    targetScrollPosition: 0
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const scrollLockRef = useRef(false)

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

  const lockScroll = useCallback(() => {
    scrollLockRef.current = true
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
  }, [])

  const unlockScroll = useCallback(() => {
    scrollLockRef.current = false
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }, [])

  const applyCompensation = useCallback(
    (
      relativePosition: number,
      newTotalHeight: number,
      newViewportHeight: number
    ) => {
      const maxScroll = Math.max(0, newTotalHeight - newViewportHeight)
      const targetScroll = (relativePosition / 100) * maxScroll

      // Bloqueia scroll temporariamente
      lockScroll()

      // Aplica compensação
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      })

      // Desbloqueia scroll após compensação
      setTimeout(() => {
        unlockScroll()
      }, 50)
    },
    [lockScroll, unlockScroll]
  )

  const aggressiveCompensation = useCallback(() => {
    const currentScroll = getScrollPosition()
    const currentTotalHeight = getTotalHeight()
    const currentViewportHeight = getViewportHeight()
    const now = Date.now()

    // Atualiza os estados para o componente
    setCurrentHeight(currentViewportHeight)
    setTotalHeight(currentTotalHeight)
    setUserPosition(currentScroll)

    // Se é a primeira vez, inicializa
    if (stateRef.current.lastTotalHeight === 0) {
      stateRef.current.lastTotalHeight = currentTotalHeight
      stateRef.current.lastViewportHeight = currentViewportHeight
      stateRef.current.lastScrollTop = currentScroll
      stateRef.current.lastAdjustmentTime = now

      const initialRelativePosition = calculateUserRelativePosition(
        currentScroll,
        currentTotalHeight,
        currentViewportHeight
      )
      stateRef.current.userRelativePosition = initialRelativePosition
      stateRef.current.targetScrollPosition = currentScroll

      return
    }

    // Detecta mudanças na altura total da página
    const totalHeightChanged =
      Math.abs(currentTotalHeight - stateRef.current.lastTotalHeight) > 2

    // Se a altura total mudou, aplica compensação AGRESSIVA
    if (totalHeightChanged && !stateRef.current.isAdjusting) {
      const previousRelativePosition = stateRef.current.userRelativePosition
      const previousScroll = stateRef.current.lastScrollTop

      // Marca que estamos ajustando
      stateRef.current.isAdjusting = true
      setIsAdjusting(true)
      stateRef.current.lastAdjustmentTime = now

      // Calcula a nova posição baseada na posição relativa
      const maxScroll = Math.max(0, currentTotalHeight - currentViewportHeight)
      const targetScroll = (previousRelativePosition / 100) * maxScroll

      // Bloqueia scroll e aplica compensação
      lockScroll()

      // Força o scroll para a posição correta
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      })

      // Desbloqueia scroll após compensação
      setTimeout(() => {
        unlockScroll()
        stateRef.current.isAdjusting = false
        setIsAdjusting(false)
      }, 100)

      console.log('ViewportScrollFix - COMPENSAÇÃO AGRESSIVA APLICADA:', {
        previousRelativePosition: previousRelativePosition.toFixed(1) + '%',
        previousScroll: previousScroll,
        targetScroll: targetScroll,
        previousTotalHeight: stateRef.current.lastTotalHeight,
        currentTotalHeight: currentTotalHeight,
        heightDifference: currentTotalHeight - stateRef.current.lastTotalHeight,
        timestamp: new Date().toLocaleTimeString()
      })
    }

    // Atualiza o estado
    stateRef.current.lastTotalHeight = currentTotalHeight
    stateRef.current.lastViewportHeight = currentViewportHeight
    stateRef.current.lastScrollTop = currentScroll

    // Atualiza a posição relativa
    const newRelativePosition = calculateUserRelativePosition(
      currentScroll,
      currentTotalHeight,
      currentViewportHeight
    )
    stateRef.current.userRelativePosition = newRelativePosition
    stateRef.current.targetScrollPosition = currentScroll
  }, [
    getScrollPosition,
    getTotalHeight,
    getViewportHeight,
    calculateUserRelativePosition,
    lockScroll,
    unlockScroll
  ])

  const startContinuousMonitoring = useCallback(() => {
    // Para o intervalo anterior se existir
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Inicia monitoramento contínuo a cada 8ms (120fps) para máxima responsividade
    intervalRef.current = setInterval(aggressiveCompensation, 8)
  }, [aggressiveCompensation])

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

    stateRef.current.lastTotalHeight = initialTotalHeight
    stateRef.current.lastViewportHeight = initialViewportHeight
    stateRef.current.lastScrollTop = initialScroll
    stateRef.current.lastAdjustmentTime = Date.now()

    const initialRelativePosition = calculateUserRelativePosition(
      initialScroll,
      initialTotalHeight,
      initialViewportHeight
    )
    stateRef.current.userRelativePosition = initialRelativePosition
    stateRef.current.targetScrollPosition = initialScroll

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

      // Garante que o scroll seja desbloqueado
      unlockScroll()
    }
  }, [
    startContinuousMonitoring,
    stopContinuousMonitoring,
    calculateUserRelativePosition,
    unlockScroll
  ])

  return {
    currentHeight,
    totalHeight,
    isAdjusting,
    userPosition,
    userRelativePosition: stateRef.current.userRelativePosition
  }
}
