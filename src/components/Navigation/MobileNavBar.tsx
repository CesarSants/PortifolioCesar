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
    let animationFrame: number | null = null

    // Função que realiza a animação suave do scroll
    const smoothScroll = (start: number, end: number) => {
      const duration = 400 // Duração da animação em ms
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Função de easing para movimento mais natural
        const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)
        const easedProgress = easeOutQuart(progress)

        // Calcula a posição atual do scroll
        const currentPosition = start + (end - start) * easedProgress
        overlay.scrollTop = currentPosition

        // Continua a animação se não terminou
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          isScrollingSynced.current = false
          animationFrame = null
        }
      }

      // Inicia a animação
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      animationFrame = requestAnimationFrame(animate)
    }

    // Sincroniza o scroll do overlay com a página após um delay
    const syncScroll = () => {
      if (!isScrollingSynced.current) {
        // Armazena o valor atual do scroll
        lastScrollValue = window.scrollY

        // Cancela timeout anterior se existir
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }

        // Aplica o scroll com delay e animação suave
        scrollTimeout = setTimeout(() => {
          if (overlay) {
            isScrollingSynced.current = true
            smoothScroll(overlay.scrollTop, lastScrollValue)
          }
        }, 600) // Tempo para a navegação completar
      }
    }

    window.addEventListener('scroll', syncScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
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
