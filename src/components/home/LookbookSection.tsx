'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ScrollReveal from '@/components/common/ScrollReveal'
import PaithaniPeacock from '@/components/decorative/PaithaniPeacock'

const LOOKBOOK_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', span: '' },
  { src: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80', span: '' },
]

export default function LookbookSection() {
  return (
    <section className="py-24 lg:py-32 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
      <ScrollReveal className="mb-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-6">
            {/* Paithani peacock — Maharashtra's iconic saree motif */}
            <div className="hidden md:block shrink-0">
              <PaithaniPeacock size={110} opacity={0.75} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold">
                  SS25
                </p>
                <span className="text-[10px] text-brand-gold/35 font-devanagari tracking-wide">· पैठणी संग्रह</span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-black tracking-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                AZADI LOOKBOOK
              </h2>
            </div>
          </div>
          <Link
            href="/about"
            className="group flex items-center gap-2 border border-white/20 hover:border-brand-gold px-5 py-3 text-xs tracking-widest uppercase text-white/60 hover:text-brand-gold transition-all"
          >
            Full Lookbook
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
        {LOOKBOOK_IMAGES.map((img, i) => (
          <ScrollReveal
            key={i}
            delay={i * 0.08}
            className={`group relative overflow-hidden bg-[#111] cursor-pointer ${img.span}`}
          >
            <Image
              src={img.src}
              alt={`Lookbook ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="border border-white/50 text-white text-[10px] tracking-widest uppercase px-4 py-2 backdrop-blur-sm"
              >
                EXPLORE LOOK
              </motion.div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
