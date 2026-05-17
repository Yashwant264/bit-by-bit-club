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
    <>
      <AmbientBackground />
      <ParticlesBackground />
      <div
        className="relative"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      >
        {/* ── PARALLAX HERO ─────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        >
          {/* Background orbs */}
          <div
            className="hero-blur-orb w-[220px] h-[220px] md:w-[600px] md:h-[600px]"
            style={{
              background: 'var(--accent-primary)',
              top: '10%',
              left: '-10%',
            }}
          />
          <div
            className="hero-blur-orb w-[180px] h-[180px] md:w-[500px] md:h-[500px]"
            style={{
              background: 'var(--accent-secondary)',
              bottom: '5%',
              right: '-8%',
              animationDelay: '2s',
            }}
          />
          <div
            className="hero-blur-orb w-[120px] h-[120px] md:w-[300px] md:h-[300px]"
            style={{
              background: 'var(--accent-tertiary)',
              top: '40%',
              right: '20%',
              animationDelay: '4s',
            }}
          />

          {/* Floating particles */}
          <div className="hidden md:block">
            {particles.map((p) => (
              <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
            ))}
          </div>

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
              <div className="badge">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                VIT Bhopal · Est. 2017
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight mb-6"
            >
              <span style={{ color: 'var(--text-primary)' }}>We Build</span>
              <br />
              <span className="neon-text">Bit by Bit.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'var(--text-muted)' }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-space"
            >
              The elite technical incubator at VIT Bhopal. Where production-grade
              engineers, AI sovereigns, and open-source architects are forged.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
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
                <button className="btn-magnetic btn-ghost flex items-center gap-2">
                  View Events
                </button>
              </MagneticButton>
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
                className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2 mx-auto"
                style={{ borderColor: 'var(--border-strong)' }}
              >
                <div
                  className="w-1 h-2 rounded-full"
                  style={{ background: 'var(--accent-primary)' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS SECTION ─────────────────────────── */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="divider mb-16" />
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
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="stat-number"
                  />
                  <p
                    className="text-sm mt-2 font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <div className="divider mt-16" />
          </div>
        </motion.section>

        {/* ── BENTO / ABOUT SECTION ─────────────────── */}
        <section className="relative z-10 section-pad px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <div className="badge mb-4">About Us</div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight max-w-lg">
                Not just a club.
                <span className="accent-text"> A movement.</span>
              </h2>
            </motion.div>
            <BentoGrid />
          </div>
        </section>

        {/* ── PILLARS SECTION ───────────────────────── */}
        <section className="relative z-10 section-pad px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="badge mb-4 mx-auto inline-flex">Our Core Pillars</div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold">
                What drives us forward
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Cpu size={28} />,
                  title: 'Production Engineering',
                  desc: 'We build software that ships. From system design to deployment pipelines, every line of code meets industry standards — because university projects should look like startup launches.',
                },
                {
                  icon: <Zap size={28} />,
                  title: 'AI Sovereignty',
                  desc: "We don't just use AI — we build it. Custom models, fine-tuned transformers, and sovereign inference pipelines that give us full ownership of the intelligence stack.",
                },
                {
                  icon: <Globe size={28} />,
                  title: 'Open Source Impact',
                  desc: 'Our code powers real products used by thousands globally. We contribute to the commons, maintain high-quality repos, and build in public with zero compromise on quality.',
                },
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-strong rounded-2xl p-8 card-hover border-beam-wrap"
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
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <EventGallery />
        <Testimonials />

        {/* ── JOIN CTA ──────────────────────────────── */}
        <section className="relative z-10 section-pad px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong rounded-3xl p-12 md:p-20 border-beam-wrap relative overflow-hidden"
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
              <div className="badge mb-6 mx-auto inline-flex">
                <Star size={10} />
                Open Recruitment
              </div>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold mb-5 leading-tight">
                Ready to build
                <br />
                <span className="neon-text">something legendary?</span>
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                Join the 1% of VIT Bhopal who ship real projects, win national hackathons,
                and leave a permanent mark on the open-source world.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <MagneticButton href="/team">
                  <button className="btn-magnetic btn-primary">
                    Meet the Team
                    <ArrowRight size={16} />
                  </button>
                </MagneticButton>
                <MagneticButton href="/events">
                  <button className="btn-magnetic btn-ghost">
                    Our Events
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────── */}
        <footer className="relative z-10 border-t px-6 py-10" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Bit By Bit Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="font-syne font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Bit By Bit
              </span>
            </div>

            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              © 2026 Bit by Bit Technical Club · VIT Bhopal
            </p>

            <div className="flex gap-6">
              {[
                { name: "GitHub", link: "https://github.com/yourgithub" },
                { name: "Twitter", link: "https://twitter.com/yourtwitter" },
                { name: "LinkedIn", link: "https://linkedin.com/in/yourlinkedin" },
                { name: "Instagram", link: "https://www.instagram.com/bitbybit_vitb/" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium transition-colors hover:text-current"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
