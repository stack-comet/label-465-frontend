import HeroSection from '@/components/home/HeroSection'
import FeaturedCollection from '@/components/home/FeaturedCollection'
import ProductSection from '@/components/home/ProductSection'
import BrandStory from '@/components/home/BrandStory'
import LookbookSection from '@/components/home/LookbookSection'
import CustomerReviews from '@/components/home/CustomerReviews'
import Newsletter from '@/components/home/Newsletter'
import MarqueeBanner from '@/components/home/MarqueeBanner'
import RangoliDivider from '@/components/decorative/RangoliDivider'
import WarliStrip from '@/components/decorative/WarliStrip'
import { PRODUCTS } from '@/data/products'

export default function HomePage() {
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 8)
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8)

  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturedCollection />
      <RangoliDivider />
      <ProductSection
        title="NEW ARRIVALS"
        label="Just Dropped"
        subtitle="Fresh pieces from the streets of India."
        products={newArrivals}
        href="/shop?filter=new"
      />
      <MarqueeBanner inverted />
      <BrandStory />
      <RangoliDivider />
      <ProductSection
        title="BEST SELLERS"
        label="Fan Favourites"
        subtitle="The pieces the streets can't stop wearing."
        products={bestSellers}
        href="/shop?filter=bestseller"
      />
      <RangoliDivider />
      <LookbookSection />
      <CustomerReviews />
      {/* Warli folk art border — transitions into Newsletter */}
      <WarliStrip className="bg-black" opacity={0.08} />
      <Newsletter />
    </>
  )
}
