'use client';

import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Syne } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/Navbar';
import { CursorFollower } from '@/components/CursorFollower';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { ParallaxProvider } from 'react-scroll-parallax';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bit by Bit — VIT Bhopal Technical Club</title>
        <meta name="description" content="Elite technical incubator at VIT Bhopal. Production-grade engineering, AI sovereignty, and open-source excellence." />
      </head>
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ParallaxProvider>
          <SmoothScroll />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            {/* Grainy texture overlay */}
            <div className="grain-overlay" aria-hidden="true" />
            {/* Digital mesh background */}
            <div className="mesh-bg" aria-hidden="true" />
            <CursorFollower />
            <Navbar />
            <main className="relative z-10">
              {children}
            </main>
          </ThemeProvider>
        </ParallaxProvider>
      </body>
    </html>
  );
}
