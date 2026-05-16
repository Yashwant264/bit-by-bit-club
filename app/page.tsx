'use client';

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import {
  ArrowRight,
  Cpu,
  Zap,
  Globe,
  Star,
  ChevronRight,
  Trophy,
  Terminal,
  Brain,
  Code2,
  Layers,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import AmbientBackground from '@/components/AmbientBackground';
import ParticlesBackground from '@/components/ParticlesBackground';
import Image from 'next/image';

/* ── Magnetic Button (With Events Page Syne Font) ────────── */
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

/* ── Data Mapped to Events Structure ─────────────────────── */
const STATS = [
  { value: 200, suffix: '+', label: 'Active Members' },
  { value: 48, suffix: '', label: 'Projects Shipped' },
  { value: 12, suffix: 'k+', label: 'GitHub Stars' },
  { value: 3, suffix: 'x', label: 'Hackathon Wins' },
];

interface PillarItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  accentIndex: 0 | 1 | 2;
}

const PILLARS: PillarItem[] = [
  {
    id: 1,
    title: 'Production Engineering',
    description: 'We build software that ships. From system design to deployment pipelines, every line of code meets industry standards — because university projects should look like startup launches.',
    tags: ['Next.js', 'Docker', 'CI/CD', 'Scale'],
    icon: <Cpu size={20} />,
    accentIndex: 0,
  },
  {
    id: 2,
    title: 'AI Sovereignty',
    description: "We don't just use AI — we build it. Custom models, fine-tuned transformers, and sovereign inference pipelines that give us full ownership of the intelligence stack.",
    tags: ['LLMs', 'Transformers', 'PyTorch'],
    icon: <Brain size={20} />,
    accentIndex: 1,
  },
  {
    id: 3,
    title: 'Open Source Impact',
    description: 'Our code powers real products used by thousands globally. We contribute to the commons, maintain high-quality repos, and build in public with zero compromise on quality.',
    tags: ['GitHub', 'Sovereign', 'Build In Public'],
    icon: <Globe size={20} />,
    accentIndex: 2,
  },
];

/* ── Shared Exact Functional EventCard Block Layout ──────── */
function HomepageCard({ item, index }: { item: PillarItem; index: number }) {
  const accentVars = [
    { color: 'var(--accent-primary)', glow: 'var(--accent-glow)' },
    { color: 'var(--accent-secondary)', glow: 'rgba(180,79,255,0.15)' },
    { color: 'var(--accent-tertiary)', glow: 'rgba(255,45,155,0.12)' },
  ];
  const accent = accentVars[item.accentIndex];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl glass-strong overflow-hidden transform-gpu"
      style={{ border: `1px solid var(--border-subtle)` }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Border beam on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 0 1px ${accent.color}40`,
        }}
      />

      {/* Animated beam line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          animation: 'border-beam 2s linear infinite',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Glow blob */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl pointer-events-none"
        style={{ background: accent.color }}
      />

      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
            style={{
              background: accent.glow,
              color: accent.color,
              border: `1px solid ${accent.color}30`,
            }}
          >
            {item.icon}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--accent-primary)' }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-primary)' }}
            >
              Core Pillar
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs font-mono"
              style={{
                background: `${accent.color}12`,
                color: accent.color,
                border: `1px solid ${accent.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Link Action */}
        <button
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
          style={{ color: accent.color, fontFamily: 'var(--font-syne)' }}
        >
          Learn More
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

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

  return (
    <div className="min-h-screen" style={{ color: 'var(--text-primary)' }}>
      <AmbientBackground />
      <ParticlesBackground />

      {/* ── HERO SECTION ──────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[100dvh] flex items-center justify-center px-6"
      >
        <div
          className="hero-blur-orb w-[500px] h-[500px]"
          style={{
            background: 'var(--accent-secondary)',
            top: '-20%',
            right: '-10%',
            opacity: 0.12,
          }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
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
          >
            {/* Badge matching Event Badge styles cleanly */}
            <div className="badge mb-6 inline-flex mx-auto">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--accent-primary)' }}
              />
              VIT Bhopal · Est. 2020
            </div>

            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] mb-5 tracking-tight">
              We Build
              <br />
              <span className="neon-text">Bit by Bit.</span>
            </h1>

            <p className="text-base md:text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
              The elite technical incubator at VIT Bhopal. Where production-grade
              engineers, AI sovereigns, and open-source architects are forged.
            </p>

            {/* Actions UI Block */}
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton href="/events">
                <button
                  className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm"
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
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  View Events
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
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
            style={{ border: '1px solid var(--border-subtle)' }}
          >
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col justify-center">
                <div style={{ color: 'var(--text-primary)' }}>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-3xl md:text-4xl font-bold font-mono tracking-tight"
                  />
                </div>
                <p
                  className="text-xs uppercase tracking-widest mt-2 font-mono"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS SECTION (REPLACES GENERIC GRID) ── */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="badge mb-4">Our Core Mission</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Not just a club. <span className="neon-text">A movement.</span>
            </h2>
          </motion.div>

          {/* Cards Grid using identical layouts, borders, shadows & text properties */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {PILLARS.map((pillar, i) => (
                <HomepageCard key={pillar.id} item={pillar} index={i} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── RECRUITMENT CTA ────────────────────────── */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 md:p-12 glass-strong text-center relative overflow-hidden"
            style={{ border: '1px solid var(--border-subtle)' }}
          >
            <div className="badge mb-6 inline-flex items-center mx-auto">
              <Star size={12} className="mr-1.5" style={{ color: 'var(--accent-primary)' }} />
              Open Recruitment
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to build <span className="neon-text">something legendary?</span>
            </h2>

            <p className="text-sm max-w-md mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Join the 1% of VIT Bhopal who ship real projects, win national hackathons,
              and leave a permanent mark on the open-source world.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <MagneticButton href="/team">
                <button
                  className="px-5 py-2.5 rounded-full text-xs font-semibold"
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
                    border: '1px solid var(--border-subtle)',
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

      {/* ── FOOTER ────────────────────────────────── */}
      <footer
        className="relative z-10 border-t px-6 py-10"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Bit By Bit Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-syne)' }}>
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
                className="text-xs font-semibold transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}