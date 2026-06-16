const GOLD = '#B7AC34'

/* ── Warli figure (hourglass body, circle head) ── */
function WarliDancer({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  const sx = flip ? -scale : scale
  return (
    <g transform={`translate(${x},${y}) scale(${sx},${scale})`} stroke={GOLD} fill="none" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="0" cy="-17" r="3.8" />
      {/* upper body — triangle apex-down at waist */}
      <polygon points="0,0 -8,-10 8,-10" />
      {/* lower body — triangle apex-up at waist */}
      <polygon points="-7,0 7,0 0,9" />
      {/* arms raised */}
      <line x1="-8" y1="-10" x2="-14" y2="-16" />
      <line x1="8" y1="-10" x2="14" y2="-16" />
      {/* legs spread */}
      <line x1="-7" y1="0" x2="-11" y2="10" />
      <line x1="7" y1="0" x2="11" y2="10" />
    </g>
  )
}

/* ── Stacked-triangle Warli tree ── */
function WarliTree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} stroke={GOLD} fill="none" strokeWidth="0.8" strokeLinecap="round">
      <line x1="0" y1="0" x2="0" y2="7" />
      <polygon points="0,-8 -13,0 13,0" />
      <polygon points="0,-16 -9,-8 9,-8" />
      <polygon points="0,-22 -5,-16 5,-16" />
    </g>
  )
}

/* ── Simple Warli hut ── */
function WarliHut({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} stroke={GOLD} fill="none" strokeWidth="0.8" strokeLinejoin="round">
      <rect x="-10" y="-10" width="20" height="16" />
      <polygon points="-12,-10 12,-10 0,-22" />
      <rect x="-3" y="-2" width="6" height="8" />
    </g>
  )
}

/* ── Warli sun with short radiating lines ── */
function WarliSun({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  return (
    <g stroke={GOLD} fill="none" strokeWidth="0.7">
      <circle cx={x} cy={y} r={r} />
      {Array.from({ length: 12 }, (_, i) => i * 30).map(angle => {
        const rad = (angle * Math.PI) / 180
        return (
          <line
            key={angle}
            x1={x + Math.cos(rad) * (r + 2)}
            y1={y + Math.sin(rad) * (r + 2)}
            x2={x + Math.cos(rad) * (r + 7)}
            y2={y + Math.sin(rad) * (r + 7)}
          />
        )
      })}
    </g>
  )
}

/* ── Warli deer (simple geometric) ── */
function WarliDeer({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`} stroke={GOLD} fill="none" strokeWidth="0.75" strokeLinecap="round">
      <ellipse cx="0" cy="-3" rx="10" ry="6" />
      <circle cx="-9" cy="-7" r="3.5" />
      <line x1="-6" y1="-5" x2="-9" y2="-4" />
      {/* four legs */}
      <line x1="-6" y1="3" x2="-7" y2="12" />
      <line x1="-2" y1="3" x2="-2" y2="12" />
      <line x1="3" y1="3" x2="3" y2="12" />
      <line x1="7" y1="3" x2="8" y2="12" />
      {/* antlers */}
      <path d="M -9,-10 L -11,-16 M -11,-16 L -14,-19 M -11,-16 L -9,-18" strokeWidth="0.6" />
      {/* tail */}
      <path d="M 10,-3 L 14,-5" strokeWidth="0.6" />
    </g>
  )
}

/* ── Circular Tarpa dance formation ── */
function WarliCircleDance({ cx, cy, r = 28, count = 6 }: { cx: number; cy: number; r?: number; count?: number }) {
  return (
    <g>
      {/* inner central circle (tarpa player) */}
      <circle cx={cx} cy={cy} r="4" stroke={GOLD} fill="none" strokeWidth="0.7" />
      {/* connecting dance ring */}
      <circle cx={cx} cy={cy} r={r} stroke={GOLD} fill="none" strokeWidth="0.35" strokeDasharray="1.5 3" />
      {Array.from({ length: count }, (_, i) => {
        const angle = (i * 360) / count
        const rad = (angle * Math.PI) / 180
        const fx = cx + r * Math.cos(rad)
        const fy = cy + r * Math.sin(rad)
        const faceAngle = angle + 90
        return (
          <g key={i} transform={`translate(${fx},${fy}) rotate(${faceAngle}) scale(0.72)`}>
            <circle cx="0" cy="-17" r="3.8" stroke={GOLD} fill="none" strokeWidth="0.9" />
            <polygon points="0,0 -8,-10 8,-10" stroke={GOLD} fill="none" strokeWidth="0.9" />
            <polygon points="-7,0 7,0 0,9" stroke={GOLD} fill="none" strokeWidth="0.9" />
            <line x1="-8" y1="-10" x2="-14" y2="-16" stroke={GOLD} strokeWidth="0.9" />
            <line x1="8" y1="-10" x2="14" y2="-16" stroke={GOLD} strokeWidth="0.9" />
            <line x1="-7" y1="0" x2="-11" y2="10" stroke={GOLD} strokeWidth="0.9" />
            <line x1="7" y1="0" x2="11" y2="10" stroke={GOLD} strokeWidth="0.9" />
          </g>
        )
      })}
    </g>
  )
}

interface WarliStripProps {
  className?: string
  opacity?: number
}

export default function WarliStrip({ className = '', opacity = 0.09 }: WarliStripProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1000 95"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Top triangle border ── */}
        <line x1="0" y1="4" x2="1000" y2="4" stroke={GOLD} strokeWidth="0.6" />
        {Array.from({ length: 100 }, (_, i) => (
          <polygon
            key={`top-${i}`}
            points={`${i * 10 + 5},4 ${i * 10 + 9},12 ${i * 10 + 1},12`}
            fill={GOLD}
            fillOpacity="0.4"
            stroke="none"
          />
        ))}
        <line x1="0" y1="13" x2="1000" y2="13" stroke={GOLD} strokeWidth="0.5" />

        {/* ── Ground line ── */}
        <line x1="0" y1="75" x2="1000" y2="75" stroke={GOLD} strokeWidth="0.8" />

        {/* ── Scene elements (everything sits ON ground line at y=75) ── */}

        {/* Left sun */}
        <WarliSun x={55} y={35} r={10} />

        {/* Left hut */}
        <WarliHut x={130} y={65} scale={1.05} />

        {/* Left tree */}
        <WarliTree x={200} y={68} scale={1.1} />

        {/* Left dance group */}
        <WarliDancer x={260} y={72} />
        <WarliDancer x={300} y={72} flip />
        <WarliDancer x={340} y={72} />

        {/* Left deer */}
        <WarliDeer x={395} y={60} scale={0.9} />

        {/* ── CENTER: Iconic Tarpa (circular dance) ── */}
        <WarliCircleDance cx={500} cy={45} r={26} count={7} />

        {/* Right deer */}
        <WarliDeer x={605} y={60} scale={0.9} />

        {/* Right dance group */}
        <WarliDancer x={655} y={72} flip />
        <WarliDancer x={695} y={72} />
        <WarliDancer x={735} y={72} flip />

        {/* Right tree */}
        <WarliTree x={800} y={68} scale={1.1} />

        {/* Right hut */}
        <WarliHut x={870} y={65} scale={1.05} />

        {/* Right sun */}
        <WarliSun x={950} y={35} r={10} />

        {/* ── Bottom triangle border (inverted) ── */}
        <line x1="0" y1="82" x2="1000" y2="82" stroke={GOLD} strokeWidth="0.5" />
        {Array.from({ length: 100 }, (_, i) => (
          <polygon
            key={`bot-${i}`}
            points={`${i * 10 + 5},91 ${i * 10 + 9},83 ${i * 10 + 1},83`}
            fill={GOLD}
            fillOpacity="0.4"
            stroke="none"
          />
        ))}
        <line x1="0" y1="91" x2="1000" y2="91" stroke={GOLD} strokeWidth="0.6" />
      </svg>
    </div>
  )
}
