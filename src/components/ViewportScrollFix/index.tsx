import React, { ReactNode, useEffect, useState } from 'react'
import { useViewportHeight } from '../../utils/useViewportHeight'

interface ViewportScrollFixProps {
  children: ReactNode
}

const ViewportScrollFix: React.FC<ViewportScrollFixProps> = ({ children }) => {
  const {
    currentHeight,
    totalHeight,
    isAdjusting,
    userPosition,
    userRelativePosition,
    resetHeightCompensation
  } = useViewportHeight()
  const [testMode, setTestMode] = useState(false)
  const [currentPaddingTop, setCurrentPaddingTop] = useState(0)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('ViewportScrollFix - Status:', {
        viewportHeight: currentHeight,
        totalHeight: totalHeight,
        userPosition: userPosition,
        userRelativePosition: userRelativePosition.toFixed(1) + '%',
        isAdjusting: isAdjusting
      })
    }
  }, [
    currentHeight,
    totalHeight,
    userPosition,
    userRelativePosition,
    isAdjusting
  ])

  // Monitora mudanças no padding-top do body
  useEffect(() => {
    const checkPaddingTop = () => {
      const paddingTop =
        parseInt(getComputedStyle(document.body).paddingTop) || 0
      setCurrentPaddingTop(paddingTop)
    }

    // Verifica a cada 100ms
    const interval = setInterval(checkPaddingTop, 100)
    checkPaddingTop() // Verifica imediatamente

    return () => clearInterval(interval)
  }, [])

  const forceTest = () => {
    const testDiv = document.createElement('div')
    testDiv.style.height = '200px'
    testDiv.style.background = 'red'
    testDiv.style.position = 'absolute'
    testDiv.style.top = '0'
    testDiv.style.left = '0'
    testDiv.style.zIndex = '-1'

    document.body.appendChild(testDiv)

    setTimeout(() => {
      if (document.body.contains(testDiv)) {
        document.body.removeChild(testDiv)
      }
    }, 1000)
  }

  return (
    <div
      className="viewport-scroll-fix"
      data-viewport-height={currentHeight}
      data-total-height={totalHeight}
      data-user-position={userPosition}
      data-user-relative-position={userRelativePosition}
      data-is-adjusting={isAdjusting}
      style={{
        ...(process.env.NODE_ENV === 'development' && {
          border: isAdjusting ? '2px solid red' : '2px solid transparent',
          position: 'relative'
        })
      }}
    >
      {process.env.NODE_ENV === 'development' && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              background: isAdjusting ? 'red' : 'green',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              zIndex: 9999,
              fontFamily: 'monospace',
              minWidth: '200px'
            }}
          >
            <div style={{ marginBottom: '3px', fontWeight: 'bold' }}>
              {isAdjusting ? '🔄 COMPENSANDO ALTURA' : '✅ OK'}
            </div>
            <div>VH: {currentHeight}px</div>
            <div>TH: {totalHeight}px</div>
            <div>UP: {userPosition}px</div>
            <div>URP: {userRelativePosition.toFixed(1)}%</div>
            <div
              style={{
                marginTop: '5px',
                padding: '2px 4px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '3px',
                fontSize: '10px'
              }}
            >
              Padding-Top: {currentPaddingTop}px
            </div>
          </div>

          <div
            style={{
              position: 'fixed',
              top: '120px',
              right: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 9999
            }}
          >
            <button
              onClick={forceTest}
              style={{
                background: 'blue',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Testar Mudança
            </button>

            <button
              onClick={resetHeightCompensation}
              style={{
                background: 'orange',
                color: 'white',
                border: 'none',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Resetar Compensação
            </button>
          </div>
        </>
      )}

      {children}
    </div>
  )
}

export default ViewportScrollFix
