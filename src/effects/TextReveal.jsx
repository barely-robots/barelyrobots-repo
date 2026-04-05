import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function TextReveal({
  children,
  by = 'word',
  stagger = 0.04,
  delay = 0,
  duration = 0.6,
  once = true,
  margin = '-60px',
  className,
  style,
  as: Tag = 'div',
}) {
  const text = typeof children === 'string' ? children : '';

  const words = useMemo(() => {
    if (by === 'line') return text.split('\n');
    return text.split(/(\s+)/);
  }, [text, by]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      style={{ ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {words.map((word, i) => {
        if (word.trim() === '') {
          return <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}>{word}</span>;
        }
        return (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
          >
            <motion.span
              variants={wordVariant}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
