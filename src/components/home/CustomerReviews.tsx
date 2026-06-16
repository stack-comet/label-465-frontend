'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { REVIEWS } from '@/data/mockData'
import StarRating from '@/components/common/StarRating'
import ScrollReveal from '@/components/common/ScrollReveal'

export default function CustomerReviews() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = () => {
    setDirection(1)
    setCurrent((i) => (i + 1) % REVIEWS.length)
  }
  const prev = () => {
    setDirection(-1)
    setCurrent((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  const review = REVIEWS[current]

  return (
    <section className="py-24 lg:py-32 bg-[#070707]">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <ScrollReveal className="mb-16 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">
            What They Say
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            THE STREETS SPEAK
          </h2>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Main Review */}
          <div className="relative overflow-hidden min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center text-center px-4"
              >
                <Quote size={32} className="text-brand-gold/30 mb-6" />
                <p className="text-lg md:text-xl text-white/80 leading-relaxed italic mb-8">
                  "{review.comment}"
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-gold/30">
                    <Image src={review.avatar} alt={review.user} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.user}</p>
                    <p className="text-xs text-white/40">{review.location} · {review.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    {review.verified && (
                      <span className="text-[9px] tracking-widest uppercase text-brand-gold">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-0.5 transition-all duration-300 ${
                    i === current ? 'w-8 bg-brand-gold' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
