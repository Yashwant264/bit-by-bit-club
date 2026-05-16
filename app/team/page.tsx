'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Palette,
  CalendarDays,
  DollarSign,
  Megaphone,
  Share2,
  Code2,
  Users,
  ChevronRight,
} from 'lucide-react';
import { LeadershipCard, MemberCard } from '@/app/team/TeamCard';
import type { Member } from '@/app/team/TeamCard';

/* ══════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════ */

/* ── Core Leadership ────────────────────────────────────── */
const LEADERSHIP: Member[] = [
  {
    id: 1,
    name: 'Aryan Mehta',
    role: 'President',
    year: 'Final Year · CSE',
    photo: '/team/aryan-mehta.jpg',
    accentIndex: 0,
    socials: { github: '#', linkedin: '#', twitter: '#' },
    message:
      'Bit by Bit is not a club — it is a standard. We build software that ships, systems that scale, and engineers who lead. Every member who walks in leaves as something the industry actually needs.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Vice President',
    year: 'Third Year · CSE-AI',
    photo: '/team/priya-sharma.jpg',
    accentIndex: 1,
    socials: { github: '#', linkedin: '#', twitter: '#' },
    message:
      'AI is not a feature you bolt on. We treat it as a core discipline — fine-tuning, inference pipelines, sovereign models. Our members understand the stack from the GPU up.',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    role: 'General Secretary',
    year: 'Third Year · IT',
    photo: '/team/rohan-verma.jpg',
    accentIndex: 2,
    socials: { github: '#', linkedin: '#', instagram: '#' },
    message:
      'The best clubs run like startups — tight operations, ambitious goals, zero bureaucracy. My job is to make sure nothing slows us down from building things that matter.',
  },
];

/* ── Department types ───────────────────────────────────── */
type RoleTier = 'Lead' | 'Co-Lead' | 'Core Member';

interface DeptMember extends Member {
  tier: RoleTier;
}

interface Department {
  id: string;
  label: string;
  icon: React.ReactNode;
  members: DeptMember[];
}

/* ── Departments ────────────────────────────────────────── */
const DEPARTMENTS: Department[] = [
  {
    id: 'technical',
    label: 'Technical',
    icon: <Code2 size={15} />,
    members: [
      { id: 101, name: 'Sneha Iyer', role: 'Technical Lead', tier: 'Lead', year: 'Final Year · CSE', photo: '/team/sneha-iyer.jpg', accentIndex: 0, socials: { github: '#', linkedin: '#' } },
      { id: 102, name: 'Dev Patel', role: 'Technical Co-Lead', tier: 'Co-Lead', year: 'Third Year · CSE', photo: '/team/dev-patel.jpg', accentIndex: 1, socials: { github: '#', twitter: '#' } },
      { id: 103, name: 'Kavya Nair', role: 'Core Member', tier: 'Core Member', year: 'Third Year · CSE', photo: '/team/kavya-nair.jpg', accentIndex: 2, socials: { github: '#', linkedin: '#' } },
      { id: 104, name: 'Aditya Rao', role: 'Core Member', tier: 'Core Member', year: 'Second Year · IT', photo: '/team/aditya-rao.jpg', accentIndex: 0, socials: { github: '#' } },
      { id: 105, name: 'Neha Krishnan', role: 'Core Member', tier: 'Core Member', year: 'Second Year · CSE', photo: '/team/neha-krishnan.jpg', accentIndex: 1, socials: { github: '#', linkedin: '#' } },
      { id: 106, name: 'Siddharth Roy', role: 'Core Member', tier: 'Core Member', year: 'First Year · CSE-AI', photo: '/team/siddharth-roy.jpg', accentIndex: 2, socials: { github: '#' } },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: <Palette size={15} />,
    members: [
      { id: 201, name: 'Ishaan Kapoor', role: 'Design Lead', tier: 'Lead', year: 'Third Year · IT', photo: '/team/ishaan-kapoor.jpg', accentIndex: 1, socials: { instagram: '#', linkedin: '#' } },
      { id: 202, name: 'Tanvi Mehrotra', role: 'Design Co-Lead', tier: 'Co-Lead', year: 'Second Year · CSE', photo: '/team/tanvi-mehrotra.jpg', accentIndex: 2, socials: { instagram: '#' } },
      { id: 203, name: 'Yash Agarwal', role: 'Core Member', tier: 'Core Member', year: 'Second Year · IT', photo: '/team/yash-agarwal.jpg', accentIndex: 0, socials: { instagram: '#', twitter: '#' } },
      { id: 204, name: 'Ananya Singh', role: 'Core Member', tier: 'Core Member', year: 'First Year · CSE', photo: '/team/ananya-singh.jpg', accentIndex: 1, socials: { instagram: '#' } },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: <FileText size={15} />,
    members: [
      { id: 301, name: 'Meera Pillai', role: 'Content Lead', tier: 'Lead', year: 'Third Year · ECE', photo: '/team/meera-pillai.jpg', accentIndex: 2, socials: { linkedin: '#', twitter: '#' } },
      { id: 302, name: 'Vivek Sharma', role: 'Content Co-Lead', tier: 'Co-Lead', year: 'Second Year · CSE', photo: '/team/vivek-sharma.jpg', accentIndex: 0, socials: { linkedin: '#' } },
      { id: 303, name: 'Ritika Bose', role: 'Core Member', tier: 'Core Member', year: 'Second Year · IT', photo: '/team/ritika-bose.jpg', accentIndex: 1, socials: { twitter: '#' } },
      { id: 304, name: 'Aman Dubey', role: 'Core Member', tier: 'Core Member', year: 'First Year · CSE', photo: '/team/aman-dubey.jpg', accentIndex: 2, socials: { linkedin: '#' } },
    ],
  },
  {
    id: 'events',
    label: 'Event Management',
    icon: <CalendarDays size={15} />,
    members: [
      { id: 401, name: 'Kunal Thakur', role: 'Events Lead', tier: 'Lead', year: 'Final Year · MBA-Tech', photo: '/team/kunal-thakur.jpg', accentIndex: 0, socials: { linkedin: '#', instagram: '#' } },
      { id: 402, name: 'Pooja Rangarajan', role: 'Events Co-Lead', tier: 'Co-Lead', year: 'Third Year · CSE', photo: '/team/pooja-rangarajan.jpg', accentIndex: 1, socials: { linkedin: '#' } },
      { id: 403, name: 'Nikhil Gupta', role: 'Core Member', tier: 'Core Member', year: 'Second Year · ECE', photo: '/team/nikhil-gupta.jpg', accentIndex: 2, socials: { instagram: '#' } },
      { id: 404, name: 'Shreya Jain', role: 'Core Member', tier: 'Core Member', year: 'Second Year · IT', photo: '/team/shreya-jain.jpg', accentIndex: 0, socials: { instagram: '#' } },
      { id: 405, name: 'Om Prakash', role: 'Core Member', tier: 'Core Member', year: 'First Year · CSE', photo: '/team/om-prakash.jpg', accentIndex: 1, socials: { linkedin: '#' } },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: <DollarSign size={15} />,
    members: [
      { id: 501, name: 'Rahul Bansal', role: 'Finance Lead', tier: 'Lead', year: 'Final Year · CSE', photo: '/team/rahul-bansal.jpg', accentIndex: 1, socials: { linkedin: '#' } },
      { id: 502, name: 'Divya Choudhary', role: 'Finance Co-Lead', tier: 'Co-Lead', year: 'Third Year · IT', photo: '/team/divya-choudhary.jpg', accentIndex: 2, socials: { linkedin: '#' } },
      { id: 503, name: 'Karan Malhotra', role: 'Core Member', tier: 'Core Member', year: 'Second Year · CSE', photo: '/team/karan-malhotra.jpg', accentIndex: 0, socials: { linkedin: '#' } },
    ],
  },
  {
    id: 'pr',
    label: 'PR & Outreach',
    icon: <Megaphone size={15} />,
    members: [
      { id: 601, name: 'Simran Kaur', role: 'PR Lead', tier: 'Lead', year: 'Third Year · CSE', photo: '/team/simran-kaur.jpg', accentIndex: 2, socials: { linkedin: '#', twitter: '#' } },
      { id: 602, name: 'Arjun Nambiar', role: 'PR Co-Lead', tier: 'Co-Lead', year: 'Second Year · ECE', photo: '/team/arjun-nambiar.jpg', accentIndex: 0, socials: { linkedin: '#' } },
      { id: 603, name: 'Fiona DSouza', role: 'Core Member', tier: 'Core Member', year: 'Second Year · CSE', photo: '/team/fiona-dsouza.jpg', accentIndex: 1, socials: { linkedin: '#', instagram: '#' } },
      { id: 604, name: 'Varun Sethi', role: 'Core Member', tier: 'Core Member', year: 'First Year · IT', photo: '/team/varun-sethi.jpg', accentIndex: 2, socials: { linkedin: '#' } },
    ],
  },
  {
    id: 'social',
    label: 'Social Media',
    icon: <Share2 size={15} />,
    members: [
      { id: 701, name: 'Aisha Khan', role: 'Social Media Lead', tier: 'Lead', year: 'Third Year · IT', photo: '/team/aisha-khan.jpg', accentIndex: 0, socials: { instagram: '#', twitter: '#', linkedin: '#' } },
      { id: 702, name: 'Rishi Tripathi', role: 'Social Media Co-Lead', tier: 'Co-Lead', year: 'Second Year · CSE', photo: '/team/rishi-tripathi.jpg', accentIndex: 1, socials: { instagram: '#', twitter: '#' } },
      { id: 703, name: 'Prachi Sood', role: 'Core Member', tier: 'Core Member', year: 'Second Year · ECE', photo: '/team/prachi-sood.jpg', accentIndex: 2, socials: { instagram: '#' } },
      { id: 704, name: 'Manav Ahuja', role: 'Core Member', tier: 'Core Member', year: 'First Year · CSE', photo: '/team/manav-ahuja.jpg', accentIndex: 0, socials: { instagram: '#', linkedin: '#' } },
    ],
  },
];

const TOTAL_MEMBERS =
  LEADERSHIP.length +
  DEPARTMENTS.reduce((acc, d) => acc + d.members.length, 0);

/* ══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════ */

function TierHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="text-xs font-mono uppercase tracking-widest font-semibold shrink-0"
        style={{ color: 'var(--accent-primary)' }}
      >
        {label}
      </span>
      <span
        className="text-xs font-mono px-2 py-0.5 rounded-full shrink-0"
        style={{
          background: 'var(--accent-glow)',
          color: 'var(--accent-primary)',
          border: '1px solid var(--border-accent)',
        }}
      >
        {count}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
    </div>
  );
}

function DeptTab({
  dept,
  active,
  onClick,
}: {
  dept: Department;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-left group"
      style={{
        background: active ? 'var(--accent-glow)' : 'transparent',
        color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
        border: active ? '1px solid var(--border-accent)' : '1px solid transparent',
        fontFamily: 'var(--font-syne)',
        fontWeight: 600,
        fontSize: '0.8rem',
        transition: 'all 0.2s ease',
      }}
    >
      <span className="shrink-0">{dept.icon}</span>
      <span className="flex-1 truncate">{dept.label}</span>
      <span
        className="text-xs font-mono shrink-0"
        style={{ opacity: 0.6 }}
      >
        {dept.members.length}
      </span>
      <ChevronRight
        size={13}
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ opacity: active ? 1 : 0.35 }}
      />
    </button>
  );
}

function DeptPanel({ dept }: { dept: Department }) {
  const leads = dept.members.filter((m) => m.tier === 'Lead');
  const coLeads = dept.members.filter((m) => m.tier === 'Co-Lead');
  const cores = dept.members.filter((m) => m.tier === 'Core Member');

  return (
    <motion.div
      key={dept.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {/* Dept header */}
      <div className="flex items-center gap-3 pb-1">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'var(--accent-glow)',
            color: 'var(--accent-primary)',
            border: '1px solid var(--border-accent)',
          }}
        >
          {dept.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold leading-none" style={{ fontFamily: 'var(--font-syne)' }}>
            {dept.label}
          </h3>
          <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {dept.members.length} member{dept.members.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {leads.length > 0 && (
        <div>
          <TierHeading label="Lead" count={leads.length} />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {leads.map((m, i) => <MemberCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      )}

      {coLeads.length > 0 && (
        <div>
          <TierHeading label="Co-Lead" count={coLeads.length} />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {coLeads.map((m, i) => <MemberCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      )}

      {cores.length > 0 && (
        <div>
          <TierHeading label="Core Members" count={cores.length} />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {cores.map((m, i) => <MemberCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function TeamPage() {
  const [activeDeptId, setActiveDeptId] = useState<string>(DEPARTMENTS[0].id);
  const activeDept = DEPARTMENTS.find((d) => d.id === activeDeptId) ?? DEPARTMENTS[0];

  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        <div
          className="hero-blur-orb w-[520px] h-[520px]"
          style={{ background: 'var(--accent-tertiary)', top: '-20%', left: '-10%', opacity: 0.08 }}
        />
        <div
          className="hero-blur-orb w-[380px] h-[380px]"
          style={{ background: 'var(--accent-secondary)', bottom: '-10%', right: '-8%', opacity: 0.07, animationDelay: '3s' }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="badge mb-6">
              <Users size={10} />
              {TOTAL_MEMBERS} Members · {DEPARTMENTS.length} Departments
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] mb-5">
              The Minds
              <br />
              <span className="neon-text">Behind the Code.</span>
            </h1>
            <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Not students. Engineers, designers, strategists, and storytellers — united
              by the obsession to build things that matter beyond these walls.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CORE LEADERSHIP ─────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-xs font-mono uppercase tracking-widest font-semibold shrink-0"
              style={{ color: 'var(--accent-primary)' }}
            >
              Core Leadership
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {LEADERSHIP.map((leader, i) => (
              <LeadershipCard key={leader.id} member={leader} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ─────────────────────────────────── */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-xs font-mono uppercase tracking-widest font-semibold shrink-0"
              style={{ color: 'var(--accent-primary)' }}
            >
              Departments
            </span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </motion.div>

          {/* Mobile: horizontal pill tabs */}
          <div className="lg:hidden mb-6 -mx-1 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 px-1 w-max pb-1">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDeptId(dept.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    background: activeDeptId === dept.id ? 'var(--accent-primary)' : 'var(--bg-glass)',
                    color: activeDeptId === dept.id ? 'var(--bg-primary)' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {dept.icon}
                  {dept.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: sidebar + panel */}
          <div className="flex gap-6 items-start">

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-2 w-56 shrink-0 sticky top-28"
            >
              <div className="glass-strong rounded-2xl p-2 flex flex-col gap-0.5">
                {DEPARTMENTS.map((dept) => (
                  <DeptTab
                    key={dept.id}
                    dept={dept}
                    active={activeDeptId === dept.id}
                    onClick={() => setActiveDeptId(dept.id)}
                  />
                ))}
              </div>

              {/* Live count chip */}
              <div className="glass rounded-2xl p-4 text-center">
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--accent-primary)' }}
                >
                  {activeDept.members.length}
                </p>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  in {activeDept.label}
                </p>
              </div>
            </motion.aside>

            {/* Main panel */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <DeptPanel key={activeDeptId} dept={activeDept} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ─────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-10 md:p-16 text-center border-beam-wrap relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'var(--accent-primary)', opacity: 0.06 }}
            />
            <div className="badge mb-5 mx-auto inline-flex">Open Recruitment</div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold mb-4 leading-tight">
              Think you belong here?
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              We recruit based on what you have built — not your GPA. Show us your GitHub,
              your projects, your hunger. That is the only criteria.
            </p>
            <button className="btn-magnetic btn-primary">
              Apply for Membership
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
