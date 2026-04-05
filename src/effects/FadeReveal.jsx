import { motion } from 'framer-motion';

export function FadeReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  margin = '-80px',
  className,
  style,
  as: Tag = 'div',
}) {
  const dirs = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
