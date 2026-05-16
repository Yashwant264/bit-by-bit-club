'use client';

import { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { BentoGrid } from '@/components/BentoGrid';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowRight, Cpu, Zap, Globe, Star } from 'lucide-react';
import Link from 'next/link';
import AmbientBackground from '@/components/AmbientBackground';
import ParticlesBackground from '@/components/ParticlesBackground';
import Image from 'next/image';
import Testimonials from "@/components/Testimonials";
import EventGallery from "@/components/EventGallery";

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

/* ── Stats Layout Array ─────────────────────────────────── */
const STATS = [
  { value: 200, suffix: '+', label: 'Active Members' },
  { value: 48, suffix: '', label: 'Projects Shipped' },
  { value: 12, suffix: 'k+', label: 'GitHub Stars' },
  { value: 3, suffix: 'x', label: 'Hackathon Wins' },
];

/* ── Main Home Page ──────────────────────────────────────── */
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
    <div className="min-h-screen transition-colors duration-500 overflow-hidden bg-transparent">
      {/* Structural canvas vectors */}
      <AmbientBackground />
      <ParticlesBackground />

      <div className="relative z-10">

        {/* ── PARALLAX HERO SECTION ───────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        >
          {/* Layout Backdrop Radial Orbs */}
          <div
            className="hero-blur-orb w-[600px] h-[600px] absolute pointer-events-none"
            style={{
              background: 'var(--accent-primary)',
              top: '10%',
              left: '-10%',
              opacity: 0.12,
            }}
          />
          <div
            className="hero-blur-orb w-[500px] h-[500px] absolute pointer-events-none"
            style={{
              background: 'var(--accent-secondary)',
              bottom: '5%',
              right: '-8%',
              opacity: 0.1,
            }}
          />

          {/* Floating context arrays */}
          {particles.map((p) => (
            <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
          ))}

          {/* Main Hero Elements Content container */}
          <motion.div
            style={{
              y: springHeroY,
              opacity: heroOpacity,
              scale: heroScale,
              filter: heroBlur.get() > 0 ? `blur(${heroBlur.get()}px)` : undefined,
            }}
            className="relative z-10 text-center px-6 max-w-6xl mx-auto transform-gpu"
          >
            {/* Context Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <div
                className="badge glass-strong px-4 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-2"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                  style={{ background: 'var(--accent-primary)' }}
                />
                <span style={{ color: 'var(--text-muted)' }}>VIT Bhopal · Est. 2020</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight mb-6"
            >
              <span style={{ color: 'var(--text-main)' }}>We Build</span>
              <br />
              <span className="neon-text">Bit by Bit.</span>
            </motion.h1>

            {/* Sub-headline Text info */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              The elite technical incubator at VIT Bhopal. Where production-grade
              engineers, AI sovereigns, and open-source architects are forged.
            </motion.p>

            {/* Interaction Buttons Layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <MagneticButton>
                <button
                  className="px-6 py-3 rounded-xl font-semibold shadow-md transition-all flex items-center gap-2 text-white"
                  style={{ background: 'var(--accent-primary)' }}
                >
                  Explore Our Work
                  <ArrowRight size={16} />
                </button>
              </MagneticButton>

              <MagneticButton href="/events">
                <button
                  className="px-6 py-3 rounded-xl btn-ghost glass-strong font-medium transition-all"
                  style={{
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  View Events
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2 mx-auto"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{ background: 'var(--accent-primary)' }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── METRIC BAR STATS SECTION ────────────── */}
        <motion.section
          className="py-16 glass-strong"
          style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  {/* Fixed Error Squiggle here: wrapped inside styled div block container */}
                  <div style={{ color: 'var(--text-main)' }}>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl md:text-4xl font-bold font-mono tracking-tight"
                    />
                  </div>
                  <p
                    className="text-xs uppercase tracking-widest mt-2 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── BENTO SHOWCASE GRID SECTION ──────────── */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div
                className="badge px-3 py-1 rounded-md text-xs font-mono mb-4 inline-block"
                style={{
                  background: 'var(--accent-glow)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                About Us
              </div>
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight leading-tight"
                style={{ color: 'var(--text-main)' }}
              >
                Not just a club. <span className="neon-text">A movement.</span>
              </h2>
            </motion.div>
            <BentoGrid />
          </div>
        </section>

        {/* ── CORE PILLARS CARD GRID SECTION ───────── */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div
                className="badge px-3 py-1 rounded-md text-xs font-mono mb-4 inline-block mx-auto"
                style={{
                  background: 'rgba(180,79,255,0.1)',
                  color: 'var(--accent-secondary)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                Our Core Pillars
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text-main)' }}
              >
                What drives us forward
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu size={24} />,
                  title: 'Production Engineering',
                  desc: 'We build software that ships. From system design to deployment pipelines, every line of code meets industry standards — because university projects should look like startup launches.',
                  color: 'var(--accent-primary)',
                  glow: 'var(--accent-glow)'
                },
                {
                  icon: <Zap size={24} />,
                  title: 'AI Sovereignty',
                  desc: "We don't just use AI — we build it. Custom models, fine-tuned transformers, and sovereign inference pipelines that give us full ownership of the intelligence stack.",
                  color: 'var(--accent-secondary)',
                  glow: 'rgba(180,79,255,0.15)'
                },
                {
                  icon: <Globe size={24} />,
                  title: 'Open Source Impact',
                  desc: 'Our code powers real products used by thousands globally. We contribute to the commons, maintain high-quality repos, and build in public with zero compromise on quality.',
                  color: 'var(--accent-tertiary)',
                  glow: 'rgba(255,45,155,0.12)'
                },
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl p-8 glass-strong hover:scale-[1.01] transition-all group shadow-sm"
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 transition-all"
                    style={{
                      background: pillar.glow,
                      color: pillar.color,
                      border: `1px solid ${pillar.color}30`
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: 'var(--text-main)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INTERACTION CTA CALLOUT SECTION ──────── */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-12 glass-strong relative overflow-hidden shadow-sm"
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              <div
                className="badge px-3 py-1 rounded-md text-xs font-mono mb-6 inline-flex items-center mx-auto"
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  color: '#d97706',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <Star size={12} className="mr-1.5" /> Open Recruitment
              </div>

              <h2
                className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight"
                style={{ color: 'var(--text-main)' }}
              >
                Ready to build
                <br />
                <span className="neon-text">something legendary?</span>
              </h2>

              <p
                className="text-sm max-w-md mx-auto mb-8 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Join the 1% of VIT Bhopal who ship real projects, win national hackathons,
                and leave a permanent mark on the open-source world.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <MagneticButton href="/team">
                  <button
                    className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm shadow-md"
                    style={{ background: 'var(--accent-primary)' }}
                  >
                    Meet the Team
                  </button>
                </MagneticButton>
                <MagneticButton href="/events">
                  <button
                    className="px-5 py-2.5 rounded-xl btn-ghost glass-strong font-medium transition-colors text-sm"
                    style={{
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)'
                    }}
                  >
                    Our Events
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        <EventGallery />
        <Testimonials />

        {/* ── FOOTER COMPONENT BLOCK ───────────────── */}
        <footer
          className="relative z-10 px-6 py-12 glass-strong"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Bit By Bit Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span
                className="font-bold tracking-wider text-base"
                style={{ color: 'var(--text-main)' }}
              >
                Bit By Bit
              </span>
            </div>

            <p
              className="text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              © 2026 Bit by Bit Technical Club · VIT Bhopal
            </p>

            <div className="flex gap-6">
              {['GitHub', 'Twitter', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs transition-colors font-medium hover:opacity-80"
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