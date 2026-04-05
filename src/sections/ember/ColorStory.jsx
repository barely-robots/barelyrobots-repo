import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EmberSphere } from '../../components/EmberSphere'
import { FadeReveal } from '../../effects/FadeReveal'

const colorStories = [
  {
    id: 'orange',
    name: 'Warm Orange',
    poem: "Born from the idea that technology should feel like a fireplace in a cold room. The kind of warmth you reach for before you realize you're reaching.",
  },
  {
    id: 'white',
    name: 'Pearl White',
    poem: "For those who want their companion to disappear into the room. Until the moment it speaks \u2014 and becomes the most important thing in it.",
  },
  {
    id: 'purple',
    name: 'Deep Violet',
    poem: "Made for the late nights. The 2am questions. The conversations that start with \u201cI've been thinking...\u201d and don't end until sunrise.",
  },
]

function ColorBand({ story, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const sphereScale = useTransform(scrollYProgress, [0, 0.7], [0.7, 1])
  const sphereOp = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const textOp = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
  const textX = useTransform(scrollYProgress, [0.2, 0.7], [index % 2 === 0 ? 40 : -40, 0])
  const lineScale = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])

  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: 'clamp(40px, 6vw, 100px)',
        padding: 'clamp(48px, 8vh, 80px) clamp(24px, 8vw, 120px)',
        minHeight: '60vh',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <motion.div style={{ scale: sphereScale, opacity: sphereOp }}>
        <EmberSphere
          variant={story.id}
          size="clamp(140px, 18vw, 200px)"
          float floatDuration={5}
          floatDelay={index * 0.5}
          showLight
        />
      </motion.div>

      <motion.div
        style={{ maxWidth: 420, flex: '1 1 300px', opacity: textOp, x: textX }}
      >
        {/* Decorative line */}
        <motion.div style={{
          width: 32, height: 1, background: 'var(--a)', opacity: 0.3,
          marginBottom: 16, transformOrigin: 'left', scaleX: lineScale,
        }} />

        <div style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--wd)', marginBottom: 12,
          opacity: 0.6, fontWeight: 400,
        }}>
          0{index + 1}
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.02em', marginBottom: 16,
        }}>
          {story.name}
        </div>
        <div style={{
          fontSize: 'clamp(13px, 1vw, 15px)', color: 'var(--wm)',
          lineHeight: 1.75, fontWeight: 300,
        }}>
          {story.poem}
        </div>
      </motion.div>
    </div>
  )
}

export function ColorStory() {
  return (
    <section style={{ position: 'relative' }}>
      {colorStories.map((story, i) => (
        <ColorBand key={story.id} story={story} index={i} />
      ))}
    </section>
  )
}
