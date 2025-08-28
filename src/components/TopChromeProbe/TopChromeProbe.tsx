import React, { useEffect, useRef } from 'react'
const TopChromeProbe: React.FC = () => {
  const probeRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const probe = probeRef.current
    const inner = innerRef.current
    if (!probe || !inner) return

    inner.style.height = '120%'

    probe.style.pointerEvents = 'none'

    return () => {
      // cleanup nothing special
    }
  }, [])

  return (
    <div
      ref={probeRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '48px',
        transform: 'translateY(-48px)',
        overflow: 'hidden',
        opacity: 0,
        zIndex: 99999
      }}
    >
      <div
        ref={innerRef}
        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
      />
    </div>
  )
}

export default TopChromeProbe
