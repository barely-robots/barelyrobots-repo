import { useRef, useCallback, useMemo } from 'react';
import { useCanvas } from './useCanvas';
import { createNoise2D } from '../lib/simplex';
import { lerp } from '../lib/lerp';
import { useReducedMotion } from '../hooks/useReducedMotion';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function NoiseGradient({
  color = '#E8843C',
  intensity = 0.15,
  speed = 0.3,
  scale = 0.003,
  className,
  style,
}) {
  const reduced = useReducedMotion();
  const noiseRef = useRef(null);
  const targetColor = useMemo(() => hexToRgb(color), [color]);
  const currentColor = useRef(targetColor);

  const draw = useCallback((ctx, { width, height, timestamp }) => {
    if (!noiseRef.current) {
      noiseRef.current = createNoise2D(137);
    }

    // Smooth color transition
    const cc = currentColor.current;
    const tc = targetColor;
    currentColor.current = {
      r: lerp(cc.r, tc.r, 0.015),
      g: lerp(cc.g, tc.g, 0.015),
      b: lerp(cc.b, tc.b, 0.015),
    };

    const t = timestamp * 0.001 * speed;
    const noise = noiseRef.current;
    const { r, g, b } = currentColor.current;

    ctx.clearRect(0, 0, width, height);

    // Draw layered noise blobs
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.max(width, height) * 0.6;

    for (let layer = 3; layer >= 0; layer--) {
      const layerScale = scale * (1 + layer * 0.5);
      const layerIntensity = intensity * (1 - layer * 0.2);
      const offset = layer * 100;

      const nx = noise(cx * layerScale + t * 0.2, offset) * 80;
      const ny = noise(offset, cy * layerScale + t * 0.15) * 80;
      const radius = maxRadius * (0.4 + layer * 0.15) + noise(t * 0.3, offset + 50) * 40;

      const gradient = ctx.createRadialGradient(
        cx + nx, cy + ny, 0,
        cx + nx, cy + ny, radius
      );

      gradient.addColorStop(0, `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${layerIntensity})`);
      gradient.addColorStop(0.5, `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${layerIntensity * 0.4})`);
      gradient.addColorStop(1, `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  }, [targetColor, intensity, speed, scale]);

  const { canvasRef } = useCanvas(draw, { autoStart: !reduced });

  if (reduced) {
    // Static fallback: simple CSS radial gradient
    const { r, g, b } = targetColor;
    return (
      <div
        className={className}
        style={{
          ...style,
          background: `radial-gradient(circle, rgba(${r},${g},${b},${intensity}) 0%, transparent 70%)`,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
}
