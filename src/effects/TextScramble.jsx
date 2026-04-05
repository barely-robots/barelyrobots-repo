import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&~';

export function TextScramble({ text, trigger, speed = 30, className, style, as: Tag = 'span' }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);
  const queueRef = useRef([]);
  const frameCountRef = useRef(0);

  const scramble = useCallback((newText) => {
    const oldText = display;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ from, to, start, end, char: '' });
    }

    queueRef.current = queue;
    frameCountRef.current = 0;

    const update = () => {
      let output = '';
      let complete = 0;
      const frame = frameCountRef.current;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) {
            queue[i].char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += queue[i].char;
        } else {
          output += from;
        }
      }

      setDisplay(output);
      frameCountRef.current++;

      if (complete < queue.length) {
        frameRef.current = requestAnimationFrame(update);
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);
  }, [display]);

  useEffect(() => {
    scramble(text);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, trigger]);

  // Set initial text without scramble on first mount
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <Tag className={className} style={style}>{display}</Tag>;
}

// Hook version for more control
// When text arg changes, automatically scrambles to new value
export function useTextScramble(text = '') {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);
  const currentText = useRef(text);
  const prevText = useRef(text);

  const scrambleTo = useCallback((newText) => {
    const oldText = currentText.current;
    const length = Math.max(oldText.length, newText.length);
    const queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ from, to, start, end, char: '' });
    }

    let frame = 0;

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!queue[i].char || Math.random() < 0.28) {
            queue[i].char = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          output += queue[i].char;
        } else {
          output += from;
        }
      }

      setDisplay(output);
      frame++;

      if (complete < queue.length) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        currentText.current = newText;
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);
  }, []);

  // Auto-scramble when text argument changes
  useEffect(() => {
    if (text !== prevText.current) {
      prevText.current = text;
      if (text) {
        scrambleTo(text);
      } else {
        setDisplay('');
        currentText.current = '';
      }
    }
  }, [text, scrambleTo]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return [display, scrambleTo];
}
