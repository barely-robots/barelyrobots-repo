import { useRef, useEffect, useCallback } from 'react';

export function useMousePosition() {
  const pos = useRef({ x: -100, y: -100 });
  const frame = useRef(null);

  const handler = useCallback((e) => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      pos.current = { x: e.clientX, y: e.clientY };
      frame.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handler);
    return () => {
      window.removeEventListener('mousemove', handler);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [handler]);

  return pos;
}
