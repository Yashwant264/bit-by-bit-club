'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/* ── Cubic-bezier easing ─────────────────────────────────── */
// Implements CSS cubic-bezier(0.25, 0.1, 0.0, 1.0) — "ease-out-expo"
function cubicBezierEase(t: number): number {
  // Approximation of cubic-bezier(0.16, 1, 0.3, 1) — ease-out-expo
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ── Hook ────────────────────────────────────────────────── */
function useAnimatedCounter(
  targetValue: number,
  duration: number = 2200,
  isActive: boolean = false
): number {
  const [current, setCurrent] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    startTimeRef.current = null;

    function step(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = cubicBezierEase(progress);

      setCurrent(Math.round(eased * targetValue));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCurrent(targetValue);
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [targetValue, duration, isActive]);

  return current;
}

/* ── Component ───────────────────────────────────────────── */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2200,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const current = useAnimatedCounter(value, duration, isInView);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}
