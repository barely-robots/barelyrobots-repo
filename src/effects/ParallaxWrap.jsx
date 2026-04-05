import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxWrap({
  children,
  speed = 0.5,
  className,
  style,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -60, speed * 60]);
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </MotionTag>
  );
}
