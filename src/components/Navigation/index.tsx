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

  // Função para calcular a altura da janela considerando a barra de abas e pesquisa
  const getViewportHeight = () => {
    if (window.visualViewport) {
      return window.visualViewport.height
    }
    return window.innerHeight
  }

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = getViewportHeight() // Considerando a altura da janela após a barra de pesquisa e abas
      const height = document.documentElement.scrollHeight - viewportHeight

      setScrollPosition(scrollY)
      setDocumentHeight(height)

      setIsAtTop(scrollY <= 6)
      setIsAtBottom(Math.abs(scrollY - height) <= 6)
    }

    const onResize = () => {
      // Quando a janela é redimensionada, recalculamos o scroll
      updateScroll()
    }

    window.addEventListener('scroll', updateScroll)
    window.addEventListener('resize', onResize) // Ouvindo o evento de redimensionamento da janela

    // Ajuste inicial para garantir que o cálculo da rolagem esteja correto
    updateScroll()

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', onResize) // Removendo o ouvinte do resize
    }
  }, [])

  const scrollTo = (offset: number) => {
    const viewportHeight = getViewportHeight()
    const targetPosition =
      Math.round(window.scrollY / viewportHeight) * viewportHeight + offset + 1

    window.scrollTo({
      top: Math.max(0, Math.min(targetPosition, documentHeight)),
      behavior: 'smooth'
    })
  }

  const scrollUp = () => {
    const viewportHeight = getViewportHeight()
    scrollTo(-viewportHeight)
  }

  const scrollDown = () => {
    const viewportHeight = getViewportHeight()
    scrollTo(viewportHeight)
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
