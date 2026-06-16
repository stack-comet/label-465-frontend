'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, ChevronDown, Share2, ArrowLeft, Minus, Plus } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { REVIEWS } from '@/data/mockData'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import ProductCard from '@/components/shop/ProductCard'
import StarRating from '@/components/common/StarRating'
import ScrollReveal from '@/components/common/ScrollReveal'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0]
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const addToCart = useCartStore((s) => s.addItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))
  const toggleWishlist = useWishlistStore((s) => s.toggleItem)
  const { openCart, addToast } = useUIStore()

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size', 'error')
      return
    }
    for (let i = 0; i < quantity; i++) addToCart(product, selectedSize, selectedColor)
    addToast(`${product.name} added to cart!`)
    openCart()
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    addToast(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  const ACCORDIONS = [
    { id: 'material', label: 'Material & Fit', content: `${product.material}\n\nFit: ${product.fit}` },
    { id: 'care', label: 'Care Instructions', content: product.care.join('\n') },
    { id: 'shipping', label: 'Shipping & Returns', content: 'Free shipping above ₹2,499. Express delivery available.\n\n7-day return window for unworn, unwashed items.' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white/70">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
          {/* Gallery */}
          <div>
            <div className="flex gap-3">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 w-16 shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-20 overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-brand-gold' : 'border-transparent opacity-50 hover:opacity-75'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 aspect-[3/4] bg-[#111] overflow-hidden">
                {product.isNew && (
                  <span className="absolute top-4 left-4 z-10 bg-brand-gold text-black text-[9px] font-bold tracking-widest px-2 py-1 uppercase">
                    New
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 z-10 bg-red-600 text-white text-[9px] font-bold tracking-widest px-2 py-1 uppercase">
                    -{discount}%
                  </span>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Category */}
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <StarRating rating={product.rating} showCount count={product.reviewCount} />
                <span className="text-xs text-white/40">|</span>
                <span className="text-xs text-white/40">{product.stock} in stock</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-white/30 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm text-red-400 font-semibold">-{discount}% OFF</span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest uppercase text-white/60">
                    Color: <span className="text-white">{selectedColor.name}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      title={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full transition-all ${
                        selectedColor.name === color.name
                          ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-black scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex, border: color.hex === '#FFFFFF' || color.hex === '#F5F0E8' ? '1px solid #444' : 'none' }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest uppercase text-white/60">
                    Size: <span className="text-white">{selectedSize || 'Select a size'}</span>
                  </p>
                  <button className="text-xs text-brand-gold hover:text-white transition-colors underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-brand-gold border-brand-gold text-black font-bold'
                          : 'border-white/20 text-white/70 hover:border-white hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex gap-3 mb-4">
                <div className="flex items-center border border-white/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-white text-black font-bold text-xs tracking-widest uppercase h-12 hover:bg-brand-gold transition-all duration-300"
                >
                  <ShoppingBag size={15} />
                  Add to Cart
                </button>

                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 border flex items-center justify-center transition-all ${
                    isInWishlist
                      ? 'border-brand-gold text-brand-gold bg-brand-gold/10'
                      : 'border-white/20 text-white/60 hover:border-brand-gold hover:text-brand-gold'
                  }`}
                >
                  <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button className="w-full border border-brand-gold text-brand-gold font-bold text-xs tracking-widest uppercase h-12 hover:bg-brand-gold hover:text-black transition-all duration-300 mb-6">
                Buy Now
              </button>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Accordions */}
              <div className="border-t border-white/10">
                {ACCORDIONS.map((acc) => (
                  <div key={acc.id} className="border-b border-white/10">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                      className="flex items-center justify-between w-full py-4 text-left"
                    >
                      <span className="text-sm font-medium text-white">{acc.label}</span>
                      <ChevronDown
                        size={16}
                        className={`text-white/40 transition-transform ${openAccordion === acc.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-white/50 leading-relaxed pb-4 whitespace-pre-line">
                            {acc.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 pt-20 border-t border-white/10">
          <ScrollReveal>
            <h2 className="text-2xl font-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              CUSTOMER REVIEWS
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 4).map((review, i) => (
              <ScrollReveal key={review.id} delay={i * 0.1}>
                <div className="border border-white/10 p-6 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image src={review.avatar} alt={review.user} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.user}</p>
                      <p className="text-xs text-white/40">{review.location} · {review.date}</p>
                    </div>
                    <div className="ml-auto">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">"{review.comment}"</p>
                  {review.verified && (
                    <p className="text-[9px] tracking-widest uppercase text-brand-gold mt-3">✓ Verified Purchase</p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 pt-20 border-t border-white/10">
            <ScrollReveal>
              <h2 className="text-2xl font-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
                YOU MAY ALSO LIKE
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
