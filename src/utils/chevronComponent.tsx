import { useEffect } from 'react'
import scrollDown from '../assets/images/scroll-icon.png'

const ChevronComponent = () => {
  useEffect(() => {
    const chevron = document.querySelector('.chevron-down') as HTMLElement
    const menuContainer = document.querySelector('.menu-aberto') as HTMLElement

    const timer = setTimeout(() => {
      if (chevron) {
        chevron.style.opacity = '1'
        chevron.style.animation = 'bounce 1.5s infinite'
      }
    }, 1000)

    const handleScroll = () => {
      // if (window.scrollY > window.innerHeight * 0.1) {
      //   if (chevron) {
      //     chevron.style.opacity = '0'
      //     chevron.style.animation = 'none'
      //   }
      // } else {
      //   if (chevron) {
      //     chevron.style.opacity = '1'
      //     chevron.style.animation = 'bounce 2s infinite'
      //   }
      // }
      if (menuContainer && chevron) {
        if (menuContainer.scrollTop > menuContainer.clientHeight * 0.1) {
          chevron.style.opacity = '0'
          chevron.style.animation = 'none'
        } else {
          chevron.style.opacity = '1'
          chevron.style.animation = 'bounce 2s infinite'
        }
      }
    }

    const handleClick = () => {
      if (menuContainer) {
        menuContainer.scrollTo({
          top: menuContainer.clientHeight * 1,
          behavior: 'smooth'
        })
      }
    }

    chevron?.addEventListener('click', handleClick)
    menuContainer?.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      chevron?.removeEventListener('click', handleClick)
      menuContainer?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="chevron-down">
      <img src={scrollDown} alt="" />
    </div>
  )
}

export default ChevronComponent
