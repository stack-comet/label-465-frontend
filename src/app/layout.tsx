import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Serif_Devanagari } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartSlider from '@/components/cart/CartSlider'
import SearchModal from '@/components/search/SearchModal'
import ToastContainer from '@/components/common/ToastContainer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: {
    default: '46:5 LABEL — Indian Streetwear',
    template: '%s | 46:5 LABEL',
  },
  description:
    'Born from the streets of India. 46:5 Label is a premium streetwear brand blending bold Indian identity with global fashion culture.',
  keywords: ['streetwear', 'indian fashion', 'premium clothing', 'urban wear', '46:5 label'],
  openGraph: {
    title: '46:5 LABEL — Indian Streetwear',
    description: 'Born from the streets of India.',
    siteName: '46:5 LABEL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${devanagari.variable}`}>
      <body className="bg-black text-white min-h-screen antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartSlider />
        <SearchModal />
        <ToastContainer />
      </body>
    </html>
  )
}
