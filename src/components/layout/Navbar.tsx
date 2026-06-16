'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { TICKER_MESSAGES } from '@/data/products'

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?collection=ss25-azadi', label: 'SS25' },
  { href: '/shop?collection=gully-essentials', label: 'Essentials' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [tickerIndex, setTickerIndex] = useState(0)
  const itemCount = useCartStore((s) => s.getItemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)
  const { openSearch, openCart, isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % TICKER_MESSAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-gold text-black py-2 px-4 text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={tickerIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2.5"
          >
            {/* Tiny lotus left */}
            <svg width="10" height="10" viewBox="-5 -5 10 10" aria-hidden className="shrink-0 opacity-60">
              {[0,45,90,135,180,225,270,315].map(r => (
                <path key={r} d="M0,-1.5 C1.8,-2 2.2,-4.5 0,-5.5 C-2.2,-4.5 -1.8,-2 0,-1.5"
                  fill="black" fillOpacity="0.5" transform={`rotate(${r})`} />
              ))}
              <circle cx="0" cy="0" r="1.5" fill="black" fillOpacity="0.6" />
            </svg>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase">
              {TICKER_MESSAGES[tickerIndex]}
            </p>

            {/* Tiny lotus right */}
            <svg width="10" height="10" viewBox="-5 -5 10 10" aria-hidden className="shrink-0 opacity-60">
              {[0,45,90,135,180,225,270,315].map(r => (
                <path key={r} d="M0,-1.5 C1.8,-2 2.2,-4.5 0,-5.5 C-2.2,-4.5 -1.8,-2 0,-1.5"
                  fill="black" fillOpacity="0.5" transform={`rotate(${r})`} />
              ))}
              <circle cx="0" cy="0" r="1.5" fill="black" fillOpacity="0.6" />
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/[0.06] top-0'
            : 'bg-transparent top-[36px]'
        }`}
        style={{ top: scrolled ? 0 : 36 }}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start group">
              <span className="text-2xl md:text-3xl font-black tracking-tight leading-none text-white group-hover:text-brand-gold transition-colors duration-300">
                46:5
              </span>
              <span className="text-[8px] tracking-[0.35em] uppercase text-brand-border-gray leading-none font-medium">
                LABEL
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.15em] uppercase font-medium text-white/80 hover:text-brand-gold transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={openSearch}
                className="p-1.5 text-white/80 hover:text-brand-gold transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <Link
                href="/wishlist"
                className="relative p-1.5 text-white/80 hover:text-brand-gold transition-colors duration-200 hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="p-1.5 text-white/80 hover:text-brand-gold transition-colors duration-200 hidden sm:flex"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>

              <button
                onClick={openCart}
                className="relative p-1.5 text-white/80 hover:text-brand-gold transition-colors duration-200"
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-brand-gold text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                className="md:hidden p-1.5 text-white/80 hover:text-white transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col pt-20"
          >
            <div className="flex flex-col px-8 pt-12 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-3xl font-bold tracking-tight text-white hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8 flex gap-6">
                <Link href="/account" onClick={closeMobileMenu} className="text-white/60 hover:text-brand-gold flex items-center gap-2 text-sm tracking-widest uppercase">
                  <User size={16} /> Account
                </Link>
                <Link href="/wishlist" onClick={closeMobileMenu} className="text-white/60 hover:text-brand-gold flex items-center gap-2 text-sm tracking-widest uppercase">
                  <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
