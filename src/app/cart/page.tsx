'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatPrice } from '@/lib/utils'
import { PRODUCTS } from '@/data/products'
import ProductCard from '@/components/shop/ProductCard'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDiscount, getShipping, getTotal, applyPromo, removePromo, appliedPromo } = useCartStore()
  const { addToast } = useUIStore()
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  const recommendations = PRODUCTS.filter(
    (p) => !items.find((i) => i.product.id === p.id)
  ).slice(0, 4)

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    const result = applyPromo(promoInput.trim())
    if (result.success) {
      addToast(result.message)
      setPromoError('')
      setPromoInput('')
    } else {
      setPromoError(result.message)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-36 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ShoppingBag size={64} className="text-white/10 mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Your cart is empty</h2>
          <p className="text-white/40 text-sm mb-8">Add some heat to get started</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-brand-gold text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-2">Shopping</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            YOUR CART
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}-${item.color.name}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="flex gap-5 border border-white/10 p-4 md:p-6 hover:border-white/20 transition-colors"
                >
                  <div className="relative w-24 h-32 md:w-28 md:h-36 bg-[#111] shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/shop/${item.product.slug}`} className="font-medium hover:text-brand-gold transition-colors text-sm md:text-base">
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-white/40 mt-1">
                          Size: {item.size} · Color: {item.color.name}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">{item.product.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color.name)}
                        className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-9 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-white/40">{formatPrice(item.product.price)} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-white/10 p-6 sticky top-28">
              <h2 className="font-bold tracking-tight text-lg mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Promo Code</p>
                {appliedPromo ? (
                  <div className="flex items-center justify-between border border-brand-gold/40 bg-brand-gold/5 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag size={12} className="text-brand-gold" />
                      <span className="text-sm font-medium text-brand-gold">{appliedPromo.code}</span>
                    </div>
                    <button onClick={removePromo} className="text-xs text-white/40 hover:text-red-400 transition-colors">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-0">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError('') }}
                        placeholder="Enter code"
                        className="flex-1 bg-[#111] border border-white/20 border-r-0 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-gold transition-colors uppercase"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-white text-black px-4 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-400 mt-1.5">{promoError}</p>
                    )}
                    <p className="text-[10px] text-white/30 mt-2">Try: 465LAUNCH, DESI20, STREET10</p>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-sm text-brand-gold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-{formatPrice(getDiscount())}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-white/60">
                  <span>Shipping</span>
                  <span className={getShipping() === 0 ? 'text-green-400' : ''}>
                    {getShipping() === 0 ? 'FREE' : formatPrice(getShipping())}
                  </span>
                </div>
                {getShipping() > 0 && (
                  <p className="text-[10px] text-white/30">
                    Add {formatPrice(2499 - getSubtotal())} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-base font-bold pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>

              <button className="w-full bg-brand-gold text-black py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={14} />
              </button>
              <Link href="/shop" className="block text-center text-xs text-white/30 hover:text-white transition-colors mt-3 py-2">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <h2 className="text-xl font-black tracking-tight mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
              {recommendations.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
