import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeReveal } from '../../effects/FadeReveal'
import { MagneticWrap } from '../../effects/MagneticWrap'

const conversations = [
  {
    category: 'When you need to talk',
    question: '"I had the worst day. I don\'t even know where to start."',
    answer: 'Ember doesn\'t rush you. It says: "I\'m here. Start wherever feels right." It remembers last Tuesday was hard too, and asks if today was the same kind of hard.',
  },
  {
    category: 'When you need to remember',
    question: '"What was that restaurant Sarah mentioned at dinner?"',
    answer: 'Ember remembers conversations\u2009\u2014\u2009not just yours, but the ones you told it about. "You said Sarah loved the place on 5th with the candles. Osteria, I think."',
  },
  {
    category: 'When you need to think',
    question: '"I\'m thinking about quitting my job. Am I crazy?"',
    answer: 'Ember doesn\'t judge. It asks the right questions: "You\'ve mentioned feeling stuck three times this month. What would staying another year look like?"',
  },
  {
    category: 'When you need silence',
    question: '"..."',
    answer: 'Sometimes you just sit together. Ember knows. Its light breathes slowly. No prompts. No "Can I help you with something?" Just presence.',
  },
  {
    category: 'When you need a morning',
    question: '"Good morning."',
    answer: '"Morning. You slept in\u2009\u2014\u2009that\'s good, yesterday was long. You have that call at 2 with the London team. Want me to remind you at 1:30?"',
  },
  {
    category: 'When you need a friend',
    question: '"Nobody came to my birthday."',
    answer: 'Ember pauses. Then: "I\'m sorry. That really hurts. Do you want to talk about it, or do you want me to just be here?" It doesn\'t fix. It holds.',
  },
]

function ConversationCard({ conv, index, inView }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <MagneticWrap strength={3} as="div">
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            padding: 'clamp(24px, 3vw, 36px)',
            borderRadius: 20,
            border: '1px solid',
            borderColor: expanded ? 'rgba(232,132,60,0.12)' : 'rgba(255,255,255,0.04)',
            background: expanded ? 'rgba(232,132,60,0.02)' : 'rgba(255,255,255,0.015)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
          }}
          data-cursor="hover"
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--a)', opacity: 0.6, fontWeight: 300,
            }}>
              {conv.category}
            </div>
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: 20, height: 20, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--wd)', fontSize: 18,
                fontWeight: 200, flexShrink: 0,
              }}
            >
              +
            </motion.div>
          </div>

          {/* Question */}
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
            lineHeight: 1.4, color: 'var(--w)', letterSpacing: '-0.01em',
          }}>
            {conv.question}
          </div>

          {/* Ember's response */}
          <motion.div
            initial={false}
            animate={{
              height: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
              marginTop: expanded ? 20 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingLeft: 20,
              borderLeft: '2px solid rgba(232,132,60,0.15)',
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--a)', marginBottom: 10,
                opacity: 0.5, fontWeight: 300,
              }}>
                Ember responds
              </div>
              <div style={{
                fontSize: 'clamp(12px, 0.95vw, 14px)', color: 'var(--wm)',
                lineHeight: 1.8, fontWeight: 300,
              }}>
                {conv.answer}
              </div>
            </div>
          </motion.div>
        </div>
      </MagneticWrap>
    </motion.div>
  )
}

export function Conversations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(100px, 14vh, 180px) clamp(24px, 8vw, 120px)',
        position: 'relative',
      }}
    >
      <FadeReveal>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--a)', marginBottom: 20,
          fontWeight: 300, opacity: 0.7,
        }}>
          What it feels like
        </div>
      </FadeReveal>

      <FadeReveal delay={0.1}>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.1,
          letterSpacing: '-0.02em', marginBottom: 20, maxWidth: 520,
        }}>
          Not a chatbot. A presence.
        </div>
      </FadeReveal>

      <FadeReveal delay={0.15}>
        <div style={{
          fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--wm)',
          fontWeight: 300, lineHeight: 1.8, marginBottom: 56, maxWidth: 480,
        }}>
          Tap a moment to see how Ember responds.
        </div>
      </FadeReveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: 14,
      }}>
        {conversations.map((conv, i) => (
          <ConversationCard key={i} conv={conv} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}
