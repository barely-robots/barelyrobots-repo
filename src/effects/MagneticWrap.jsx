import { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

export function MagneticWrap({
  children,
  strength = 12,
  radius = 0.5,
  as: Tag = 'div',
  className,
  style,
  onMouseEnter: onEnterProp,
  onMouseLeave: onLeaveProp,
}) {
  const ref = useRef(null);
  const mobile = useMobile();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMove = useCallback((e) => {
    if (!ref.current || mobile) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const maxDist = Math.max(rect.width, rect.height) * radius;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < maxDist) {
      const factor = 1 - dist / maxDist;
      x.set(distX * factor * (strength / maxDist) * rect.width * 0.1);
      y.set(distY * factor * (strength / maxDist) * rect.height * 0.1);
    }
  }, [mobile, strength, radius, x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    onLeaveProp?.();
  }, [x, y, onLeaveProp]);

  const handleEnter = useCallback((e) => {
    onEnterProp?.(e);
  }, [onEnterProp]);

  if (mobile) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={{ ...style, x, y }}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </MotionTag>
  );
}
