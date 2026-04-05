import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Global lenis instance so ScrollToTop can access it
let globalLenis = null
export function getLenis() { return globalLenis }

export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis
    globalLenis = lenis

    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      globalLenis = null
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
