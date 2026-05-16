'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

// ⚡ Ensure the '?' is right here next to children:
export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0)) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return children ? <>{children}</> : null;
}