'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductColor, PromoCode } from '@/types'
import { PROMO_CODES } from '@/data/mockData'

interface CartStore {
  items: CartItem[]
  appliedPromo: PromoCode | null

  addItem: (product: Product, size: string, color: ProductColor) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string) => { success: boolean; message: string }
  removePromo: () => void

  getSubtotal: () => number
  getDiscount: () => number
  getShipping: () => number
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,

      addItem: (product, size, color) => {
        const { items } = get()
        const existingIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            item.color.name === color.name
        )

        if (existingIndex > -1) {
          const updated = [...items]
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          }
          set({ items: updated })
        } else {
          set({ items: [...items, { product, size, color, quantity: 1 }] })
        }
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color.name === color
              )
          ),
        }))
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, size, color)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size &&
            item.color.name === color
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [], appliedPromo: null }),

      applyPromo: (code) => {
        const promo = PROMO_CODES.find(
          (p) => p.code.toLowerCase() === code.toLowerCase()
        )
        if (!promo) {
          return { success: false, message: 'Invalid promo code' }
        }
        const subtotal = get().getSubtotal()
        if (promo.minOrder && subtotal < promo.minOrder) {
          return {
            success: false,
            message: `Minimum order of ₹${promo.minOrder} required`,
          }
        }
        set({ appliedPromo: promo })
        return { success: true, message: `${promo.discount}${promo.type === 'percentage' ? '%' : '₹'} discount applied!` }
      },

      removePromo: () => set({ appliedPromo: null }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        )
      },

      getDiscount: () => {
        const { appliedPromo } = get()
        const subtotal = get().getSubtotal()
        if (!appliedPromo) return 0
        if (appliedPromo.type === 'percentage') {
          return Math.round((subtotal * appliedPromo.discount) / 100)
        }
        return appliedPromo.discount
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal >= 2499 ? 0 : 99
      },

      getTotal: () => {
        return get().getSubtotal() - get().getDiscount() + get().getShipping()
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: '465-label-cart',
    }
  )
)
