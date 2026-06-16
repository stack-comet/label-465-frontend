'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from '@/components/common/ScrollReveal'
import Mandala from '@/components/decorative/Mandala'
import PaithaniPeacock from '@/components/decorative/PaithaniPeacock'

const STATS = [
  { value: '2024', label: 'Founded' },
  { value: 'India', label: 'Born Here' },
  { value: '10K+', label: 'Supporters' },
  { value: '∞', label: 'Ambition' },
]

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="py-24 lg:py-40 bg-[#050505] overflow-hidden relative">
      {/* Ambient mandala — top right corner, large and faint */}
      <div className="absolute -top-40 -right-40 pointer-events-none select-none hidden lg:block" aria-hidden>
        <Mandala size={600} opacity={0.04} animate />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Side */}
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold">
                  Who We Are
                </p>
                <span className="text-[10px] text-brand-gold/40 font-devanagari">·&nbsp;हम कौन हैं</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-8"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                WE ARE
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #B7AC34' }}>
                  46:5
                </span>
              </h2>
            </ScrollReveal>

            <div className="space-y-5">
              {[
                'Born from the chaos, color, and charisma of modern India — 46:5 is not just a streetwear brand. It\'s a cultural movement.',
                'We take the raw energy of India\'s streets — the language, the art, the rebellion, the hustle — and remix it with the finest global streetwear sensibility.',
                'Every piece we create carries the weight of a billion stories. Yours is one of them.',
              ].map((text, i) => (
                <ScrollReveal key={i} delay={0.2 + i * 0.1}>
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">{text}</p>
                </ScrollReveal>
              ))}
            </div>

            {/* Stats */}
            <ScrollReveal delay={0.5} className="mt-12">
              {/* Paithani peacock pair — Maharashtra's state bird motif */}
              <div className="flex items-center gap-3 mb-6">
                <PaithaniPeacock size={52} opacity={0.55} />
                <div className="flex-1 h-px bg-gradient-to-r from-brand-gold/30 to-transparent" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-brand-gold/35 font-devanagari">महाराष्ट्र</span>
                <div className="flex-1 h-px bg-gradient-to-l from-brand-gold/30 to-transparent" />
                <div className="scale-x-[-1]">
                  <PaithaniPeacock size={52} opacity={0.55} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 pt-10 border-t border-white/10">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-brand-gold">{stat.value}</div>
                    <div className="text-[9px] tracking-widest uppercase text-white/30 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Visual Side */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative h-[500px] lg:h-[700px] overflow-hidden">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Tags */}
              <div className="absolute top-6 left-6 bg-brand-gold text-black px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase">
                MADE IN INDIA
              </div>
              <div className="absolute bottom-6 right-6 border border-white/30 bg-black/60 backdrop-blur-sm px-4 py-3">
                <p className="text-[9px] tracking-widest uppercase text-white/60">Currently Dropping</p>
                <p className="text-sm font-bold mt-0.5">AZADI SS25</p>
              </div>
            </div>

            {/* Mehndi-style corner ornaments */}
            <div className="absolute -bottom-6 -left-6 hidden lg:block pointer-events-none" aria-hidden>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,80 L 0,0 L 80,0" stroke="#B7AC34" strokeWidth="0.6" strokeOpacity="0.35" />
                <path d="M 0,60 Q 20,60 20,40 Q 20,20 40,20" stroke="#B7AC34" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
                <circle cx="0" cy="0" r="4" fill="none" stroke="#B7AC34" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="0" cy="0" r="8" fill="none" stroke="#B7AC34" strokeWidth="0.3" strokeOpacity="0.2" />
                <polygon points="0,20 3,14 0,8 -3,14" fill="#B7AC34" fillOpacity="0.3" />
                <polygon points="20,0 14,3 8,0 14,-3" fill="#B7AC34" fillOpacity="0.3" />
                <circle cx="20" cy="20" r="2.5" fill="none" stroke="#B7AC34" strokeWidth="0.5" strokeOpacity="0.25" />
              </svg>
            </div>
            <div className="absolute -top-6 -right-6 hidden lg:block pointer-events-none rotate-180" aria-hidden>
              <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,80 L 0,0 L 80,0" stroke="#B7AC34" strokeWidth="0.6" strokeOpacity="0.2" />
                <path d="M 0,60 Q 20,60 20,40 Q 20,20 40,20" stroke="#B7AC34" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
                <circle cx="0" cy="0" r="4" fill="none" stroke="#B7AC34" strokeWidth="0.5" strokeOpacity="0.2" />
                <polygon points="0,20 3,14 0,8 -3,14" fill="#B7AC34" fillOpacity="0.15" />
                <polygon points="20,0 14,3 8,0 14,-3" fill="#B7AC34" fillOpacity="0.15" />
              </svg>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
