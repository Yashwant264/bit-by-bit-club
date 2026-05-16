'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <>

      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">

        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
          {/* Top Glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />

          {/* Bottom Glow */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />

        </div>

        <div className="relative z-10 flex flex-col items-center">

          <div className="relative">

            {/* Glow Behind Logo */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-3xl animate-pulse" />

            <div className="absolute inset-0 animate-pulse opacity-20">

              <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/20" />

            </div>

            {/* Logo */}
            <Image
              src="/logo.png"
              alt="Bit By Bit Logo"
              width={140}
              height={140}
              className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(0,255,150,0.8)] animate-pulse mix-blend-lighten"
            />
          </div>

          {/* Club Name */}
          <h1 className="mt-8 text-3xl sm:text-5xl md:text-7xl font-black tracking-[0.15em] sm:tracking-[0.3em] text-white whitespace-nowrap">
            <span className="text-emerald-400">BIT</span> BY <span className="text-emerald-400">BIT</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-gray-400 tracking-[0.4em] uppercase text-sm">
            Initializing Future...
          </p>
          <div className="mt-10 w-72 h-[4px] overflow-hidden rounded-full bg-gray-800">

            <div className="h-full w-1/2 bg-emerald-400 animate-[loading_1.5s_linear_infinite]" />

          </div>

        </div>
      </div>
    </>
  );
}