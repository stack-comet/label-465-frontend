import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  size?: number
  className?: string
  showCount?: boolean
  count?: number
}

export default function StarRating({
  rating,
  size = 14,
  className,
  showCount = false,
  count,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(rating)
              ? 'fill-brand-gold text-brand-gold'
              : 'fill-transparent text-white/20'
          }
        />
      ))}
      {showCount && count !== undefined && (
        <span className="text-white/50 text-xs ml-1">({count})</span>
      )}
    </div>
  )
}
