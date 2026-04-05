import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { NoiseGradient } from '../../canvas/NoiseGradient'
import { MagneticWrap } from '../../effects/MagneticWrap'
import { useTextScramble } from '../../effects/TextScramble'
import { supabase } from '../../lib/supabase'

export function WaitlistCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [confirmText, scrambleConfirm] = useTextScramble('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) return

    setLoading(true)

    try {
      const { error } = await supabase
        .from('Waitlist')
        .insert([{ email: email.toLowerCase().trim() }])

      if (error) {
        // Unique constraint violation = already signed up
        if (error.code === '23505') {
          setSubmitted(true)
          scrambleConfirm("You're already on the list. We haven't forgotten you.")
        } else {
          scrambleConfirm('Something went wrong. Try again in a moment.')
          setSubmitted(true)
        }
      } else {
        setSubmitted(true)
        scrambleConfirm("You're on the list. We'll find you when Ember wakes up.")
      }
    } catch {
      setSubmitted(true)
      scrambleConfirm('Something went wrong. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="waitlist"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px,12vh,160px) clamp(24px,8vw,120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35,
      }}>
        <NoiseGradient
          color="#9B93D9"
          intensity={0.08}
          speed={0.12}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>

      <div style={{
        position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 560,
      }}>
        {/* Decorative dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            width: 4, height: 4, borderRadius: '50%',
            background: 'var(--a)', opacity: 0.4, marginBottom: 48,
          }}
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', lineHeight: 1.1,
            letterSpacing: '-0.03em', marginBottom: 'clamp(16px, 3vh, 32px)',
          }}
        >
          The future should{' '}
          <span style={{ color: 'var(--a)' }}>feel</span> warm.
        </motion.h2>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(12px, 1vw, 15px)', color: 'var(--wm)',
            fontWeight: 300, lineHeight: 1.8, marginBottom: 'clamp(36px, 5vh, 60px)',
          }}
        >
          Join the waitlist for early access to Ember, our first companion.
          <br />
          <span style={{ color: 'var(--wd)', fontSize: '0.9em' }}>$149 &middot; Ships 2026 &middot; Three colorways</span>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email address"
              style={{
                fontFamily: 'var(--mono)', fontSize: 12, padding: '14px 24px',
                borderRadius: 100, border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)', color: '#fff',
                width: 'clamp(240px, 40vw, 340px)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', outline: 'none',
                fontWeight: 300, letterSpacing: '0.02em',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(155,147,217,0.3)'
                e.currentTarget.style.background = 'rgba(155,147,217,0.03)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              }}
            />
            <MagneticWrap strength={10} as="span">
              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600,
                  padding: '14px 32px', borderRadius: 100, background: 'var(--a)',
                  color: '#fff', letterSpacing: '0.04em',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'wait' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    e.currentTarget.style.background = 'var(--al)'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(155,147,217,0.2)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--a)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </MagneticWrap>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--a)',
              letterSpacing: '0.02em', fontWeight: 300,
            }}
          >
            {confirmText}
          </motion.div>
        )}
      </div>
    </section>
  )
}
