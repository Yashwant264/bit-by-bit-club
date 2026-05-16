'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

// ✓ The '?' makes children optional, which satisfies Next.js layout.tsx compilation!
export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
    useEffect(() => {
        // 📱 Mobile Safety Guard: Instantly bypass Lenis loop on phone viewports or touch devices
        if (typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0)) {
            return;
        }

        // 🖥️ Desktop Configuration: Stays exactly as you designed it!
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

    // ✓ Safe fallback loop handles being called as a self-closing component cleanly
    return children ? <>{children}</> : null;
}