import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { MagneticWrap } from '../effects/MagneticWrap'
import { useTextScramble } from '../effects/TextScramble'

const links = [
  { label: 'Twitter', href: 'https://twitter.com/barelyrobots' },
  { label: 'Instagram', href: 'https://instagram.com/barelyrobots' },
  { label: 'Contact', href: 'mailto:hello@barelyrobots.com' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [logoText, scrambleLogo] = useTextScramble('BarelyRobots')

  return (
    <footer
      ref={ref}
      style={{ padding: 'clamp(60px,8vh,100px) clamp(32px,6vw,100px) 40px', position: 'relative' }}
    >
      <motion.div
        style={{
          position: 'absolute', top: 0,
          left: 'clamp(32px,6vw,100px)', right: 'clamp(32px,6vw,100px)',
          height: 1, background: 'rgba(255,255,255,0.06)', transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 40,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/"
            style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 20,
              letterSpacing: '-0.02em', display: 'inline-block', marginBottom: 10,
            }}
            onMouseEnter={() => scrambleLogo('BarelyRobots')}
          >
            <span style={{ display: 'inline-block', minWidth: 140 }}>
              {logoText.split('').map((char, i) => (
                <span key={i} style={{
                  color: i >= 6 ? 'var(--a)' : 'var(--w)',
                  fontFamily: /[!<>\-_\\/\[\]{}—=+*^?#@$%&~]/.test(char) ? 'var(--mono)' : 'var(--serif)',
                  fontSize: /[!<>\-_\\/\[\]{}—=+*^?#@$%&~]/.test(char) ? 14 : 20,
                }}>{char}</span>
              ))}
            </span>
          </Link>
          <div style={{
            fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--wd)',
            fontWeight: 300, letterSpacing: '0.02em',
          }}>
            AI companions with memory.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: 28, alignItems: 'center' }}
        >
          {links.map((l) => (
            <MagneticWrap key={l.label} strength={6} as="span">
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                style={{
                  fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--wd)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'color 0.3s', fontWeight: 400,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--a)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--wd)'}
              >
                {l.label}
              </a>
            </MagneticWrap>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          color: 'rgba(255,255,255,0.10)', textAlign: 'center',
          marginTop: 60, letterSpacing: '0.08em', fontWeight: 300,
        }}
      >
        &copy; 2026 BARELYROBOTS INC.
      </motion.div>
    </footer>
  )
}
