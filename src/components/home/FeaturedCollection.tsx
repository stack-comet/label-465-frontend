'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COLLECTIONS } from '@/data/products'
import ScrollReveal from '@/components/common/ScrollReveal'

export default function FeaturedCollection() {
  return (
    <section className="py-24 lg:py-32 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
      <ScrollReveal className="mb-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">
              Collections
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              THE UNIVERSE
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-xs tracking-widest uppercase text-white/60 hover:text-brand-gold transition-colors"
          >
            View All
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {COLLECTIONS.map((collection, i) => (
          <ScrollReveal key={collection.id} delay={i * 0.15}>
            <Link
              href={`/shop?collection=${collection.slug}`}
              className="group relative block overflow-hidden"
            >
              <div
                className={`relative bg-[#111] overflow-hidden ${
                  i === 0 ? 'aspect-[3/4]' : 'aspect-[3/4]'
                }`}
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-2">
                    {collection.season}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight text-white mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-white/50 mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{collection.productCount} pieces</span>
                    <motion.div
                      className="flex items-center gap-2 text-xs text-white font-semibold tracking-widest uppercase group-hover:text-brand-gold transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      EXPLORE <ArrowRight size={12} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
