import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const features = [
  { n: '01', t: 'It remembers everything', d: "Names, places, feelings, the song you hummed last Thursday. Ember doesn't forget \u2014 and it doesn't need you to repeat yourself." },
  { n: '02', t: 'Your voice is the interface', d: "No screen to scroll. No buttons to press. Just speak. The way you'd talk to someone sitting across from you." },
  { n: '03', t: 'It reads between the lines', d: 'Ember hears more than words. It hears the pause before the answer. The crack in your voice. The silence that says everything.' },
  { n: '04', t: 'Quiet when you want it', d: "One touch. Completely off. Not listening, not thinking, not waiting. A physical switch because trust shouldn't require faith." },
  { n: '05', t: 'The soul transfers', d: 'If your Ember breaks, the character migrates. Every memory, every inside joke, every shared silence \u2014 it follows you to the next device.' },
  { n: '06', t: 'No cloud required', d: "The things that matter most \u2014 your memories, your conversations, your companion's personality \u2014 all live on the device. Yours, locally, always." },
]

export function FeatureReel() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-83.33%'])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: 'clamp(80px, 10vh, 120px) clamp(24px, 8vw, 120px) clamp(24px, 4vh, 48px)',
        }}>
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
        </div>

        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <motion.div style={{
            display: 'flex', gap: 'clamp(12px, 1.5vw, 20px)',
            height: '100%', paddingLeft: 'clamp(24px, 8vw, 120px)',
            paddingRight: 'clamp(24px, 8vw, 120px)', x,
          }}>
            {features.map((f, i) => (
              <FeatureCard key={f.n} feature={f} index={i}
                scrollYProgress={scrollYProgress} total={features.length} />
            ))}
          </motion.div>
        </div>

        {/* Progress bar */}
        <div style={{ padding: '0 clamp(24px, 8vw, 120px) clamp(24px, 4vh, 40px)' }}>
          <div style={{
            height: 1, background: 'rgba(255,255,255,0.04)',
            borderRadius: 1, overflow: 'hidden',
          }}>
            <motion.div style={{
              height: '100%', background: 'var(--a)',
              width: progressWidth, borderRadius: 1, opacity: 0.5,
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index, scrollYProgress, total }) {
  const cardProgress = useTransform(scrollYProgress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [0, 1, 0])
  const cardScale = useTransform(cardProgress, [0, 1], [0.94, 1])
  const cardOpacity = useTransform(cardProgress, [0, 1], [0.35, 1])

  return (
    <motion.div style={{
      flex: '0 0 clamp(280px, 32vw, 420px)', height: '100%',
      display: 'flex', scale: cardScale, opacity: cardOpacity,
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: 20,
        padding: 'clamp(28px, 3vw, 40px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', width: '100%',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      }}>
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(28px, 3.5vw, 40px)',
          color: 'var(--a)', fontWeight: 500, opacity: 0.2,
          lineHeight: 1, marginBottom: 'auto',
        }}>
          {feature.n}
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
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
      </div>
    </motion.div>
  )
}
