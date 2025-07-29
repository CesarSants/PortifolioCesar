import React, { useEffect, useState, useCallback } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

// IDs das seções na ordem em que aparecem na página
const SECTION_IDS = [
  'inicio', // Home
  'sobre', // About - página 1
  'resume2', // About - página 2
  'projetos', // Projects
  'repositorios', // Repositories
  'contact' // Contact
]

const Navigation = () => {
  const [currentSection, setCurrentSection] = useState(0)

  // Detecta qual seção está mais centralizada na tela
  const detectCurrentSection = useCallback(() => {
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const currentScroll = window.scrollY
    const tolerance = viewportHeight * 0.1 // 10% da altura da viewport como tolerância

    // Função auxiliar para verificar se um scroll está próximo de uma posição
    const isNearPosition = (scroll: number, position: number) => {
      return Math.abs(scroll - position) < tolerance
    }

    // Mapeia as posições esperadas de cada seção
    const sectionPositions = SECTION_IDS.map((id) => {
      const el = document.getElementById(id)
      return el ? el.offsetTop : 0
    })

    // Encontra a seção atual baseado na posição do scroll
    for (let i = 0; i < sectionPositions.length; i++) {
      const currentPosition = sectionPositions[i]

      // Para a segunda página do About, usamos uma posição especial
      if (i === 2) {
        // índice do 'resume2'
        const aboutStartEl = document.getElementById('sobre')
        if (aboutStartEl) {
          const secondPagePosition = aboutStartEl.offsetTop + viewportHeight
          if (isNearPosition(currentScroll, secondPagePosition)) {
            setCurrentSection(i)
            return
          }
        }
      } else {
        // Para todas as outras seções
        if (isNearPosition(currentScroll, currentPosition)) {
          setCurrentSection(i)
          return
        }
      }
    }
  }, [])

  useEffect(() => {
    detectCurrentSection()
    window.addEventListener('scroll', detectCurrentSection, { passive: true })
    window.addEventListener('resize', detectCurrentSection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', detectCurrentSection)
      window.visualViewport.addEventListener('scroll', detectCurrentSection)
    }
    return () => {
      window.removeEventListener('scroll', detectCurrentSection)
      window.removeEventListener('resize', detectCurrentSection)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          detectCurrentSection
        )
        window.visualViewport.removeEventListener(
          'scroll',
          detectCurrentSection
        )
      }
    }
  }, [detectCurrentSection])

  const scrollToSection = useCallback((idx: number) => {
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const id = SECTION_IDS[idx]
    const el = document.getElementById(id)

    if (el) {
      let targetPosition = el.offsetTop

      // Ajuste especial para a segunda página do About
      if (id === 'resume2') {
        const aboutStartEl = document.getElementById('sobre')
        if (aboutStartEl) {
          targetPosition = aboutStartEl.offsetTop + viewportHeight
        }
      }

      // Aplica o scroll com uma pequena compensação para garantir o alinhamento
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  const scrollUp = useCallback(() => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1)
    }
  }, [currentSection, scrollToSection])

  const scrollDown = useCallback(() => {
    if (currentSection < SECTION_IDS.length - 1) {
      scrollToSection(currentSection + 1)
    }
  }, [currentSection, scrollToSection])

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
