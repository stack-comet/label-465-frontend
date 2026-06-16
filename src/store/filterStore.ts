'use client'

import { create } from 'zustand'

interface FilterStore {
  selectedCategories: string[]
  selectedSizes: string[]
  selectedColors: string[]
  priceRange: [number, number]
  sortBy: string
  searchQuery: string

  toggleCategory: (cat: string) => void
  setCategories: (cats: string[]) => void
  toggleSize: (size: string) => void
  toggleColor: (color: string) => void
  setPriceRange: (range: [number, number]) => void
  setSortBy: (sort: string) => void
  setSearchQuery: (q: string) => void
  resetFilters: () => void
  hasActiveFilters: () => boolean
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 10000]

export const useFilterStore = create<FilterStore>((set, get) => ({
  selectedCategories: [],
  selectedSizes: [],
  selectedColors: [],
  priceRange: DEFAULT_PRICE_RANGE,
  sortBy: 'featured',
  searchQuery: '',

  toggleCategory: (cat) => {
    const { selectedCategories } = get()
    if (selectedCategories.includes(cat)) {
      set({ selectedCategories: selectedCategories.filter((c) => c !== cat) })
    } else {
      set({ selectedCategories: [...selectedCategories, cat] })
    }
  },

  setCategories: (cats) => set({ selectedCategories: cats }),

  toggleSize: (size) => {
    const { selectedSizes } = get()
    if (selectedSizes.includes(size)) {
      set({ selectedSizes: selectedSizes.filter((s) => s !== size) })
    } else {
      set({ selectedSizes: [...selectedSizes, size] })
    }
  },

  toggleColor: (color) => {
    const { selectedColors } = get()
    if (selectedColors.includes(color)) {
      set({ selectedColors: selectedColors.filter((c) => c !== color) })
    } else {
      set({ selectedColors: [...selectedColors, color] })
    }
  },

  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  resetFilters: () =>
    set({
      selectedCategories: [],
      selectedSizes: [],
      selectedColors: [],
      priceRange: DEFAULT_PRICE_RANGE,
      sortBy: 'featured',
      searchQuery: '',
    }),

  hasActiveFilters: () => {
    const { selectedCategories, selectedSizes, selectedColors, priceRange } = get()
    return (
      selectedCategories.length > 0 ||
      selectedSizes.length > 0 ||
      selectedColors.length > 0 ||
      priceRange[0] !== DEFAULT_PRICE_RANGE[0] ||
      priceRange[1] !== DEFAULT_PRICE_RANGE[1]
    )
  },
}))
