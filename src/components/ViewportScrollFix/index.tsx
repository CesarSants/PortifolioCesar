import React, { ReactNode, useEffect } from 'react'
import { useViewportHeight } from '../../utils/useViewportHeight'

interface ViewportScrollFixProps {
  children: ReactNode
}

const ViewportScrollFix: React.FC<ViewportScrollFixProps> = ({ children }) => {
  const { currentHeight, isAdjusting } = useViewportHeight()

  useEffect(() => {
    // Log para debug - pode ser removido em produção
    if (process.env.NODE_ENV === 'development') {
      console.log(
        'ViewportScrollFix - Altura atual:',
        currentHeight,
        'Ajustando:',
        isAdjusting
      )
    }
  }, [currentHeight, isAdjusting])

  return (
    <div
      className="viewport-scroll-fix"
      data-viewport-height={currentHeight}
      data-is-adjusting={isAdjusting}
      style={{
        // Adiciona uma borda sutil para debug visual (pode ser removida em produção)
        ...(process.env.NODE_ENV === 'development' && {
          border: isAdjusting ? '2px solid red' : '2px solid transparent'
        })
      }}
    >
      {children}
    </div>
  )
}

export default ViewportScrollFix
