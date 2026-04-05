import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FadeReveal } from '../../effects/FadeReveal'
import { MagneticWrap } from '../../effects/MagneticWrap'

const values = [
  {
    n: '01',
    t: 'Memory over intelligence',
    d: "Anyone can make AI smart. We're making it remember\u2009\u2014\u2009not just data, but context, tone, the weight of a conversation.",
  },
  {
    n: '02',
    t: 'Presence over performance',
    d: "We don't measure how fast our AI responds. We measure whether it knew when to pause. The best companions understand timing.",
  },
  {
    n: '03',
    t: 'Privacy as architecture',
    d: "We don't bolt privacy on as a feature. We build it as the foundation. Your words, your memories, your companion\u2009\u2014\u2009all yours.",
  },
  {
    n: '04',
    t: 'Physical, not virtual',
    d: 'We believe AI deserves a body. Not a screen, not a notification. Something you reach for. Something warm in your hands.',
  },
  {
    n: '05',
    t: 'Relationships, not sessions',
    d: "We're not building chat sessions that reset. We're building relationships that deepen. Your companion remembers last month the way a friend would.",
  },
  {
    n: '06',
    t: 'Warmer, not smarter',
    d: 'Every product, every update, every decision: does it make the experience feel more human? Not more capable. Warmer.',
  },
]

export function Principles() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const decorLineW = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%'])

  return (
    <section
      id="values"
      ref={ref}
      style={{
        padding: 'clamp(100px,14vh,200px) clamp(24px,8vw,120px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Decorative horizontal line that draws across on scroll */}
      <motion.div style={{
        position: 'absolute', top: 0, left: 0,
        height: 1, width: decorLineW,
        background: 'linear-gradient(90deg, var(--a), transparent)',
        opacity: 0.08,
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <FadeReveal>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--a)', marginBottom: 20,
            fontWeight: 400, opacity: 0.6,
          }}>
            What we believe
          </div>
        </FadeReveal>

        <FadeReveal delay={0.08}>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.1,
            letterSpacing: '-0.025em', marginBottom: 'clamp(48px, 7vh, 80px)',
            maxWidth: 500,
          }}>
            The rules we build by.
          </div>
        </FadeReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 2,
        }}>
          {values.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticWrap strength={3} as="div">
                <div
                  style={{
                    padding: 'clamp(24px, 3vw, 36px)', borderRadius: 16,
                    border: '1px solid transparent',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: 'transparent', position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.015)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--mono)', fontSize: 10,
                    color: 'var(--a)', marginBottom: 14,
                    opacity: 0.35, fontWeight: 400, letterSpacing: '0.08em',
                  }}>
                    {v.n}
                  </div>
                  <div style={{
                    fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.2vw, 18px)',
                    fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1.3,
                  }}>
                    {v.t}
                  </div>
                  <div style={{
                    fontSize: 'clamp(12px, 0.95vw, 14px)',
                    color: 'var(--wm)', lineHeight: 1.75, fontWeight: 300,
                  }}>
                    {v.d}
                  </div>
                </div>
              </MagneticWrap>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
