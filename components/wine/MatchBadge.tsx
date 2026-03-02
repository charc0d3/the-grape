'use client'

import { MatchColor, getMatchColor } from '@/types/wine'

interface MatchBadgeProps {
  score: number
  size?: 'lg' | 'sm'
}

const colorClasses: Record<MatchColor, { bg: string; text: string }> = {
  green: { bg: 'bg-match-green', text: 'text-white' },
  yellow: { bg: 'bg-match-yellow', text: 'text-white' },
  red: { bg: 'bg-match-red', text: 'text-white' },
}

export default function MatchBadge({ score, size = 'sm' }: MatchBadgeProps) {
  const matchColor = getMatchColor(score)
  const colors = colorClasses[matchColor]

  if (size === 'lg') {
    return (
      <div
        className={`
          ${colors.bg} ${colors.text} rounded-lg
          w-40 h-20 flex flex-col items-center justify-center
          motion-safe:animate-bounce-in
        `}
        role="status"
        aria-label={`${score}% match`}
      >
        <span className="font-display font-bold text-[3rem] leading-none">{score}%</span>
        <span className="font-sans text-xs font-semibold tracking-widest uppercase">Match</span>
      </div>
    )
  }

  return (
    <div
      className={`
        ${colors.bg} ${colors.text} rounded-md
        px-2.5 py-1 inline-flex items-center gap-1
      `}
      role="status"
      aria-label={`${score}% match`}
    >
      <span className="font-sans text-body-sm font-bold">{score}%</span>
    </div>
  )
}
