'use client';

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />

            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        </div>
    );
}