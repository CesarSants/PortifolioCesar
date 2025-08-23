import React, { useState, useEffect } from 'react'

const TestViewport: React.FC = () => {
  const [testHeight, setTestHeight] = useState(100)
  const [forceScroll, setForceScroll] = useState(0)

  useEffect(() => {
    // Simula mudanças de altura para testar a solução
    const interval = setInterval(() => {
      setTestHeight((prev) => (prev === 100 ? 150 : 100))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const forceViewportChange = () => {
    // Força uma mudança de viewport real
    const testDiv = document.createElement('div')
    testDiv.style.height = '400px'
    testDiv.style.background = 'rgba(255, 0, 0, 0.5)'
    testDiv.style.position = 'fixed'
    testDiv.style.top = '0'
    testDiv.style.left = '0'
    testDiv.style.zIndex = '-1'
    testDiv.style.transition = 'height 0.3s'

    document.body.appendChild(testDiv)

    // Força mudança de altura
    setTimeout(() => {
      testDiv.style.height = '100px'
    }, 100)

    // Remove após 1 segundo
    setTimeout(() => {
      if (document.body.contains(testDiv)) {
        document.body.removeChild(testDiv)
      }
    }, 1000)
  }

  const forceScrollJump = () => {
    // Força um "pulo" de scroll para testar a detecção
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop
    const jumpAmount = 300

    // Simula um pulo automático
    window.scrollTo({
      top: currentScroll + jumpAmount,
      behavior: 'auto'
    })

    setForceScroll((prev) => prev + 1)
  }

  const forceViewportResize = () => {
    // Força uma mudança na viewport
    if (typeof window !== 'undefined' && 'visualViewport' in window) {
      // Simula mudança de viewport
      const event = new Event('resize')
      window.visualViewport?.dispatchEvent(event)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.95)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9998,
        fontFamily: 'monospace',
        border: '1px solid #333',
        minWidth: '220px'
      }}
    >
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        🧪 Teste de Viewport
      </div>
      <div style={{ marginBottom: '5px' }}>Altura: {testHeight}px</div>
      <div style={{ marginBottom: '10px', fontSize: '10px', opacity: 0.8 }}>
        Mudança automática a cada 3s
      </div>

      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={forceViewportChange}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '5px'
          }}
        >
          Forçar Mudança de Altura
        </button>

        <button
          onClick={forceScrollJump}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '5px'
          }}
        >
          Forçar Pulo de Scroll ({forceScroll})
        </button>

        <button
          onClick={forceViewportResize}
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Forçar Resize Viewport
        </button>
      </div>

      <div
        style={{
          height: `${testHeight}px`,
          background: '#333',
          marginTop: '10px',
          transition: 'height 0.5s',
          borderRadius: '4px'
        }}
      ></div>
    </div>
  )
}

export default TestViewport
