import styled, { createGlobalStyle } from 'styled-components'
import fundo from '../../assets/backGrounds/cinza-19.webp'

export const cores = {
  branca: '#eeeeee',
  preta: '#111111',
  cinza: '#333333',
  verde: '#10ac84',
  amarelo: '#e7fc00'
}

export const fonts = {
  fontGrande: "'Poppins', sans-serif",
  fontPequena: "'Work Sans', sans-serif"
}

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${fonts.fontPequena};
    scrollbar-width: initial !important;
    scrollbar-color: initial !important;
  }

  html {
    scrollbar-width: thin !important;
    scrollbar-color: rgba(179, 125, 167, 0.6) transparent !important;

    &::-webkit-scrollbar {
      width: 6px !important;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(100, 100, 100, 0.6) !important;
      border-radius: 4px !important;
    }
    &::-webkit-scrollbar-track {
      background: transparent !important;
    }
  }

  body{
    background-color: ${cores.preta};
    color: ${cores.branca};
    overflow-x: hidden;

    .Toastify__toast-container {
      position: fixed !important;
      z-index: 9999999 !important;
      top: 1rem !important;
      right: 1rem !important;
      width: auto !important;
      min-width: 300px !important;
      max-width: 600px !important;
      pointer-events: auto !important;
    }

    .Toastify__toast {
      background-color: ${cores.cinza} !important;
      color: ${cores.branca} !important;
      font-family: ${fonts.fontPequena} !important;
      font-size: 16px !important;
      border-radius: 8px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    }

    .Toastify__toast-body {
      padding: 12px !important;
    }

    .particlesContainer{
      position: fixed;
      top: 0;
      left: 0;
      width: 100dvw;
      height: 100dvh;
      overflow: hidden;
      z-index: -1;
      background-image: url('https://fake-api-khaki.vercel.app/img/cinza-19.webp');
      background-size: cover;
      background-position: center;
    }

      #tsparticles {
      position: absolute;
      width: 100dvw;
      height: 100dvh;
      overflow: hidden;
      opacity: 1;
    }
  }

  /* Estilos específicos para dispositivos touch */
  @media (hover: none) and (pointer: coarse) {
    /* Melhora a experiência de touch */
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    /* Desabilita zoom em dispositivos touch */
    input, textarea, select {
      font-size: 16px !important;
    }

    /* Melhora a responsividade de botões em touch */
    button, a, [role="button"] {
      min-height: 44px;
      min-width: 44px;
    }
  }

  /* Estilos para dispositivos não-touch (desktop) */
  @media (hover: hover) and (pointer: fine) {
    /* Mantém seleção de texto em desktop */
    * {
      -webkit-user-select: auto;
      -khtml-user-select: auto;
      -moz-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
  }
`

export const Container = styled.div`
  position: relative;
  /* max-width: 1024px; */
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 100dvw;
  contain: paint;
`
