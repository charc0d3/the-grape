'use client'

import { TasteVector } from '@/types/wine'
import Typography from '@/components/ui/Typography'

interface TasteBarsProps {
  tastVector: TasteVector
}

const dimensions: { key: keyof TasteVector; label: string }[] = [
  { key: 'acidity', label: 'Acidity' },
  { key: 'tannin', label: 'Tannin' },
  { key: 'fruit', label: 'Fruit' },
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'body', label: 'Body' },
  { key: 'style', label: 'Style' },
]

export default function TasteBars({ tastVector }: TasteBarsProps) {
  return (
    <div className="flex flex-col gap-3">
      {dimensions.map((dim, index) => {
        const value = Math.round(tastVector[dim.key] * 100)
        return (
          <div
            key={dim.key}
            className="motion-safe:animate-fade-in-up motion-safe:opacity-0"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
          >
            <div className="flex items-center justify-between mb-1">
              <Typography variant="body-sm" className="font-medium">
                {dim.label}
              </Typography>
              <Typography variant="caption" className="text-text-secondary">
                {value}%
              </Typography>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-wine-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
