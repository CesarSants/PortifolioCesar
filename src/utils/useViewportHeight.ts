import { useEffect, useRef, useCallback, useState } from 'react'

interface ScrollState {
  lastScrollTop: number
  lastViewportHeight: number
  lastDocumentHeight: number
  isAdjusting: boolean
  lastAdjustmentTime: number
  scrollHistory: number[]
  lastScrollTime: number
  originalScrollTop: number
}

export const useViewportHeight = () => {
  const [currentHeight, setCurrentHeight] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isAdjusting, setIsAdjusting] = useState(false)

  const stateRef = useRef<ScrollState>({
    lastScrollTop: 0,
    lastViewportHeight: 0,
    lastDocumentHeight: 0,
    isAdjusting: false,
    lastAdjustmentTime: 0,
    scrollHistory: [],
    lastScrollTime: 0,
    originalScrollTop: 0
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

  const detectAbnormalScroll = useCallback(
    (currentScroll: number, previousScroll: number, currentTime: number) => {
      // Detecta mudanças anormais de scroll (pulos automáticos)
      const scrollDifference = Math.abs(currentScroll - previousScroll)
      const timeDifference = currentTime - stateRef.current.lastScrollTime

      // Se a mudança de scroll for muito grande em pouco tempo, é suspeita
      if (scrollDifference > 50 && timeDifference < 50) {
        return true
      }

      // Se a mudança for maior que 30% da viewport, é suspeita
      const viewportHeight = getViewportHeight()
      if (scrollDifference > viewportHeight * 0.3) {
        return true
      }

      return false
    },
    [getViewportHeight]
  )

  const handleScroll = useCallback(() => {
    const currentScroll = getScrollPosition()
    const currentViewportHeight = getViewportHeight()
    const currentDocumentHeight = getDocumentHeight()
    const now = Date.now()

    // Atualiza os estados para o componente
    setCurrentHeight(currentViewportHeight)
    setDocumentHeight(currentDocumentHeight)

    // Se é a primeira vez, inicializa
    if (stateRef.current.lastScrollTop === 0) {
      stateRef.current.lastScrollTop = currentScroll
      stateRef.current.lastViewportHeight = currentViewportHeight
      stateRef.current.lastDocumentHeight = currentDocumentHeight
      stateRef.current.lastAdjustmentTime = now
      stateRef.current.lastScrollTime = now
      stateRef.current.originalScrollTop = currentScroll
      return
    }

    // Detecta mudanças na viewport ou documento
    const viewportChanged =
      Math.abs(currentViewportHeight - stateRef.current.lastViewportHeight) > 2
    const documentChanged =
      Math.abs(currentDocumentHeight - stateRef.current.lastDocumentHeight) > 2

    // Detecta scroll anormal
    const abnormalScroll = detectAbnormalScroll(
      currentScroll,
      stateRef.current.lastScrollTop,
      now
    )

    // Se houve mudança significativa OU scroll anormal
    if (viewportChanged || documentChanged || abnormalScroll) {
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
        setIsAdjusting(true)
        stateRef.current.lastAdjustmentTime = now

        // Calcula a nova posição baseada na posição relativa
        const maxScrollAfter = Math.max(
          0,
          currentDocumentHeight - currentViewportHeight
        )
        const targetScroll = relativePosition * maxScrollAfter

        // Aplica a compensação
        window.scrollTo({
          top: targetScroll,
          behavior: 'auto'
        })

        // Log para debug
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
          abnormalScroll,
          scrollDifference: Math.abs(currentScroll - previousScroll)
        })

        // Remove a flag de ajuste após um delay
        setTimeout(() => {
          stateRef.current.isAdjusting = false
          setIsAdjusting(false)
        }, 150)
      }
    }

    // Atualiza o estado
    stateRef.current.lastScrollTop = currentScroll
    stateRef.current.lastViewportHeight = currentViewportHeight
    stateRef.current.lastDocumentHeight = currentDocumentHeight
    stateRef.current.lastScrollTime = now
  }, [
    getScrollPosition,
    getViewportHeight,
    getDocumentHeight,
    detectAbnormalScroll
  ])

  const handleViewportResize = useCallback(() => {
    // Força uma verificação quando a viewport muda
    setTimeout(handleScroll, 30)
  }, [handleScroll])

  const handleWindowResize = useCallback(() => {
    // Força uma verificação quando a janela é redimensionada
    setTimeout(handleScroll, 30)
  }, [handleScroll])

  // Intercepta mudanças de scroll para detectar pulos automáticos
  const interceptScroll = useCallback(() => {
    const currentScroll = getScrollPosition()
    const now = Date.now()

    // Se não estamos ajustando, verifica se houve pulo automático
    if (!stateRef.current.isAdjusting) {
      const scrollDifference = Math.abs(
        currentScroll - stateRef.current.lastScrollTop
      )
      const timeDifference = now - stateRef.current.lastScrollTime

      // Se houve um pulo automático
      if (scrollDifference > 100 && timeDifference < 100) {
        console.log('ViewportScrollFix - Pulo automático detectado:', {
          from: stateRef.current.lastScrollTop,
          to: currentScroll,
          difference: scrollDifference,
          time: timeDifference
        })

        // Aplica correção imediata
        stateRef.current.isAdjusting = true
        setIsAdjusting(true)

        // Volta para a posição anterior
        window.scrollTo({
          top: stateRef.current.lastScrollTop,
          behavior: 'auto'
        })

        setTimeout(() => {
          stateRef.current.isAdjusting = false
          setIsAdjusting(false)
        }, 100)
      }
    }

    // Atualiza o estado
    stateRef.current.lastScrollTop = currentScroll
    stateRef.current.lastScrollTime = now
  }, [getScrollPosition])

  useEffect(() => {
    // Inicializa
    const initialViewportHeight = getViewportHeight()
    const initialDocumentHeight = getDocumentHeight()
    const initialScroll = getScrollPosition()

    setCurrentHeight(initialViewportHeight)
    setDocumentHeight(initialDocumentHeight)

    stateRef.current.lastScrollTop = initialScroll
    stateRef.current.lastViewportHeight = initialViewportHeight
    stateRef.current.lastDocumentHeight = initialDocumentHeight
    stateRef.current.lastAdjustmentTime = Date.now()
    stateRef.current.lastScrollTime = Date.now()
    stateRef.current.originalScrollTop = initialScroll

    // Adiciona listeners
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', handleViewportResize)
    }

    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Adiciona listener específico para interceptar pulos
    window.addEventListener('scroll', interceptScroll, { passive: true })

    return () => {
      if (typeof window !== 'undefined' && 'visualViewport' in window) {
        window.visualViewport?.removeEventListener(
          'resize',
          handleViewportResize
        )
      }
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', interceptScroll)
    }
  }, [handleScroll, handleViewportResize, handleWindowResize, interceptScroll])

  return {
    currentHeight,
    documentHeight,
    isAdjusting
  }
}
