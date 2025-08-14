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

    // mede largura incluindo margens
    const widthWithMargin = (el: HTMLElement) => {
      const styles = window.getComputedStyle(el)
      const ml = parseFloat(styles.marginLeft) || 0
      const mr = parseFloat(styles.marginRight) || 0
      return el.getBoundingClientRect().width + ml + mr
    }

    // cria um "bloco" que agrupa uma repetição inteira do HTML (um filho do track)
    const createBlockElement = () => {
      const block = document.createElement('div')
      // estilo inline para garantir que o bloco seja inline e não quebre layout
      block.style.display = 'inline-flex'
      block.style.alignItems = 'center'
      block.style.whiteSpace = 'nowrap'
      block.style.flex = 'none'
      block.innerHTML = baseHTMLRef.current || ''
      return block
    }

    const build = () => {
      if (!baseHTMLRef.current) return

      // limpa track visível
      track.innerHTML = ''
      track.style.transform = 'translate3d(0,0,0)'
      offsetRef.current = 0

      const containerWidth = wrapper.clientWidth

      // --- OFFSCREEN: pré-renderiza blocos fora da viewport para forçar layout/pintura ---
      const off = document.createElement('div')
      off.style.position = 'absolute'
      off.style.left = '-99999px'
      off.style.top = '0'
      off.style.visibility = 'hidden'
      off.style.whiteSpace = 'nowrap'
      off.style.display = 'flex'
      off.style.flexWrap = 'nowrap'

      // Primeiro, cria 1 bloco para medir baseWidth
      const sample = createBlockElement()
      off.appendChild(sample)
      document.body.appendChild(off)
      // força reflow para garantir medida estável (útil em mobile)
      const sampleWidth =
        sample.getBoundingClientRect().width ||
        sample.offsetWidth ||
        off.scrollWidth
      baseWidthRef.current = sampleWidth

      // calcula quantas repetições precisamos (cobertura segura)
      // garantimos pelo menos 3× a largura do container ou container/baseWidth + 4
      const repeats = Math.max(
        Math.ceil((containerWidth * 3) / Math.max(1, sampleWidth)),
        Math.ceil(containerWidth / Math.max(1, sampleWidth)) + 4
      )

      // substitui off por N blocos (já fora da viewport)
      off.innerHTML = ''
      for (let i = 0; i < repeats; i++) {
        const b = createBlockElement()
        off.appendChild(b)
      }

      // força layout/pintura do offscreen (garante que os nós tenham layout calculado)
      off.getBoundingClientRect()

      // clona os nós já renderizados para o track visível (cloneNode para não remover off)
      const frag = document.createDocumentFragment()
      Array.from(off.children).forEach((child) => {
        const cloned = (child as HTMLElement).cloneNode(true) as HTMLElement
        cloned.setAttribute('aria-hidden', 'true')
        frag.appendChild(cloned)
      })

      track.appendChild(frag)

      // remove offscreen
      document.body.removeChild(off)

      // define baseWidth definitivo a partir do primeiro bloco no track
      const first = track.firstElementChild as HTMLElement | null
      if (first) {
        baseWidthRef.current = widthWithMargin(first)
      }

      // garante estado inicial
      offsetRef.current = 0
      track.style.transform = `translate3d(0,0,0)`
    }

    // animação com reciclagem de blocos inteiros (sem gaps, sem teleporte perceptível)
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      let offset = offsetRef.current - speed * dt

      // recicla o primeiro bloco enquanto ele já saiu totalmente da viewport
      // e compensa o offset pelo tamanho real desse bloco.
      // usamos um guard para evitar loop infinito em situações estranhas.
      let guard = 0
      while (guard++ < 100) {
        const first = track.firstElementChild as HTMLElement | null
        if (!first) break
        const w = widthWithMargin(first)
        if (-offset >= w) {
          // compensa offset e move o bloco para o fim
          offset += w
          track.appendChild(first)
        } else {
          break
        }
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
      // garante layout final e pintura no mobile antes de iniciar
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          // rebuild final e start
          build()
          start()
        })
      )
    }

    const fReady = (document as any).fonts?.ready
    if (fReady && 'then' in fReady)
      fReady.then(rebuildAndStart).catch(rebuildAndStart)
    else rebuildAndStart()

    // Rebuild só quando largura realmente mudar
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
