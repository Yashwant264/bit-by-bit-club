'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Trophy,
  Code2,
  Brain,
  Rocket,
  Terminal,
  Layers,
  ChevronRight,
} from 'lucide-react';

/* ── Types ───────────────────────────────────────────────── */
type EventCategory = 'all' | 'hackathon' | 'workshop' | 'talk' | 'competition';

interface ClubEvent {
  id: number;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'past';
  description: string;
  tags: string[];
  icon: React.ReactNode;
  accentIndex: 0 | 1 | 2;
}

/* ── Data ────────────────────────────────────────────────── */
const EVENTS: ClubEvent[] = [
  {
    id: 1,
    title: 'ByteStorm 2024',
    category: 'hackathon',
    date: 'Dec 15–16, 2024',
    location: 'VIT Bhopal · Main Auditorium',
    attendees: 320,
    status: 'upcoming',
    description:
      '36-hour national-level hackathon. Build at the intersection of AI and infrastructure. Prize pool ₹2,00,000. Open to all CSE branches.',
    tags: ['AI/ML', 'Cloud', 'Open Source', '36hrs'],
    icon: <Trophy size={20} />,
    accentIndex: 0,
  },
  {
    id: 2,
    title: 'DevOps Bootcamp',
    category: 'workshop',
    date: 'Nov 28–30, 2024',
    location: 'Tech Lab 3 · Block B',
    attendees: 80,
    status: 'upcoming',
    description:
      'Hands-on 3-day bootcamp covering Docker, Kubernetes, CI/CD pipelines, and production monitoring. Bring your laptop — you will ship a live app.',
    tags: ['Kubernetes', 'Docker', 'CI/CD', 'Hands-on'],
    icon: <Terminal size={20} />,
    accentIndex: 1,
  },
  {
    id: 3,
    title: 'AI Sovereignty Summit',
    category: 'talk',
    date: 'Nov 10, 2024',
    location: 'Seminar Hall · Block A',
    attendees: 150,
    status: 'past',
    description:
      'Industry leaders from Anthropic and Sarvam AI discussed the future of sovereign LLMs, local inference, and fine-tuning strategies for Indic languages.',
    tags: ['LLMs', 'Fine-tuning', 'Indic AI'],
    icon: <Brain size={20} />,
    accentIndex: 2,
  },
  {
    id: 4,
    title: 'Open Source Sprint',
    category: 'competition',
    date: 'Oct 20–22, 2024',
    location: 'Remote · GitHub',
    attendees: 210,
    status: 'past',
    description:
      'A 48-hour open-source contribution marathon. Participants merged PRs into top-tier repos including Next.js, ShadCN, and Tauri. 48 PRs merged.',
    tags: ['GitHub', 'PRs', 'Next.js', 'Tauri'],
    icon: <Code2 size={20} />,
    accentIndex: 0,
  },
  {
    id: 5,
    title: 'System Design Masterclass',
    category: 'workshop',
    date: 'Oct 5, 2024',
    location: 'Tech Lab 1 · Block C',
    attendees: 65,
    status: 'past',
    description:
      'Deep-dive into distributed systems, CAP theorem, database sharding, and caching strategies. Taught by final-year engineers with internship experience at FAANG.',
    tags: ['Distributed Systems', 'Databases', 'Caching'],
    icon: <Layers size={20} />,
    accentIndex: 1,
  },
  {
    id: 6,
    title: 'LaunchPad Demo Day',
    category: 'competition',
    date: 'Sep 22, 2024',
    location: 'Innovation Hub · VIT Bhopal',
    attendees: 200,
    status: 'past',
    description:
      'Eight teams presented production-grade products to a panel of VCs and startup founders. Two projects received seed funding offers.',
    tags: ['Demo Day', 'Startups', 'VCs', 'Products'],
    icon: <Rocket size={20} />,
    accentIndex: 2,
  },
];

const CATEGORIES: { label: string; value: EventCategory }[] = [
  { label: 'All Events', value: 'all' },
  { label: 'Hackathons', value: 'hackathon' },
  { label: 'Workshops', value: 'workshop' },
  { label: 'Talks', value: 'talk' },
  { label: 'Competitions', value: 'competition' },
];

const STATUS_COLORS: Record<ClubEvent['status'], string> = {
  upcoming: 'var(--accent-primary)',
  ongoing: 'var(--accent-tertiary)',
  past: 'var(--text-muted)',
};

/* ── Event Card ──────────────────────────────────────────── */
function EventCard({ event, index }: { event: ClubEvent; index: number }) {
  const accentVars = [
    { color: 'var(--accent-primary)', glow: 'var(--accent-glow)' },
    { color: 'var(--accent-secondary)', glow: 'rgba(180,79,255,0.15)' },
    { color: 'var(--accent-tertiary)', glow: 'rgba(255,45,155,0.12)' },
  ];
  const accent = accentVars[event.accentIndex];

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
            {event.icon}
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: STATUS_COLORS[event.status] }}
            />
            <span
              className="text-xs font-mono uppercase tracking-widest capitalize"
              style={{ color: STATUS_COLORS[event.status] }}
            >
              {event.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
          {event.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {event.tags.map((tag) => (
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

        {/* Meta info */}
        <div className="flex flex-col gap-2 mb-6">
          {[
            { icon: <Calendar size={13} />, text: event.date },
            { icon: <MapPin size={13} />, text: event.location },
            { icon: <Users size={13} />, text: `${event.attendees}+ attendees` },
          ].map((meta) => (
            <div
              key={meta.text}
              className="flex items-center gap-2 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              <span style={{ color: accent.color }}>{meta.icon}</span>
              {meta.text}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
          style={{ color: accent.color, fontFamily: 'var(--font-syne)' }}
        >
          {event.status === 'upcoming' ? 'Register Now' : 'View Recap'}
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');

  const filtered =
    activeCategory === 'all'
      ? EVENTS
      : EVENTS.filter((e) => e.category === activeCategory);

  const upcomingCount = EVENTS.filter((e) => e.status === 'upcoming').length;

  return (
    <div className="min-h-screen">
      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        <div
          className="hero-blur-orb w-[500px] h-[500px]"
          style={{
            background: 'var(--accent-secondary)',
            top: '-20%',
            right: '-10%',
            opacity: 0.12,
          }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="badge mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--accent-primary)' }}
              />
              {upcomingCount} Upcoming Events
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] mb-5">
              Events &
              <br />
              <span className="neon-text">Experiences.</span>
            </h1>
            <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text-muted)' }}>
              From 36-hour hackathons to sovereignty-focused AI summits — every event is
              engineered to push your limits and ship real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS ───────────────────────────── */}
      <section className="px-6 mb-12 sticky top-20 z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="
  glass
  rounded-full
  p-1.5
  flex
  gap-1
  overflow-x-auto
  no-scrollbar
  whitespace-nowrap
  w-full
  md:w-fit
"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className="
  px-4
  py-2
  rounded-full
  text-sm
  font-semibold
  whitespace-nowrap
  shrink-0
  transition-all
  duration-300
"
                style={{
                  fontFamily: 'var(--font-syne)',
                  background:
                    activeCategory === cat.value ? 'var(--accent-primary)' : 'transparent',
                  color:
                    activeCategory === cat.value ? 'var(--bg-primary)' : 'var(--text-muted)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS GRID ───────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p style={{ color: 'var(--text-muted)' }}>No events in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
