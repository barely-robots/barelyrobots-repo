import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MagneticWrap } from '../effects/MagneticWrap'
import { useTextScramble } from '../effects/TextScramble'

const navItems = [
  { label: 'Mission', href: '/#mission' },
  { label: 'Ember', href: '/ember' },
  { label: 'Principles', href: '/#values' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [logoText, scrambleLogo] = useTextScramble('BarelyRobots')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchor = useCallback((e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.pathname, navigate])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? '12px clamp(24px,5vw,56px)' : '20px clamp(24px,5vw,56px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,6,6,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(32px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(1.2)' : 'none',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 20,
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          color: 'var(--w)',
        }}
        onMouseEnter={() => scrambleLogo('BarelyRobots')}
      >
        <span style={{ display: 'inline-block', minWidth: 140 }}>
          {logoText.split('').map((char, i) => (
            <span
              key={i}
              style={{
                color: i >= 6 ? 'var(--a)' : 'var(--w)',
                fontFamily: /[!<>\-_\\/\[\]{}—=+*^?#@$%&~]/.test(char) ? 'var(--mono)' : 'var(--serif)',
                fontSize: /[!<>\-_\\/\[\]{}—=+*^?#@$%&~]/.test(char) ? 14 : 20,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {navItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticWrap strength={8} as="span">
              {item.href.startsWith('/#') ? (
                <a
                  href={item.href}
                  onClick={(e) => handleAnchor(e, item.href)}
                  style={{
                    fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 400,
                    color: 'var(--wd)', letterSpacing: '0.12em', textTransform: 'uppercase',
                    display: 'inline-block', transition: 'color 0.4s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--w)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--wd)'}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.href}
                  style={{
                    fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 400,
                    color: location.pathname === item.href ? 'var(--a)' : 'var(--wd)',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    display: 'inline-block', transition: 'color 0.4s',
                  }}
                  onMouseEnter={e => { if (location.pathname !== item.href) e.currentTarget.style.color = 'var(--w)' }}
                  onMouseLeave={e => { if (location.pathname !== item.href) e.currentTarget.style.color = 'var(--wd)' }}
                >
                  {item.label}
                </Link>
              )}
            </MagneticWrap>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticWrap strength={10} as="span">
            <a
              href="/#waitlist"
              onClick={(e) => handleAnchor(e, '/#waitlist')}
              style={{
                fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
                padding: '8px 20px', borderRadius: 100,
                border: '1px solid rgba(232,132,60,0.2)', color: 'var(--a)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(232,132,60,0.45)'
                e.currentTarget.style.background = 'rgba(232,132,60,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(232,132,60,0.2)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Waitlist
            </a>
          </MagneticWrap>
        </motion.div>
      </div>
    </motion.nav>
  )
}
