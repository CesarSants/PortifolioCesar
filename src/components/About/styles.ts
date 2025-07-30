// import styled from 'styled-components'
// import fundo from '../../assets/backGrounds/cinza-19.webp'

// export const Container = styled.div`
//   height: 100dvh;
//   background-image: url(${fundo});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   overflow: hidden;
//   position: relative;
//   z-index: 0;
//   opacity: 0.8;
//   padding-top: 64px;

//   &:after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: black;
//     opacity: 0.5;
//     z-index: 1;
//     pointer-events: none;
//   }

//   :first-child {
//     position: relative;
//     z-index: 2;
//   }

//   .cont {
//   }
// `

import styled from 'styled-components'
import { fonts } from '../../styles'
import fundo from '../../assets/backGrounds/roxo-6.jpg'

export const Container = styled.div`
  height: 200dvh;
  position: relative;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .background,
  .backgroundResume {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;

    img {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.65;
    }
  }

  .backgroundResume {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    border-radius: 40px;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
      z-index: 0;
      pointer-events: none;
      border-radius: 40px;
    }

    img {
      border-radius: 40px;
      box-shadow: 0px 4px 20px rgba(255, 0, 0, 0.8);
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.35;
    z-index: -1;
    pointer-events: none;
  }

  .container1 {
    min-height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .container2 {
    min-height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .aboutContainer {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1024px;
    width: 100%;
    height: 100%;
    max-height: 100dvh;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    .resume.resume2 {
      max-height: 50dvh;
      height: 50dvh;
      margin-bottom: 3dvh;
    }
  }

  .resume {
    width: 80dvw;
    line-height: 20px;
    font-family: ${fonts.fontPequena};
    font-size: 19px;
    position: relative;
    z-index: 0;
    border-radius: 40px;
    max-height: 70dvh;
    height: 70dvh;
    margin-top: 16dvh;
    p {
      padding: 0 20px;
    }

    .textContainer {
      position: relative;
      max-height: 100%;
      overflow-y: auto;
      margin-top: 20px;
      /* padding: 20px; */
      height: calc(100% - 40px);
      scrollbar-width: thin;
      scrollbar-color: rgba(100, 100, 100, 0.6) transparent;

      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.6);
        border-radius: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    @media (max-width: 1024px) {
      font-size: 18px;
      letter-spacing: 1.2px;
      line-height: 30px;
      max-height: 40dvh;
      height: 40dvh;
      position: relative;
      margin-top: -15dvh;
      margin-bottom: 8.5dvh;
      padding: 10px 0;

      .backgroundResume {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      .backgroundResume2 {
      }

      .textContainer {
        position: relative;
        max-height: 100%;
        overflow-y: auto;
        padding: 0 20px 10px 20px;
        scrollbar-width: thin;
        scrollbar-color: rgba(100, 100, 100, 0.6) transparent;

        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba(100, 100, 100, 0.6);
          border-radius: 4px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
        }

        p {
          padding: 0;
          text-align: center;
        }
      }
    }
  }

  .container-svg {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: auto;
    overflow: hidden;
  }

  .svg-image {
    align-items: center;
    position: absolute;
    display: flex;
    img {
      z-index: 0;
      width: auto;
      margin-right: -58px;
      max-height: 450px;
      height: auto;
      margin-bottom: 41px;
    }
  }

  .complemento-sobre {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    z-index: 0;
    margin-top: 100px;
  }

  .complemento-sobre svg {
    position: relative;
    display: block;
    margin-right: -58px;
    width: 600px;
    height: 600px;
    z-index: 0;
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0deg);
    }
  }

  @media (max-width: 1024px) {
    .aboutContainer {
      flex-direction: column-reverse;
    }

    .container-svg {
      margin-top: -20px;
      display: flex;
      width: 100%;
      height: 40dvh;
      overflow: visible;

      svg {
        margin-left: -50px;
      }
    }

    .complemento-sobre {
      margin-top: 18dvh;
    }

    .complemento-sobre svg {
      width: auto;
      height: 40dvh;
    }

    .svg-image {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-top: 2px;
        margin-left: -49px;
        height: 30dvh;
        width: auto;
      }
    }
  }

  .aboutContainer2 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1024px;
    max-height: 100%;
    margin: 0 auto;
    margin-top: -140px;
  }

  .container1,
  .container2 {
    h3 {
      text-align: center;
      font-size: 60px;
      font-family: ${fonts.fontGrande};
      padding: 50px 0 0 0;

      @media (max-width: 400px) {
        font-size: 48px;
      }
    }
  }

  .aboutContainer1 {
    padding-bottom: 20px;
  }

  .tec {
    width: 580px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 20px;
    margin-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .grid-item {
    position: relative;
    width: 100px;
    height: 100px;
  }

  .grid-item img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: opacity 1s ease;
  }

  .grid-item img.dark {
    opacity: 1;
  }

  .grid-item:hover img.dark {
    opacity: 1;
  }

  .grid-item:hover img.normal {
    opacity: 0;
  }

  .grid-item:hover {
    transform: scale(1.2);
  }

  .containerTec {
    @media (max-width: 1024px) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;

      .tec {
        display: grid;
        margin-left: -10dvw;
        margin-top: 40px;
        grid-template-columns: repeat(10, 10%);
        width: 100%;
        height: 20dvh;
        column-gap: 1dvw;
        row-gap: 1dvh;

        .grid-item {
          width: 100%;
          height: 100%;
          width: 8dvw;
          height: 8dvh;
          gap: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .aboutContainer2 {
      align-items: center;
      /* margin: 0 auto; */
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      /* display: block; */
    }
  }
`
