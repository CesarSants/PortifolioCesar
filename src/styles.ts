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
  }

  body{
    background-color: ${cores.preta};
    color: ${cores.branca};
    overflow-x: hidden;

    .particlesContainer{
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      z-index: -1;
      background-image: url('https://fake-api-khaki.vercel.app/img/cinza-19.webp');
      background-size: cover;
      background-position: center;
    }

      #tsparticles {
      position: absolute;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      opacity: 1;
    }
  }
`

export const Container = styled.div`
  position: relative;
  /* max-width: 1024px; */
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
