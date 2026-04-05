import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { NoiseGradient } from '../../canvas/NoiseGradient'

export function HeroOpening() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const lineW = useTransform(scrollYProgress, [0, 0.6], ['60px', '300px'])
  const dotScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.4])
  const dotOp = useTransform(scrollYProgress, [0.3, 0.7], [1, 0])

  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1500),
      setTimeout(() => setPhase(4), 2200),
      setTimeout(() => setPhase(5), 3000),
    ]
    return () => t.forEach(clearTimeout)
  }, [])

  return (
    <div ref={containerRef} style={{ height: '180vh', position: 'relative' }}>
      <motion.div
        style={{
          position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          overflow: 'hidden', opacity, scale, y,
        }}
      >
        {/* Ambient canvas */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25 }}>
          <NoiseGradient
            color="#9B93D9" intensity={0.05} speed={0.06}
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>

        {/* Decorative floating orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: [3, 2, 4, 2, 3][i],
              height: [3, 2, 4, 2, 3][i],
              borderRadius: '50%',
              background: 'var(--a)',
              opacity: dotOp,
              scale: dotScale,
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20 - i * 8, 0],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 5 + i * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Horizontal accent line — grows on scroll */}
        <motion.div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translateX(-50%)',
            height: 1,
            width: lineW,
            background: 'linear-gradient(90deg, transparent, rgba(155,147,217,0.12), transparent)',
          }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        />

        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          padding: '0 clamp(24px, 6vw, 80px)',
        }}>
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'var(--a)', opacity: 0.5,
              marginBottom: 'clamp(20px, 3vh, 40px)', fontWeight: 400,
            }}
          >
            AI Companions
          </motion.div>

          {/* Divider dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={phase >= 1 ? { scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 3, height: 3, borderRadius: '50%',
              background: 'var(--a)', opacity: 0.4,
              marginBottom: 'clamp(20px, 3vh, 40px)',
            }}
          />

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.15,
              letterSpacing: '-0.03em', fontWeight: 400,
              marginBottom: 'clamp(16px, 2.5vh, 32px)', maxWidth: 700,
            }}
          >
            We believe technology should feel{' '}
            <span style={{ color: '#E8843C' }}>warm</span>,{' '}
            not just intelligent.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              color: 'var(--wm)', fontWeight: 300,
              letterSpacing: '0.01em', maxWidth: 480, lineHeight: 1.8,
            }}
          >
            Building companions that remember you, understand you,
            and meet you where you are.
          </motion.p>

          {/* Decorative line below subtitle */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 4 ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 40, height: 1,
              background: 'rgba(255,255,255,0.12)',
              marginTop: 'clamp(24px, 3vh, 40px)',
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase >= 5 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 'clamp(28px, 5vh, 56px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 10,
          }}
        >
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', fontWeight: 300,
          }}>
            Scroll
          </div>
          <motion.div
            style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.10)', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
