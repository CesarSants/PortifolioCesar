import React, { useEffect } from 'react'

const ScrollOnLoad = () => {
  useEffect(() => {
    // Usando setTimeout para garantir que a rolagem ocorra após o carregamento da página
    setTimeout(() => {
      window.scrollBy(0, 6) // Rola a página 10px para baixo
    }, 200) // O delay de 0ms faz a rolagem acontecer após o carregamento inicial
  }, []) // O array vazio faz o efeito rodar apenas uma vez, quando o componente for montado.

  return null
}

export default ScrollOnLoad
