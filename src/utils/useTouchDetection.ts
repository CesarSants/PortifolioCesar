import { useState, useEffect } from 'react'

export const useTouchDetection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const detectTouch = () => {
      // Múltiplas formas de detectar dispositivos touch
      const hasTouchSupport =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0 ||
        'onmsgesturechange' in window

      // Verifica se é um dispositivo móvel (adicional)
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )

      // Considera touch se tiver suporte a touch OU se for mobile
      setIsTouchDevice(hasTouchSupport || isMobile)
    }

    detectTouch()

    // Re-detecta em caso de mudança de orientação ou redimensionamento
    const handleResize = () => {
      detectTouch()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return isTouchDevice
}
