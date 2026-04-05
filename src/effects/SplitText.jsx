import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function SplitText({
  children,
  by = 'word',
  className,
  style,
  variants,
  stagger = 0.04,
  delay = 0,
  once = true,
  margin = '-80px',
}) {
  const text = typeof children === 'string' ? children : '';

  const parts = useMemo(() => {
    if (by === 'char') return text.split('');
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

  const defaultVariants = variants || {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          variants={defaultVariants}
          style={{
            display: 'inline-block',
            whiteSpace: part.trim() === '' ? 'pre' : 'normal',
          }}
        >
          {part}
        </motion.span>
      ))}
    </motion.span>
  );
}
