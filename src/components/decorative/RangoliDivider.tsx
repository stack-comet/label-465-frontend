const GOLD = '#B7AC34'
const R8 = [0, 45, 90, 135, 180, 225, 270, 315]

interface RangoliDividerProps {
  className?: string
}

export default function RangoliDivider({ className = '' }: RangoliDividerProps) {
  return (
    <div className={`flex items-center justify-center py-10 px-4 ${className}`}>
      <div className="flex items-center w-full max-w-5xl mx-auto gap-0">

        {/* Left gradient line */}
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, transparent 0%, ${GOLD}55 60%, ${GOLD}99 100%)` }}
        />

        {/* Central ornament */}
        <div className="flex items-center gap-3 shrink-0 px-5">
          {/* Left mini-chain: dot · diamond · dot */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: GOLD, opacity: 0.5 }} />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: GOLD, opacity: 0.4 }}
            />
            <div className="w-1 h-1 rounded-full" style={{ background: GOLD, opacity: 0.7 }} />
          </div>

          {/* Central lotus SVG */}
          <svg width="40" height="40" viewBox="-20 -20 40 40" aria-hidden="true">
            <g stroke={GOLD} fill="none" strokeLinecap="round">
              {/* 8 petals */}
              {R8.map(r => (
                <g key={r} transform={`rotate(${r})`}>
                  <path
                    d="M 0,-3.5 C 4,-4.5 5,-11 0,-14 C -5,-11 -4,-4.5 0,-3.5"
                    fill={GOLD}
                    fillOpacity="0.35"
                    strokeWidth="0.4"
                  />
                </g>
              ))}
              {/* Center */}
              <circle cx="0" cy="0" r="3" fill={GOLD} stroke="none" />
              {/* Outer dashed ring */}
              <circle cx="0" cy="0" r="16" strokeWidth="0.4" strokeDasharray="1 2.5" />
              {/* 8 tiny tips */}
              {R8.map(r => (
                <g key={`t-${r}`} transform={`rotate(${r})`}>
                  <polygon points="0,-15 1,-16.5 0,-18 -1,-16.5" fill={GOLD} fillOpacity="0.6" stroke="none" />
                </g>
              ))}
            </g>
          </svg>

          {/* Right mini-chain: dot · diamond · dot */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: GOLD, opacity: 0.7 }} />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: GOLD, opacity: 0.4 }}
            />
            <div className="w-1 h-1 rounded-full" style={{ background: GOLD, opacity: 0.5 }} />
          </div>
        </div>

        {/* Right gradient line */}
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to left, transparent 0%, ${GOLD}55 60%, ${GOLD}99 100%)` }}
        />

      </div>
    </div>
  )
}
