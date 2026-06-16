const GOLD = '#B7AC34'
const R8 = [0, 45, 90, 135, 180, 225, 270, 315]
const R16 = Array.from({ length: 16 }, (_, i) => i * 22.5)

interface MandalaProps {
  size?: number
  className?: string
  opacity?: number
  animate?: boolean
}

export default function Mandala({ size = 400, className = '', opacity = 1, animate = false }: MandalaProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-100 -100 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'animate-[mandala-spin_120s_linear_infinite]' : ''} ${className}`.trim()}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g stroke={GOLD} fill="none" strokeLinecap="round" strokeLinejoin="round">

        {/* ── CENTER BINDU ── */}
        <circle cx="0" cy="0" r="3.5" fill={GOLD} stroke="none" />
        <circle cx="0" cy="0" r="7" strokeWidth="0.5" />

        {/* ── RING 1 · 8-petal inner lotus ── */}
        {R8.map(r => (
          <g key={`ip-${r}`} transform={`rotate(${r})`}>
            <path
              d="M 0,-7 C 7,-9 9,-18 0,-23 C -9,-18 -7,-9 0,-7"
              fill={GOLD}
              fillOpacity="0.14"
              strokeWidth="0.45"
            />
          </g>
        ))}

        {/* Inner rings */}
        <circle cx="0" cy="0" r="25" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="27" strokeWidth="0.3" strokeDasharray="1 2.5" />

        {/* ── RING 2 · 8 outward diamonds ── */}
        {R8.map(r => (
          <g key={`d8-${r}`} transform={`rotate(${r})`}>
            <polygon
              points="0,-25 3.5,-29 0,-33 -3.5,-29"
              fill={GOLD}
              fillOpacity="0.35"
              strokeWidth="0.4"
            />
          </g>
        ))}

        {/* 16 short spokes r 33→37 */}
        {R16.map(r => (
          <g key={`spk-${r}`} transform={`rotate(${r})`}>
            <line x1="0" y1="-33" x2="0" y2="-37" strokeWidth="0.4" />
          </g>
        ))}

        {/* 16 dots at r 36 */}
        {R16.map(r => (
          <g key={`dot-a-${r}`} transform={`rotate(${r})`}>
            <circle cx="0" cy="-36" r="0.7" fill={GOLD} stroke="none" />
          </g>
        ))}

        {/* Middle ring */}
        <circle cx="0" cy="0" r="38" strokeWidth="0.55" />

        {/* ── RING 3 · 8 medium petals ── */}
        {R8.map(r => (
          <g key={`mp-${r}`} transform={`rotate(${r})`}>
            <path
              d="M 0,-38 C 10,-42 12,-54 0,-61 C -12,-54 -10,-42 0,-38"
              fill={GOLD}
              fillOpacity="0.07"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Between mid petals: 8 lancet shapes */}
        {R8.map(r => (
          <g key={`lc-${r}`} transform={`rotate(${r + 22.5})`}>
            <path
              d="M 0,-41 L 3.5,-48 L 0,-55 L -3.5,-48 Z"
              fill={GOLD}
              fillOpacity="0.2"
              strokeWidth="0.3"
            />
          </g>
        ))}

        {/* Outer mid ring */}
        <circle cx="0" cy="0" r="64" strokeWidth="0.55" />

        {/* 16 outer dots at r 66 */}
        {R16.map(r => (
          <g key={`dot-b-${r}`} transform={`rotate(${r})`}>
            <circle cx="0" cy="-66" r="0.9" fill={GOLD} stroke="none" />
          </g>
        ))}

        {/* ── RING 4 · 8 large outer petals ── */}
        {R8.map(r => (
          <g key={`op-${r}`} transform={`rotate(${r})`}>
            <path
              d="M 0,-64 C 12,-69 14,-82 0,-91 C -14,-82 -12,-69 0,-64"
              fill={GOLD}
              fillOpacity="0.045"
              strokeWidth="0.5"
            />
          </g>
        ))}

        {/* Between outer petals: concave arcs */}
        {R8.map(r => (
          <g key={`arc-${r}`} transform={`rotate(${r + 22.5})`}>
            <path d="M -5,-66 Q 0,-74 5,-66" strokeWidth="0.35" />
          </g>
        ))}

        {/* ── BORDER ── */}
        <circle cx="0" cy="0" r="94" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="96" strokeWidth="0.3" strokeDasharray="1 3" />

        {/* 8 pointed outer tips */}
        {R8.map(r => (
          <g key={`tip-${r}`} transform={`rotate(${r})`}>
            <polygon
              points="0,-94 2.5,-96 0,-100 -2.5,-96"
              fill={GOLD}
              fillOpacity="0.65"
              stroke="none"
            />
          </g>
        ))}

        {/* Small circles between tips */}
        {R8.map(r => (
          <g key={`tc-${r}`} transform={`rotate(${r + 22.5})`}>
            <circle cx="0" cy="-95" r="1.2" fill={GOLD} fillOpacity="0.4" stroke="none" />
          </g>
        ))}

      </g>
    </svg>
  )
}
