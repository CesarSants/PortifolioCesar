import { useEffect, useRef, useCallback } from 'react'

interface ViewportHeightState {
  currentHeight: number
  previousHeight: number
  scrollPosition: number
  documentHeight: number
  previousDocumentHeight: number
  isAdjusting: boolean
  lastAdjustmentTime: number
  lastScrollDirection: 'up' | 'down' | null
}

export const useViewportHeight = () => {
  const stateRef = useRef<ViewportHeightState>({
    currentHeight: 0,
    previousHeight: 0,
    scrollPosition: 0,
    documentHeight: 0,
    previousDocumentHeight: 0,
    isAdjusting: false,
    lastAdjustmentTime: 0,
    lastScrollDirection: null
  })

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const lastScrollTopRef = useRef<number>(0)

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

  const getDocumentHeight = useCallback(() => {
    return document.documentElement.scrollHeight
  }, [])

  const calculateRelativePosition = useCallback(
    (currentScroll: number, currentHeight: number, docHeight: number) => {
      // Calcula a posição relativa baseada na altura total do documento
      const maxScroll = Math.max(0, docHeight - currentHeight)

      if (maxScroll === 0) return 0
      return Math.max(0, Math.min(1, currentScroll / maxScroll))
    },
    []
  )

  const adjustScrollPosition = useCallback(
    (relativePosition: number, newHeight: number, newDocHeight: number) => {
      const maxScroll = Math.max(0, newDocHeight - newHeight)
      const newScrollPosition = relativePosition * maxScroll

      // Aplica o ajuste de scroll
      window.scrollTo({
        top: newScrollPosition,
        behavior: 'auto'
      })
    },
    []
  )

  const debouncedAdjustment = useCallback(
    (relativePosition: number, newHeight: number, newDocHeight: number) => {
      // Limpa timeout anterior se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Aplica o ajuste após um pequeno delay
      timeoutRef.current = setTimeout(() => {
        adjustScrollPosition(relativePosition, newHeight, newDocHeight)
        stateRef.current.isAdjusting = false
      }, 150)
    },
    [adjustScrollPosition]
  )

  const detectScrollDirection = useCallback((currentScrollTop: number) => {
    const previousScrollTop = lastScrollTopRef.current
    const direction = currentScrollTop > previousScrollTop ? 'down' : 'up'
    lastScrollTopRef.current = currentScrollTop
    return direction
  }, [])

  const handleViewportChange = useCallback(() => {
    if (stateRef.current.isAdjusting) return

    const currentHeight = getViewportHeight()
    const currentScroll = getScrollPosition()
    const currentDocHeight = getDocumentHeight()
    const now = Date.now()
    const scrollDirection = detectScrollDirection(currentScroll)

    // Se é a primeira vez, apenas inicializa
    if (stateRef.current.currentHeight === 0) {
      stateRef.current.currentHeight = currentHeight
      stateRef.current.scrollPosition = currentScroll
      stateRef.current.documentHeight = currentDocHeight
      stateRef.current.lastAdjustmentTime = now
      stateRef.current.lastScrollDirection = scrollDirection
      return
    }

    // Detecta mudanças na altura da viewport OU na altura do documento
    const heightDifference = Math.abs(
      currentHeight - stateRef.current.currentHeight
    )
    const docHeightDifference = Math.abs(
      currentDocHeight - stateRef.current.documentHeight
    )

    // Se houve mudança significativa na viewport OU no documento
    if (heightDifference > 3 || docHeightDifference > 3) {
      const previousHeight = stateRef.current.currentHeight
      const previousScroll = stateRef.current.scrollPosition
      const previousDocHeight = stateRef.current.documentHeight
      const previousDirection = stateRef.current.lastScrollDirection

      // Verifica se passou tempo suficiente desde o último ajuste
      if (now - stateRef.current.lastAdjustmentTime > 100) {
        // Calcula a posição relativa antes da mudança
        const relativePosition = calculateRelativePosition(
          previousScroll,
          previousHeight,
          previousDocHeight
        )

        // Marca que estamos ajustando
        stateRef.current.isAdjusting = true
        stateRef.current.lastAdjustmentTime = now

        // Aplica o ajuste com debounce
        debouncedAdjustment(relativePosition, currentHeight, currentDocHeight)

        // Atualiza o estado
        stateRef.current.previousHeight = previousHeight
        stateRef.current.currentHeight = currentHeight
        stateRef.current.previousDocumentHeight = previousDocHeight
        stateRef.current.documentHeight = currentDocHeight
        stateRef.current.scrollPosition = currentScroll
        stateRef.current.lastScrollDirection = scrollDirection

        // Log para debug
        if (process.env.NODE_ENV === 'development') {
          console.log('ViewportScrollFix - Ajustando scroll:', {
            previousHeight,
            currentHeight,
            previousDocHeight,
            currentDocHeight,
            relativePosition: relativePosition.toFixed(3),
            heightDifference,
            docHeightDifference,
            scrollDirection,
            previousDirection
          })
        }
      }
    } else {
      // Atualiza apenas a posição do scroll se não houve mudança significativa
      stateRef.current.scrollPosition = currentScroll
      stateRef.current.lastScrollDirection = scrollDirection
    }
  }, [
    getViewportHeight,
    getScrollPosition,
    getDocumentHeight,
    calculateRelativePosition,
    debouncedAdjustment,
    detectScrollDirection
  ])

  const handleResize = useCallback(() => {
    // Força uma verificação quando a janela é redimensionada
    setTimeout(handleViewportChange, 100)
  }, [handleViewportChange])

  const handleScroll = useCallback(() => {
    // Atualiza a posição do scroll sem fazer ajustes
    stateRef.current.scrollPosition = getScrollPosition()
  }, [getScrollPosition])

  const handleMutation = useCallback(() => {
    // Quando o DOM muda, verifica se precisa ajustar
    setTimeout(handleViewportChange, 100)
  }, [handleViewportChange])

  useEffect(() => {
    // Inicializa com os valores atuais
    stateRef.current.currentHeight = getViewportHeight()
    stateRef.current.scrollPosition = getScrollPosition()
    stateRef.current.documentHeight = getDocumentHeight()
    stateRef.current.lastAdjustmentTime = Date.now()
    lastScrollTopRef.current = getScrollPosition()

    // Cria um ResizeObserver para monitorar mudanças no body/document
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      observerRef.current = new ResizeObserver(() => {
        // Quando o documento muda de tamanho, verifica se precisa ajustar
        handleMutation()
      })

      // Observa mudanças no body e html
      if (document.body) {
        observerRef.current.observe(document.body)
      }
      if (document.documentElement) {
        observerRef.current.observe(document.documentElement)
      }
    }

    // Cria um MutationObserver para detectar mudanças no DOM
    const mutationObserver = new MutationObserver(() => {
      handleMutation()
    })

    // Observa mudanças no body
    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      })
    }

    // Adiciona listeners para mudanças de viewport
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', handleViewportChange)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (typeof window !== 'undefined' && 'visualViewport' in window) {
        window.visualViewport?.removeEventListener(
          'resize',
          handleViewportChange
        )
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)

      // Limpa o ResizeObserver
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      // Limpa o MutationObserver
      mutationObserver.disconnect()

      // Limpa timeout se existir
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleViewportChange, handleResize, handleScroll, handleMutation])

  return {
    currentHeight: stateRef.current.currentHeight,
    documentHeight: stateRef.current.documentHeight,
    isAdjusting: stateRef.current.isAdjusting
  }
}
