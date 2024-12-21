// import React, { useEffect, useState } from 'react'
// import { NavigationContainer, NavigationButton } from './styles'

// const Navigation = () => {
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const [documentHeight, setDocumentHeight] = useState(0)
//   const [isAtTop, setIsAtTop] = useState(true)
//   const [isAtBottom, setIsAtBottom] = useState(false)

//   useEffect(() => {
//     const updateScroll = () => {
//       const scrollY = window.scrollY
//       const height = document.documentElement.scrollHeight - window.innerHeight

//       setScrollPosition(scrollY)
//       setDocumentHeight(height)

//       setIsAtTop(scrollY <= 6)
//       setIsAtBottom(Math.abs(scrollY - height) <= 6)
//     }

//     window.addEventListener('scroll', updateScroll)
//     updateScroll()

//     return () => window.removeEventListener('scroll', updateScroll)
//   }, [])

//   const scrollTo = (offset: number) => {
//     const targetPosition =
//       Math.round(window.scrollY / window.innerHeight) * window.innerHeight +
//       offset +
//       1

//     //     const targetPosition =
//     // Math.round(window.scrollY / window.visualViewport.height) *
//     //   window.visualViewport.height +
//     // offset

//     window.scrollTo({
//       top: Math.max(0, Math.min(targetPosition, documentHeight)),
//       behavior: 'smooth'
//     })
//   }

//   const scrollUp = () => scrollTo(-window.innerHeight)
//   const scrollDown = () => scrollTo(window.innerHeight)

//   ///////////////////////////////////////////////////////////////////////////////////////////////

//   // const updateScroll = () => {
//   //   const scrollY = window.scrollY
//   //   const height = document.documentElement.scrollHeight - window.innerHeight

//   //   setScrollPosition(scrollY)
//   //   setDocumentHeight(height)

//   //   setIsAtTop(scrollY <= 6)
//   //   setIsAtBottom(Math.abs(scrollY - height) <= 6)
//   // }

//   // useEffect(() => {
//   //   window.addEventListener('scroll', updateScroll)
//   //   updateScroll()

//   //   // Listen for window resize to update documentHeight dynamically
//   //   window.addEventListener('resize', updateScroll)

//   //   return () => {
//   //     window.removeEventListener('scroll', updateScroll)
//   //     window.removeEventListener('resize', updateScroll)
//   //   }
//   // }, [])

//   // const scrollTo = (offset: number) => {
//   //   // Adjust the calculation of targetPosition for mobile
//   //   const targetPosition =
//   //     Math.round(window.scrollY / window.innerHeight) * window.innerHeight +
//   //     offset +
//   //     1

//   //   // Ensure targetPosition does not go beyond the document height
//   //   window.scrollTo({
//   //     top: Math.max(0, Math.min(targetPosition, documentHeight)),
//   //     behavior: 'smooth'
//   //   })
//   // }

//   // const scrollUp = () => scrollTo(-window.innerHeight)
//   // const scrollDown = () => scrollTo(window.innerHeight)

//   //////////////////////////////////////////////////////////////////////////////////////////////

//   return (
//     <NavigationContainer>
//       {!isAtTop && (
//         <NavigationButton onClick={scrollUp} data-direction="up">
//           ↑
//         </NavigationButton>
//       )}
//       {!isAtBottom && (
//         <NavigationButton onClick={scrollDown} data-direction="down">
//           ↓
//         </NavigationButton>
//       )}
//     </NavigationContainer>
//   )
// }

// export default Navigation

import React, { useEffect, useState } from 'react'
import { NavigationContainer, NavigationButton } from './styles'

const Navigation = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  // Função para obter a altura visível da janela
  const getViewportHeight = () => {
    return window.innerHeight
  }

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      const height = document.documentElement.scrollHeight - getViewportHeight()

      setScrollPosition(scrollY)
      setDocumentHeight(height)

      setIsAtTop(scrollY <= 6)
      setIsAtBottom(Math.abs(scrollY - height) <= 6)
    }

    const onResize = () => {
      // Recalcula a altura do documento e a rolagem quando a janela for redimensionada
      updateScroll()
    }

    window.addEventListener('scroll', updateScroll)
    window.addEventListener('resize', onResize) // Recalcular a rolagem no resize da janela

    // Chama a função de atualização inicial
    updateScroll()

    // Define um intervalo para corrigir rolagem de forma mais robusta
    const interval = setInterval(() => {
      updateScroll()
    }, 200) // Atualiza a cada 200ms para corrigir a rolagem conforme mudanças na tela

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', onResize)
      clearInterval(interval) // Limpa o intervalo ao desmontar o componente
    }
  }, [])

  const scrollTo = (offset: number) => {
    const targetPosition =
      Math.round(window.scrollY / getViewportHeight()) * getViewportHeight() +
      offset +
      1
    window.scrollTo({
      top: Math.max(0, Math.min(targetPosition, documentHeight)),
      behavior: 'smooth'
    })
  }

  const scrollUp = () => {
    scrollTo(-getViewportHeight())
  }

  const scrollDown = () => {
    scrollTo(getViewportHeight())
  }

  return (
    <NavigationContainer>
      {!isAtTop && (
        <NavigationButton onClick={scrollUp} data-direction="up">
          ↑
        </NavigationButton>
      )}
      {!isAtBottom && (
        <NavigationButton onClick={scrollDown} data-direction="down">
          ↓
        </NavigationButton>
      )}
    </NavigationContainer>
  )
}

export default Navigation
