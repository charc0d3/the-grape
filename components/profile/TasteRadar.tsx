'use client'

import { TasteVector } from '@/types/wine'

interface TasteRadarProps {
  tasteVector: TasteVector
  color?: string
  size?: number
}

const LABELS: { key: keyof TasteVector; label: string }[] = [
  { key: 'acidity', label: 'Acidity' },
  { key: 'tannin', label: 'Tannin' },
  { key: 'fruit', label: 'Fruit' },
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'body', label: 'Body' },
  { key: 'style', label: 'Style' },
]

const GRID_LEVELS = [0.25, 0.5, 0.75, 1.0]

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleIndex: number,
  total: number
): { x: number; y: number } {
  const angle = (Math.PI * 2 * angleIndex) / total - Math.PI / 2
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }
}

export default function TasteRadar({
  tasteVector,
  color = '#6B2737',
  size = 240,
}: TasteRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const maxRadius = size / 2 - 32
  const n = LABELS.length

  // Grid polygons
  const gridPolygons = GRID_LEVELS.map((level) => {
    const points = Array.from({ length: n }, (_, i) => {
      const p = polarToCartesian(cx, cy, maxRadius * level, i, n)
      return `${p.x},${p.y}`
    }).join(' ')
    return points
  })

  // Axis lines
  const axes = Array.from({ length: n }, (_, i) =>
    polarToCartesian(cx, cy, maxRadius, i, n)
  )

  // Data polygon
  const dataPoints = LABELS.map((l, i) => {
    const value = Math.max(0, Math.min(1, tasteVector[l.key]))
    const p = polarToCartesian(cx, cy, maxRadius * value, i, n)
    return `${p.x},${p.y}`
  }).join(' ')

  // Label positions (outside the chart)
  const labelPositions = LABELS.map((l, i) => {
    const p = polarToCartesian(cx, cy, maxRadius + 20, i, n)
    return { ...l, x: p.x, y: p.y }
  })

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        className="max-w-[240px] mx-auto block"
        role="img"
        aria-label={`Taste profile radar chart showing: ${LABELS.map(
          (l) => `${l.label} ${Math.round(tasteVector[l.key] * 100)}%`
        ).join(', ')}`}
      >
        {/* Grid polygons */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#E8E6E3"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axes.map((p, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="#E8E6E3"
            strokeWidth="1"
          />
        ))}

        {/* Data area */}
        <polygon
          points={dataPoints}
          fill={color}
          fillOpacity={0.2}
          stroke={color}
          strokeWidth="2"
        />

        {/* Data points */}
        {LABELS.map((l, i) => {
          const value = Math.max(0, Math.min(1, tasteVector[l.key]))
          const p = polarToCartesian(cx, cy, maxRadius * value, i, n)
          return (
            <circle
              key={l.key}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          )
        })}

        {/* Labels */}
        {labelPositions.map((l) => (
          <text
            key={l.key}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-sans"
            fill="#2D2D2D"
            fontSize="11"
          >
            {l.label}
          </text>
        ))}
      </svg>
    </div>
  )
}
