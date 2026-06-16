'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, WishlistItem } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((state) => ({
            items: [
              ...state.items,
              { product, addedAt: new Date().toISOString() },
            ],
          }))
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.product.id === productId)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: '465-label-wishlist',
    }
  )
)
