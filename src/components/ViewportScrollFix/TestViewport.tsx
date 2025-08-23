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
    // Força uma mudança de altura real que afeta a altura total da aplicação
    const testDiv = document.createElement('div')
    testDiv.style.height = '500px'
    testDiv.style.background = 'rgba(255, 0, 0, 0.6)'
    testDiv.style.position = 'fixed'
    testDiv.style.top = '0'
    testDiv.style.left = '0'
    testDiv.style.zIndex = '-1'
    testDiv.style.transition = 'height 0.5s'

    document.body.appendChild(testDiv)

    // Força mudança de altura
    setTimeout(() => {
      testDiv.style.height = '100px'
    }, 200)

    // Remove após 2 segundos
    setTimeout(() => {
      if (document.body.contains(testDiv)) {
        document.body.removeChild(testDiv)
      }
    }, 2000)
  }

  const forceHeightChange = () => {
    // Força uma mudança na altura total da aplicação
    const testDiv = document.createElement('div')
    testDiv.style.height = '800px'
    testDiv.style.background = 'rgba(0, 255, 0, 0.4)'
    testDiv.style.position = 'absolute'
    testDiv.style.top = '50%'
    testDiv.style.left = '0'
    testDiv.style.width = '100%'
    testDiv.style.zIndex = '-1'
    testDiv.style.transition = 'height 0.8s'

    document.body.appendChild(testDiv)

    // Anima a altura
    setTimeout(() => {
      testDiv.style.height = '200px'
    }, 300)

    // Remove após 3 segundos
    setTimeout(() => {
      if (document.body.contains(testDiv)) {
        document.body.removeChild(testDiv)
      }
    }, 3000)
  }

  const forceScrollJump = () => {
    // Força um "pulo" de scroll para testar a detecção
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop
    const jumpAmount = 400

    // Simula um pulo automático
    window.scrollTo({
      top: currentScroll + jumpAmount,
      behavior: 'auto'
    })

    setForceScroll((prev) => prev + 1)
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
        minWidth: '240px'
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
          Forçar Mudança de Viewport
        </button>

        <button
          onClick={forceHeightChange}
          style={{
            background: '#28a745',
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
          Forçar Mudança de Altura Total
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
            width: '100%'
          }}
        >
          Forçar Pulo de Scroll ({forceScroll})
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
