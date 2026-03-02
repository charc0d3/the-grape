import Typography from '@/components/ui/Typography'
import MatchBadge from './MatchBadge'

interface WineCardProps {
  name: string
  producer?: string | null
  region?: string | null
  grape?: string | null
  vintage?: number | null
  type: string
  score?: number
  onClick?: () => void
}

export default function WineCard({
  name,
  producer,
  region,
  grape,
  vintage,
  type,
  score,
  onClick,
}: WineCardProps) {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={`
        w-full bg-white rounded-lg shadow-sm p-4
        text-left flex items-center gap-4
        ${onClick ? 'active:bg-gray-50 transition-colors cursor-pointer min-h-[44px]' : ''}
      `}
      onClick={onClick}
      {...(onClick ? { type: 'button' as const } : {})}
    >
      <div className="flex-1 min-w-0">
        <Typography variant="h3" className="truncate">{name}</Typography>
        {producer && (
          <Typography variant="body-sm" className="truncate">{producer}</Typography>
        )}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {grape && <Typography variant="caption">{grape}</Typography>}
          {grape && (region || vintage) && <span className="text-text-secondary text-caption">·</span>}
          {region && <Typography variant="caption">{region}</Typography>}
          {vintage && <Typography variant="caption">{vintage}</Typography>}
        </div>
        <span className="inline-block mt-1 px-2 py-0.5 bg-wine-primary/10 text-wine-primary font-sans text-caption rounded capitalize">
          {type}
        </span>
      </div>
      {score !== undefined && (
        <div className="flex-shrink-0">
          <MatchBadge score={score} size="sm" />
        </div>
      )}
    </Component>
  )
}
