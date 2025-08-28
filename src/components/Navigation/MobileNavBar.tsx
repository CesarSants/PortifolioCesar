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

    // Sincroniza o scroll do overlay com a página
    const syncScroll = () => {
      if (!isScrollingSynced.current && overlay) {
        isScrollingSynced.current = true
        overlay.scrollTop = window.scrollY
        requestAnimationFrame(() => {
          isScrollingSynced.current = false
        })
      }
    }

    window.addEventListener('scroll', syncScroll, { passive: true })

    // Sincroniza quando o overlay rola
    const handleOverlayScroll = () => {
      if (!isScrollingSynced.current) {
        isScrollingSynced.current = true
        window.scrollTo(0, overlay.scrollTop)
        requestAnimationFrame(() => {
          isScrollingSynced.current = false
        })
      }
    }

    overlay.addEventListener('scroll', handleOverlayScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', syncScroll)
      overlay.removeEventListener('scroll', handleOverlayScroll)
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
