import { useEffect, useRef, useCallback } from 'react'

interface ViewportHeightState {
  currentHeight: number
  previousHeight: number
  scrollPosition: number
  isAdjusting: boolean
  lastAdjustmentTime: number
}

export const useViewportHeight = () => {
  const stateRef = useRef<ViewportHeightState>({
    currentHeight: 0,
    previousHeight: 0,
    scrollPosition: 0,
    isAdjusting: false,
    lastAdjustmentTime: 0
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getViewportHeight = useCallback(() => {
    // Usa dvh se disponível, senão fallback para vh
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      return window.visualViewport?.height || window.innerHeight
    }
    return window.innerHeight
  }, [])

  const getScrollPosition = useCallback(() => {
    return window.pageYOffset || document.documentElement.scrollTop
  }, [])

  const calculateRelativePosition = useCallback(
    (currentScroll: number, currentHeight: number) => {
      // Calcula a posição relativa baseada na altura total do documento
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = Math.max(0, documentHeight - currentHeight)

      if (maxScroll === 0) return 0
      return Math.max(0, Math.min(1, currentScroll / maxScroll))
    },
    []
  )

  const adjustScrollPosition = useCallback(
    (relativePosition: number, newHeight: number) => {
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = Math.max(0, documentHeight - newHeight)
      const newScrollPosition = relativePosition * maxScroll

      // Aplica o ajuste de scroll de forma suave
      window.scrollTo({
        top: newScrollPosition,
        behavior: 'auto' // Usa 'auto' para evitar conflitos com scroll suave
      })
    },
    []
  )

  const debouncedAdjustment = useCallback(
    (relativePosition: number, newHeight: number) => {
      // Limpa timeout anterior se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Aplica o ajuste após um pequeno delay para evitar ajustes excessivos
      timeoutRef.current = setTimeout(() => {
        adjustScrollPosition(relativePosition, newHeight)
        stateRef.current.isAdjusting = false
      }, 50)
    },
    [adjustScrollPosition]
  )

  const handleViewportChange = useCallback(() => {
    if (stateRef.current.isAdjusting) return

    const currentHeight = getViewportHeight()
    const currentScroll = getScrollPosition()
    const now = Date.now()

    // Se é a primeira vez, apenas inicializa
    if (stateRef.current.currentHeight === 0) {
      stateRef.current.currentHeight = currentHeight
      stateRef.current.scrollPosition = currentScroll
      stateRef.current.lastAdjustmentTime = now
      return
    }

    // Se a altura mudou significativamente (mais de 10px)
    const heightDifference = Math.abs(
      currentHeight - stateRef.current.currentHeight
    )
    if (heightDifference > 10) {
      const previousHeight = stateRef.current.currentHeight
      const previousScroll = stateRef.current.scrollPosition

      // Verifica se passou tempo suficiente desde o último ajuste (evita loops)
      if (now - stateRef.current.lastAdjustmentTime > 200) {
        // Calcula a posição relativa antes da mudança
        const relativePosition = calculateRelativePosition(
          previousScroll,
          previousHeight
        )

        // Marca que estamos ajustando para evitar loops
        stateRef.current.isAdjusting = true
        stateRef.current.lastAdjustmentTime = now

        // Aplica o ajuste com debounce
        debouncedAdjustment(relativePosition, currentHeight)

        // Atualiza o estado
        stateRef.current.previousHeight = previousHeight
        stateRef.current.currentHeight = currentHeight
        stateRef.current.scrollPosition = currentScroll
      }
    } else {
      // Atualiza apenas a posição do scroll se não houve mudança significativa de altura
      stateRef.current.scrollPosition = currentScroll
    }
  }, [
    getViewportHeight,
    getScrollPosition,
    calculateRelativePosition,
    debouncedAdjustment
  ])

  useEffect(() => {
    // Inicializa com a altura atual
    stateRef.current.currentHeight = getViewportHeight()
    stateRef.current.scrollPosition = getScrollPosition()
    stateRef.current.lastAdjustmentTime = Date.now()

    // Adiciona listeners para mudanças de viewport
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', handleViewportChange)
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, { passive: true })

    return () => {
      if (typeof window !== 'undefined' && 'visualViewport' in window) {
        window.visualViewport?.removeEventListener(
          'resize',
          handleViewportChange
        )
      }
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange)

      // Limpa timeout se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleViewportChange])

  return {
    currentHeight: stateRef.current.currentHeight,
    isAdjusting: stateRef.current.isAdjusting
  }
}
