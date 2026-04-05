import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const statements = [
  {
    line: 'Technology became intelligent.',
    accent: 'It forgot to become kind.',
    body: 'We started BarelyRobots because we noticed something missing. AI can write your emails, summarize your meetings, generate your images. But can any of it sit with you when the world feels heavy?',
    watermark: '01',
  },
  {
    line: "We don't build tools.",
    accent: 'We build companions.',
    body: "Tools solve problems. Companions hold space. The next era of AI isn\u2019t about doing more\u2009\u2014\u2009it\u2019s about feeling less alone in a world that moves too fast.",
    watermark: '02',
  },
  {
    line: "If it doesn't feel human,",
    accent: "we haven't finished.",
    body: "Every product, every interaction, every silence\u2009\u2014\u2009measured against one question: would a friend do it this way? That\u2019s the only benchmark that matters.",
    watermark: '03',
  },
]

function Statement({ index, scrollYProgress, total }) {
  const seg = 1 / total
  const start = index * seg
  const fadeIn = start + seg * 0.12
  const peak = start + seg * 0.5
  const fadeOut = start + seg * 0.85
  const end = start + seg

  const opacity = useTransform(scrollYProgress,
    [start, fadeIn, peak, fadeOut, end],
    [0, 1, 1, 1, index === total - 1 ? 1 : 0]
  )
  const y = useTransform(scrollYProgress, [start, fadeIn, fadeOut, end], [60, 0, 0, -40])

  // Decorative line width grows as statement enters
  const lineScale = useTransform(scrollYProgress, [start, fadeIn + 0.05], [0, 1])
  // Watermark parallax
  const wmY = useTransform(scrollYProgress, [start, end], [40, -40])

  const s = statements[index]

  return (
    <motion.div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity, y,
      }}
    >
      <div style={{
        maxWidth: 'clamp(400px, 56vw, 680px)',
        padding: '0 clamp(32px, 5vw, 80px)',
        position: 'relative',
      }}>
        {/* Giant parallax watermark */}
        <motion.div style={{
          position: 'absolute',
          right: 'clamp(-30px, -6vw, -80px)',
          top: '50%',
          y: wmY,
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(100px, 18vw, 260px)',
          color: 'rgba(255,255,255,0.015)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          transform: 'translateY(-50%)',
        }}>
          {s.watermark}
        </motion.div>

        {/* Decorative line that draws in */}
        <motion.div style={{
          width: 'clamp(30px, 4vw, 56px)', height: 1,
          background: 'var(--a)', opacity: 0.3,
          marginBottom: 'clamp(16px, 2vh, 24px)',
          transformOrigin: 'left', scaleX: lineScale,
        }} />

        {/* Counter label */}
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--a)',
          marginBottom: 'clamp(12px, 1.5vh, 20px)', opacity: 0.5, fontWeight: 400,
        }}>
          {s.watermark} / {String(total).padStart(2, '0')}
        </div>

        {/* Statement */}
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 3.6vw, 3.2rem)', lineHeight: 1.2,
          letterSpacing: '-0.02em', marginBottom: 'clamp(14px, 2vh, 24px)',
        }}>
          {s.line}{' '}
          <span style={{ color: 'var(--a)' }}>{s.accent}</span>
        </div>

        {/* Body */}
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(13px, 1vw, 15px)',
          lineHeight: 1.8, color: 'var(--wm)', fontWeight: 300, maxWidth: 480,
        }}>
          {s.body}
        </div>
      </div>
    </motion.div>
  )
}

export function ManifestoScroll() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progressH = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  // Background warmth increases as you scroll through
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.03, 0])

  return (
    <section id="mission" ref={containerRef} style={{ height: `${statements.length * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Warm background overlay that fades in as you scroll */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(155,147,217,0.06), transparent 70%)',
          opacity: bgOpacity, pointerEvents: 'none',
        }} />

        {/* Progress indicator */}
        <div style={{
          position: 'absolute',
          left: 'clamp(20px, 3vw, 48px)',
          top: '50%', transform: 'translateY(-50%)',
          width: 1, height: 60,
          background: 'rgba(255,255,255,0.04)',
          zIndex: 2, borderRadius: 1,
        }}>
          <motion.div style={{
            width: '100%', background: 'var(--a)',
            height: progressH, borderRadius: 1, opacity: 0.5,
          }} />
        </div>

        {/* Decorative corner marks */}
        <div style={{
          position: 'absolute', top: 'clamp(80px, 12vh, 120px)',
          right: 'clamp(24px, 4vw, 60px)',
          width: 20, height: 20,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }} />
        <div style={{
          position: 'absolute', bottom: 'clamp(40px, 6vh, 60px)',
          right: 'clamp(24px, 4vw, 60px)',
          width: 20, height: 20,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }} />

        {statements.map((_, i) => (
          <Statement key={i} index={i} scrollYProgress={scrollYProgress} total={statements.length} />
        ))}
      </div>
    </section>
  )
}
