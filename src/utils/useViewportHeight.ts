import { useEffect, useRef, useCallback, useState } from 'react'
import { useViewportSize } from 'react-use-viewport-size'

interface ViewportState {
  currentHeight: number
  totalHeight: number
  userPosition: number
  userRelativePosition: number
  isAdjusting: boolean
}

export const useViewportHeight = () => {
  const { height: viewportHeight } = useViewportSize()

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

  const lastViewportHeight = useRef(0)
  const lastTotalHeight = useRef(0)
  const compensationTimeout = useRef<NodeJS.Timeout | null>(null)

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

  const applyScrollCompensation = useCallback(
    (
      relativePosition: number,
      newTotalHeight: number,
      newViewportHeight: number
    ) => {
      const maxScroll = Math.max(0, newTotalHeight - newViewportHeight)
      const targetScroll = (relativePosition / 100) * maxScroll

      // Aplica compensação com scroll suave
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })

      console.log('ViewportScrollFix - COMPENSAÇÃO APLICADA:', {
        relativePosition: relativePosition.toFixed(1) + '%',
        targetScroll: Math.round(targetScroll) + 'px',
        newTotalHeight: newTotalHeight + 'px',
        newViewportHeight: newViewportHeight + 'px',
        timestamp: new Date().toLocaleTimeString()
      })
    },
    []
  )

  // Monitora mudanças no viewport (biblioteca faz isso automaticamente)
  useEffect(() => {
    if (viewportHeight === 0) return

    const currentTotalHeight = getTotalHeight()
    const currentScroll = getScrollPosition()

    // Atualiza estados para o componente
    setCurrentHeight(viewportHeight)
    setTotalHeight(currentTotalHeight)
    setUserPosition(currentScroll)

    // Se é a primeira vez, inicializa
    if (stateRef.current.totalHeight === 0) {
      stateRef.current.currentHeight = viewportHeight
      stateRef.current.totalHeight = currentTotalHeight
      stateRef.current.userPosition = currentScroll

      const initialRelativePosition = calculateUserRelativePosition(
        currentScroll,
        currentTotalHeight,
        viewportHeight
      )
      stateRef.current.userRelativePosition = initialRelativePosition

      lastViewportHeight.current = viewportHeight
      lastTotalHeight.current = currentTotalHeight

      return
    }

    // Detecta mudanças significativas
    const viewportChanged =
      Math.abs(viewportHeight - lastViewportHeight.current) > 2
    const totalHeightChanged =
      Math.abs(currentTotalHeight - lastTotalHeight.current) > 2

    // Se algo mudou e não estamos ajustando, aplica compensação
    if (
      (viewportChanged || totalHeightChanged) &&
      !stateRef.current.isAdjusting
    ) {
      const previousRelativePosition = stateRef.current.userRelativePosition

      // Marca que estamos ajustando
      stateRef.current.isAdjusting = true
      setIsAdjusting(true)

      // Limpa timeout anterior se existir
      if (compensationTimeout.current) {
        clearTimeout(compensationTimeout.current)
      }

      // Aplica compensação após um pequeno delay para garantir que as mudanças terminaram
      compensationTimeout.current = setTimeout(() => {
        applyScrollCompensation(
          previousRelativePosition,
          currentTotalHeight,
          viewportHeight
        )

        // Remove flag após compensação
        setTimeout(() => {
          stateRef.current.isAdjusting = false
          setIsAdjusting(false)
        }, 200)
      }, 50)
    }

    // Atualiza o estado
    stateRef.current.currentHeight = viewportHeight
    stateRef.current.totalHeight = currentTotalHeight
    stateRef.current.userPosition = currentScroll

    // Atualiza a posição relativa
    const newRelativePosition = calculateUserRelativePosition(
      currentScroll,
      currentTotalHeight,
      viewportHeight
    )
    stateRef.current.userRelativePosition = newRelativePosition

    // Atualiza referências
    lastViewportHeight.current = viewportHeight
    lastTotalHeight.current = currentTotalHeight
  }, [
    viewportHeight,
    getScrollPosition,
    getTotalHeight,
    calculateUserRelativePosition,
    applyScrollCompensation
  ])

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (compensationTimeout.current) {
        clearTimeout(compensationTimeout.current)
      }
    }
  }, [])

  return {
    currentHeight,
    totalHeight,
    isAdjusting,
    userPosition,
    userRelativePosition: stateRef.current.userRelativePosition
  }
}
