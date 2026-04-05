import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { CountUp } from '../../effects/CountUp'
import { useTextScramble } from '../../effects/TextScramble'
import { FadeReveal } from '../../effects/FadeReveal'

const specs = [
  { label: 'Diameter', value: '68', suffix: 'mm', isNumeric: true },
  { label: 'Weight', value: '180', suffix: 'g', isNumeric: true },
  { label: 'Battery', value: '12', suffix: ' hours', isNumeric: true },
  { label: 'Connectivity', value: 'Wi-Fi + BT 5.3', isNumeric: false },
  { label: 'Privacy', value: 'Physical mute', isNumeric: false },
  { label: 'Ships', value: '2026', isNumeric: false },
]

function TextSpec({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [text] = useTextScramble(inView ? value : '')
  return <span ref={ref}>{text || '\u00A0'}</span>
}

export function SpecsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <section ref={ref} style={{
      padding: 'clamp(48px, 6vh, 80px) clamp(24px, 8vw, 120px)',
    }}>
      <FadeReveal>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--a)', marginBottom: 24,
          fontWeight: 400, opacity: 0.6,
        }}>
          Specifications
        </div>
      </FadeReveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 1, background: 'rgba(255,255,255,0.03)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        {specs.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: 'clamp(20px, 2.5vw, 32px)',
              background: 'var(--bg)',
            }}
          >
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--wd)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 8, fontWeight: 400,
            }}>
              {s.label}
            </div>
            <div style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              fontWeight: 600, letterSpacing: '-0.01em', minHeight: 28,
            }}>
              {s.isNumeric ? (
                <CountUp target={Number(s.value)} suffix={s.suffix} duration={1800} />
              ) : (
                <TextSpec value={s.value} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
