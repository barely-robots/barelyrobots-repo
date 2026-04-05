import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NoiseGradient } from '../../canvas/NoiseGradient'
import { EmberSphere } from '../../components/EmberSphere'

export function EmberHero({ active = 'orange', setActive }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const sphereScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const textOp = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const wmY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const wmOp = useTransform(scrollYProgress, [0, 0.6], [0.025, 0])
  const bgOp = useTransform(scrollYProgress, [0, 0.6], [0.4, 0.15])

  const colors = {
    orange: '#E8843C',
    white: '#EAE6E2',
    purple: '#9B93D9',
  }

  return (
    <section ref={ref} style={{ height: '160vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Background noise glow */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOp }}>
          <NoiseGradient
            color={colors[active]} intensity={0.1} speed={0.15}
            style={{ position: 'absolute', inset: 0 }}
          />
        </motion.div>

        {/* Giant watermark text — parallax */}
        <motion.div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(100px, 20vw, 320px)',
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.025)',
          pointerEvents: 'none', userSelect: 'none',
          y: wmY, opacity: wmOp,
          lineHeight: 1, whiteSpace: 'nowrap',
        }}>
          Ember
        </motion.div>

        {/* Sphere — center stage */}
        <motion.div style={{
          position: 'relative', zIndex: 2,
          scale: sphereScale, y: sphereY,
          marginBottom: 'clamp(32px, 5vh, 56px)',
        }}>
          <EmberSphere
            variant={active}
            size="clamp(200px, 28vw, 340px)"
            float floatDuration={5} showLight
          />
        </motion.div>

        {/* Text content */}
        <motion.div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center', y: textY, opacity: textOp,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'clamp(12px, 2vh, 20px)',
        }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--a)', opacity: 0.6, fontWeight: 400,
          }}>
            Voice Companion
          </div>

          <h1 style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', lineHeight: 1.05,
            letterSpacing: '-0.03em', fontWeight: 400,
          }}>
            Ember
          </h1>

          <div style={{
            fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--wm)',
            fontWeight: 300, lineHeight: 1.8, maxWidth: 400,
          }}>
            A companion that listens, remembers, and stays.
            No screen. No app. Just warmth.
          </div>

          {/* Color switcher */}
          {setActive && (
            <div style={{
              display: 'flex', gap: 14, marginTop: 8, alignItems: 'center',
            }}>
              {Object.entries(colors).map(([id, c]) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  aria-label={id}
                  style={{
                    width: active === id ? 28 : 10, height: 10,
                    borderRadius: 100, background: c,
                    opacity: active === id ? 1 : 0.25,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}

          <div style={{
            fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--wd)',
            letterSpacing: '0.1em', marginTop: 8, fontWeight: 300,
          }}>
            $149 &middot; Ships 2026
          </div>
        </motion.div>

        {/* Decorative corner marks */}
        <div style={{
          position: 'absolute', bottom: 'clamp(32px, 5vh, 56px)',
          left: 'clamp(24px, 4vw, 60px)',
          width: 16, height: 16,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute', bottom: 'clamp(32px, 5vh, 56px)',
          right: 'clamp(24px, 4vw, 60px)',
          width: 16, height: 16,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }} />
      </div>
    </section>
  )
}
