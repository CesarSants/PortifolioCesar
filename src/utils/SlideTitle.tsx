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
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .slider-track {
    position: absolute;
    white-space: nowrap;
    will-change: transform;
    animation: scroll 35s linear infinite;
    display: flex;
  }

  .slider-content {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    flex-shrink: 0;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  span {
    font-family: ${fonts.fontGrande};
    font-size: 10dvh;
    margin-top: 1dvh;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    margin: 0 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .divisor {
    width: 20px;
    height: 20px;
    background-color: ${cores.cinza};
    border-radius: 50%;
    margin: 0 20px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .bold {
    font-weight: bold;
    color: ${cores.branca};
  }

  .light {
    font-weight: lighter;
    color: #b37da7;
  }

  .headline-scroll span {
    font-family: ${fonts.fontGrande};
    font-size: 10dvh;
    margin-top: 1dvh;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    margin: 0 10px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .headline-scroll .divisor {
    width: 20px;
    height: 20px;
    background-color: ${cores.cinza};
    border-radius: 50%;
    margin: 0 20px;
    /* Garantindo que o divisor mantenha seu tamanho */
    flex-shrink: 0;
    flex-grow: 0;
  }

  .headline-scroll .bold {
    font-weight: bold;
    color: ${cores.branca};
  }

  .headline-scroll .light {
    font-weight: lighter;
    color: ${cores.cinza};
    /* color: #2bacbd90; */
    /* color: #3e79f783; */
    /* color: #58174a81; */
    /* color: #290a23; */
    /* color: #b9a275; */
    /* color: #6b132299; */
    /* color: #186670; */

    color: #b37da7;
  }
`

const HeadlineScroll: React.FC<Props> = ({ content, height = '20%' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      // Criar a track principal
      const track = document.createElement('div')
      track.className = 'slider-track'

      // Criar o conteúdo base que será duplicado
      const baseContent = document.createElement('div')
      baseContent.className = 'slider-content'

      // Adicionar os elementos ao conteúdo base
      const itemHtml = `
        <span class="bold">${content}</span>
        <span class="divisor"></span>
        <span class="light">${content}</span>
        <span class="divisor"></span>`

      // Repetir o suficiente para garantir cobertura
      baseContent.innerHTML = itemHtml.repeat(6)

      // Duplicar o conteúdo base para criar uma sequência contínua
      track.appendChild(baseContent)
      track.appendChild(baseContent.cloneNode(true))

      // Limpar container anterior
      while (scrollContainer.firstChild) {
        scrollContainer.removeChild(scrollContainer.firstChild)
      }

      // Adicionar a track
      scrollContainer.appendChild(track)
    }
  }, [content])

  return (
    <HeadlineWrapper
      ref={scrollContainerRef}
      height={height}
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
    >
      <div></div>
    </HeadlineWrapper>
  )
}

export default HeadlineScroll
