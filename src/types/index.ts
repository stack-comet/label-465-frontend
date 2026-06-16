export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  sizes: string[]
  colors: ProductColor[]
  description: string
  material: string
  care: string[]
  fit: string
  inStock: boolean
  isNew: boolean
  isBestSeller: boolean
  isFeatured: boolean
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
}

export interface ProductColor {
  name: string
  hex: string
}

export interface CartItem {
  product: Product
  size: string
  color: ProductColor
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: string
}

export interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
  verified: boolean
  productId?: string
  location?: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  season?: string
}

export interface Order {
  id: string
  orderNumber: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  estimatedDelivery: string
  address: Address
  trackingNumber?: string
}

export interface Address {
  id: string
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinedAt: string
}

export interface PromoCode {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minOrder?: number
}

export interface FilterState {
  selectedCategories: string[]
  selectedSizes: string[]
  selectedColors: string[]
  priceRange: [number, number]
  sortBy: string
  searchQuery: string
}
