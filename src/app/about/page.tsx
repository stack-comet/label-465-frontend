import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/common/ScrollReveal'

export const metadata = { title: 'About' }

export default function AboutPage() {
  const values = [
    { title: 'DESI DNA', desc: 'Every stitch carries the spirit of India. We don\'t just draw inspiration — we ARE the culture.' },
    { title: 'UNCOMPROMISING QUALITY', desc: 'Premium fabrics, heavyweight constructions, and details that outlast trends. No shortcuts.' },
    { title: 'COMMUNITY FIRST', desc: 'We built this for the streets. Every piece is designed by the culture, for the culture.' },
    { title: 'BOLD OR NOTHING', desc: 'We don\'t do safe. Every drop is a statement. If it doesn\'t make you feel something, it doesn\'t leave the studio.' },
  ]

  const timeline = [
    { year: '2022', event: 'The Idea', desc: 'Two friends in Mumbai who couldn\'t find Indian streetwear that matched their ambition decided to make it themselves.' },
    { year: '2023', event: 'First Drop', desc: '12 pieces, 48 hours, sold out. The streets were ready.' },
    { year: '2024', event: '46:5 Born', desc: 'The brand officially launched with the AZADI capsule — a love letter to Indian identity and street culture.' },
    { year: '2025', event: 'SS25: AZADI', desc: 'Our biggest collection yet. 24 pieces. The movement grows.' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[70vh] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto w-full">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
            Our Story
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
            WE ARE<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #B7AC34' }}>
              46:5
            </span>
          </h1>
        </div>
      </div>

      {/* Manifesto */}
      <section className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto">
        <div className="max-w-3xl">
          <ScrollReveal>
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-white/70 italic" style={{ fontFamily: 'var(--font-playfair)' }}>
              "46:5 is not just a streetwear brand — it's a cultural movement born from the chaos, color, and charisma of modern India."
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="mt-10 space-y-5">
            <p className="text-white/60 leading-relaxed">
              Rooted in the rhythm of the streets and repping the unapologetic spirit of the youth, 46:5 blends bold design with desi identity. We take global streetwear and remix it with Indian elements — language, art, rebellion, and hustle.
            </p>
            <p className="text-white/60 leading-relaxed">
              The name 46:5 represents the geographic coordinates of a place that doesn't exist on any map — the space between who you are and who you're becoming. It's the tension, the hustle, the in-between. It's the street.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#070707]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <ScrollReveal className="mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">Journey</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              THE 46:5 TIMELINE
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-12 pl-20">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.15} className="relative">
                  <div className="absolute -left-[52px] top-1 w-3 h-3 rounded-full bg-brand-gold" />
                  <span className="text-brand-gold font-mono text-sm font-bold">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{item.event}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto">
        <ScrollReveal className="mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">What Drives Us</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            OUR VALUES
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="border border-white/10 p-8 hover:border-brand-gold/40 transition-colors group">
                <div className="w-8 h-px bg-brand-gold mb-6 group-hover:w-16 transition-all duration-500" />
                <h3 className="text-lg font-black tracking-wider mb-3">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Lookbook Preview */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
          <ScrollReveal className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-3">SS25 Editorial</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              AZADI LOOKBOOK
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
              'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&q=80',
              'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
            ].map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <div className="relative aspect-square overflow-hidden group">
                  <Image src={src} alt={`Lookbook ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            JOIN THE MOVEMENT
          </h2>
          <p className="text-white/40 text-sm mb-10 max-w-md mx-auto">
            The streets are waiting. Are you ready to represent?
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-brand-gold text-black px-10 py-5 text-xs font-bold tracking-widest uppercase hover:bg-white transition-all"
          >
            Shop Now <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
