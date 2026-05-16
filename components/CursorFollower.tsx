'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Main cursor — tight spring
  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.3 });
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.3 });

  // Trail — loose spring (liquid follow)
  const trailX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.8 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(isClickable);
    }

    function onLeave() { setVisible(false); }
    function onDown() { setIsClicking(true); }
    function onUp() { setIsClicking(false); }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Liquid trail */}
      <motion.div
        className="cursor-follower fixed pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full transform-gpu"
          animate={{
            width: isPointer ? 40 : 24,
            height: isPointer ? 40 : 24,
            opacity: isPointer ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--accent-primary)',
            filter: 'blur(4px)',
          }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="cursor-follower fixed pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full transform-gpu"
          animate={{
            width: isClicking ? 6 : isPointer ? 14 : 8,
            height: isClicking ? 6 : isPointer ? 14 : 8,
            opacity: isPointer ? 0.9 : 1,
          }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'var(--accent-primary)' }}
        />
      </motion.div>
    </>
  );
}
