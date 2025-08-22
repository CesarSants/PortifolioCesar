import React, { ReactNode, useEffect } from 'react'
import { useViewportHeight } from '../../utils/useViewportHeight'

interface ViewportScrollFixProps {
  children: ReactNode
}

const ViewportScrollFix: React.FC<ViewportScrollFixProps> = ({ children }) => {
  const { currentHeight, documentHeight, isAdjusting } = useViewportHeight()

  useEffect(() => {
    // Log para debug - pode ser removido em produção
    if (process.env.NODE_ENV === 'development') {
      console.log('ViewportScrollFix - Status:', {
        viewportHeight: currentHeight,
        documentHeight: documentHeight,
        isAdjusting: isAdjusting,
        ratio:
          documentHeight > 0
            ? ((currentHeight / documentHeight) * 100).toFixed(1) + '%'
            : 'N/A'
      })
    }
  }, [currentHeight, documentHeight, isAdjusting])

  return (
    <div
      className="viewport-scroll-fix"
      data-viewport-height={currentHeight}
      data-document-height={documentHeight}
      data-is-adjusting={isAdjusting}
      style={{
        // Adiciona uma borda sutil para debug visual (pode ser removida em produção)
        ...(process.env.NODE_ENV === 'development' && {
          border: isAdjusting ? '2px solid red' : '2px solid transparent',
          position: 'relative'
        })
      }}
    >
      {/* Indicador visual de debug (pode ser removido em produção) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: isAdjusting ? 'red' : 'green',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999,
            fontFamily: 'monospace'
          }}
        >
          VH: {currentHeight}px | DH: {documentHeight}px |{' '}
          {isAdjusting ? 'AJUSTANDO' : 'OK'}
        </div>
      )}

      {children}
    </div>
  )
}

export default ViewportScrollFix
