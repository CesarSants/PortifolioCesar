import { styled } from 'styled-components'
import { cores, fonts } from '../../styles'

export const Container = styled.div`
  height: 100dvh;
  position: relative;
  display: flex;
  flex-direction: column;

  .contentWrapper {
    padding-top: 180px;
    /* padding-top: 30dvh; */

    height: 100%;
    align-items: center;
    /* display: flex; */
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    @media (max-width: 903px) {
      padding-top: 130px;
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
      opacity: 0.75;
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
    opacity: 0.5;
    z-index: -1;
    pointer-events: none;
    border-radius: 220px;
  }

  .content {
    max-width: 1024px;
    margin: 5dvh auto 0;
    display: flex;
    justify-content: space-between;

    .socialMedias {
      width: 100%;

      .mediaContainer {
        display: flex;
        gap: 20px;
        justify-content: space-between;

        .media:first-child {
          img {
            object-fit: contain;
          }
        }

        .media {
          max-width: 100px;
          width: 100%;
          height: auto;

          img {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1s ease, filter 1s ease;
            filter: grayscale(70%);
          }
          &:hover img {
            transform: scale(1.2);
            filter: grayscale(0%);
          }
        }
      }
      @media (max-width: 850px) {
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0 auto;
        .mediaContainer {
          flex-direction: column;

          .media:last-child {
            img {
              object-fit: contain;
            }
          }

          .media {
            align-items: center;
            justify-content: center;
            text-align: center;
            margin: 0 auto;
            height: 80px;
          }
        }
      }
      @media (max-width: 550px) {
        font-size: 8px;
        margin-right: 20px;
        margin-left: 10px;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 500px;
      align-items: flex-end;
      /* align-items: flex-start; */
      /* margin-left: auto; */

      @media (max-width: 463px) {
        width: 200px;
        align-items: flex-start;
        margin-right: 10px;
      }

      .cta {
        position: relative;
        /* margin: auto; */
        padding: 18px 18px;
        transition: all 0.2s ease;
        border: none;
        background: none;
        cursor: pointer;

        text-decoration: none;

        @media (max-width: 1180px) {
          margin: auto;
          margin-top: -10px;
        }
      }

      .cta span {
        font-size: clamp(1.2rem, 1.5dvw + 1rem, 2rem);
      }

      .cta:before {
        content: '';
        position: absolute;
        top: 50%;
        bottom: auto;
        left: -2px;
        display: block;
        border-radius: 50px;
        background: linear-gradient(to right, #186670, #b37da7);
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

      .cta:not(:disabled):hover:before {
        width: 100%;
        background: linear-gradient(to right, #186670, #b37da7);
        height: 45px;
      }

      .cta:not(:disabled):hover svg {
        transform: translateX(0);
        stroke: #e7fc00;
        stroke-width: 3;
      }

      .cta:not(:disabled):active {
        transform: scale(0.95);
      }

      .cta.submitting,
      .cta:disabled {
        opacity: 0.7;
        cursor: not-allowed;

        &:before {
          background: linear-gradient(to right, #666, #999);
          width: 100%;
          height: 45px;
        }

        &:hover:before {
          background: linear-gradient(to right, #666, #999);
        }

        svg {
          opacity: 0.5;
        }
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 20px 0;

    @media (max-width: 1180px) {
      padding-bottom: 0px;

      p {
        font-size: 15px;
        padding: 0 10px;
      }
    }

    @media (max-width: 471px) {
      padding: 0 30px;
    }

    p {
      color: #999;
    }
  }
`

export const InputGroup = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  margin-bottom: 15px;
  width: 100%;
  justify-content: flex-end;
  text-align: end;

  label {
    font-size: 14px;
    margin-top: 10px;
    line-height: 16px;
    display: inline-block;
    width: 30%;
    text-align: left;
    flex-wrap: nowrap;
    white-space: nowrap;
    margin-right: auto;
    vertical-align: top;
    font-size: 15px;

    @media (max-width: 600px) {
      display: block;
      width: 100%;
      /* margin-bottom: 8px; */
    }
  }

  input,
  textarea {
    font-size: 16px;
    width: auto;
    min-width: 300px;
    max-width: 100%;
    margin-left: 16px;
    display: inline-block;
    right: 0;
    padding: 8px;
    border-radius: 10px;
    background-color: #58174a81;
    color: wheat;
    border: 2px solid #9999;

    &.error {
      border: 2px solid #581749;
      background-color: #6b132299;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #581749 inset !important;
      -webkit-text-fill-color: wheat;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 600px) {
      width: 100%;
      margin-left: 0;
    }
  }

  textarea {
    height: 100px;
    resize: none;
  }

  small {
    color: #daa411;
    font-size: 12px;
    display: flex;
    margin-top: 4px;
    line-height: 16px;
    flex-direction: row-reverse;
    margin-right: 40px;
  }

  @media (max-width: 903px) {
    /* margin-top: -40px; */
    margin-right: 10px;
    /* margin-left: -50px; */
    margin-bottom: 0;

    label {
      margin-right: 150px;
    }

    small {
      margin-top: 2px;
      margin-right: 10px;
    }
  }
  @media (max-width: 463px) {
    /* width: auto; */
    /* width: 80%; */

    input,
    textarea {
      /* width: 100%; */
      min-width: 100px;
      margin-left: 0;
    }
  }
`
