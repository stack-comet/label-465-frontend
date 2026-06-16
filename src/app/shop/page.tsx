'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Grid3X3, Grid2X2, X } from 'lucide-react'
import { PRODUCTS, CATEGORIES, SORT_OPTIONS } from '@/data/products'
import { Product } from '@/types'
import ProductCard from '@/components/shop/ProductCard'
import SkeletonCard from '@/components/shop/SkeletonCard'
import { useFilterStore } from '@/store/filterStore'
import { formatPrice } from '@/lib/utils'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size']

function ShopContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [gridCols, setGridCols] = useState(4)
  const [showFilters, setShowFilters] = useState(false)

  const {
    selectedCategories, selectedSizes, sortBy,
    toggleCategory, toggleSize, setSortBy,
    priceRange, setPriceRange, resetFilters, hasActiveFilters,
    searchQuery,
  } = useFilterStore()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Apply URL params
  useEffect(() => {
    const cat = searchParams.get('category')
    const filter = searchParams.get('filter')
    if (cat) {
      const normalized = cat.charAt(0).toUpperCase() + cat.slice(1)
      if (!selectedCategories.includes(normalized)) toggleCategory(normalized)
    }
  }, [searchParams])

  const filtered = PRODUCTS.filter((p) => {
    const catMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category)
    const sizeMatch = selectedSizes.length === 0 || p.sizes.some((s) => selectedSizes.includes(s))
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
    const searchMatch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const newFilter = searchParams.get('filter') === 'new' ? p.isNew : true
    const bsFilter = searchParams.get('filter') === 'bestseller' ? p.isBestSeller : true
    return catMatch && sizeMatch && priceMatch && searchMatch && newFilter && bsFilter
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return b.isNew ? 1 : -1
      case 'price-asc': return a.price - b.price
      case 'price-desc': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'bestseller': return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
      default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    }
  })

  return (
    <div className="min-h-screen pt-36">
      {/* Header */}
      <div className="border-b border-white/10 px-4 md:px-8 lg:px-12 pb-6 max-w-[1600px] mx-auto">
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-2">
          Shop
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          ALL PRODUCTS
        </h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between py-5 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs tracking-widest uppercase hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              <SlidersHorizontal size={13} />
              Filters
              {hasActiveFilters() && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />}
            </button>

            {/* Category Pills */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => cat === 'All' ? resetFilters() : toggleCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] tracking-widest uppercase border transition-all ${
                    (cat === 'All' && selectedCategories.length === 0) || selectedCategories.includes(cat)
                      ? 'bg-brand-gold border-brand-gold text-black font-bold'
                      : 'border-white/20 text-white/60 hover:border-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Active filter chips */}
            {selectedSizes.map((size) => (
              <span
                key={size}
                className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 text-[10px] uppercase"
              >
                {size}
                <button onClick={() => toggleSize(size)} className="hover:text-brand-gold">
                  <X size={10} />
                </button>
              </span>
            ))}

            {hasActiveFilters() && (
              <button
                onClick={resetFilters}
                className="text-[10px] text-white/40 hover:text-brand-gold underline uppercase tracking-widest"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-white/40 hidden sm:block">
              {sorted.length} items
            </span>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-white/20 text-white text-xs px-3 py-2 outline-none focus:border-brand-gold hover:border-brand-gold/50 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {/* Grid toggle */}
            <div className="hidden sm:flex border border-white/20">
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 transition-colors ${gridCols === 4 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 transition-colors border-l border-white/20 ${gridCols === 3 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
              >
                <Grid2X2 size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 240 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-60">
                  {/* Categories */}
                  <div className="mb-8">
                    <h3 className="text-[10px] tracking-widest uppercase text-white/40 mb-4">Category</h3>
                    <div className="flex flex-col gap-2">
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`flex items-center justify-between text-sm py-1.5 border-b border-white/5 text-left transition-colors ${
                            selectedCategories.includes(cat) ? 'text-brand-gold' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          {cat}
                          {selectedCategories.includes(cat) && <span className="text-brand-gold">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="mb-8">
                    <h3 className="text-[10px] tracking-widest uppercase text-white/40 mb-4">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-1.5 text-xs border transition-all ${
                            selectedSizes.includes(size)
                              ? 'bg-brand-gold border-brand-gold text-black font-bold'
                              : 'border-white/20 text-white/60 hover:border-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h3 className="text-[10px] tracking-widest uppercase text-white/40 mb-4">Price</h3>
                    <div className="flex gap-2 text-xs text-white/60 mb-3">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>—</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10000}
                      step={500}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-brand-gold"
                    />
                  </div>

                  <button
                    onClick={resetFilters}
                    className="w-full border border-white/20 py-2.5 text-xs tracking-widest uppercase text-white/60 hover:border-brand-gold hover:text-brand-gold transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid gap-x-4 gap-y-10 grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-white/40 font-medium mb-2">No products found</p>
                <p className="text-white/20 text-sm mb-6">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-gold text-black px-6 py-3 text-xs font-bold tracking-widest uppercase"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-x-4 gap-y-10 grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                {sorted.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.5 }}
                  >
                    <ProductCard product={product} priority={i < 4} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  )
}
