import { useEffect, useRef, useCallback, useState } from 'react'

export const useViewportHeight = () => {
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const adjustmentTimeout = useRef<NodeJS.Timeout | null>(null)
  const sections = useRef<Map<string, HTMLElement>>(new Map())
  const observers = useRef<Map<string, IntersectionObserver>>(new Map())
  const scrolling = useRef(false)

  // Configura os observers para cada seção
  const setupSectionObservers = useCallback(() => {
    // Remove observers antigos
    observers.current.forEach((observer) => observer.disconnect())
    observers.current.clear()
    sections.current.clear()

    // Encontra todas as seções
    const sectionElements = document.querySelectorAll('section, [id]')

    sectionElements.forEach((section) => {
      const id =
        section.id || `section-${Math.random().toString(36).substr(2, 9)}`
      if (!section.id) section.id = id

      sections.current.set(id, section as HTMLElement)

      // Cria um observer para esta seção
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !scrolling.current) {
              setCurrentSection(id)
            }
          })
        },
        {
          threshold: 0.5 // Trigger quando 50% da seção estiver visível
        }
      )

      observer.observe(section)
      observers.current.set(id, observer)
    })
  }, [])

  // Manipula mudanças na scrollbar do navegador
  const handleVisualViewportChange = useCallback(() => {
    if (adjustmentTimeout.current) {
      clearTimeout(adjustmentTimeout.current)
    }

    setIsAdjusting(true)

    // Espera as mudanças na barra de navegação terminarem
    adjustmentTimeout.current = setTimeout(() => {
      if (currentSection && sections.current.has(currentSection)) {
        const section = sections.current.get(currentSection)!
        const rect = section.getBoundingClientRect()
        const scrollTarget = window.scrollY + rect.top

        scrolling.current = true
        window.scrollTo({
          top: scrollTarget,
          behavior: 'auto'
        })

        // Reset do flag após o scroll
        setTimeout(() => {
          scrolling.current = false
          setIsAdjusting(false)
        }, 50)
      } else {
        setIsAdjusting(false)
      }
    }, 100)
  }, [currentSection])

  // Setup inicial
  useEffect(() => {
    setupSectionObservers()

    const visualViewport = window.visualViewport
    const currentObservers = observers.current

    if (visualViewport) {
      visualViewport.addEventListener('resize', handleVisualViewportChange)
    }

    return () => {
      currentObservers.forEach((observer) => observer.disconnect())
      if (visualViewport) {
        visualViewport.removeEventListener('resize', handleVisualViewportChange)
      }
      if (adjustmentTimeout.current) {
        clearTimeout(adjustmentTimeout.current)
      }
    }
  }, [setupSectionObservers, handleVisualViewportChange])

  return {
    currentHeight: window.innerHeight,
    totalHeight: document.documentElement.scrollHeight,
    isAdjusting,
    userPosition: window.scrollY,
    userRelativePosition:
      currentSection && sections.current.has(currentSection)
        ? ((sections.current.get(currentSection)?.getBoundingClientRect().top ??
            0) /
            window.innerHeight) *
          100
        : 0
  }
}
