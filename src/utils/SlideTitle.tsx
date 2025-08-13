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
  // height: 10dvh;
  /* height: 30%; */
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
    animation: scroll 35s linear infinite;
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
    // font-size: 5rem;
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
      const headlineScroll = scrollContainer.children[0] as HTMLElement
      const clone = headlineScroll.cloneNode(true) as HTMLElement
      scrollContainer.appendChild(clone)

      const scrollWidth = headlineScroll.scrollWidth
      headlineScroll.style.width = `${scrollWidth}px`
      clone.style.width = `${scrollWidth}px`
    }
  }, [])

  return (
    <HeadlineWrapper
      ref={scrollContainerRef}
      height={height}
      data-aos="fade-up"
      data-aos-delay="300"
      data-aos-duration="1000"
    >
      <div id="headline-scroll" className="headline-scroll">
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
        <span className="bold">{content}</span>
        <span className="divisor"></span>
        <span className="light">{content}</span>
        <span className="divisor"></span>
      </div>
    </HeadlineWrapper>
  )
}

export default HeadlineScroll
