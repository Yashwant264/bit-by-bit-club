'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram, Globe, Quote } from 'lucide-react';

/* ── Types (exported so page can import them) ───────────── */
export type AccentIndex = 0 | 1 | 2;

export interface Socials {
  github?:    string;
  twitter?:   string;
  linkedin?:  string;
  instagram?: string;
  website?:   string;
}

export interface Member {
  id:          number;
  name:        string;
  role:        string;
  year:        string;
  photo:       string;   // e.g. "/team/aryan-mehta.jpg"
  socials:     Socials;
  accentIndex: AccentIndex;
  message?:    string;   // only for leadership
}

/* ── Accent palette ─────────────────────────────────────── */
export const ACCENTS = [
  {
    color:  'var(--accent-primary)',
    glow:   'var(--accent-glow)',
    shadow: 'rgba(0,255,138,0.18)',
    rgb:    '0,255,138',
  },
  {
    color:  'var(--accent-secondary)',
    glow:   'rgba(180,79,255,0.14)',
    shadow: 'rgba(180,79,255,0.18)',
    rgb:    '180,79,255',
  },
  {
    color:  'var(--accent-tertiary)',
    glow:   'rgba(255,45,155,0.10)',
    shadow: 'rgba(255,45,155,0.16)',
    rgb:    '255,45,155',
  },
] as const;

/* ── Social icon map ─────────────────────────────────────── */
function SocialLink({
  href,
  icon,
  accentColor,
}: {
  href: string;
  icon: React.ReactNode;
  accentColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        color:      'var(--text-muted)',
        background: 'transparent',
        border:     '1px solid var(--border-subtle)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color       = accentColor;
        el.style.borderColor = accentColor + '60';
        el.style.background  = accentColor + '12';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color       = 'var(--text-muted)';
        el.style.borderColor = 'var(--border-subtle)';
        el.style.background  = 'transparent';
      }}
    >
      {icon}
    </a>
  );
}

function Socials({ socials, accentColor }: { socials: Socials; accentColor: string }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {socials.github    && <SocialLink href={socials.github}    icon={<Github    size={13} />} accentColor={accentColor} />}
      {socials.twitter   && <SocialLink href={socials.twitter}   icon={<Twitter   size={13} />} accentColor={accentColor} />}
      {socials.linkedin  && <SocialLink href={socials.linkedin}  icon={<Linkedin  size={13} />} accentColor={accentColor} />}
      {socials.instagram && <SocialLink href={socials.instagram} icon={<Instagram size={13} />} accentColor={accentColor} />}
      {socials.website   && <SocialLink href={socials.website}   icon={<Globe     size={13} />} accentColor={accentColor} />}
    </div>
  );
}

/* ── Avatar: photo or initials fallback ─────────────────── */
function Avatar({
  photo,
  name,
  size,
  accentColor,
  glowColor,
}: {
  photo:       string;
  name:        string;
  size:        'sm' | 'lg';
  accentColor: string;
  glowColor:   string;
}) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const dim = size === 'lg' ? 'w-24 h-24' : 'w-14 h-14';
  const txt = size === 'lg' ? 'text-2xl'  : 'text-base';

  return (
    <div
      className={`${dim} rounded-2xl overflow-hidden shrink-0 relative`}
      style={{
        border:     `1px solid ${accentColor}30`,
        background: glowColor,
        boxShadow:  `0 0 0 1px ${accentColor}15`,
      }}
    >
      {!imgError ? (
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
          sizes={size === 'lg' ? '96px' : '56px'}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-bold ${txt}`}
          style={{ color: accentColor, fontFamily: 'var(--font-syne)' }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LEADERSHIP CARD  (President / VP / GS)
   ══════════════════════════════════════════════════════════ */
export function LeadershipCard({
  member,
  index,
}: {
  member: Member;
  index:  number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),  { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]),  { stiffness: 180, damping: 22 });

  const accent = ACCENTS[member.accentIndex];

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width  - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onLeave() { mouseX.set(0); mouseY.set(0); setIsHovered(false); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-wrap"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="tilt-card relative rounded-2xl glass-strong overflow-hidden h-full"
        whileHover={{ boxShadow: `0 32px 80px ${accent.shadow}, 0 4px 20px rgba(0,0,0,0.3)` }}
        transition={{ duration: 0.25 }}
      >
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Ambient corner glow */}
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
          style={{ background: accent.color, opacity: isHovered ? 0.14 : 0.05 }}
        />

        {/* Role badge — top-right */}
        <div
          className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest"
          style={{
            background:   `${accent.color}15`,
            color:        accent.color,
            border:       `1px solid ${accent.color}30`,
          }}
        >
          {member.role}
        </div>

        <div className="relative z-10 p-7 md:p-8 flex flex-col gap-5 h-full">
          {/* Top row: avatar + basic info */}
          <div className="flex items-start gap-5">
            <Avatar
              photo={member.photo}
              name={member.name}
              size="lg"
              accentColor={accent.color}
              glowColor={accent.glow}
            />
            <div className="pt-1">
              <h3 className="text-xl md:text-2xl font-bold leading-tight mb-1">
                {member.name}
              </h3>
              <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                {member.year}
              </p>
              <div className="mt-3">
                <Socials socials={member.socials} accentColor={accent.color} />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, ${accent.color}30, transparent)` }}
          />

          {/* Quote / message */}
          {member.message && (
            <div className="flex gap-3 flex-1">
              <Quote
                size={18}
                className="shrink-0 mt-0.5"
                style={{ color: accent.color, opacity: 0.7 }}
              />
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: 'var(--text-secondary)' }}
              >
                {member.message}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   REGULAR MEMBER CARD  (Lead / Co-Lead / Core)
   ══════════════════════════════════════════════════════════ */
export function MemberCard({
  member,
  index,
}: {
  member: Member;
  index:  number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 24 });

  const accent = ACCENTS[member.accentIndex];

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width  - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onLeave() { mouseX.set(0); mouseY.set(0); setIsHovered(false); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-wrap"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="tilt-card relative rounded-xl glass-strong overflow-hidden"
        whileHover={{ boxShadow: `0 20px 60px ${accent.shadow}, 0 2px 12px rgba(0,0,0,0.25)` }}
        transition={{ duration: 0.22 }}
      >
        {/* Top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-400"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
            opacity: isHovered ? 1 : 0.3,
          }}
        />

        {/* Corner glow */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-600"
          style={{ background: accent.color, opacity: isHovered ? 0.1 : 0.03 }}
        />

        <div className="relative z-10 p-5 flex items-center gap-4">
          {/* Avatar */}
          <Avatar
            photo={member.photo}
            name={member.name}
            size="sm"
            accentColor={accent.color}
            glowColor={accent.glow}
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4
              className="font-bold text-base leading-tight truncate mb-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              {member.name}
            </h4>
            <p
              className="text-xs font-semibold mb-1 truncate"
              style={{ color: accent.color, fontFamily: 'var(--font-syne)' }}
            >
              {member.role}
            </p>
            <p
              className="text-xs font-mono truncate"
              style={{ color: 'var(--text-muted)' }}
            >
              {member.year}
            </p>
          </div>
        </div>

        {/* Socials footer */}
        <div
          className="relative z-10 px-5 pb-4 pt-0"
          style={{ borderTop: `1px solid var(--border-subtle)` }}
        >
          <div className="pt-3">
            <Socials socials={member.socials} accentColor={accent.color} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
