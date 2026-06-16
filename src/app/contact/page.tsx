'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Globe, Share2, Rss, ArrowRight } from 'lucide-react'
import { STORE_INFO, FAQS } from '@/data/mockData'
import ScrollReveal from '@/components/common/ScrollReveal'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            CONTACT US
          </h1>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <ScrollReveal>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[#111] border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-[#111] border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-gold transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#111] border border-white/20 px-4 py-3 text-sm text-white outline-none focus:border-brand-gold transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Enquiry</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="product">Product Question</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/40 block mb-2">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="w-full bg-[#111] border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand-gold transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-brand-gold text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-300"
                >
                  Send Message <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-80 text-center border border-brand-gold/30 p-12"
              >
                <span className="text-5xl mb-4">✓</span>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">We'll get back to you within 24–48 hours. Keep it real.</p>
              </motion.div>
            )}
          </ScrollReveal>

          {/* Info */}
          <div className="space-y-10">
            <ScrollReveal delay={0.1}>
              <h2 className="text-xl font-bold mb-6 tracking-tight">Store Information</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: STORE_INFO.address },
                  { icon: Phone, label: 'Phone', value: STORE_INFO.phone },
                  { icon: Mail, label: 'Email', value: STORE_INFO.email },
                  { icon: Clock, label: 'Hours', value: STORE_INFO.hours },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-brand-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-widest uppercase text-white/40 mb-0.5">{label}</p>
                      <p className="text-sm text-white/70">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Globe, label: '@465label', href: '#' },
                    { icon: Share2, label: '@465label', href: '#' },
                    { icon: Rss, label: '46:5 Label', href: '#' },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-2 border border-white/20 px-4 py-2.5 text-xs text-white/60 hover:border-brand-gold hover:text-brand-gold transition-all"
                    >
                      <Icon size={13} /> {label}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Map Placeholder */}
            <ScrollReveal delay={0.3}>
              <div className="h-48 bg-[#111] border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} className="text-brand-gold mx-auto mb-2" />
                  <p className="text-xs text-white/40 tracking-widest uppercase">Lower Parel, Mumbai</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <ScrollReveal className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">Quick Answers</p>
            <h2 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              FREQUENTLY ASKED
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-medium pr-4">{faq.question}</span>
                    <span className={`text-brand-gold text-lg transition-transform shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
