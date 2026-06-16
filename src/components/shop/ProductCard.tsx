'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import StarRating from '@/components/common/StarRating'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')

  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((s) => s.toggleItem)
  const addToCart = useCartStore((s) => s.addItem)
  const addToast = useUIStore((s) => s.addToast)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    addToast(
      isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    )
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickAddOpen(true)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!selectedSize) return
    addToCart(product, selectedSize, product.colors[0])
    addToast(`${product.name} added to cart!`)
    setQuickAddOpen(false)
    setSelectedSize('')
  }

  const discountPct =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  return (
    <motion.div
      className="group relative cursor-pointer"
      onClick={() => router.push(`/shop/${product.slug}`)}
      onMouseEnter={() => {
        setHovered(true)
        if (product.images.length > 1) setImageIndex(1)
      }}
      onMouseLeave={() => {
        setHovered(false)
        setImageIndex(0)
        setQuickAddOpen(false)
      }}
      layout
    >
      {/* no outer Link — card click handled above; semantic link lives on the product name */}
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-[#111] overflow-hidden mb-3">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-brand-gold text-black text-[9px] font-bold tracking-widest px-2 py-1 uppercase">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-white text-black text-[9px] font-bold tracking-widest px-2 py-1 uppercase">
                Bestseller
              </span>
            )}
            {discountPct > 0 && (
              <span className="bg-red-600 text-white text-[9px] font-bold tracking-widest px-2 py-1 uppercase">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              onClick={handleWishlist}
              className={`w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${
                isInWishlist
                  ? 'bg-brand-gold text-black'
                  : 'bg-black/60 text-white hover:bg-brand-gold hover:text-black'
              }`}
            >
              <Heart size={14} fill={isInWishlist ? 'currentColor' : 'none'} />
            </motion.button>
          </div>

          {/* Image */}
          <Image
            src={product.images[imageIndex] || product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={priority}
          />

          {/* Quick Add Overlay */}
          <AnimatePresence>
            {quickAddOpen ? (
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 bg-black/95 backdrop-blur-sm p-4 z-20"
                onClick={(e) => e.preventDefault()}
              >
                <p className="text-[10px] tracking-widest uppercase text-white/60 mb-2">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedSize(size)
                      }}
                      className={`px-2.5 py-1.5 text-[10px] font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-brand-gold border-brand-gold text-black'
                          : 'border-white/30 text-white hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`w-full py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all ${
                    selectedSize
                      ? 'bg-white text-black hover:bg-brand-gold'
                      : 'bg-white/20 text-white/40 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : '100%' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-0 bg-black/90 backdrop-blur-sm z-20 flex"
              >
                <button
                  onClick={handleQuickAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold tracking-widest uppercase text-white hover:text-brand-gold transition-colors border-r border-white/10"
                >
                  <ShoppingBag size={12} />
                  Quick Add
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/shop/${product.slug}`)
                  }}
                  aria-label="View product details"
                  className="w-12 flex items-center justify-center text-white/60 hover:text-brand-gold transition-colors"
                >
                  <Eye size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div>
          {/* Colors */}
          <div className="flex gap-1 mb-2">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                title={color.name}
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-white/40 ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>

          <h3 className="text-sm font-medium text-white group-hover:text-brand-gold transition-colors duration-200 truncate">
            <Link
              href={`/shop/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-brand-gold"
            >
              {product.name}
            </Link>
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={product.rating} size={11} />
            <span className="text-[10px] text-white/40">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-white/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
    </motion.div>
  )
}
