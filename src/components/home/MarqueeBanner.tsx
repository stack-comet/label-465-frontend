const LOTUS = (
  <svg
    width="14"
    height="14"
    viewBox="-7 -7 14 14"
    style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 10px' }}
    aria-hidden="true"
  >
    <g stroke="currentColor" fill="none" strokeWidth="0.5">
      {[0, 45, 90, 135, 180, 225, 270, 315].map(r => (
        <path
          key={r}
          d={`M 0,-1.5 C 2.5,-2 3,-5.5 0,-6.5 C -3,-5.5 -2.5,-2 0,-1.5`}
          fill="currentColor"
          fillOpacity="0.55"
          strokeWidth="0.4"
          transform={`rotate(${r})`}
        />
      ))}
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
    </g>
  </svg>
)

export default function MarqueeBanner({ inverted = false }: { inverted?: boolean }) {
  const segments = [
    'STREETWEAR', 'बिंदास', 'DESI IDENTITY', 'झक्कास', 'HUSTLE',
    'REPRESENT', '46:5 LABEL', 'मुंबई', 'BORN IN INDIA', 'भिडू', 'महाराष्ट्र',
    'मस्त', 'MADE GLOBAL', 'आज़ादी', 'STREET CULTURE', 'एकदम',
  ]

  return (
    <div className={`py-4 overflow-hidden border-y ${inverted ? 'bg-brand-gold border-brand-gold' : 'bg-black border-white/10'}`}>
      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 40s linear infinite' }}>
        {[0, 1].map(key => (
          <span
            key={key}
            className={`flex items-center text-xs font-bold tracking-[0.25em] uppercase mr-0 shrink-0 ${inverted ? 'text-black' : 'text-white/25'}`}
          >
            {Array(4).fill(segments).flat().map((seg, i) => (
              <span key={i} className="flex items-center">
                <span className={seg.match(/[ऀ-ॿ]/) ? 'font-devanagari tracking-[0.12em] normal-case' : ''}>
                  {seg}
                </span>
                {LOTUS}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
