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

    // Nudge detection
    let startY = 0
    const nudgeThreshold = 40 // allow slightly larger small drags
    const topZone = 120 // consider a larger top zone to capture more nudges
    let lastNudge = 0
    const nudgeCooldown = 800 // ms

    const onTouchStart = (ev: TouchEvent) => {
      const t = ev.touches && ev.touches[0]
      if (t) startY = t.clientY
    }

    const onTouchEnd = (ev: TouchEvent) => {
      const t = ev.changedTouches && ev.changedTouches[0]
      if (!t) return
      const endY = t.clientY
      const delta = Math.abs(startY - endY)
      if (delta > nudgeThreshold) return
      if (startY > topZone) return

      // throttle nudges
      const now = Date.now()
      if (now - lastNudge < nudgeCooldown) return
      lastNudge = now

      // micro-scroll to induce browser chrome behavior (2px)
      try {
        inner.scrollTo({ top: 2, behavior: 'auto' })
        setTimeout(() => {
          inner.scrollTo({ top: 0, behavior: 'auto' })
        }, 60)
      } catch (err) {
        // ignore
      }

      try {
        window.dispatchEvent(new CustomEvent('topChromeProbeNudge'))
      } catch (err) {
        // ignore
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
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
