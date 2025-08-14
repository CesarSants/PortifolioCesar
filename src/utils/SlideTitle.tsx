// SlideSobre.tsx
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { cores, fonts } from '../styles'

type Props = {
  content: string
  height?: string
  speed?: number // pixels por segundo
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

const HeadlineScroll: React.FC<Props> = ({
  content,
  height = '20%',
  speed = 80
}) => {
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

    if (!baseHTMLRef.current) baseHTMLRef.current = track.innerHTML

    const build = () => {
      if (!baseHTMLRef.current) return

      // Limpa track
      track.innerHTML = ''
      track.style.transform = 'translate3d(0,0,0)'

      // Cria 1x do conteúdo para medir largura
      const tmpDiv = document.createElement('div')
      tmpDiv.innerHTML = baseHTMLRef.current
      while (tmpDiv.firstChild) track.appendChild(tmpDiv.firstChild)

      const baseWidth = track.scrollWidth
      baseWidthRef.current = baseWidth
      const containerWidth = wrapper.clientWidth

      // Repetir o mínimo necessário para cobrir a tela + folga
      const repeats = Math.ceil(containerWidth / baseWidth) + 2
      for (let i = 1; i < repeats; i++) {
        const clone = track.cloneNode(true) as HTMLDivElement
        Array.from(clone.children).forEach((child) =>
          (child as HTMLElement).setAttribute('aria-hidden', 'true')
        )
        track.appendChild(clone)
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

      let offset = offsetRef.current - speed * dt
      if (offset <= -baseWidth) offset += baseWidth

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
      // Garante layout final e fontes carregadas
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          build()
          start()
        })
      )
    }

    const fReady = (document as any).fonts?.ready
    if (fReady && 'then' in fReady)
      fReady.then(rebuildAndStart).catch(rebuildAndStart)
    else rebuildAndStart()

    // Rebuild só se mudar largura ou girar tela
    let lastWidth = wrapper.clientWidth
    const ro = new ResizeObserver(() => {
      const w = wrapper.clientWidth
      if (w !== lastWidth) {
        lastWidth = w
        rebuildAndStart()
      }
    })
    ro.observe(wrapper)
    window.addEventListener('orientationchange', rebuildAndStart, {
      passive: true
    })

    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', rebuildAndStart)
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [speed])

  return (
    <HeadlineWrapper ref={wrapperRef} height={height}>
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
