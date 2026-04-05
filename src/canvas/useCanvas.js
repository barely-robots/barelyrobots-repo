import { useRef, useEffect, useCallback } from 'react';

export function useCanvas(draw, { autoStart = true } = {}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const frameRef = useRef(null);
  const runningRef = useRef(false);
  const timeRef = useRef(0);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
  }, []);

  const loop = useCallback((timestamp) => {
    if (!runningRef.current) return;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const dt = timestamp - timeRef.current;
    timeRef.current = timestamp;

    draw(ctx, { width: w, height: h, dt, timestamp });
    frameRef.current = requestAnimationFrame(loop);
  }, [draw]);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    timeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);

    // Pause when tab hidden
    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (autoStart) start();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    if (autoStart) start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [resize, start, stop, autoStart]);

  return { canvasRef, start, stop, resize };
}
