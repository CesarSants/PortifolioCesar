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
  justify-content: flex-start;
  position: absolute;
  transform: translateZ(0);
  z-index: 1;
  isolation: isolate;

  .container {
    display: flex;
    position: relative;
  }

  .headline-scroll {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: scroll 35s linear infinite;
    will-change: transform;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
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
      const container = document.createElement('div')
      container.className = 'container'

      // Criar dois grupos idênticos de conteúdo
      const group1 = document.createElement('div')
      const group2 = document.createElement('div')
      group1.className = 'headline-scroll'
      group2.className = 'headline-scroll'

      // Adicionar conteúdo HTML
      const contentHTML = `
        <span class="bold">${content}</span>
        <span class="divisor"></span>
        <span class="light">${content}</span>
        <span class="divisor"></span>`.repeat(6)

      group1.innerHTML = contentHTML
      group2.innerHTML = contentHTML

      // Limpar container anterior
      while (scrollContainer.firstChild) {
        scrollContainer.removeChild(scrollContainer.firstChild)
      }

      // Montar nova estrutura
      container.appendChild(group1)
      container.appendChild(group2)
      scrollContainer.appendChild(container)
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
