'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Mandala from '@/components/decorative/Mandala'
import WarliStrip from '@/components/decorative/WarliStrip'

const HEADLINE_WORDS = ['BORN', 'FROM', 'THE', 'STREETS']

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const wordAnim = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #000 0%, #0d0d0d 40%, #1a1200 100%)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#B7AC34 1px, transparent 1px), linear-gradient(90deg, #B7AC34 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #B7AC34 0%, transparent 70%)',
          }}
        />

        {/* Rotating mandala — traditional Indian sacred geometry */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <Mandala size={900} opacity={0.045} animate />
        </div>

        {/* Counter-rotating smaller mandala — inner ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ animation: 'mandala-spin-reverse 90s linear infinite' }}
        >
          <Mandala size={480} opacity={0.035} />
        </div>

        {/* Warli art strip — bottom of hero, traditional folk art silhouette */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
          <WarliStrip opacity={0.055} />
        </div>
      </motion.div>

      {/* Vertical Label */}
      <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-brand-gold/30" />
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 [writing-mode:vertical-rl]">
          SS25 COLLECTION
        </span>
        <div className="w-px h-16 bg-brand-gold/30" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full px-4 md:px-8 lg:px-24 xl:px-32 pt-32 pb-20"
      >
        {/* Marathi tagline — मुंबईच्या रस्त्यांवर जन्मलो */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="flex items-center gap-3 mb-5"
        >
          {/* Tiny Warli dancer inline accent */}
          <svg width="18" height="22" viewBox="-14 -22 28 28" aria-hidden className="opacity-40 shrink-0">
            <g stroke="#B7AC34" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="0" cy="-17" r="3.5" />
              <polygon points="0,0 -7,-9 7,-9" />
              <polygon points="-6,0 6,0 0,8" />
              <line x1="-7" y1="-9" x2="-12" y2="-14" />
              <line x1="7" y1="-9" x2="12" y2="-14" />
              <line x1="-6" y1="0" x2="-9" y2="8" />
              <line x1="6" y1="0" x2="9" y2="8" />
            </g>
          </svg>
          <p className="text-[11px] text-brand-gold/50 tracking-[0.18em] font-devanagari">
            मुंबईच्या रस्त्यांवर जन्मलो
          </p>
          <svg width="18" height="22" viewBox="-14 -22 28 28" aria-hidden className="opacity-40 shrink-0 scale-x-[-1]">
            <g stroke="#B7AC34" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="0" cy="-17" r="3.5" />
              <polygon points="0,0 -7,-9 7,-9" />
              <polygon points="-6,0 6,0 0,8" />
              <line x1="-7" y1="-9" x2="-12" y2="-14" />
              <line x1="7" y1="-9" x2="12" y2="-14" />
              <line x1="-6" y1="0" x2="-9" y2="8" />
              <line x1="6" y1="0" x2="9" y2="8" />
            </g>
          </svg>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-3 border border-brand-gold/40 px-4 py-2 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-medium">
            SS25 — AZADI COLLECTION
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <h1 className="text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[10vw] font-black leading-none tracking-tighter">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.div
                key={word}
                variants={wordAnim}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className={`block ${i % 2 === 1 ? 'text-transparent stroke-text ml-[5vw] lg:ml-[8vw]' : 'text-white'}`}
                style={
                  i % 2 === 1
                    ? {
                        WebkitTextStroke: '2px rgba(183, 172, 52, 0.6)',
                        color: 'transparent',
                      }
                    : {}
                }
              >
                {word}
              </motion.div>
            ))}
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          <div className="max-w-sm">
            <p className="text-brand-gold text-xs tracking-[0.3em] uppercase font-medium mb-3">
              India's Premier Streetwear Movement
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Where Desi identity meets global streetwear. Unapologetic. Bold. Forever repping the streets of India.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop"
              className="group flex items-center gap-3 bg-brand-gold text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-300"
            >
              Shop Now
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-gold/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-20 right-6 lg:right-12 z-10 hidden lg:flex flex-col gap-6"
      >
        {[
          { value: '24+', label: 'Styles' },
          { value: '10K+', label: 'Fans' },
          { value: '4.8★', label: 'Rated' },
        ].map((stat) => (
          <div key={stat.label} className="text-right">
            <div className="text-xl font-black text-white">{stat.value}</div>
            <div className="text-[9px] tracking-widest uppercase text-white/30">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
