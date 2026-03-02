'use client'

import { MaturityPhase, MATURITY_LABELS } from '@/types/wine'
import Typography from '@/components/ui/Typography'

interface MaturityCurveProps {
  vintage: number
  drinkingWindowStart: number
  drinkingWindowEnd: number
  storagePotential: number
  maturityPhase: MaturityPhase
}

export default function MaturityCurve({
  vintage,
  drinkingWindowStart,
  drinkingWindowEnd,
  storagePotential,
  maturityPhase,
}: MaturityCurveProps) {
  const currentYear = 2026
  const startYear = vintage
  const endYear = vintage + storagePotential
  const totalSpan = endYear - startYear
  const currentPos = totalSpan > 0 ? ((currentYear - startYear) / totalSpan) * 100 : 50
  const windowStartPos = totalSpan > 0 ? ((drinkingWindowStart - startYear) / totalSpan) * 100 : 30
  const windowEndPos = totalSpan > 0 ? ((drinkingWindowEnd - startYear) / totalSpan) * 100 : 70

  // Clamp current position between 2% and 98%
  const clampedCurrentPos = Math.max(2, Math.min(98, currentPos))

  const phaseInfo = MATURITY_LABELS[maturityPhase]

  // Build SVG bell curve path
  const svgWidth = 320
  const svgHeight = 120
  const curveHeight = 80
  const curveY = svgHeight - 30

  // Generate bell curve points
  const points: string[] = []
  for (let i = 0; i <= 100; i += 1) {
    const x = (i / 100) * svgWidth
    // Bell curve centered at the peak drinking window midpoint
    const peakCenter = (windowStartPos + windowEndPos) / 2
    const sigma = (windowEndPos - windowStartPos) / 2.5
    const exponent = -Math.pow(i - peakCenter, 2) / (2 * sigma * sigma)
    const y = curveY - curveHeight * Math.exp(exponent)
    points.push(`${x},${y}`)
  }
  const curvePath = `M0,${curveY} L${points.join(' L')} L${svgWidth},${curveY} Z`

  // Phase color regions
  const youngEnd = windowStartPos * 0.6
  const maturingEnd = windowStartPos
  const peakEnd = windowEndPos

  const currentX = (clampedCurrentPos / 100) * svgWidth

  // Recommendation text
  let recommendation: string
  if (currentYear < drinkingWindowStart) {
    const yearsToWait = drinkingWindowStart - currentYear
    recommendation = `Cellar for ${yearsToWait} more year${yearsToWait > 1 ? 's' : ''}`
  } else if (currentYear <= drinkingWindowEnd) {
    recommendation = 'Drink now — in peak window'
  } else {
    recommendation = 'Past peak — drink soon if still cellared'
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto"
        aria-label={`Maturity curve showing wine is ${maturityPhase}`}
      >
        <defs>
          <clipPath id="curve-clip">
            <path d={curvePath} />
          </clipPath>
        </defs>

        {/* Phase colored regions clipped to curve */}
        <g clipPath="url(#curve-clip)">
          {/* Young phase */}
          <rect
            x={0}
            y={0}
            width={(youngEnd / 100) * svgWidth}
            height={svgHeight}
            fill={MATURITY_LABELS.young.color}
            opacity={0.3}
          />
          {/* Maturing phase */}
          <rect
            x={(youngEnd / 100) * svgWidth}
            y={0}
            width={((maturingEnd - youngEnd) / 100) * svgWidth}
            height={svgHeight}
            fill={MATURITY_LABELS.maturing.color}
            opacity={0.3}
          />
          {/* Peak phase */}
          <rect
            x={(maturingEnd / 100) * svgWidth}
            y={0}
            width={((peakEnd - maturingEnd) / 100) * svgWidth}
            height={svgHeight}
            fill={MATURITY_LABELS.peak.color}
            opacity={0.3}
          />
          {/* Declining phase */}
          <rect
            x={(peakEnd / 100) * svgWidth}
            y={0}
            width={((100 - peakEnd) / 100) * svgWidth}
            height={svgHeight}
            fill={MATURITY_LABELS.declining.color}
            opacity={0.3}
          />
        </g>

        {/* Curve outline */}
        <path
          d={curvePath}
          fill="none"
          stroke="#2D2D2D"
          strokeWidth={1.5}
          opacity={0.3}
        />

        {/* Drinking window bracket */}
        <rect
          x={(windowStartPos / 100) * svgWidth}
          y={curveY - 2}
          width={((windowEndPos - windowStartPos) / 100) * svgWidth}
          height={4}
          fill="#6B2737"
          rx={2}
        />

        {/* Current year marker */}
        <line
          x1={currentX}
          y1={10}
          x2={currentX}
          y2={curveY}
          stroke="#2D2D2D"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <circle
          cx={currentX}
          cy={10}
          r={4}
          fill="#6B2737"
        />

        {/* X-axis labels */}
        <text x={4} y={svgHeight - 4} className="fill-text-secondary" fontSize={10} fontFamily="sans-serif">
          {startYear}
        </text>
        <text x={svgWidth - 4} y={svgHeight - 4} className="fill-text-secondary" fontSize={10} fontFamily="sans-serif" textAnchor="end">
          {endYear}
        </text>
        <text x={currentX} y={svgHeight - 4} className="fill-text-primary" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight={600}>
          {currentYear}
        </text>
      </svg>

      <div className="flex items-center justify-between mt-3">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full font-sans text-body-sm font-medium text-white"
          style={{ backgroundColor: phaseInfo.color }}
        >
          {phaseInfo.label}
        </span>
        <Typography variant="body-sm" className="text-text-secondary">
          {recommendation}
        </Typography>
      </div>
    </div>
  )
}
