import { useRef, useEffect } from 'react'
import { useCursorState } from './useCursorStore'
import { useMobile } from '../hooks/useMobile'
import { lerp } from '../lib/lerp'

export function Cursor() {
  const { state } = useCursorState()
  const mobile = useMobile()
  const elRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const smooth = useRef({ x: -100, y: -100 })
  const vel = useRef({ x: 0, y: 0 })
  const rot = useRef(0)
  const hovering = useRef(false)
  const frameRef = useRef(null)

  useEffect(() => {
    if (mobile) return

    const handleMove = (e) => {
      vel.current.x = e.clientX - pos.current.x
      vel.current.y = e.clientY - pos.current.y
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const handleOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor="hover"]')) {
        hovering.current = true
        elRef.current?.classList.add('hover')
      }
    }

    const handleOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor="hover"]')) {
        hovering.current = false
        elRef.current?.classList.remove('hover')
      }
    }

    const animate = () => {
      smooth.current.x = lerp(smooth.current.x, pos.current.x, 0.14)
      smooth.current.y = lerp(smooth.current.y, pos.current.y, 0.14)

      // Subtle rotation based on velocity direction
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2)
      if (speed > 1.5) {
        const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)
        rot.current = lerp(rot.current, angle + 45, 0.06)
      }

      // Decay velocity
      vel.current.x *= 0.92
      vel.current.y *= 0.92

      if (elRef.current) {
        elRef.current.style.transform =
          `translate(${smooth.current.x}px, ${smooth.current.y}px) rotate(${rot.current}deg)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
      cancelAnimationFrame(frameRef.current)
    }
  }, [mobile])

  if (mobile) return null

  const hidden = state === 'hidden' ? ' hidden' : ''

  return (
    <div ref={elRef} className={`cursor-x${hidden}`}>
      <div className="cursor-x-h" />
      <div className="cursor-x-v" />
      <div className="cursor-x-dot" />
    </div>
  )
}
