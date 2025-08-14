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
    animation: scroll var(--scroll-duration, 35s) linear infinite;
  }

  @keyframes scroll {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(calc(var(--scroll-distance, 0px) * -1), 0, 0);
    }
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

const SPEED_PX_PER_S = 120

const HeadlineScroll: React.FC<Props> = ({ content, height = '20%' }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const baseHTMLRef = useRef<string | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    if (!baseHTMLRef.current) baseHTMLRef.current = track.innerHTML

    const build = () => {
      if (!baseHTMLRef.current) return

      track.style.animation = 'none'
      track.innerHTML = baseHTMLRef.current

      const baseWidth = track.scrollWidth
      const containerWidth = wrapper.clientWidth

      // Garantir cobertura de 2 blocos + largura da tela
      const needed = baseWidth * 2 + containerWidth
      let current = baseWidth

      while (current < needed) {
        const clone = document.createElement('div')
        clone.innerHTML = baseHTMLRef.current
        while (clone.firstChild) {
          const node = clone.firstChild as HTMLElement
          node.setAttribute('aria-hidden', 'true')
          track.appendChild(node)
        }
        current = track.scrollWidth
      }

      const duration = Math.max(
        1,
        Math.round((baseWidth / SPEED_PX_PER_S) * 100) / 100
      )

      track.style.setProperty('--scroll-distance', `${baseWidth}px`)
      track.style.setProperty('--scroll-duration', `${duration}s`)

      void track.offsetHeight
      track.style.removeProperty('animation')
    }

    const fontsReady = (document as any).fonts?.ready
    if (fontsReady && 'then' in fontsReady) {
      fontsReady.then(build).catch(build)
    } else {
      build()
    }

    const ro = new ResizeObserver(build)
    ro.observe(wrapper)

    const onOrientation = () => build()
    window.addEventListener('orientationchange', onOrientation)

    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', onOrientation)
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
