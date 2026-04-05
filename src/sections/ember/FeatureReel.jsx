import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  { n: '01', t: 'It remembers everything', d: "Names, places, feelings, the song you hummed last Thursday. Ember doesn't forget — and it doesn't need you to repeat yourself." },
  { n: '02', t: 'Your voice is the interface', d: "No screen to scroll. No buttons to press. Just speak. The way you'd talk to someone sitting across from you." },
  { n: '03', t: 'It reads between the lines', d: 'Ember hears more than words. It hears the pause before the answer. The crack in your voice. The silence that says everything.' },
  { n: '04', t: 'Quiet when you want it', d: "One touch. Completely off. Not listening, not thinking, not waiting. A physical switch because trust shouldn't require faith." },
  { n: '05', t: 'The soul transfers', d: 'If your Ember breaks, the character migrates. Every memory, every inside joke, every shared silence — it follows you to the next device.' },
  { n: '06', t: 'No cloud required', d: "The things that matter most — your memories, your conversations, your companion's personality — all live on the device. Yours, locally, always." },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: 20,
        padding: 'clamp(28px, 3vw, 44px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(32px, 4vh, 56px)',
        transition: 'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(155,147,217,0.12)'
        e.currentTarget.style.background = 'rgba(155,147,217,0.02)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
      }}
    >
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: 'clamp(28px, 3vw, 36px)',
        color: 'var(--a)', fontWeight: 500, opacity: 0.15,
        lineHeight: 1,
      }}>
        {feature.n}
      </div>

      <div>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
          lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.01em',
        }}>
          {feature.t}
        </div>
        <div style={{
          fontSize: 'clamp(12px, 0.95vw, 14px)',
          color: 'var(--wm)', lineHeight: 1.7, fontWeight: 300,
        }}>
          {feature.d}
        </div>
      </div>
    </motion.div>
  )
}

export function FeatureReel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 8vw, 120px)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(48px, 6vh, 80px)' }}
      >
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--a)', marginBottom: 12,
          fontWeight: 400, opacity: 0.6,
        }}>
          Under the surface
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1,
          letterSpacing: '-0.025em',
        }}>
          What makes it feel alive.
        </div>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(12px, 1.5vw, 20px)',
      }}>
        {features.map((f, i) => (
          <FeatureCard key={f.n} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}
