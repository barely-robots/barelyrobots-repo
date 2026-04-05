import { motion } from 'framer-motion'

const sphereData = {
  orange: {
    bg: 'radial-gradient(circle at 32% 28%, #F8C4A0, #9B93D9 35%, #C45A22 65%, #7A2E10 90%)',
    shadow: '0 40px 100px rgba(155,147,217,0.25), inset 0 -30px 60px rgba(0,0,0,0.4), inset 0 30px 60px rgba(255,200,160,0.15)',
    ledColor: '#ffffff',
    ledGlow: 'rgba(255,255,255,0.35)',
  },
  white: {
    bg: 'radial-gradient(circle at 32% 28%, #FFFFFF, #EAE6E2 35%, #C0BAB4 65%, #7A7670 90%)',
    shadow: '0 40px 100px rgba(255,255,255,0.06), inset 0 -30px 60px rgba(0,0,0,0.3), inset 0 30px 60px rgba(255,255,255,0.25)',
    ledColor: '#ffffff',
    ledGlow: 'rgba(255,255,255,0.3)',
  },
  purple: {
    bg: 'radial-gradient(circle at 32% 28%, #E8E6FF, #9B93D9 35%, #6A5FAF 65%, #3D3570 90%)',
    shadow: '0 40px 100px rgba(106,95,175,0.25), inset 0 -30px 60px rgba(0,0,0,0.4), inset 0 30px 60px rgba(200,195,255,0.15)',
    ledColor: '#ffffff',
    ledGlow: 'rgba(255,255,255,0.35)',
  },
}

export function EmberSphere({
  variant = 'orange',
  size = 'clamp(180px, 24vw, 280px)',
  float = true,
  floatDuration = 4,
  floatDelay = 0,
  showLight = true,
  className,
  style,
}) {
  const data = sphereData[variant] || sphereData.orange

  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }} className={className}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: data.bg,
          boxShadow: data.shadow,
          transition: 'background 0.8s ease, box-shadow 0.8s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
        animate={float ? { y: [0, -6, 0] } : undefined}
        transition={float ? { y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay } } : undefined}
      >
        {/* LED indicator — sharp electronic dot, not sparkle */}
        {showLight && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: '22%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 2.5,
              height: 2.5,
              borderRadius: '50%',
              background: data.ledColor,
              // Tight, sharp glow — like a real LED
              boxShadow: `0 0 3px 0.5px ${data.ledGlow}`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}

export { sphereData }
