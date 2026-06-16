'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function CartSlider() {
  const { isCartOpen, closeCart } = useUIStore()
  const { items, removeItem, updateQuantity, getSubtotal, getDiscount, getShipping, getTotal } = useCartStore()

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brand-gold" />
                <span className="font-semibold tracking-tight">Your Cart</span>
                {items.length > 0 && (
                  <span className="text-xs text-white/40">({items.length} items)</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-white/10" />
                  <div>
                    <p className="font-medium text-white/60">Your cart is empty</p>
                    <p className="text-sm text-white/30 mt-1">Add something fire to get started</p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-2 bg-brand-gold text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item, i) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color.name}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 py-4 border-b border-white/[0.06]"
                    >
                      <div className="relative w-20 h-24 bg-[#1A1A1A] shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-medium text-white leading-tight truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-white/40 mt-0.5">
                              {item.size} · {item.color.name}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color.name)}
                            className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/20">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color.name, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 bg-black/30">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-sm text-brand-gold">
                      <span>Discount</span>
                      <span>-{formatPrice(getDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Shipping</span>
                    <span>{getShipping() === 0 ? 'FREE' : formatPrice(getShipping())}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full bg-white text-black text-center py-4 text-xs font-bold tracking-widest uppercase hover:bg-brand-gold transition-colors duration-300"
                >
                  View Cart & Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center mt-2 text-xs text-white/40 hover:text-white/70 transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
