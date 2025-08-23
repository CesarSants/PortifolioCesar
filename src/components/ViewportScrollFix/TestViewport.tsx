import React, { useState, useEffect } from 'react'

const TestViewport: React.FC = () => {
  const [testHeight, setTestHeight] = useState(100)

  useEffect(() => {
    // Simula mudanças de altura para testar a solução
    const interval = setInterval(() => {
      setTestHeight((prev) => (prev === 100 ? 150 : 100))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const forceViewportChange = () => {
    // Força uma mudança de viewport
    const testDiv = document.createElement('div')
    testDiv.style.height = '300px'
    testDiv.style.background = 'rgba(255, 0, 0, 0.3)'
    testDiv.style.position = 'fixed'
    testDiv.style.top = '0'
    testDiv.style.left = '0'
    testDiv.style.zIndex = '-1'
    testDiv.style.transition = 'height 0.5s'

    document.body.appendChild(testDiv)

    setTimeout(() => {
      testDiv.style.height = '100px'
    }, 100)

    setTimeout(() => {
      document.body.removeChild(testDiv)
    }, 1000)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9998,
        fontFamily: 'monospace',
        border: '1px solid #333',
        minWidth: '200px'
      }}
    >
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        🧪 Teste de Viewport
      </div>
      <div style={{ marginBottom: '5px' }}>Altura: {testHeight}px</div>
      <div style={{ marginBottom: '10px', fontSize: '10px', opacity: 0.8 }}>
        Mudança automática a cada 2s
      </div>
      <button
        onClick={forceViewportChange}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Forçar Mudança
      </button>
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
