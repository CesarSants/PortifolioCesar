import styled from 'styled-components'
import { cores, fonts } from '../../styles'

export const Container = styled.div`
  height: 100dvh;
  padding-bottom: 20px;
` 

export const ContentWrapper = styled.div`
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding-top: 170px;
  overflow: hidden;
  height: 100%;

  .contentContainer {
    position: relative;
    display: flex;
    max-width: 1024px;
    width: 100%;
    height: calc(100vh - 170px);
    max-height: 100%;

    .background {
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
        border-top-right-radius: 40px;
        border-top-left-radius: 40px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border: 8px #9999 groove;
        border-left: 8px #9999 ridge;
        border-top: 8px #9999 ridge;
        border-bottom: none;
        box-shadow: 0 0 0 #666 inset, 0 0 8px #666 inset;
      }

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
        border-top-right-radius: 40px;
        border-top-left-radius: 40px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
      }
    }

    .content {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      overflow: auto;

      .menu {
        display: flex;
        justify-content: space-between;
        margin: 0 40px;

        @media (max-width: 1024px) {
          flex-direction: column-reverse;
          align-items: center;

          .resultado {
            padding: 6px 0;
          }

          .selectContainer {
            flex-direction: column;
          }
        }

        @media (max-width: 420px) {
          .selectContainer {
            select {
              width: 120%;

              &:focus {
                background-color: #58174a;
                font-size: 14px;
                margin-top: 1px;
              }
            }
          }
        }

        .menuContainer {
          width: auto;
        }

        input {
          border-radius: 10px;
          background-color: #58174a81;
          padding: 5px;
          color: wheat;
          font-size: 16px;
        }

        .resultado {
          margin: auto 23px;
          color: #2bacbd;
        }

        input::placeholder {
          color: #b9a275;
          font-style: italic;
        }

        input:focus {
          margin-top: 1px;
          outline-color: #b37da7;
        }

        .selectContainer {
          display: flex;
          gap: 10px;
          align-items: center;

          select {
            border-radius: 10px;
            background-color: #58174a81;
            padding: 5px;
            color: wheat;
            outline-color: #b37da7;
            appearance: none; /* Remove a seta padrão */
            -webkit-appearance: none; /* Remove a seta no Safari */
            -moz-appearance: none; /* Remove a seta no Firefox */
            /* border: 1px solid #ccc; */
            /* width: 200px; */
            position: relative; /* Para garantir que a seta esteja posicionada corretamente */
            background-image: url('https://fake-api-khaki.vercel.app/img/svg.png');
            background-repeat: no-repeat;
            background-position: right 10px center;
            padding-right: 30px; /* Ajuste a posição da seta */
            font-size: 16px;
            background-size: 20px 20px;

            &:focus {
              background-color: #58174a;
              /* font-size: 10px; */
              margin-top: 1px;
            }

            option:checked {
              background-color: #b37da7;
              color: wheat;
            }
          }
        }
      }

      .cardContainer {
        flex: 1;
        box-sizing: border-box;
        margin: 20px 40px;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(100, 100, 100, 0.6) transparent;
      }

      .cardContainer::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .cardContainer::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.6);
        border-radius: 10px;
      }

      .cardContainer::-webkit-scrollbar-track {
        background: transparent;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        /* overflow: auto; */
        gap: 20px;
        margin: 0 20px;
        /* justify-content: center; */

        @media (max-width: 840px) {
          justify-content: center;
        }

        li {
          list-style: none;
          width: 100%;
          max-width: 350px;

          .card {
            margin-top: 20px;
            text-align: center;
            border-radius: 40px;
            display: flex;
            flex-direction: column;
            position: relative;

            @media (max-width: 400px) {
              font-size: 14px;

              .contCard1 {
                margin-right: 15px;
                margin-left: -8px;
              }
            }

            .background {
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
                border-top-right-radius: 40px;
                border-top-left-radius: 40px;
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 20px;
                border: 8px #9999 groove;
                border-left: 8px #9999 ridge;
                border-top: 8px #9999 ridge;
                border-bottom: none;
                box-shadow: 0 0 0 #666 inset, 0 0 8px #666 inset;
              }

              &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #290a23;
                opacity: 0.5;
                z-index: 0;
                pointer-events: none;
                border-top-right-radius: 40px;
                border-top-left-radius: 40px;
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 20px;
              }
            }

            .listItemName {
              margin-top: 10px;
            }

            .cardInfos {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin: 15px 20px 0px;

              .contCard1,
              .contCard2 {
                display: flex;
                flex-direction: column;
              }

              .infos {
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
              }

              .listItemLanguage {
                span {
                  margin-top: 10px;

                  img {
                    max-height: 80px;
                    width: auto;
                    object-fit: contain;
                    transition: transform 1s ease, filter 1s ease;
                    filter: grayscale(0%);
                  }
                  &:hover img {
                    transform: scale(1.1);
                    filter: grayscale(100%);
                  }
                }
              }
            }
            .cta {
              position: relative;
              margin: 0 auto;
              padding: 18px 18px;
              transition: all 0.2s ease;
              border: none;
              background: none;
              cursor: pointer;
              text-decoration: none;
            }

            .cta span {
              font-size: clamp(1.2rem, 1.5dvw + 1rem, 2rem);

              @media (max-width: 380px) {
                font-size: 13px !important;
              }
            }

            .cta:before {
              content: '';
              position: absolute;
              top: 50%;
              bottom: auto;
              left: -2px;
              display: block;
              border-radius: 50px;
              background: linear-gradient(to right, rebeccapurple, #728e6f);
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
              background: linear-gradient(to right, rebeccapurple, #728e6f);
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
          }
        }
      }
    }
  }
`
