'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)
  const { addToast, openCart } = useUIStore()

  const handleAddToCart = (product: typeof items[0]['product']) => {
    addToCart(product, product.sizes[0], product.colors[0])
    addToast(`${product.name} added to cart!`)
    openCart()
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-2">Saved</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            MY WISHLIST
          </h1>
          {items.length > 0 && (
            <p className="text-white/40 text-sm mt-2">{items.length} items saved</p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className="text-white/10 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-white/40 text-sm mb-8">Save pieces you love for later</p>
            <Link href="/shop" className="inline-flex items-center gap-3 bg-brand-gold text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all">
              Shop Now <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] bg-[#111] mb-3 overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm flex items-center justify-center text-red-400 hover:bg-red-400 hover:text-white transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <h3 className="text-sm font-medium mb-1 truncate group-hover:text-brand-gold transition-colors">
                    <Link href={`/shop/${item.product.slug}`}>{item.product.name}</Link>
                  </h3>
                  <p className="text-sm font-semibold mb-3">{formatPrice(item.product.price)}</p>
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 text-[10px] font-bold tracking-widest uppercase hover:bg-brand-gold transition-all"
                  >
                    <ShoppingBag size={12} />
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
