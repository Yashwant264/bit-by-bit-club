'use client';

import { motion } from 'framer-motion';
import {
  Terminal,
  Brain,
  GitBranch,
  Trophy,
  Zap,
  Globe,
  Code2,
  Shield,
  ArrowRight,
} from 'lucide-react';

/* ── Cell definitions ────────────────────────────────────── */
interface BentoCell {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan: 1 | 2 | 3;
  rowSpan: 1 | 2;
  accentIndex: 0 | 1 | 2;
  tag?: string;
  cta?: string;
  large?: boolean;
}

const CELLS: BentoCell[] = [
  {
    id: 1,
    title: 'Production-Grade Engineering',
    description:
      'We don\'t write code for assignments — we architect systems. Every project at Bit by Bit goes through code review, CI/CD pipelines, staging environments, and production deployments. Our bar is industry standard, not academic.',
    icon: <Terminal size={22} />,
    colSpan: 2,
    rowSpan: 2,
    accentIndex: 0,
    tag: 'Core Doctrine',
    cta: 'See our GitHub',
    large: true,
  },
  {
    id: 2,
    title: 'AI Sovereignty',
    description:
      'We own our AI stack. From pre-training data curation to custom inference servers, we build sovereign intelligence — not API wrappers.',
    icon: <Brain size={22} />,
    colSpan: 1,
    rowSpan: 1,
    accentIndex: 1,
    tag: 'AI/ML',
  },
  {
    id: 3,
    title: '12k+ GitHub Stars',
    description: 'Across all our open-source projects combined. We build in public.',
    icon: <GitBranch size={22} />,
    colSpan: 1,
    rowSpan: 1,
    accentIndex: 2,
    tag: 'Open Source',
  },
  {
    id: 4,
    title: 'Hackathon Champions',
    description:
      '3 national-level hackathon wins. Not because we hack together demos, but because we ship real systems that judges can actually use.',
    icon: <Trophy size={22} />,
    colSpan: 1,
    rowSpan: 2,
    accentIndex: 0,
    tag: 'Track Record',
  },
  {
    id: 5,
    title: 'Real Projects, Real Users',
    description:
      'Our tools and libraries serve thousands of developers worldwide. Every member ships something that outlives their time here.',
    icon: <Globe size={22} />,
    colSpan: 2,
    rowSpan: 1,
    accentIndex: 1,
  },
];

/* ── Animation variants ──────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Single Bento Cell ───────────────────────────────────── */
function BentoCell({ cell }: { cell: BentoCell }) {
  const accents = [
    { color: 'var(--accent-primary)', glow: 'var(--accent-glow)' },
    { color: 'var(--accent-secondary)', glow: 'rgba(180,79,255,0.12)' },
    { color: 'var(--accent-tertiary)', glow: 'rgba(255,45,155,0.1)' },
  ];
  const accent = accents[cell.accentIndex];

  const colClass = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-3',
  }[cell.colSpan];

  const rowClass = {
    1: 'row-span-1',
    2: 'row-span-2',
  }[cell.rowSpan];

  return (
    <motion.div
      variants={cellVariants}
      className={`${colClass} ${rowClass} group relative rounded-2xl glass-strong overflow-hidden transform-gpu`}
      style={{ border: '1px solid var(--border-subtle)' }}
      whileHover={{
        y: -3,
        boxShadow: `0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px ${accent.color}30`,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Top border beam on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          animation: 'border-beam 2.5s linear infinite',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
        style={{ background: accent.color }}
      />

      {/* Background pattern for large cells */}
      {cell.large && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              var(--text-primary) 0,
              var(--text-primary) 1px,
              transparent 0,
              transparent 50%
            )`,
            backgroundSize: '20px 20px',
          }}
        />
      )}

      <div className={`relative z-10 h-full flex flex-col ${cell.large ? 'p-8 md:p-10' : 'p-6'}`}>
        {/* Tag */}
        {cell.tag && (
          <div
            className="mb-4 inline-flex items-center self-start px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest"
            style={{
              background: `${accent.color}12`,
              color: accent.color,
              border: `1px solid ${accent.color}25`,
            }}
          >
            {cell.tag}
          </div>
        )}

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
          style={{
            background: accent.glow,
            color: accent.color,
            border: `1px solid ${accent.color}25`,
          }}
        >
          {cell.icon}
        </div>

        {/* Title */}
        <h3
          className={`font-bold leading-tight mb-3 ${cell.large ? 'text-2xl md:text-3xl' : 'text-lg'}`}
        >
          {cell.title}
        </h3>

        {/* Description */}
        <p
          className={`leading-relaxed flex-1 ${cell.large ? 'text-base' : 'text-sm'}`}
          style={{ color: 'var(--text-muted)' }}
        >
          {cell.description}
        </p>

        {/* CTA */}
        {cell.cta && (
          <button
            className="flex items-center gap-2 text-sm font-semibold mt-6 group/btn transition-all duration-200"
            style={{ color: accent.color, fontFamily: 'var(--font-syne)' }}
          >
            {cell.cta}
            <ArrowRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Grid ────────────────────────────────────────────────── */
export function BentoGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(160px,auto)] gap-4 md:gap-5"
    >
      {CELLS.map((cell) => (
        <BentoCell key={cell.id} cell={cell} />
      ))}
    </motion.div>
  );
}
