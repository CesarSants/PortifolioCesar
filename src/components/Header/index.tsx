import React, { useEffect, useState } from 'react'
import ChevronComponent from '../../utils/chevronComponent'
import ChevronComponentUp from '../../utils/chevronComponentUp'
import { Head, HeaderContainer } from './styles'
import topLogo from '../../assets/images/top-nome3.png'
import { HashLink } from 'react-router-hash-link'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(false)

  // const handleMenuToggle = () => {
  //   setIsMenuOpen((prevState) => !prevState)
  // }

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => {
      if (prevState) {
        setTimeout(() => {
          const menuContainer = document.querySelector(
            '.menu-aberto'
          ) as HTMLElement
          if (menuContainer) {
            menuContainer.scrollTop = 0
          }
        }, 500)
      }
      return !prevState
    })
  }

  const handleOverlayClick = () => {
    setIsMenuOpen(false)
    setTimeout(() => {
      const menuContainer = document.querySelector(
        '.menu-aberto'
      ) as HTMLElement
      if (menuContainer) {
        menuContainer.scrollTop = 0
      }
    }, 500)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    // const heroSection = document.querySelector('.sobre') as HTMLElement
    // const alturaHero = heroSection.clientHeight

    // const handleScroll = () => {
    //   const posicaoAtual = window.scrollY

    //   if (posicaoAtual > alturaHero) {
    //     setIsHeaderVisible(true)
    //   } else {
    //     setIsHeaderVisible(false)
    //   }
    // }

    const heroSection = document.querySelector('.inicio') as HTMLElement
    const alturaHero = heroSection.clientHeight

    const handleScroll = () => {
      const posicaoAtual = window.scrollY

      if (posicaoAtual > alturaHero) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Head className="header" id="header">
      {/* <div>ola mundo</div> */}
      <div className="menuContainer">
        <div className="menu">
          <label className="hamburger">
            <input
              type="checkbox"
              id="menuToggle"
              checked={isMenuOpen}
              onChange={handleMenuToggle}
              aria-label="Abrir menu"
            />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </div>
      </div>
      <div className="menuAbertoContainer">
        <div className={`menu-aberto ${isMenuOpen ? 'active' : ''}`}>
          <ChevronComponent />
          <ChevronComponentUp />
          <nav className="nav-menu">
            <HashLink smooth to="/#inicio" onClick={handleLinkClick}>
              INÍCIO
            </HashLink>
            <HashLink smooth to="/#sobre" onClick={handleLinkClick}>
              SOBRE
            </HashLink>
            <HashLink smooth to="/#projetos" onClick={handleLinkClick}>
              PROJETOS
            </HashLink>
            <HashLink smooth to="/#repositorios" onClick={handleLinkClick}>
              REPOSITÓRIOS
            </HashLink>
            <HashLink smooth to="/#contact" onClick={handleLinkClick}>
              CONTATO
            </HashLink>
          </nav>
        </div>
        <div
          className={`overlay ${isMenuOpen ? 'active' : ''}`}
          onClick={handleOverlayClick}
          aria-hidden="true"
        ></div>
      </div>
      <HeaderContainer>
        <div
          className={`logo headerContainer ${
            isHeaderVisible ? 'header--is-visible' : 'header--is-hidden'
          }`}
        >
          <HashLink smooth to="/#inicio">
            <img src={topLogo} alt="Logo" />
          </HashLink>
        </div>
      </HeaderContainer>
    </Head>
  )
}

export default Header
