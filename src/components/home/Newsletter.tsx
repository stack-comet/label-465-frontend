'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/common/ScrollReveal'
import WarliStrip from '@/components/decorative/WarliStrip'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#B7AC34 1px, transparent 1px), linear-gradient(90deg, #B7AC34 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10"
        style={{ background: 'radial-gradient(ellipse, #B7AC34, transparent 70%)' }}
      />

      {/* Warli art strip — top of section (folk art border) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none select-none">
        <WarliStrip opacity={0.07} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold">
              Stay Connected
            </p>
            <span className="text-[10px] text-brand-gold/35 font-devanagari">· जुळून राहा</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            JOIN THE
            <br />
            MOVEMENT
          </h2>
          <p className="text-white/40 text-sm mb-10">
            First access to drops, exclusive collabs, and offers made for the culture.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-[#111] border border-white/20 border-r-0 px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-gold transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-brand-gold text-black px-6 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-2 justify-center shrink-0"
              >
                Subscribe <ArrowRight size={12} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 border border-brand-gold px-8 py-4"
            >
              <span className="text-brand-gold text-xl">✓</span>
              <p className="text-white font-medium">Welcome to the movement, fam.</p>
            </motion.div>
          )}
          <p className="text-white/20 text-xs mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
