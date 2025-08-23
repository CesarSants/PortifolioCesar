import { useEffect, useRef, useCallback } from 'react'

interface ScrollState {
  lastScrollTop: number
  lastViewportHeight: number
  lastDocumentHeight: number
  isAdjusting: boolean
  lastAdjustmentTime: number
}

export const useViewportHeight = () => {
  const stateRef = useRef<ScrollState>({
    lastScrollTop: 0,
    lastViewportHeight: 0,
    lastDocumentHeight: 0,
    isAdjusting: false,
    lastAdjustmentTime: 0
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

  const getDocumentHeight = useCallback(() => {
    return document.documentElement.scrollHeight
  }, [])

  const handleViewportChange = useCallback(() => {
    if (stateRef.current.isAdjusting) return

    const currentViewportHeight = getViewportHeight()
    const currentDocumentHeight = getDocumentHeight()
    const currentScroll = getScrollPosition()
    const now = Date.now()

    // Se é a primeira vez, inicializa
    if (stateRef.current.lastViewportHeight === 0) {
      stateRef.current.lastViewportHeight = currentViewportHeight
      stateRef.current.lastDocumentHeight = currentDocumentHeight
      stateRef.current.lastScrollTop = currentScroll
      stateRef.current.lastAdjustmentTime = now
      return
    }

    // Detecta mudanças na viewport (barra de navegação abre/fecha)
    const viewportChanged =
      Math.abs(currentViewportHeight - stateRef.current.lastViewportHeight) > 2
    const documentChanged =
      Math.abs(currentDocumentHeight - stateRef.current.lastDocumentHeight) > 2

    if (viewportChanged || documentChanged) {
      // Verifica se passou tempo suficiente desde o último ajuste
      if (now - stateRef.current.lastAdjustmentTime > 100) {
        const previousScroll = stateRef.current.lastScrollTop
        const previousViewportHeight = stateRef.current.lastViewportHeight
        const previousDocumentHeight = stateRef.current.lastDocumentHeight

        // Calcula a posição relativa antes da mudança
        const maxScrollBefore = Math.max(
          0,
          previousDocumentHeight - previousViewportHeight
        )
        const relativePosition =
          maxScrollBefore > 0 ? previousScroll / maxScrollBefore : 0

        // Marca que estamos ajustando
        stateRef.current.isAdjusting = true
        stateRef.current.lastAdjustmentTime = now

        // Calcula a nova posição baseada na posição relativa
        const maxScrollAfter = Math.max(
          0,
          currentDocumentHeight - currentViewportHeight
        )
        const targetScroll = relativePosition * maxScrollAfter

        // Aplica a compensação imediatamente
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetScroll,
            behavior: 'auto'
          })
        })

        // Log para debug
        if (process.env.NODE_ENV === 'development') {
          console.log('ViewportScrollFix - Compensando scroll:', {
            previousScroll,
            targetScroll,
            previousViewportHeight,
            currentViewportHeight,
            previousDocumentHeight,
            currentDocumentHeight,
            relativePosition: relativePosition.toFixed(3),
            viewportChanged,
            documentChanged,
            heightDifference: currentViewportHeight - previousViewportHeight
          })
        }

        // Remove a flag de ajuste após um delay
        setTimeout(() => {
          stateRef.current.isAdjusting = false
        }, 200)
      }
    }

    // Atualiza o estado
    stateRef.current.lastViewportHeight = currentViewportHeight
    stateRef.current.lastDocumentHeight = currentDocumentHeight
    stateRef.current.lastScrollTop = currentScroll
  }, [getViewportHeight, getDocumentHeight, getScrollPosition])

  const handleScroll = useCallback(() => {
    // Atualiza apenas a posição do scroll sem fazer ajustes
    stateRef.current.lastScrollTop = getScrollPosition()
  }, [getScrollPosition])

  useEffect(() => {
    // Inicializa
    stateRef.current.lastViewportHeight = getViewportHeight()
    stateRef.current.lastDocumentHeight = getDocumentHeight()
    stateRef.current.lastScrollTop = getScrollPosition()
    stateRef.current.lastAdjustmentTime = Date.now()

    // Adiciona listeners
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', handleViewportChange)
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (typeof window !== 'undefined' && 'visualViewport' in window) {
        window.visualViewport?.removeEventListener(
          'resize',
          handleViewportChange
        )
      }
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleViewportChange, handleScroll])

  return {
    currentHeight: stateRef.current.lastViewportHeight,
    documentHeight: stateRef.current.lastDocumentHeight,
    isAdjusting: stateRef.current.isAdjusting
  }
}
