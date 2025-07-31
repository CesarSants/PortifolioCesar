import styled from 'styled-components'
import { cores, fonts } from '../../styles'

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100dvw;
  height: 57px;

  .headerContainer {
    opacity: 0;
    background-color: #33092ca6;
    height: 57px;
    transition: transform 0.7s ease-in-out, opacity 2s ease-in-out;
    transform: translateY(-100%);
  }

  .headerContainer.header--is-visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  .headerContainer.header--is-hidden {
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  }
  .logo {
    img {
      height: 32px;
      display: flex;
      align-items: center;
    }
  }

  .menuAbertoContainer {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`

export const Head = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  z-index: 2;

  .logo {
    z-index: 96;
    padding-left: 15px;
    padding-right: 100dvw;
    padding-top: 20px;
    padding-bottom: 44px;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 101;
    position: fixed;
    right: 15px;
    top: 8px;
  }

  .hamburger {
    cursor: pointer;
    z-index: 103;
    position: relative;
  }

  .hamburger input {
    display: none;
  }

  .hamburger svg {
    height: 3em;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }

  .menu-aberto {
    background-color: rgba(0, 0, 0, 0.92);
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 0;
    height: 0;
    width: 80%;
    /* z-index: 1000000; */
    z-index: 98;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    transition: height 0.5s ease-in-out, opacity 0.5s ease-in-out;
    opacity: 0;
    border-bottom-left-radius: 42px;
    border-bottom-right-radius: 42px;
    border: 8px #9999 groove;
    border-left: 8px #9999 ridge;
    border-top: none;
    box-shadow: 0 0 0 #666 inset, 0 0 8px #666 inset;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .menu-aberto.active {
    height: 50dvh;
    opacity: 1;
    /* z-index: 98000; */
  }

  .nav-menu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    transition: opacity 0.5s ease-in-out;
    position: absolute;
    padding-bottom: 16px;
    padding-top: 15rem;
    top: 0;
  }

  .nav-menu a {
    user-select: none;
    text-decoration: none;
    color: #c4acf0;
    font-family: ${fonts.fontPequena};
    font-size: 3rem;
    font-weight: bold;
    opacity: 0;
    transform: translateY(-20px);
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;

    @media (max-width: 650px) {
      font-size: 2rem;
    }
    &:last-child {
      padding-bottom: 16px;
    }
  }

  .menu-aberto.active .nav-menu a {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.9s ease;
    z-index: 103;
  }

  .nav-menu a:hover {
    color: #2bacbd;
    transition: all 0.9s ease;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 97;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.55s ease-in-out, opacity 0.55s ease-in-out;
  }

  .menu-aberto.active ~ .overlay {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .menu-aberto.active {
    height: 50dvh;
    opacity: 1;
    transition: height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }

  .menu-aberto:not(.active) ~ .overlay {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100%);
  }

  .chevron-down,
  .chevron-up {
    display: block;
    position: fixed;
    bottom: 48dvh;
    left: 85dvw;
    transform: translateX(-50%);
    transition: opacity 0.4s ease-out;
    opacity: 0;
    z-index: 10000;
    overflow: visible;

    @media (max-width: 678px) {
      left: 15dvw;
      /* left: none; */
    }
  }
  .chevron-down img,
  .chevron-up img {
    width: 32px;
  }

  .chevron-up {
    bottom: 85dvh;
  }

  .chevron-down {
    bottom: 52dvh;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }

    50% {
      transform: translateX(-50%) translateY(-20px);
    }
  }
`
