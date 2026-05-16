'use client';

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRef } from 'react';
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
        boxShadow: '0 0 6px var(--accent-primary)',
      }}
      animate={{
        y: [0, -40, 0],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
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

/* ── Stats Section ───────────────────────────────────────── */
const STATS = [
  { value: 200, suffix: '+', label: 'Active Members' },
  { value: 48, suffix: '', label: 'Projects Shipped' },
  { value: 12, suffix: 'k+', label: 'GitHub Stars' },
  { value: 3, suffix: 'x', label: 'Hackathon Wins' },
];

/* ── Main Page ───────────────────────────────────────────── */
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
    <div className="relative min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
      <AmbientBackground />
      <ParticlesBackground />

      <div className="relative">
        {/* ———— PARALLAX HERO ———— */}
        <section
          ref={heroRef}
          className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent"
        >
          {/* Background orbs */}
          <div
            className="hero-blur-orb w-[600px] h-[600px] opacity-70 dark:opacity-100"
            style={{
              background: 'var(--accent-primary)',
              top: '-10%',
              left: '-10%',
            }}
          />
          <div
            className="hero-blur-orb w-[500px] h-[500px] opacity-70 dark:opacity-100"
            style={{
              background: 'var(--accent-secondary)',
              bottom: '5%',
              right: '-8%',
              animationDelay: '2s',
            }}
          />
          <div
            className="hero-blur-orb w-[380px] h-[380px] opacity-70 dark:opacity-100"
            style={{
              background: 'var(--accent-tertiary)',
              top: '40%',
              right: '20%',
              animationDelay: '4s',
            }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
          ))}

          {/* Hero content */}
          <motion.div
            style={{
              y: springHeroY,
              opacity: heroOpacity,
              scale: heroScale,
              filter: heroBlur.get() > 0 ? `blur(${heroBlur.get()}px)` : undefined,
            }}
            className="relative z-10 text-center px-6 max-w-6xl mx-auto transform-gpu"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <div className="badge bg-zinc-200/50 dark:bg-zinc-800/30 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700/50 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-2 inline-block" />
                VIT Bhopal · Est. 2020
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight mb-6 text-zinc-900 dark:text-white"
            >
              <span style={{ color: 'var(--accent-primary)' }}>We Build</span>
              <br />
              <span className="neon-text">Bit by Bit.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-space text-zinc-600 dark:text-zinc-400"
            >
              The elite technical incubator at VIT Bhopal. Where production-grade
              engineers, AI sovereigns, and open-source architects are forged.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <MagneticButton>
                <button className="btn-magnetic btn-primary flex items-center gap-2">
                  Explore Our Work
                  <ArrowRight size={16} />
                </button>
              </MagneticButton>
              <MagneticButton href="/events">
                <button className="btn-magnetic btn-ghost flex items-center gap-2 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700">
                  View Events
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2 mx-auto border-zinc-400 dark:border-zinc-700"
            >
              <div className="w-1 h-2 rounded-full bg-zinc-600 dark:bg-zinc-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* ———— STATS SECTION ———— */}
        <motion.section
          className="py-20 bg-zinc-100/50 dark:bg-zinc-900/20 backdrop-blur-sm border-y border-zinc-200 dark:border-zinc-800"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="stat-number text-zinc-900 dark:text-white font-bold"
                  />
                  <p className="text-sm mt-2 font-medium text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ———— BENTO / ABOUT SECTION ———— */}
        <section className="relative z-10 section-pad px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <div className="badge mb-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">About Us</div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight max-w-3xl text-zinc-900 dark:text-white">
                Not just a club. <span className="accent-text">A movement.</span>
              </h2>
            </motion.div>
            <BentoGrid />
          </div>
        </section>

        {/* ———— PILLARS SECTION ———— */}
        <section className="relative z-10 section-pad px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="badge mb-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mx-auto">Our Core Pillars</div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-zinc-900 dark:text-white">
                What drives us forward
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu size={28} />,
                  title: 'Production Engineering',
                  desc: 'We build software that ships. From system design to deployment pipelines, every line of code meets industry standards.',
                },
                {
                  icon: <Zap size={28} />,
                  title: 'AI Sovereignty',
                  desc: "We don't just use AI - we build it. Custom models, fine-tuned transformers, and sovereign inference pipelines.",
                },
                {
                  icon: <Globe size={28} />,
                  title: 'Open Source Impact',
                  desc: 'Our code powers real products used by thousands globally. We contribute to the commons and maintain high-quality repos.',
                },
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="glass-strong rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: 'var(--accent-glow)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-accent)',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ———— JOIN CTA ———— */}
        <section className="relative z-10 section-pad px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong rounded-3xl p-12 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md relative overflow-hidden"
            >
              <div
                className="hero-blur-orb w-80 h-80"
                style={{
                  background: 'var(--accent-primary)',
                  top: '-40%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: 0.08,
                }}
              />
              <div className="badge mb-6 bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mx-auto">
                <Star size={14} className="mr-1 inline" /> Open Recruitment
              </div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-5 leading-tight text-zinc-900 dark:text-white">
                Ready to build
                <br />
                <span className="neon-text">something legendary?</span>
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto text-zinc-600 dark:text-zinc-400">
                Join the 1% of VIT Bhopal who ship real projects, win national
                hackathons, and leave a permanent mark on the open-source world.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <MagneticButton href="/team">
                  <button className="btn-magnetic btn-primary">Meet the Team</button>
                </MagneticButton>
                <MagneticButton href="/events">
                  <button className="btn-magnetic btn-ghost text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700">Our Events</button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        <EventGallery />
        <Testimonials />

        {/* ———— FOOTER ———— */}
        <footer className="relative z-10 border-t px-6 py-10 border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Bit By Bit Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="font-sync font-bold text-lg text-zinc-900 dark:text-white">
                Bit By Bit
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              © 2026 Bit by Bit Technical Club · VIT Bhopal
            </p>
            <div className="flex gap-6">
              {['GitHub', 'Twitter', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-medium transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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