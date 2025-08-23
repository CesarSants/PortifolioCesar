import { useEffect, useRef, useCallback, useState } from 'react'

interface ScrollState {
  lastScrollTop: number
  lastTotalHeight: number
  lastViewportHeight: number
  isAdjusting: boolean
  lastAdjustmentTime: number
  userRelativePosition: number
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
    userRelativePosition: 0
  })

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

      // Aplica a compensação
      window.scrollTo({
        top: targetScroll,
        behavior: 'auto'
      })
    },
    []
  )

  const handleScroll = useCallback(() => {
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
      stateRef.current.lastScrollTop = currentScroll
      stateRef.current.lastTotalHeight = currentTotalHeight
      stateRef.current.lastViewportHeight = currentViewportHeight
      stateRef.current.lastAdjustmentTime = now

      // Calcula a posição relativa inicial
      const initialRelativePosition = calculateUserRelativePosition(
        currentScroll,
        currentTotalHeight,
        currentViewportHeight
      )
      stateRef.current.userRelativePosition = initialRelativePosition

      return
    }

    // Detecta mudanças na altura total da aplicação
    const totalHeightChanged =
      Math.abs(currentTotalHeight - stateRef.current.lastTotalHeight) > 5
    const viewportChanged =
      Math.abs(currentViewportHeight - stateRef.current.lastViewportHeight) > 5

    // Se houve mudança significativa na altura total OU viewport
    if (totalHeightChanged || viewportChanged) {
      // Verifica se passou tempo suficiente desde o último ajuste
      if (now - stateRef.current.lastAdjustmentTime > 100) {
        const previousScroll = stateRef.current.lastScrollTop
        const previousTotalHeight = stateRef.current.lastTotalHeight
        const previousViewportHeight = stateRef.current.lastViewportHeight
        const userRelativePosition = stateRef.current.userRelativePosition

        // Marca que estamos ajustando
        stateRef.current.isAdjusting = true
        setIsAdjusting(true)
        stateRef.current.lastAdjustmentTime = now

        // Aplica a compensação para manter o usuário na mesma posição relativa
        applyCompensation(
          userRelativePosition,
          currentTotalHeight,
          currentViewportHeight
        )

        // Log para debug
        console.log('ViewportScrollFix - Compensando scroll:', {
          previousScroll,
          userRelativePosition: userRelativePosition.toFixed(1) + '%',
          previousTotalHeight,
          currentTotalHeight,
          previousViewportHeight,
          currentViewportHeight,
          heightDifference: currentTotalHeight - previousTotalHeight,
          totalHeightChanged,
          viewportChanged
        })

        // Remove a flag de ajuste após um delay
        setTimeout(() => {
          stateRef.current.isAdjusting = false
          setIsAdjusting(false)
        }, 200)
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
  }, [
    getScrollPosition,
    getTotalHeight,
    getViewportHeight,
    calculateUserRelativePosition,
    applyCompensation
  ])

  const handleViewportResize = useCallback(() => {
    // Força uma verificação quando a viewport muda
    setTimeout(handleScroll, 50)
  }, [handleScroll])

  const handleWindowResize = useCallback(() => {
    // Força uma verificação quando a janela é redimensionada
    setTimeout(handleScroll, 50)
  }, [handleScroll])

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
    }
  }, [
    handleScroll,
    handleViewportResize,
    handleWindowResize,
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
