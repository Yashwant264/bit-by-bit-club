# Bit by Bit — VIT Bhopal Technical Club
## Beast-Level Next.js 14 Platform

---

## 🚀 Setup (One Command)

```bash
# 1. Enter the project
cd bit-by-bit

# 2. Install ALL dependencies
npm install framer-motion lucide-react clsx tailwind-merge next-themes

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 File Structure

```
bit-by-bit/
├── app/
│   ├── layout.tsx          ← Root layout: ThemeProvider, fonts, grainy overlay
│   ├── globals.css         ← Full theme system (VOID dark + ONYX light)
│   ├── page.tsx            ← Home: Parallax Hero, Stats, Bento, CTA
│   ├── events/
│   │   └── page.tsx        ← Events gallery with border-beam neon cards
│   └── team/
│       └── page.tsx        ← Team showcase with 3D perspective tilt cards
├── components/
│   ├── Navbar.tsx          ← Dynamic Island (desktop) + Bottom Dock (mobile)
│   ├── BentoGrid.tsx       ← Broken-grid About section with stagger animations
│   ├── AnimatedCounter.tsx ← Hook-based counter with cubic-bezier easing
│   └── CursorFollower.tsx  ← Liquid-follow dual-layer cursor
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 Dual Theme System

| Feature | VOID (Dark) | ONYX (Light) |
|---|---|---|
| Background | Ultra-dark (#030308) | Warm architectural (#F0EDE8) |
| Accent | Toxic Green (#00FF8A) | Burnt Orange (#E8441A) |
| Secondary | Deep Purple (#B44FFF) | Electric Indigo (#1A1AE8) |
| Tertiary | Cyber Pink (#FF2D9B) | Jade (#0A8A5A) |
| Toggle feel | "System reboot" 600ms transition | Same |

---

## ⚡ Performance Architecture

- **Hardware acceleration**: Every animation uses `transform-gpu`, `will-change`, and `backface-visibility: hidden`
- **Spring physics**: Framer Motion springs for magnetic buttons, 3D tilt, liquid cursor
- **Scroll-linked**: Hero parallax uses `useScroll` + `useTransform` + `useSpring`
- **Lazy entrance**: All sections use `whileInView` with `once: true`
- **60fps target**: No layout-triggering properties animated (only transform + opacity)

---

## 🔧 Key Features

- **Dynamic Island Navbar**: Morphs width on scroll, active route indicator with `layoutId`
- **Mobile Bottom Dock**: Haptic-style icon dock, replaces navbar on mobile
- **Liquid Cursor**: Dual-layer cursor with loose spring trail + tight dot
- **Magnetic Buttons**: Mouse-position spring attraction on all CTAs
- **3D Tilt Cards**: Full perspective transform with glare reflection on team cards
- **Border Beam**: Animated gradient border on card hover
- **Animated Counter**: RAF-based counter with ease-out-expo curve
- **Grainy Overlay**: SVG turbulence filter animated texture
- **Digital Mesh**: CSS grid + radial gradient background system

---

Built with 🔥 by Bit by Bit × Claude
