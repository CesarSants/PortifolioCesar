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

  // Detecta dinamicamente um ancestral rolável (overflow e conteúdo excedente)
  const findScrollableAncestor = useCallback((start: Element | null) => {
    let node: Element | null = start
    while (node && node !== document.body) {
      const el = node as HTMLElement
      const style = window.getComputedStyle(el)
      const overflowY = style.overflowY
      const canScroll = el.scrollHeight > el.clientHeight
      const isScrollableY = overflowY === 'auto' || overflowY === 'scroll'
      if (canScroll && isScrollableY) {
        return el
      }
      node = node.parentElement
    }
    return null
  }, [])

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

      // Verifica se está dentro de um elemento com scroll (dinâmico + classes conhecidas)
      const hasScrollableParent =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.cardContainer2') ||
        element.closest('.sliderImgContainer') ||
        findScrollableAncestor(element)

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

      // Verifica se está dentro de um elemento com scroll (dinâmico + classes conhecidas)
      const hasScrollableParent =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.cardContainer2') ||
        element.closest('.sliderImgContainer') ||
        findScrollableAncestor(element)

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

      // Caso especial: dentro do card/slider, desabilita o scroll da página por completo
      const isInCardArea =
        element.closest('.cardContainer') ||
        element.closest('.slider') ||
        element.closest('.slick-list')

      if (isInCardArea) {
        e.preventDefault()
        return
      }

      // Caso especial: área de repositórios vazia ('.cardContainer2')
      const reposContainer = element.closest(
        '.cardContainer2'
      ) as HTMLElement | null
      if (reposContainer) {
        const style = window.getComputedStyle(reposContainer)
        const overflowY = style.overflowY
        const canScroll =
          reposContainer.scrollHeight > reposContainer.clientHeight
        const isScrollableY = overflowY === 'auto' || overflowY === 'scroll'
        // Se não há scroll interno disponível, bloqueia scroll da página
        if (!(canScroll && isScrollableY)) {
          e.preventDefault()
          return
        }
      }

      // Verifica se está dentro de um elemento com scroll (dinâmico + classes conhecidas)
      const scrollableElement =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.cardContainer2') ||
        element.closest('.sliderImgContainer') ||
        findScrollableAncestor(element)

      // Se tem scroll interno, NÃO previne - deixa o scroll interno funcionar
      // O blockPageScroll vai cuidar de reverter qualquer scroll indesejado da página
      if (scrollableElement) {
        return // Não interfere com scroll interno
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

      // Caso especial: dentro do card/slider, desabilita o scroll da página por completo
      const isInCardArea =
        element.closest('.cardContainer') ||
        element.closest('.slider') ||
        element.closest('.slick-list')

      if (isInCardArea) {
        e.preventDefault()
        return
      }

      // Caso especial: área de repositórios vazia ('.cardContainer2')
      const reposContainer = element.closest(
        '.cardContainer2'
      ) as HTMLElement | null
      if (reposContainer) {
        const style = window.getComputedStyle(reposContainer)
        const overflowY = style.overflowY
        const canScroll =
          reposContainer.scrollHeight > reposContainer.clientHeight
        const isScrollableY = overflowY === 'auto' || overflowY === 'scroll'
        // Se não há scroll interno disponível, bloqueia scroll da página
        if (!(canScroll && isScrollableY)) {
          e.preventDefault()
          return
        }
      }

      // Verifica se está dentro de um elemento com scroll (dinâmico + classes conhecidas)
      const scrollableElement =
        element.closest('.textContainer') ||
        element.closest('.cardContainer') ||
        element.closest('.cardContainer2') ||
        element.closest('.sliderImgContainer') ||
        findScrollableAncestor(element)

      // Se tem scroll interno, NÃO previne - deixa o scroll interno funcionar
      // O blockPageScroll vai cuidar de reverter qualquer scroll indesejado da página
      if (scrollableElement) {
        return // Não interfere com scroll interno
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

  // (removido) bloqueio manual do scroll da página — CSS overscroll-behavior cobre o caso

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
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Listen for micro-scroll nudges from TopChromeProbe and re-snap instantly
    const onProbeNudge = () => {
      // Compute current section and immediately jump to it (no smooth) to
      // avoid any drift caused by the micro-scroll while leaving browser
      // chrome behaviour intact.
      const idx = detectCurrentSection()
      const el = document.getElementById(SECTION_IDS[idx])
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({ top, behavior: 'auto' })
      }
    }
    window.addEventListener('topChromeProbeNudge', onProbeNudge)

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
      window.removeEventListener('topChromeProbeNudge', onProbeNudge)
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
