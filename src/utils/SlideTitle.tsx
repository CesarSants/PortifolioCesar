import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { cores, fonts } from '../styles'

type Props = {
  content: string
  height?: string
}

const HeadlineWrapper = styled.div<{
  height: string
  animationDuration: number
}>`
  height: ${(props) => props.height};
  width: 100dvw;
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .slider-track {
    position: absolute;
    white-space: nowrap;
    will-change: transform;
    animation: scroll ${(props) => props.animationDuration}s linear infinite;
    display: flex;
    /* Garantir que o track tenha largura suficiente */
    min-width: 200%;
    /* Garantir que não haja quebras na animação */
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .slider-content {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    flex-shrink: 0;
    /* Garantir que o conteúdo não seja cortado */
    min-width: 100%;
    /* Garantir renderização suave */
    backface-visibility: hidden;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      /* Mover exatamente metade da largura para garantir continuidade */
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
    /* Garantir que as palavras não sejam cortadas */
    word-break: keep-all;
    overflow: visible;
    /* Garantir renderização suave */
    backface-visibility: hidden;
    transform: translateZ(0);
  }

  .divisor {
    width: 20px;
    height: 20px;
    background-color: ${cores.cinza};
    border-radius: 50%;
    margin: 0 20px;
    flex-shrink: 0;
    flex-grow: 0;
    /* Garantir renderização suave */
    backface-visibility: hidden;
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
  const [animationDuration, setAnimationDuration] = useState(35)

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

      // Repetir o suficiente para garantir cobertura completa
      // Usar 70 repetições para garantir que não haja cortes
      baseContent.innerHTML = itemHtml.repeat(70)

      // Criar duas cópias idênticas do conteúdo
      const firstContent = baseContent.cloneNode(true) as HTMLElement
      const secondContent = baseContent.cloneNode(true) as HTMLElement

      // Garantir que ambos os conteúdos sejam idênticos
      secondContent.innerHTML = firstContent.innerHTML

      // Limpar container anterior
      while (scrollContainer.firstChild) {
        scrollContainer.removeChild(scrollContainer.firstChild)
      }

      // Adicionar ambas as cópias à track
      track.appendChild(firstContent)
      track.appendChild(secondContent)

      // Adicionar a track
      scrollContainer.appendChild(track)

      // Calcular a duração da animação baseada no tamanho do conteúdo
      // Usar um timeout para garantir que o DOM foi renderizado
      setTimeout(() => {
        const trackElement = scrollContainer.querySelector(
          '.slider-track'
        ) as HTMLElement
        if (trackElement) {
          const trackWidth = trackElement.scrollWidth

          // Calcular duração baseada na velocidade desejada (pixels por segundo)
          // Velocidade mais lenta para melhor visualização
          const pixelsPerSecond = 1 // Velocidade muito lenta
          const calculatedDuration = trackWidth / pixelsPerSecond

          // Limitar a duração entre 500 e 1000 segundos para velocidade muito lenta
          const finalDuration = Math.max(
            500,
            Math.min(1000, calculatedDuration)
          )
          setAnimationDuration(finalDuration)
        }
      }, 100)

      // REMOVIDO: setInterval que estava causando crash no celular
      // A animação CSS já funciona perfeitamente sem verificação periódica
    }
  }, [content])

  return (
    <HeadlineWrapper
      ref={scrollContainerRef}
      height={height}
      animationDuration={animationDuration}
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
    >
      <div></div>
    </HeadlineWrapper>
  )
}

export default HeadlineScroll
