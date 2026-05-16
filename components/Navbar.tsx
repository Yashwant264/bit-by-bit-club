'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Home, CalendarDays, Users, Menu, X, Cpu } from 'lucide-react';

/* ── Nav Links ───────────────────────────────────────────── */
const NAV_LINKS = [
  { href: '/', label: 'Home', icon: <Home size={18} /> },
  { href: '/events', label: 'Events', icon: <CalendarDays size={18} /> },
  { href: '/team', label: 'Team', icon: <Users size={18} /> },
];

/* ── Theme Toggle Button ─────────────────────────────────── */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === 'dark';

  function toggle() {
    // Trigger reboot-like transition
    document.documentElement.classList.add('theme-transitioning');
    setTheme(isDark ? 'light' : 'dark');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 700);
  }

  return (
    <motion.button
      onClick={toggle}
      className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-300"
      style={{
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, rotate: 15 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          style={{ color: isDark ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Mobile Bottom Dock ──────────────────────────────────── */
function BottomDock({ pathname }: { pathname: string }) {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="md:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center px-6"
    >
      <div
        className="flex items-center gap-1 px-3 py-2.5 rounded-2xl"
        style={{
          background: 'var(--navbar-bg)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300"
                style={{
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                }}
              >
                {link.icon}
                <span className="text-[10px] font-mono font-medium leading-none">
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-xl"
                    style={{ border: '1px solid var(--border-accent)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
        <div className="w-px h-8 mx-1" style={{ background: 'var(--border-subtle)' }} />
        <div className="px-2">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}

/* ── Desktop Dynamic Island Navbar ───────────────────────── */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-5 left-0 right-0 z-50 justify-center px-6"
      >
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-500"
          style={{
            background: 'var(--navbar-bg)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid var(--border-subtle)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.2), 0 0 0 1px var(--border-subtle)'
              : 'none',
          }}
          animate={{
            width: scrolled ? 'auto' : 'auto',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Bit By Bit Logo"
              width={50}
              height={50}
              className="object-contain"
            />

            <span className="text-xl font-bold">
              Bit By Bit
            </span>
          </div>

          {/* Separator */}
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-subtle)' }} />

          {/* Nav links */}
          <nav className="flex items-center gap-1 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,255,150,0.15)]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                    }}
                    whileHover={{ color: 'var(--text-primary)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'var(--accent-glow)',
                          border: '1px solid var(--border-accent)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Separator */}
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-subtle)' }} />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.a
              href="#"
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-syne)',
                background: 'var(--accent-primary)',
                color: 'var(--bg-primary)',
                letterSpacing: '0.03em',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Club
            </motion.a>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Bottom Dock */}
      <BottomDock pathname={pathname} />
    </>
  );
}