import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MagneticWrap } from '../../effects/MagneticWrap'
import { EmberSphere } from '../../components/EmberSphere'

export function EmberCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(100px, 14vh, 180px) clamp(24px, 8vw, 120px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 40 }}
      >
        <EmberSphere variant="orange" size="56px" float floatDuration={3} showLight />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.15,
          letterSpacing: '-0.02em', marginBottom: 16,
        }}
      >
        Some things you have to hold to believe.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: 'clamp(12px, 1vw, 14px)', color: 'var(--wm)', fontWeight: 300, marginBottom: 40, lineHeight: 1.8 }}
      >
        $149 &middot; Ships 2026 &middot; Three colorways
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <MagneticWrap strength={12} as="span">
          <a
            href="/#waitlist"
            style={{
              display: 'inline-block', padding: '16px 40px', borderRadius: 100,
              background: 'var(--a)', color: '#fff', fontFamily: 'var(--sans)',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--al)'
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(232,132,60,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--a)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Join Waitlist
          </a>
        </MagneticWrap>
      </motion.div>
    </section>
  )
}
