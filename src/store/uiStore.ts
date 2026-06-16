'use client'

import { create } from 'zustand'
import { Product } from '@/types'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface UIStore {
  isSearchOpen: boolean
  isCartOpen: boolean
  isMobileMenuOpen: boolean
  quickViewProduct: Product | null
  toasts: Toast[]

  openSearch: () => void
  closeSearch: () => void
  toggleSearch: () => void

  openCart: () => void
  closeCart: () => void
  toggleCart: () => void

  openMobileMenu: () => void
  closeMobileMenu: () => void
  toggleMobileMenu: () => void

  openQuickView: (product: Product) => void
  closeQuickView: () => void

  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set, get) => ({
  isSearchOpen: false,
  isCartOpen: false,
  isMobileMenuOpen: false,
  quickViewProduct: null,
  toasts: [],

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => get().removeToast(id), 3000)
  },

  removeToast: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
  },
}))
