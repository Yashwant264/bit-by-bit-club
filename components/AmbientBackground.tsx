'use client';

export default function AmbientBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-300"
            style={{
                backgroundColor: 'var(--bg-primary)',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/40 via-transparent to-purple-200/30 dark:from-emerald-950/10 dark:to-purple-950/5 block md:hidden" />

            <div className="hidden md:block absolute inset-0">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}