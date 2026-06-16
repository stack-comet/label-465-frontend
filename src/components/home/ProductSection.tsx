'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types'
import ProductCard from '@/components/shop/ProductCard'
import ScrollReveal from '@/components/common/ScrollReveal'

interface ProductSectionProps {
  title: string
  subtitle?: string
  label?: string
  products: Product[]
  href: string
}

export default function ProductSection({
  title,
  subtitle,
  label,
  products,
  href,
}: ProductSectionProps) {
  return (
    <section className="py-24 lg:py-32 px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
      <ScrollReveal className="mb-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            {label && (
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">
                {label}
              </p>
            )}
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/40 text-sm mt-2 max-w-md">{subtitle}</p>
            )}
          </div>
          <Link
            href={href}
            className="group flex items-center gap-2 text-xs tracking-widest uppercase text-white/60 hover:text-brand-gold transition-colors"
          >
            View All
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-14">
        {products.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.08}>
            <ProductCard product={product} priority={i < 4} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
