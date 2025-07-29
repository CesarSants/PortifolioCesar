import { styled } from 'styled-components'
import { cores, fonts } from '../../styles'

export const Container = styled.div`
  height: 100dvh;
  width: 100%;
  position: relative;

  .isActive {
    background-color: #b37da7 !important;
  }

  /* .cardContainer:nth-child(odd) {
    padding-left: 20px;
  }

  .cardContainer:nth-child(even) {
    padding-right: 20px;
  } */

  /* .slick-slide {
    position: relative;
  }

  .slick-track {
    position: relative;
  } */

  /* .slick-track:nth-of-type(2) {
    gap: 0;
  }

  .slick-list > .slick-track {
    gap: 30px;
  }  */

  .cardContainer1 {
    padding-right: 10px;
    padding-left: 10px;
  }

  .cardContainer2 {
    padding-left: 10px;
    padding-right: 10px;
  }

  .cardContainer {
    /* background-color: #2bacbd; */
    /* padding: 0 20px; */
    /* max-height: 100%;
    height: auto; */
  }

  .slider2 {
    width: 97%;
    margin: 0 auto;
    /* height: 10%; */
  }

  .slick-dots {
    bottom: -40px;
    //bottom: 20px;//
  }

  .slick-dots li {
    margin: 0 10px;
    /* padding: 50px; */
  }

  .slick-dots li button:before {
    font-size: 20px;
    background-color: red;
    border-radius: 50%;
    /* opacity: 1; */
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
  }

  .slick-dots li button:hover:before {
    opacity: 0.5;
    width: 32px;
    height: 32px;
  }

  .slick-dots li.slick-active button:hover:before {
    opacity: 0.7;
    width: 37px;
    height: 37px;
  }

  .slick-dots li button {
    font-size: 20px;
    color: red;
    /* padding: 50px; */
  }

  .slick-dots li.slick-active button:before {
    color: green;
    background-color: green;
    opacity: 0.5;
    width: 35px;
    height: 35px;
  }

  .slick-dots li.slick-active button {
    color: green;
  }

  .card {
    background-color: #58174a81;
    /* width: 500px; */
    /* max-width: 500px; */
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin-right: 300px;
    padding: 0 20px 10px;
    border-radius: 40px;

    border: 8px #9999 groove;
    border-left: 8px #9999 ridge;
    border-top: 8px #9999 ridge;
    border-bottom: none;
    box-shadow: 0 0 0 #666 inset, 0 0 8px #666 inset;

    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    /* flex-direction: column;
    justify-content: space-between;
    align-items: center; */

    .slick-slide img {
      height: auto;
      width: 100%;
      /* max-height: 10%; */
      //max-width: 390px;
      /* width: auto;
      height: auto;
      max-height: 50%; */
      max-width: auto;
      max-height: 47.5dvh;
      object-fit: cover;
      margin: auto;
      margin-top: -3%;
      /* object-position: 50% 53%;
      clip-path: inset(15% 0 10% 0); */
    }

    .imgContainer {
      overflow: hidden;
      height: auto;
      /* height: calc(100% - 25%); */
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

  .toggleSlidesButton {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background-color: #44b8a3;
    color: white;
    border-radius: 50%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;

    @media ((min-width: 867px) and  (max-width: 1177px)) {
      bottom: none;
      top: 20px;
    }

    @media (max-width: 867px) {
      display: none;
    }
  }

  .toggleSlidesButton:hover {
    background-color: #62d9c7;
  }

  .sliderImgContainer {
    width: 100%;
    height: 100%;
  }

  /////////////////

  /* .slider-wrapper {
    opacity: 1;
    transition: opacity 1s ease-in-out;
    position: relative;
  }

  .slider-wrapper.fade-out {
    opacity: 0.5;
  }

  .slider-wrapper.fade-in {
    opacity: 1;
  }

  .slider-item {
    position: relative;
    opacity: 1;

    transition: opacity 0.3s ease-in-out;
  }

  .slider-wrapper.fade-out .slider-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0.5;
  } */

  /////////////////////////////////////
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

  .contentEncaps {
    width: 90%;
    /* width: 80%;
    align-items: center; */
    margin-top: -30px;
  }

  .content-wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    padding-top: 22dvh;
  }

  .content {
    position: relative;
    max-width: 1024px;
    margin-right: calc((100dvw - 1024px) / 2);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100%;
  }

  .aside {
    width: calc((100dvw - 1024px) / 2);
    min-width: 160px;
    position: relative;
  }

  .nav-tipos {
    position: sticky;
    top: 10dvh;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 1rem;

    ul {
      list-style: none;

      li:first-child {
        button {
          margin-bottom: 20px;
        }
      }
    }
  }

  .nav-tipos button {
    width: 100%;
    padding: 0.5rem;
    background-color: rebeccapurple;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
    border-radius: 40px;
    border: 8px #9999 groove;
    border-left: 8px #9999 ridge;
    border-top: none;
    box-shadow: 0 0 0 #666 inset, 0 0 8px #666 inset;
    color: white;
    transition: all 1s ease;
  }

  .nav-tipos button:hover {
    background-color: #2bacbd;
    color: wheat;
    transform: scale(1.08);
    transition: all 1s ease;
  }

  .nav-tipos2 {
    display: none;

    /* position: absolute;//
    z-index: 1;// */
  }

  @media (max-width: 1344px) {
    /* height: 110dvh; */

    ///////////////////////////////////////////////////////////

    .nav-tipos {
      display: none;
    }
    .nav-tipos2 {
      display: flex;
      position: sticky;
      /* top: 60px; */
      top: 8dvh;
      padding: 10px 0;
      /* margin-top: -34%; */
      margin-top: -60px;
      z-index: 2;
      ul {
        display: flex;
        gap: 20px;
        li button {
          max-width: 100%;
          width: 140px;
        }
      }
    }

    .contentEncaps {
      /* height: 100%; */
      /* width: 100%; */
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: auto 0;
      top: 0;
      bottom: 0;
      margin-top: -15px;
    }

    .contentPrincipal {
      margin-top: 0;
      justify-content: center;
      align-items: center;
      display: flex;
    }

    .content {
      flex-direction: column;
    }

    .content-wrapper {
      padding-top: 28dvh;
      flex-direction: column;
      height: 100%;
    }

    ///////////////////////////////////////////////////////////

    .aside {
      width: 100%;
      max-width: 512px;
      min-width: 0;
      margin: 0 auto;

      nav {
        padding: 0;

        ul {
          display: flex;
          margin: 0 auto;
          gap: 20px;

          li button {
            max-width: 100%;
            width: 140px;
          }
        }
      }
    }

    .content {
      margin: 0 auto;
      justify-content: center;
      align-items: center;
      padding-top: 0px;
      height: 100%;
      bottom: 0;
      max-height: 100%;
    }
  }

  @media (max-width: 1024px) {
    .content {
      max-width: 100%;
    }
  }

  @media (max-height: 680px) {
    .nav-tipos2 {
      top: 9.5dvh;
    }
  }
`

// export const ImageContainer = styled.img`
//   height: auto;
//   width: ${(props) => props.imageWidth}px;
//   max-width: ${(props) => props.imageWidth}px;
//   object-fit: cover;
//   margin: auto;
// `
