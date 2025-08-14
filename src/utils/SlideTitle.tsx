// SlideSobre.tsx
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { cores, fonts } from '../styles'

type Props = {
  content: string
  height?: string
}

const HeadlineWrapper = styled.div<{ height: string }>`
  height: ${(props) => props.height};
  width: 100dvw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  .headline-scroll {
    display: flex;
    align-items: center;
    white-space: nowrap;
    will-change: transform;
  }

  .headline-scroll span {
    font-family: ${fonts.fontGrande};
    font-size: 10dvh;
    margin-top: 1dvh;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  .headline-scroll .divisor {
    width: 20px;
    height: 20px;
    background-color: ${cores.cinza};
    border-radius: 50%;
    margin: 0 20px;
  }

  .headline-scroll .bold {
    font-weight: bold;
    color: ${cores.branca};
  }

  .headline-scroll .light {
    font-weight: lighter;
    color: #b37da7;
  }
`

const SPEED_PX_PER_S = 80

const HeadlineScroll: React.FC<Props> = ({ content, height = '20%' }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const baseHTMLRef = useRef<string | null>(null)

  const rafIdRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const baseWidthRef = useRef(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    if (!baseHTMLRef.current) {
      baseHTMLRef.current = track.innerHTML
    }

    const build = () => {
      if (!baseHTMLRef.current) return

      track.innerHTML = baseHTMLRef.current
      track.style.transform = 'translate3d(0,0,0)'

      const baseWidth = track.scrollWidth
      baseWidthRef.current = baseWidth

      const containerWidth = wrapper.clientWidth

      // 🔹 Agora garantimos pelo menos 3× a largura da tela
      while (track.scrollWidth < containerWidth * 10) {
        const tmp = document.createElement('div')
        tmp.innerHTML = baseHTMLRef.current
        while (tmp.firstChild) {
          const node = tmp.firstChild as HTMLElement
          node.setAttribute('aria-hidden', 'true')
          track.appendChild(node)
        }
      }

      offsetRef.current =
        ((offsetRef.current % baseWidth) + baseWidth) % baseWidth
      offsetRef.current *= -1
      track.style.transform = `translate3d(${offsetRef.current}px,0,0)`
    }

    const step = (ts: number) => {
      const baseWidth = baseWidthRef.current
      if (!baseWidth) {
        rafIdRef.current = requestAnimationFrame(step)
        return
      }
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      let offset = offsetRef.current - SPEED_PX_PER_S * dt
      if (offset <= -baseWidth) {
        offset += baseWidth
      }

      offsetRef.current = offset
      track.style.transform = `translate3d(${offset}px,0,0)`
      rafIdRef.current = requestAnimationFrame(step)
    }

    const start = () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      lastTsRef.current = null
      rafIdRef.current = requestAnimationFrame(step)
    }

    const rebuildAndStart = () => {
      build()
      start()
    }

    const fReady = (document as any).fonts?.ready
    if (fReady && 'then' in fReady) {
      fReady.then(rebuildAndStart).catch(rebuildAndStart)
    } else {
      rebuildAndStart()
    }

    const ro = new ResizeObserver(build)
    ro.observe(wrapper)

    window.addEventListener('orientationchange', build, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', build)
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return (
    <HeadlineWrapper
      ref={wrapperRef}
      height={height}
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
    >
      <div ref={trackRef} className="headline-scroll">
        <span className="bold">{content}</span>
        <span className="divisor"></span>
        <span className="light">{content}</span>
        <span className="divisor"></span>
        <span className="bold">{content}</span>
        <span className="divisor"></span>
        <span className="light">{content}</span>
        <span className="divisor"></span>
        <span className="bold">{content}</span>
        <span className="divisor"></span>
        <span className="light">{content}</span>
        <span className="divisor"></span>
      </div>
    </HeadlineWrapper>
  )
}

export default HeadlineScroll
