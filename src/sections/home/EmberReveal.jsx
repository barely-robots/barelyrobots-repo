import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NoiseGradient } from '../../canvas/NoiseGradient'
import { MagneticWrap } from '../../effects/MagneticWrap'
import { FadeReveal } from '../../effects/FadeReveal'
import { EmberSphere } from '../../components/EmberSphere'

const colors = {
  orange: { color: '#E8843C', name: 'Warm Orange' },
  white: { color: '#EAE6E2', name: 'Pearl White' },
  purple: { color: '#9B93D9', name: 'Deep Violet' },
}

export function EmberReveal() {
  const [active, setActive] = useState('orange')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  // Sphere scales up as section scrolls into view
  const sphereScale = useTransform(scrollYProgress, [0, 0.7, 1], [0.6, 1, 1])
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  // Glow intensifies
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.8], [0.15, 0.45])

  return (
    <section
      id="products"
      ref={ref}
      style={{
        padding: 'clamp(100px,16vh,200px) clamp(24px,8vw,120px)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Ambient noise gradient — color shifts with selection */}
      <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: glowOpacity }}>
        <NoiseGradient
          color={colors[active].color}
          intensity={0.08} speed={0.15}
          style={{ position: 'absolute', inset: 0 }}
        />
      </motion.div>

      {/* Decorative orbital dots around sphere */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 2, height: 2, borderRadius: '50%',
            background: colors[active].color,
          }}
          animate={{
            x: [Math.cos((i * 2.1) + 0) * 140, Math.cos((i * 2.1) + Math.PI) * 140, Math.cos((i * 2.1) + Math.PI * 2) * 140],
            y: [Math.sin((i * 2.1) + 0) * 100, Math.sin((i * 2.1) + Math.PI) * 100, Math.sin((i * 2.1) + Math.PI * 2) * 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(32px, 5vh, 52px)', maxWidth: 560, textAlign: 'center',
      }}>
        <FadeReveal delay={0}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--a)', opacity: 0.6, fontWeight: 400,
          }}>
            Our First Creation
          </div>
        </FadeReveal>

        <FadeReveal delay={0.08}>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}>
            Meet <span style={{ color: '#E8843C' }}>Ember</span>
          </div>
        </FadeReveal>

        {/* Sphere — scales in from scroll */}
        <motion.div style={{ scale: sphereScale, opacity: sphereOpacity }}>
          <EmberSphere
            variant={active}
            size="clamp(160px, 24vw, 280px)"
            float floatDuration={4.5} showLight
          />
        </motion.div>

        {/* Color selector — pill-shaped */}
        <FadeReveal delay={0.2}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {Object.entries(colors).map(([id, c]) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                aria-label={c.name}
                style={{
                  width: active === id ? 28 : 10, height: 10,
                  borderRadius: 100, background: c.color,
                  opacity: active === id ? 1 : 0.25,
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </FadeReveal>

        <FadeReveal delay={0.25}>
          <div style={{
            fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--wm)',
            lineHeight: 1.8, fontWeight: 300, maxWidth: 400,
          }}>
            A voice companion with persistent memory.
            No screen. No app. Just a warm presence that listens,
            remembers, and shows up when it matters.
          </div>
        </FadeReveal>

        <FadeReveal delay={0.3}>
          <MagneticWrap strength={12} as="span">
            <Link
              to="/ember"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
                color: 'var(--a)', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '14px 32px', border: '1px solid rgba(155,147,217,0.2)',
                borderRadius: 100, transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(155,147,217,0.5)'
                e.currentTarget.style.background = 'rgba(155,147,217,0.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(155,147,217,0.2)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Explore Ember
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </MagneticWrap>
        </FadeReveal>
      </div>
    </section>
  )
}
