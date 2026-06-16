const GOLD = '#B7AC34'

/* Fan angles for 9 tail feathers (in degrees from positive x-axis)
   spanning from upper-left to upper-right, fanning UPWARD */
const FEATHER_ANGLES = [-135, -120, -107, -95, -90, -85, -73, -60, -45]
const TAIL_R = 52

interface PaithaniPeacockProps {
  size?: number
  className?: string
  opacity?: number
}

export default function PaithaniPeacock({ size = 180, className = '', opacity = 1 }: PaithaniPeacockProps) {
  return (
    <svg
      width={size}
      height={size}
      /* viewBox tuned so bird + tail fits with breathing room */
      viewBox="-80 -90 160 130"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <g stroke={GOLD} fill="none" strokeLinecap="round" strokeLinejoin="round">

        {/* ── TAIL FEATHERS ── */}
        {FEATHER_ANGLES.map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const tx = TAIL_R * Math.cos(rad)
          const ty = TAIL_R * Math.sin(rad)
          /* slightly curve each feather outward */
          const midX = (tx / 2) + (i % 2 === 0 ? -4 : 4)
          const midY = ty / 2 - 4
          return (
            <g key={angle}>
              {/* curved feather stem */}
              <path
                d={`M 0,0 Q ${midX},${midY} ${tx},${ty}`}
                strokeWidth="0.65"
              />
              {/* eye ring */}
              <circle cx={tx} cy={ty} r="5" strokeWidth="0.6" />
              {/* dot inside eye */}
              <circle cx={tx} cy={ty} r="2" fill={GOLD} fillOpacity="0.45" stroke="none" />
              {/* 6 short rays around eye */}
              {[0, 60, 120, 180, 240, 300].map(ray => {
                const rrad = (ray * Math.PI) / 180
                return (
                  <line
                    key={ray}
                    x1={tx + 5 * Math.cos(rrad)}
                    y1={ty + 5 * Math.sin(rrad)}
                    x2={tx + 9 * Math.cos(rrad)}
                    y2={ty + 9 * Math.sin(rrad)}
                    strokeWidth="0.4"
                  />
                )
              })}
            </g>
          )
        })}

        {/* Subtle arc connecting feather tips */}
        <path
          d={`M ${TAIL_R * Math.cos((-135 * Math.PI) / 180)},${TAIL_R * Math.sin((-135 * Math.PI) / 180)} Q 0,${-TAIL_R - 12} ${TAIL_R * Math.cos((-45 * Math.PI) / 180)},${TAIL_R * Math.sin((-45 * Math.PI) / 180)}`}
          strokeWidth="0.35"
          strokeDasharray="1.5 2"
        />

        {/* ── BODY ── */}
        <ellipse cx="2" cy="16" rx="11" ry="16" strokeWidth="0.8" />
        {/* Wing accent */}
        <path d="M -8,12 Q 2,19 12,12" strokeWidth="0.5" />
        {/* Feather texture on body */}
        <path d="M -4,6 Q 2,10 8,6" strokeWidth="0.35" strokeDasharray="1 1.5" />
        <path d="M -6,16 Q 2,20 10,16" strokeWidth="0.35" strokeDasharray="1 1.5" />

        {/* ── NECK (curved) ── */}
        <path d="M 0,0 C -2,-6 -6,-10 -10,-14" strokeWidth="0.8" />

        {/* ── HEAD ── */}
        <circle cx="-10" cy="-18" r="5.5" strokeWidth="0.7" />
        {/* Eye */}
        <circle cx="-8.5" cy="-18" r="1.8" fill={GOLD} fillOpacity="0.55" stroke="none" />
        {/* Beak */}
        <path d="M -15.5,-17 L -19,-16" strokeWidth="0.9" />

        {/* ── CREST (3 plumes) ── */}
        <line x1="-10" y1="-23.5" x2="-13.5" y2="-31" strokeWidth="0.6" />
        <circle cx="-13.5" cy="-31" r="1.5" fill={GOLD} fillOpacity="0.6" stroke="none" />
        <line x1="-10" y1="-23.5" x2="-10" y2="-33" strokeWidth="0.6" />
        <circle cx="-10" cy="-33" r="1.5" fill={GOLD} fillOpacity="0.6" stroke="none" />
        <line x1="-10" y1="-23.5" x2="-6.5" y2="-31" strokeWidth="0.6" />
        <circle cx="-6.5" cy="-31" r="1.5" fill={GOLD} fillOpacity="0.6" stroke="none" />

        {/* ── LEGS ── */}
        <line x1="-3" y1="32" x2="-5" y2="41" strokeWidth="0.7" />
        <line x1="7" y1="32" x2="9" y2="41" strokeWidth="0.7" />
        {/* Toes */}
        <path d="M -5,41 L -9,43 M -5,41 L -3,44" strokeWidth="0.5" />
        <path d="M 9,41 L 13,43 M 9,41 L 7,44" strokeWidth="0.5" />

      </g>
    </svg>
  )
}
