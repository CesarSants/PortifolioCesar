import { useEffect, useRef, useCallback, useState } from 'react'

interface ScrollState {
  lastScrollTop: number
  lastTotalHeight: number
  lastViewportHeight: number
  isAdjusting: boolean
  lastAdjustmentTime: number
  userRelativePosition: number
  snapshot: {
    scrollTop: number
    totalHeight: number
    viewportHeight: number
    relativePosition: number
    timestamp: number
  } | null
  monitoring: boolean
}

export const useViewportHeight = () => {
  const [currentHeight, setCurrentHeight] = useState(0)
  const [totalHeight, setTotalHeight] = useState(0)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [userPosition, setUserPosition] = useState(0)

  const stateRef = useRef<ScrollState>({
    lastScrollTop: 0,
    lastTotalHeight: 0,
    lastViewportHeight: 0,
    isAdjusting: false,
    lastAdjustmentTime: 0,
    userRelativePosition: 0,
    snapshot: null,
    monitoring: false
  })

  const animationFrameRef = useRef<number | null>(null)

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
      // Calcula a posição relativa do usuário em porcentagem
      const maxScroll = Math.max(0, totalHeight - viewportHeight)

      if (maxScroll === 0) return 0

      // Retorna a posição em porcentagem (0 a 100)
      return (scrollTop / maxScroll) * 100
    },
    []
  )

  const applyCompensation = useCallback(
    (
      relativePosition: number,
      newTotalHeight: number,
      newViewportHeight: number
    ) => {
      // Calcula a nova posição baseada na posição relativa
      const maxScroll = Math.max(0, newTotalHeight - newViewportHeight)
      const targetScroll = (relativePosition / 100) * maxScroll

      // Aplica a compensação imediatamente
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      })
    },
    []
  )

  const takeSnapshot = useCallback(() => {
    // Captura um snapshot do estado atual
    const currentScroll = getScrollPosition()
    const currentTotalHeight = getTotalHeight()
    const currentViewportHeight = getViewportHeight()
    const relativePosition = calculateUserRelativePosition(
      currentScroll,
      currentTotalHeight,
      currentViewportHeight
    )

    stateRef.current.snapshot = {
      scrollTop: currentScroll,
      totalHeight: currentTotalHeight,
      viewportHeight: currentViewportHeight,
      relativePosition: relativePosition,
      timestamp: Date.now()
    }

    console.log('ViewportScrollFix - Snapshot capturado:', {
      scrollTop: currentScroll,
      totalHeight: currentTotalHeight,
      viewportHeight: currentViewportHeight,
      relativePosition: relativePosition.toFixed(1) + '%'
    })
  }, [
    getScrollPosition,
    getTotalHeight,
    getViewportHeight,
    calculateUserRelativePosition
  ])

  const continuousMonitoring = useCallback(() => {
    if (!stateRef.current.monitoring) return

    const currentScroll = getScrollPosition()
    const currentTotalHeight = getTotalHeight()
    const currentViewportHeight = getViewportHeight()
    const now = Date.now()

    // Atualiza os estados para o componente
    setCurrentHeight(currentViewportHeight)
    setTotalHeight(currentTotalHeight)
    setUserPosition(currentScroll)

    // Detecta mudanças na altura total da aplicação OU viewport
    const totalHeightChanged =
      Math.abs(currentTotalHeight - stateRef.current.lastTotalHeight) > 2
    const viewportChanged =
      Math.abs(currentViewportHeight - stateRef.current.lastViewportHeight) > 2

    // Se houve mudança significativa, aplica compensação imediata
    if (totalHeightChanged || viewportChanged) {
      // Se temos um snapshot válido, usa ele para compensação
      if (
        stateRef.current.snapshot &&
        now - stateRef.current.snapshot.timestamp < 2000
      ) {
        const snapshot = stateRef.current.snapshot

        // Marca que estamos ajustando
        stateRef.current.isAdjusting = true
        setIsAdjusting(true)
        stateRef.current.lastAdjustmentTime = now

        // Aplica a compensação usando o snapshot (estado anterior à mudança)
        applyCompensation(
          snapshot.relativePosition,
          currentTotalHeight,
          currentViewportHeight
        )

        // Log para debug
        console.log('ViewportScrollFix - Compensando scroll com snapshot:', {
          snapshotRelativePosition: snapshot.relativePosition.toFixed(1) + '%',
          snapshotTotalHeight: snapshot.totalHeight,
          currentTotalHeight: currentTotalHeight,
          snapshotViewportHeight: snapshot.viewportHeight,
          currentViewportHeight: currentViewportHeight,
          heightDifference: currentTotalHeight - snapshot.totalHeight,
          viewportDifference: currentViewportHeight - snapshot.viewportHeight,
          totalHeightChanged,
          viewportChanged
        })

        // Remove a flag de ajuste após um delay
        setTimeout(() => {
          stateRef.current.isAdjusting = false
          setIsAdjusting(false)
        }, 100)
      }
    }

    // Atualiza o estado
    stateRef.current.lastScrollTop = currentScroll
    stateRef.current.lastTotalHeight = currentTotalHeight
    stateRef.current.lastViewportHeight = currentViewportHeight

    // Atualiza a posição relativa do usuário
    const newRelativePosition = calculateUserRelativePosition(
      currentScroll,
      currentTotalHeight,
      currentViewportHeight
    )
    stateRef.current.userRelativePosition = newRelativePosition

    // Continua o monitoramento
    animationFrameRef.current = requestAnimationFrame(continuousMonitoring)
  }, [
    getScrollPosition,
    getTotalHeight,
    getViewportHeight,
    calculateUserRelativePosition,
    applyCompensation
  ])

  const startMonitoring = useCallback(() => {
    stateRef.current.monitoring = true
    continuousMonitoring()
  }, [continuousMonitoring])

  const stopMonitoring = useCallback(() => {
    stateRef.current.monitoring = false
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  const handleViewportResize = useCallback(() => {
    // Toma snapshot ANTES da mudança
    takeSnapshot()

    // Inicia monitoramento contínuo
    startMonitoring()
  }, [takeSnapshot, startMonitoring])

  const handleWindowResize = useCallback(() => {
    // Toma snapshot ANTES da mudança
    takeSnapshot()

    // Inicia monitoramento contínuo
    startMonitoring()
  }, [takeSnapshot, startMonitoring])

  useEffect(() => {
    // Inicializa
    const initialViewportHeight = getViewportHeight()
    const initialTotalHeight = getTotalHeight()
    const initialScroll = getScrollPosition()

    setCurrentHeight(initialViewportHeight)
    setTotalHeight(initialTotalHeight)
    setUserPosition(initialScroll)

    stateRef.current.lastScrollTop = initialScroll
    stateRef.current.lastTotalHeight = initialTotalHeight
    stateRef.current.lastViewportHeight = initialViewportHeight
    stateRef.current.lastAdjustmentTime = Date.now()

    // Calcula a posição relativa inicial
    const initialRelativePosition = calculateUserRelativePosition(
      initialScroll,
      initialTotalHeight,
      initialViewportHeight
    )
    stateRef.current.userRelativePosition = initialRelativePosition

    // Toma snapshot inicial
    takeSnapshot()

    // Adiciona listeners
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', handleViewportResize)
    }

    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (typeof window !== 'undefined' && 'visualViewport' in window) {
        window.visualViewport?.removeEventListener(
          'resize',
          handleViewportResize
        )
      }
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('scroll', handleScroll)

      // Para o monitoramento
      stopMonitoring()
    }
  }, [
    handleViewportResize,
    handleWindowResize,
    calculateUserRelativePosition,
    takeSnapshot,
    startMonitoring,
    stopMonitoring
  ])

  // Função de scroll simples para atualizar estado
  const handleScroll = useCallback(() => {
    const currentScroll = getScrollPosition()
    setUserPosition(currentScroll)
  }, [getScrollPosition])

  return {
    currentHeight,
    totalHeight,
    isAdjusting,
    userPosition,
    userRelativePosition: stateRef.current.userRelativePosition
  }
}
