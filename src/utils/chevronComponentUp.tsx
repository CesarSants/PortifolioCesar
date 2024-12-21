import { useEffect, useState } from 'react'
import scrollUp from '../assets/images/scroll-icon-up.png'

const ChevronComponentUp = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const chevron = document.querySelector('.chevron-up') as HTMLElement
    const menuContainer = document.querySelector('.menu-aberto') as HTMLElement

    const setInitialVisibility = () => {
      if (menuContainer) {
        menuContainer.scrollTop = 0
        setIsVisible(false)
      }
    }

    const handleScroll = () => {
      if (menuContainer && chevron) {
        if (menuContainer.scrollTop > menuContainer.clientHeight * 0.1) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }
    setInitialVisibility()

    const handleClick = () => {
      if (menuContainer) {
        menuContainer.scrollTo({
          top: menuContainer.scrollTop - menuContainer.clientHeight,
          behavior: 'smooth'
        })
      }
    }

    chevron?.addEventListener('click', handleClick)
    menuContainer?.addEventListener('scroll', handleScroll)

    return () => {
      chevron?.removeEventListener('click', handleClick)
      menuContainer?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="chevron-up"
      style={{
        opacity: isVisible ? '1' : '0',
        animation: isVisible ? 'bounce 2s infinite' : 'none'
      }}
    >
      <img src={scrollUp} alt="Scroll Up" />
    </div>
  )
}

export default ChevronComponentUp
