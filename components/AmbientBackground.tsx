'use client';

export default function AmbientBackground() {
    // ✓ NEW CODE:
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
            {/* 📱 Mobile Optimized Performance Base Layer (Static Subtle Glow) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-black to-purple-950/10 block md:hidden" />

            {/* 🖥️ Full Power Ultra Desktop Background Graphics */}
            <div className="hidden md:block absolute inset-0">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}