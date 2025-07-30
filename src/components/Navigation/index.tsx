import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

const SECTION_IDS = [
  'inicio',
  'sobre',
  'resume2',
  'projetos',
  'repositorios',
  'contact'
] as const

const Navigation: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0)

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

    // A seção que tiver sua âncora mais próxima do topo da viewport será considerada a atual
    let currentIdx = 0
    let smallestDistance = Infinity

    sections.forEach(({ rect, index }) => {
      // Calculamos a distância da âncora até o topo da viewport
      const distance = Math.abs(rect.top)
      if (distance < smallestDistance) {
        smallestDistance = distance
        currentIdx = index
      }
    })

    setCurrentSection(currentIdx)
  }, [])

  const scrollToSection = useCallback(
    (idx: number, direction: 'up' | 'down' = 'down') => {
      const id = SECTION_IDS[idx]
      const element = document.getElementById(id)
      if (element) {
        const elementTop =
          element.getBoundingClientRect().top + window.pageYOffset
        // Aplicamos o offset na direção correta
        const offsets = {
          up: 2,
          down: 2
        }

        // Aplicamos o offset baseado na direção
        const offsetPosition = elementTop + offsets[direction]

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    },
    []
  )

  const scrollUp = useCallback(() => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1, 'up')
    }
  }, [currentSection, scrollToSection])

  const scrollDown = useCallback(() => {
    if (currentSection < SECTION_IDS.length - 1) {
      scrollToSection(currentSection + 1, 'down')
    }
  }, [currentSection, scrollToSection])

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(detectCurrentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [detectCurrentSection])

  return (
    <NavigationContainer>
      {currentSection > 0 && (
        <NavigationButton onClick={scrollUp} data-direction="up">
          ↑
        </NavigationButton>
      )}
      {currentSection < SECTION_IDS.length - 1 && (
        <NavigationButton onClick={scrollDown} data-direction="down">
          ↓
        </NavigationButton>
      )}
    </NavigationContainer>
  )
}

export default Navigation
