'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, Share2, Rss, Mail, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import WarliStrip from '@/components/decorative/WarliStrip'

const FOOTER_LINKS = {
  Shop: [
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=bestseller' },
    { label: 'Tees', href: '/shop?category=tees' },
    { label: 'Hoodies', href: '/shop?category=hoodies' },
    { label: 'Cargos & Pants', href: '/shop?category=cargos' },
    { label: 'Accessories', href: '/shop?category=accessories' },
  ],
  Company: [
    { label: 'About 46:5', href: '/about' },
    { label: 'Lookbook', href: '/about#lookbook' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/contact' },
  ],
  Support: [
    { label: 'Size Guide', href: '/contact#size-guide' },
    { label: 'Shipping & Returns', href: '/contact#shipping' },
    { label: 'FAQs', href: '/contact#faqs' },
    { label: 'Track Order', href: '/account' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06]">

      {/* Warli folk art strip — Maharashtra's tribal art as footer topper */}
      <WarliStrip className="bg-[#0A0A0A]" opacity={0.1} />

      {/* Indian jali border strip */}
      <div className="w-full overflow-hidden" style={{ height: '40px' }} aria-hidden>
        <svg
          width="100%"
          height="40"
          viewBox="0 0 1440 40"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="jaliBorder" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,2 L38,20 L20,38 L2,20 Z" fill="none" stroke="#B7AC34" strokeWidth="0.5" strokeOpacity="0.3" />
              <circle cx="20" cy="20" r="6" fill="none" stroke="#B7AC34" strokeWidth="0.4" strokeOpacity="0.2" />
              <path d="M20,14 L26,20 L20,26 L14,20 Z" fill="none" stroke="#B7AC34" strokeWidth="0.4" strokeOpacity="0.15" />
              <circle cx="20" cy="2" r="1.2" fill="#B7AC34" fillOpacity="0.25" />
              <circle cx="38" cy="20" r="1.2" fill="#B7AC34" fillOpacity="0.25" />
              <circle cx="20" cy="38" r="1.2" fill="#B7AC34" fillOpacity="0.25" />
              <circle cx="2" cy="20" r="1.2" fill="#B7AC34" fillOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="1440" height="40" fill="url(#jaliBorder)" />
          <rect width="1440" height="1" y="39" fill="#B7AC34" fillOpacity="0.06" />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tight text-white">46:5</span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-brand-gold font-semibold">
                  LABEL
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Born from the chaos, color, and charisma of modern India. Streetwear rooted in desi identity — unapologetic, bold, and forever repping the streets.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Globe, href: '#', label: 'Instagram' },
                { icon: Share2, href: '#', label: 'Twitter' },
                { icon: Rss, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs tracking-[0.25em] uppercase font-semibold text-white mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-brand-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-1">
                Join the Movement
              </h3>
              <p className="text-white/50 text-sm">
                First access to drops, collabs, and exclusive offers.
              </p>
            </div>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-0">
                <div className="flex items-center border border-white/20 hover:border-brand-gold/50 transition-colors flex-1 md:flex-none">
                  <Mail size={14} className="ml-4 text-white/30 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none w-full md:w-64"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-brand-gold text-black px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300 flex items-center gap-2 shrink-0"
                >
                  JOIN
                  <ArrowRight size={12} />
                </button>
              </form>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-brand-gold text-sm font-medium"
              >
                ✓ You're in. Welcome to the movement.
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04] bg-black/50">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <p className="text-white/30 text-xs">
              © 2025 46:5 LABEL. All rights reserved. Made with ❤️ in India.
            </p>
            <span className="hidden sm:inline text-white/10 text-xs">·</span>
            <p className="text-white/15 text-[10px] font-devanagari tracking-wide">
              जय महाराष्ट्र · वसुधैव कुटुम्बकम्
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact#privacy" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact#terms" className="text-white/30 text-xs hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
