export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-[#1A1A1A] mb-3" />
      <div className="flex gap-1 mb-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-[#2A2A2A]" />
        ))}
      </div>
      <div className="h-4 bg-[#1A1A1A] rounded mb-2 w-3/4" />
      <div className="h-3 bg-[#1A1A1A] rounded mb-2 w-1/2" />
      <div className="h-4 bg-[#1A1A1A] rounded w-1/3" />
    </div>
  )
}
