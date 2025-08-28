import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTouchDetection } from '../../utils/useTouchDetection'

const ScrollOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;

  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      background: transparent;
    }
  }

  &:before {
    content: '';
    display: block;
    height: 800vh;
  }

  overflow-y: auto !important;

  &:hover,
  &:focus,
  &:active {
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      background: transparent;
    }
  }
`

const TouchArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  pointer-events: auto;
  opacity: 0;
`

const MobileNavBar: React.FC = () => {
  const isTouchDevice = useTouchDetection()
  const overlayRef = useRef<HTMLDivElement>(null)
  const isScrollingSynced = useRef(false)

  useEffect(() => {
    if (!isTouchDevice) return

    const overlay = overlayRef.current
    if (!overlay) return

    let scrollTimeout: NodeJS.Timeout | null = null
    let lastScrollValue = 0

    // Sincroniza o scroll do overlay com a página após um delay
    const syncScroll = () => {
      if (!isScrollingSynced.current) {
        // Armazena o valor atual do scroll
        lastScrollValue = window.scrollY

        // Cancela timeout anterior se existir
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }

        // Aplica o scroll com delay
        scrollTimeout = setTimeout(() => {
          if (overlay) {
            isScrollingSynced.current = true
            overlay.scrollTo({
              top: lastScrollValue,
              behavior: 'auto' // Evita animação suave para ser mais preciso
            })
            requestAnimationFrame(() => {
              isScrollingSynced.current = false
            })
          }
        }, 600) // Tempo para a animação de navegação completar
      }
    }

    window.addEventListener('scroll', syncScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [isTouchDevice])

  if (!isTouchDevice) return null

  return (
    <ScrollOverlay ref={overlayRef}>
      <TouchArea />
    </ScrollOverlay>
  )
}

export default MobileNavBar
