'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X, TrendingUp, Clock } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/utils'

const TRENDING = ['Azadi Tee', 'Mumbai Cargo', 'Bombay Hoodie', 'Coord Set']
const RECENT = ['Black Hoodie', 'Cargo Pants', 'Sacred Cap']

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.length > 1
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : []

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isSearchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        useUIStore.getState().toggleSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSearch])

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 md:pt-32 px-4"
          onClick={(e) => e.target === e.currentTarget && closeSearch()}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-[#111] border border-white/10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
              <Search size={18} className="text-brand-gold shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-base outline-none"
              />
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-xs text-white/20 border border-white/10 px-2 py-1">
                  ESC
                </span>
                <button onClick={closeSearch} className="text-white/40 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.length > 1 ? (
                results.length > 0 ? (
                  <div>
                    <p className="px-5 py-3 text-[10px] tracking-widest uppercase text-white/30">
                      {results.length} Result{results.length > 1 ? 's' : ''}
                    </p>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/shop/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="relative w-12 h-14 bg-[#1A1A1A] shrink-0">
                          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-white/40">{product.category}</p>
                        </div>
                        <span className="text-sm font-semibold text-white shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={`/shop?search=${query}`}
                      onClick={closeSearch}
                      className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-brand-gold hover:text-white transition-colors border-t border-white/10"
                    >
                      View all results for "{query}"
                    </Link>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-white/40 text-sm">No results for "{query}"</p>
                    <p className="text-white/20 text-xs mt-1">Try a different search term</p>
                  </div>
                )
              ) : (
                <div className="p-5 space-y-6">
                  {/* Trending */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={12} className="text-brand-gold" />
                      <span className="text-[10px] tracking-widest uppercase text-white/40">Trending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/70 hover:border-brand-gold hover:text-brand-gold transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={12} className="text-white/40" />
                      <span className="text-[10px] tracking-widest uppercase text-white/40">Recent Searches</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {RECENT.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="text-left px-2 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
