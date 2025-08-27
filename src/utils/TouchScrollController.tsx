import React, { useEffect, useRef, useCallback } from 'react'
import { useTouchDetection } from './useTouchDetection'

// Mesmas seções definidas no componente Navigation
const SECTION_IDS = [
  'inicio',
  'sobre',
  'resume2',
  'projetos',
  'repositorios',
  'contact'
] as const

interface TouchScrollControllerProps {
  children: React.ReactNode
}

const TouchScrollController: React.FC<TouchScrollControllerProps> = ({
  children
}) => {
  const isTouchDevice = useTouchDetection()
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)
  const isScrolling = useRef(false)
  const currentSection = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTime = useRef<number>(0)
  const isInitialized = useRef(false)
  const scrollEndTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastScrollPosition = useRef<number>(0)

  // Função para detectar a seção atual (baseada no sistema de navegação existente)
  const detectCurrentSection = useCallback(() => {
    const sections = SECTION_IDS.map((id, index) => {
      const element = document.getElementById(id)
      if (!element) return null
      const rect = element.getBoundingClientRect()
      return { element, index, rect }
    }).filter(
      (item): item is { element: HTMLElement; index: number; rect: DOMRect } =>
        item !== null
    )

    let currentIdx = 0
    let smallestDistance = Infinity

    sections.forEach(({ rect, index }) => {
      const distance = Math.abs(rect.top)
      if (distance < smallestDistance) {
        smallestDistance = distance
        currentIdx = index
      }
    })

    // Só atualiza se a mudança for significativa (evita oscilações)
    if (Math.abs(currentSection.current - currentIdx) > 0) {
      currentSection.current = currentIdx
    }

    return currentIdx
  }, [])

  // Função para rolar para uma seção específica (baseada no sistema de navegação existente)
  const scrollToSection = useCallback(
    (idx: number, direction: 'up' | 'down' = 'down') => {
      const element = document.getElementById(SECTION_IDS[idx])
      if (element) {
        const elementTop =
          element.getBoundingClientRect().top + window.pageYOffset
        const offsets = {
          up: 2,
          down: 2
        }

        const offsetPosition = elementTop + offsets[direction]

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    },
    []
  )

  // Função para rolar para cima
  const scrollUp = useCallback(() => {
    if (currentSection.current > 0 && !isScrolling.current) {
      isScrolling.current = true
      const targetSection = currentSection.current - 1

      scrollToSection(targetSection, 'up')

      // Atualiza a seção atual imediatamente
      currentSection.current = targetSection

      // Reset do flag de scrolling após a animação
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
        // Re-detecta a seção atual para sincronizar
        detectCurrentSection()
      }, 1500) // Aumentado para 1500ms para garantir que a animação termine
    }
  }, [scrollToSection, detectCurrentSection])

  // Função para rolar para baixo
  const scrollDown = useCallback(() => {
    if (
      currentSection.current < SECTION_IDS.length - 1 &&
      !isScrolling.current
    ) {
      isScrolling.current = true
      const targetSection = currentSection.current + 1

      scrollToSection(targetSection, 'down')

      // Atualiza a seção atual imediatamente
      currentSection.current = targetSection

      // Reset do flag de scrolling após a animação
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false
        // Re-detecta a seção atual para sincronizar
        detectCurrentSection()
      }, 1500) // Aumentado para 1500ms para garantir que a animação termine
    }
  }, [scrollToSection, detectCurrentSection])

  // Função para calcular a direção do swipe
  const getSwipeDirection = useCallback((startY: number, endY: number) => {
    const threshold = 80 // Aumentado para 80px para evitar swipes acidentais
    const diff = startY - endY

    if (Math.abs(diff) < threshold) return null

    return diff > 0 ? 'up' : 'down'
  }, [])

  // Handlers de touch
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!isTouchDevice || isScrolling.current) return

      touchStartY.current = e.touches[0].clientY

      // SOLUÇÃO SIMPLES: Se o elemento ou qualquer pai tem scroll interno,
      // simplesmente não fazemos nada - deixamos o scroll interno funcionar
      const element = e.target as Element

      // Verifica se está dentro de um elemento com scroll
      const hasScrollableParent =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.sliderImgContainer')

      // Se tem scroll interno, não fazemos nada - scroll interno funciona naturalmente
      if (hasScrollableParent) {
        return // Para aqui, não interfere
      }
    },
    [isTouchDevice]
  )

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isTouchDevice || isScrolling.current) return

      touchEndY.current = e.changedTouches[0].clientY

      // SOLUÇÃO SIMPLES: Se o elemento ou qualquer pai tem scroll interno,
      // simplesmente não fazemos nada - deixamos o scroll interno funcionar
      const element = e.target as Element

      // Verifica se está dentro de um elemento com scroll
      const hasScrollableParent =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.sliderImgContainer')

      // Se tem scroll interno, não fazemos nada - scroll interno funciona naturalmente
      if (hasScrollableParent) {
        return // Para aqui, não interfere
      }

      const direction = getSwipeDirection(
        touchStartY.current,
        touchEndY.current
      )

      if (direction === 'up') {
        scrollDown()
      } else if (direction === 'down') {
        scrollUp()
      }
    },
    [isTouchDevice, getSwipeDirection, scrollUp, scrollDown]
  )

  // Handlers de wheel para dispositivos touch (desabilita scroll livre)
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isTouchDevice) return

      const element = e.target as Element

      // Verifica se está dentro de um elemento com scroll
      const scrollableElement =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.sliderImgContainer')

      // Se tem scroll interno, verifica se precisa bloquear
      if (scrollableElement) {
        const scrollTop = scrollableElement.scrollTop
        const scrollHeight = scrollableElement.scrollHeight
        const clientHeight = scrollableElement.clientHeight

        // Verifica se o elemento está nos limites
        const isAtTop = scrollTop <= 0
        const isAtBottom = scrollTop + clientHeight >= scrollHeight

        // Se está no topo e tentando rolar para cima, ou no final e tentando rolar para baixo
        // previne o scroll da página para evitar desalinhamento
        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
          e.preventDefault()
        }
        return
      }

      // Previne scroll livre em dispositivos touch apenas fora de elementos com scroll
      e.preventDefault()

      if (isScrolling.current) return

      // Throttle para evitar múltiplos scrolls muito rápidos
      const now = Date.now()
      if (now - lastScrollTime.current < 800) return // Aumentado para 800ms
      lastScrollTime.current = now

      const direction = e.deltaY > 0 ? 'down' : 'up'

      if (direction === 'down') {
        scrollDown()
      } else {
        scrollUp()
      }
    },
    [isTouchDevice, scrollUp, scrollDown]
  )

  // Previne scroll nativo em dispositivos touch
  const preventScroll = useCallback(
    (e: Event) => {
      if (!isTouchDevice) return

      const element = e.target as Element

      // Verifica se está dentro de um elemento com scroll
      const scrollableElement =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.sliderImgContainer')

      // Se tem scroll interno, verifica se precisa bloquear
      if (scrollableElement) {
        const touch = (e as TouchEvent).touches[0]
        const scrollTop = scrollableElement.scrollTop
        const scrollHeight = scrollableElement.scrollHeight
        const clientHeight = scrollableElement.clientHeight

        // Verifica se o elemento está nos limites
        const isAtTop = scrollTop <= 0
        const isAtBottom = scrollTop + clientHeight >= scrollHeight

        // Se está no topo e tentando rolar para cima, ou no final e tentando rolar para baixo
        // previne o scroll da página para evitar desalinhamento
        if (
          (isAtTop && touch.clientY > 0) ||
          (isAtBottom && touch.clientY < 0)
        ) {
          e.preventDefault()
        }
        return
      }

      // Se não tem scroll interno, previne para manter o scroll controlado
      e.preventDefault()
    },
    [isTouchDevice]
  )

  // Função para sincronizar a seção atual quando necessário
  const syncCurrentSection = useCallback(() => {
    if (!isScrolling.current) {
      detectCurrentSection()
    }
  }, [detectCurrentSection])

  // Função para detectar quando o scroll para
  const handleScrollStop = useCallback(() => {
    if (scrollEndTimeout.current) {
      clearTimeout(scrollEndTimeout.current)
    }

    scrollEndTimeout.current = setTimeout(() => {
      if (isScrolling.current) {
        isScrolling.current = false
        // Aguarda um pouco mais e sincroniza
        setTimeout(() => {
          syncCurrentSection()
        }, 300)
      }
    }, 300)
  }, [syncCurrentSection])

  // Função para verificar se o scroll realmente parou
  const checkScrollStopped = useCallback(() => {
    const currentPosition = window.pageYOffset

    if (Math.abs(currentPosition - lastScrollPosition.current) < 5) {
      // Scroll parou, podemos resetar o flag
      if (isScrolling.current) {
        isScrolling.current = false
        syncCurrentSection()
      }
    }

    lastScrollPosition.current = currentPosition
  }, [syncCurrentSection])

  // Função para bloquear scroll da página quando usuário está em elementos com scroll
  const blockPageScroll = useCallback(() => {
    if (!isTouchDevice) return

    const activeElement =
      document.activeElement || document.querySelector(':hover')
    if (!activeElement) return

    const scrollableElement =
      activeElement.closest('.textContainer') ||
      activeElement.closest('.cardContainer') ||
      activeElement.closest('.sliderImgContainer')

    if (scrollableElement) {
      const scrollTop = scrollableElement.scrollTop
      const scrollHeight = scrollableElement.scrollHeight
      const clientHeight = scrollableElement.clientHeight

      // Verifica se o elemento está nos limites (início ou fim)
      const isAtTop = scrollTop <= 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight

      // Se está nos limites, bloqueia qualquer mudança no scroll da página
      if (isAtTop || isAtBottom) {
        const currentPosition = window.pageYOffset
        if (Math.abs(currentPosition - lastScrollPosition.current) > 5) {
          window.scrollTo(0, lastScrollPosition.current)
        }
      }
    }
  }, [isTouchDevice])

  useEffect(() => {
    if (!isTouchDevice) return

    // Detecta a seção atual inicial
    detectCurrentSection()
    isInitialized.current = true
    lastScrollPosition.current = window.pageYOffset

    // Adiciona listeners de touch
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Adiciona listener de wheel para dispositivos touch
    document.addEventListener('wheel', handleWheel, { passive: false })

    // Previne scroll nativo em dispositivos touch
    document.addEventListener('touchmove', preventScroll, { passive: false })

    // Listener para detectar mudanças de scroll (para manter currentSection atualizado)
    const handleScroll = () => {
      // Só atualiza se não estiver fazendo scroll controlado
      if (!isScrolling.current) {
        window.requestAnimationFrame(syncCurrentSection)
      }

      // Detecta quando o scroll para
      handleScrollStop()

      // Verifica se o scroll parou
      checkScrollStopped()

      // Bloqueia scroll da página quando usuário está em elementos com scroll
      blockPageScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('scroll', handleScroll)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      if (scrollEndTimeout.current) {
        clearTimeout(scrollEndTimeout.current)
      }
    }
  }, [
    isTouchDevice,
    handleTouchStart,
    handleTouchEnd,
    handleWheel,
    preventScroll,
    detectCurrentSection,
    syncCurrentSection,
    handleScrollStop,
    checkScrollStopped
  ])

  // Para dispositivos não-touch, não renderiza nada (mantém comportamento original)
  if (!isTouchDevice) {
    return <>{children}</>
  }

  return <>{children}</>
}

export default TouchScrollController
