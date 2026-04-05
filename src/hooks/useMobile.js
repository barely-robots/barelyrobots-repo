import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint || window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    const check = () => {
      setMobile(window.innerWidth < breakpoint || window.matchMedia('(pointer: coarse)').matches);
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return mobile;
}
