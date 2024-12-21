import styled from 'styled-components'
import { cores, fonts } from '../../styles'

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;
  /* overflow-y: hidden; */

  .destaque-inicio {
    text-align: center;
    justify-content: center;
    margin-top: 8vh;
    display: flex;
    img {
      max-width: 558px;
      max-height: 60vh;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  .conteudo-inicio {
    display: flex;
    flex-direction: column;
  }

  .paragrafo-inicio {
    /* margin-top: -10vh; */

    text-align: center;
    color: #c4acf0;
    font-size: 4.06vh;
    /* font-size: 30px; */
    text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.9),
      -3px -3px 8px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.5);

    p:first-child {
      /* font-size: 48px; */
      font-size: 6.49vh;
    }
    span {
      color: #3e79f7;
      /* color: #2bacbd; */
      font-weight: bold;

      @media (max-width: 800px) {
        display: block;
        /* min-height: 56px; */
        min-height: 8vh;
      }
    }
  }

  .cta {
    position: relative;
    margin: auto;
    padding: 52px 18px;
    transition: all 0.2s ease;
    border: none;
    background: none;
    cursor: pointer;
    margin-top: -20px;
    text-decoration: none;
  }

  .cta span {
    font-size: clamp(1.2rem, 1.5vw + 1rem, 2rem);
  }

  .cta:before {
    content: '';
    position: absolute;
    top: 50%;
    bottom: auto;
    left: -2px;
    display: block;
    border-radius: 50px;
    background: linear-gradient(to right, #3e79f7, #728e6f);
    width: 15px;
    height: 15px;
    transition: all 0.3s ease;
    transform: translateY(-50%);
  }

  .cta span {
    position: relative;
    font-family: ${fonts.fontPequena};
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: ${cores.branca};
  }

  .cta svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #3e79f7;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  .cta:hover:before {
    width: 100%;
    background: linear-gradient(to right, #3e79f7, #728e6f);
    height: 45px;
  }

  .cta:hover svg {
    transform: translateX(0);
    stroke: #e7fc00;
    stroke-width: 3;
  }

  .cta:active {
    transform: scale(0.95);
  }
`
