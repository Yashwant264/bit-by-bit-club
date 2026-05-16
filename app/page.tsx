'use client';

import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BentoGrid } from '@/components/BentoGrid';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Cpu, Zap, Globe, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import AmbientBackground from '@/components/AmbientBackground';
import ParticlesBackground from '@/components/ParticlesBackground';
import Image from 'next/image';
import EventGallery from '@/components/EventGallery';
import Testimonials from '@/components/Testimonials';

/* ── Magnetic Button ─────────────────────────────────────── */
function MagneticButton({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

/* ── Floating Particle ───────────────────────────────────── */
function FloatingParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full transform-gpu"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: 'var(--accent-primary)',
        boxShadow: '0 0 8px var(--accent-primary)',
      }}
      animate={{
        y: [0, -40, 0],
        opacity: [0, 0.7, 0],
        scale: [0, 1.2, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ── Stats Data ──────────────────────────────────────────── */
const STATS = [
  { value: 200, suffix: '+', label: 'Active Members' },
  { value: 48, suffix: '', label: 'Projects Shipped' },
  { value: 12, suffix: 'k+', label: 'GitHub Stars' },
  { value: 3, suffix: 'x', label: 'Hackathon Wins' },
];

/* ── Main Component ──────────────────────────────────────── */
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  const springHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.3,
  }));

  if (loading) {
    return <LoadingScreen />;
  }

  // Accent mapping variables taken directly from your events page config
  const pillarAccents = [
    { color: 'var(--accent-primary)', glow: 'var(--accent-glow)' },
    { color: 'var(--accent-secondary)', glow: 'rgba(180,79,255,0.15)' },
    { color: 'var(--accent-tertiary)', glow: 'rgba(255,45,155,0.12)' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}>

      {/* ── DESIGN TOKENS ENGINE & BORDER-BEAM DEFINITION ── */}
      <style jsx global>{`
        /* Architectural grid lines layout matching events overlay background */
        .unified-homepage-context {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, var(--border-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px);
          background-color: var(--bg-primary);
        }

        /* The exact structural keyframe definition needed for standard border beams */
        @keyframes border-beam {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-border-beam-line {
          background-size: 200% 100%;
          animation: border-beam 2s linear infinite;
        }

        /* Perfectly isolated card styling surface supporting both Light and Dark mode variations */
        .unified-homepage-context .glass-strong {
          background: var(--bg-surface, rgba(255, 255, 255, 0.45)) !important;
          backdrop-filter: blur(16px) saturate(120%) !important;
          -webkit-backdrop-filter: blur(16px) saturate(120%) !important;
          border: 1px solid var(--border-subtle) !important;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Consistent structural styling wrapper for context badges */
        .unified-homepage-context .badge {
          background: transparent !important;
          border: 1px solid var(--border-subtle) !important;
          color: var(--text-primary) !important;
          font-family: var(--font-mono), monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
        }
      `}</style>

      <AmbientBackground />
      <ParticlesBackground />

      <div className="relative z-10 w-full overflow-hidden unified-homepage-context">

        {/* ── HERO SECTION ──────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-6"
        >
          <div
            className="hero-blur-orb w-[500px] h-[500px] absolute pointer-events-none"
            style={{
              background: 'var(--accent-secondary)',
              top: '-20%',
              right: '-10%',
              opacity: 0.12,
            }}
          />

          {particles.map((p) => (
            <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
          ))}

          <motion.div
            style={{
              y: springHeroY,
              opacity: heroOpacity,
              scale: heroScale,
              filter: heroBlur.get() > 0 ? `blur(${heroBlur.get()}px)` : undefined,
            }}
            className="relative z-10 text-center max-w-6xl mx-auto transform-gpu"
          >
            <div className="badge mb-6 gap-2 !rounded-full">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--accent-primary)' }}
              />
              VIT Bhopal · Est. 2020
            </div>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] mb-5 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              We Build
              <br />
              <span className="neon-text">Bit by Bit.</span>
            </h1>

            <p className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              The elite technical incubator at VIT Bhopal. Where production-grade
              engineers, AI sovereigns, and open-source architects are forged.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton href="/events">
                <button
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:opacity-90"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  Explore Our Work
                </button>
              </MagneticButton>
              <MagneticButton href="/events">
                <button
                  className="px-6 py-3 rounded-full text-sm font-semibold glass-strong transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    color: 'var(--text-primary)',
                  }}
                >
                  View Events
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        {/* ── STATS SECTION ─────────────────────────── */}
        <section className="px-6 mb-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col justify-center">
                  <div style={{ color: 'var(--text-primary)' }}>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl md:text-4xl font-bold font-mono tracking-tight"
                    />
                  </div>
                  <p
                    className="text-xs uppercase tracking-widest mt-2 font-mono font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── BENTO GRID SECTION ────────────────────── */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="badge mb-4">About Us</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Not just a club. <span className="neon-text">A movement.</span>
              </h2>
            </motion.div>
            <BentoGrid />
          </div>
        </section>

        {/* ── CORE PILLARS SECTION ──────────────────── */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="badge mb-4 mx-auto">Our Core Pillars</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                What drives us forward
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu size={20} />,
                  title: 'Production Engineering',
                  desc: 'We build software that ships. From system design to deployment pipelines, every line of code meets industry standards — because university projects should look like startup launches.',
                  accent: pillarAccents[0],
                },
                {
                  icon: <Zap size={20} />,
                  title: 'AI Sovereignty',
                  desc: "We don't just use AI — we build it. Custom models, fine-tuned transformers, and sovereign inference pipelines that give us full ownership of the intelligence stack.",
                  accent: pillarAccents[1],
                },
                {
                  icon: <Globe size={20} />,
                  title: 'Open Source Impact',
                  desc: 'Our code powers real products used by thousands globally. We contribute to the commons, maintain high-quality repos, and build in public with zero compromise on quality.',
                  accent: pillarAccents[2],
                },
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl p-6 md:p-8 glass-strong transition-all group relative overflow-hidden transform-gpu"
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  {/* Outer / Inner tracking border glow highlight on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ boxShadow: `inset 0 0 0 1px ${pillar.accent.color}40` }}
                  />

                  {/* Active linear animated border-beam layout injected precisely via your events specification */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam-line"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${pillar.accent.color}, transparent)`,
                    }}
                  />

                  {/* Infinite radial glow backdrop orb mapping */}
                  <div
                    className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl pointer-events-none"
                    style={{ background: pillar.accent.color }}
                  />

                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 relative z-10"
                    style={{
                      background: pillar.accent.glow,
                      color: pillar.accent.color,
                      border: `1px solid ${pillar.accent.color}30`,
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight relative z-10" style={{ color: 'var(--text-primary)' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5 relative z-10" style={{ color: 'var(--text-muted)' }}>
                    {pillar.desc}
                  </p>
                  <button
                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 mt-auto relative z-10"
                    style={{ color: pillar.accent.color, fontFamily: 'var(--font-syne)' }}
                  >
                    Learn More
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE DATA STREAM GALLERIES & TESTIMONIALS ── */}
        <section className="relative z-10">
          <EventGallery />
        </section>

        <section className="relative z-10">
          <Testimonials />
        </section>

        {/* ── CALL TO ACTION SECTION ────────────────── */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-8 md:p-12 glass-strong relative overflow-hidden shadow-sm"
            >
              {/* Context active beam for the CTA Box layout block */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 0 1px var(--accent-primary)40` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 hover:opacity-100 transition-opacity duration-500 animate-border-beam-line"
                style={{
                  background: `linear-gradient(90deg, transparent, var(--accent-primary), transparent)`,
                }}
              />

              <div className="badge mb-6 inline-flex items-center mx-auto gap-1.5">
                <Star size={12} style={{ color: 'var(--accent-primary)' }} /> Open Recruitment
              </div>

              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Ready to build <span className="neon-text">something legendary?</span>
              </h2>

              <p className="text-sm max-w-md mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Join the 1% of VIT Bhopal who ship real projects, win national hackathons,
                and leave a permanent mark on the open-source world.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <MagneticButton href="/team">
                  <button
                    className="px-5 py-2.5 rounded-full text-xs font-semibold hover:opacity-90"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      background: 'var(--accent-primary)',
                      color: 'var(--bg-primary)',
                    }}
                  >
                    Meet the Team
                  </button>
                </MagneticButton>
                <MagneticButton href="/events">
                  <button
                    className="px-5 py-2.5 rounded-full text-xs font-semibold glass-strong transition-colors"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Our Events
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER SYSTEM ─────────────────────────── */}
        <footer className="relative z-10 border-t px-6 py-10" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Bit By Bit Logo"
                width={45}
                height={45}
                className="object-contain"
              />
              <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-syne)', color: 'var(--text-primary)' }}>
                Bit By Bit
              </span>
            </div>

            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              © 2026 Bit by Bit Technical Club · VIT Bhopal
            </p>

            <div className="flex gap-6">
              {['GitHub', 'Twitter', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-semibold transition-colors hover:text-current"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}