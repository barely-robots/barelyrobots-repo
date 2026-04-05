import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function CountUp({
  target,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  style,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const from = 0;
    const to = target;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, target, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
