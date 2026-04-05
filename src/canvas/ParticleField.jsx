import { useRef, useCallback, useMemo } from 'react';
import { useCanvas } from './useCanvas';
import { createNoise2D } from '../lib/simplex';
import { lerp } from '../lib/lerp';
import { useMobile } from '../hooks/useMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useMousePosition } from '../hooks/useMousePosition';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

class Particle {
  constructor(w, h, color) {
    this.reset(w, h, color);
  }

  reset(w, h, color) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.8 + 0.4;
    this.baseOpacity = Math.random() * 0.4 + 0.1;
    this.opacity = this.baseOpacity;
    this.vx = 0;
    this.vy = 0;
    this.life = Math.random() * 1000 + 500;
    this.age = Math.random() * this.life;
    this.color = color;
  }

  update(w, h, noise, time, mouseX, mouseY, mouseInfluence) {
    const n = noise(this.x * 0.002, this.y * 0.002 + time * 0.0001);
    const angle = n * Math.PI * 2;

    this.vx = lerp(this.vx, Math.cos(angle) * 0.3, 0.02);
    this.vy = lerp(this.vy, Math.sin(angle) * 0.3 - 0.15, 0.02); // slight upward drift

    // Mouse influence
    if (mouseInfluence && mouseX > 0 && mouseY > 0) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (1 - dist / 200) * 0.8;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    this.x += this.vx;
    this.y += this.vy;
    this.age++;

    // Fade based on lifecycle
    const lifeRatio = this.age / this.life;
    if (lifeRatio < 0.1) this.opacity = this.baseOpacity * (lifeRatio / 0.1);
    else if (lifeRatio > 0.9) this.opacity = this.baseOpacity * (1 - (lifeRatio - 0.9) / 0.1);
    else this.opacity = this.baseOpacity;

    // Respawn if off screen or expired
    if (this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20 || this.age > this.life) {
      this.reset(w, h, this.color);
      // Respawn at edges
      const edge = Math.random();
      if (edge < 0.5) {
        this.y = h + 10;
        this.x = Math.random() * w;
      } else {
        this.x = Math.random() < 0.5 ? -10 : w + 10;
        this.y = Math.random() * h;
      }
    }
  }

  draw(ctx) {
    const { r, g, b } = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
    ctx.fill();
  }
}

export function ParticleField({ count = 300, color = '#9B93D9', mouseInfluence = true }) {
  const mobile = useMobile();
  const reduced = useReducedMotion();
  const mousePos = useMousePosition();

  const actualCount = mobile ? Math.min(80, Math.floor(count * 0.3)) : count;
  const actualMouseInfluence = mobile ? false : mouseInfluence;
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const particlesRef = useRef(null);
  const noiseRef = useRef(null);
  const prevColorRef = useRef(rgb);

  const draw = useCallback((ctx, { width, height, timestamp }) => {
    if (!noiseRef.current) {
      noiseRef.current = createNoise2D(42);
    }

    if (!particlesRef.current || particlesRef.current.length !== actualCount) {
      particlesRef.current = Array.from(
        { length: actualCount },
        () => new Particle(width, height, rgb)
      );
    }

    // Lerp color on change
    const particles = particlesRef.current;
    if (prevColorRef.current !== rgb) {
      for (const p of particles) {
        p.color = {
          r: Math.round(lerp(p.color.r, rgb.r, 0.02)),
          g: Math.round(lerp(p.color.g, rgb.g, 0.02)),
          b: Math.round(lerp(p.color.b, rgb.b, 0.02)),
        };
      }
      if (
        Math.abs(particles[0]?.color.r - rgb.r) < 2 &&
        Math.abs(particles[0]?.color.g - rgb.g) < 2 &&
        Math.abs(particles[0]?.color.b - rgb.b) < 2
      ) {
        prevColorRef.current = rgb;
      }
    }

    ctx.clearRect(0, 0, width, height);

    const time = timestamp * 0.001;
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    for (const p of particles) {
      p.update(width, height, noiseRef.current, time, mx, my, actualMouseInfluence);
      p.draw(ctx);
    }
  }, [actualCount, rgb, actualMouseInfluence, mousePos]);

  const { canvasRef } = useCanvas(draw, { autoStart: !reduced });

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
