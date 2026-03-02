'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Grape, Check, AlertTriangle, X as XIcon } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import MatchBadge from '@/components/wine/MatchBadge'
import TasteBars from '@/components/wine/TasteBars'
import MaturityCurve from '@/components/wine/MaturityCurve'
import FoodPairings from '@/components/wine/FoodPairings'
import StorageInfo from '@/components/wine/StorageInfo'
import WhereToBuy from '@/components/wine/WhereToBuy'
import FeedbackButtons from '@/components/wine/FeedbackButtons'
import { TasteVector, MatchColor, MaturityPhase } from '@/types/wine'

interface MatchExplanation {
  text: string
  type: 'positive' | 'neutral' | 'negative'
}

interface WineDetail {
  wine: {
    id: string
    name: string
    producer: string | null
    region: string | null
    country: string | null
    grape: string | null
    vintage: number | null
    type: string
    tastVector: TasteVector | null
    drinkingWindowStart: number | null
    drinkingWindowEnd: number | null
    maturityPhase: string | null
    storagePotential: number | null
    foodPairings: string[]
  }
  scan: {
    id: string
    score: number | null
    matchColor: MatchColor | null
    createdAt: string
  } | null
  feedback: {
    id: string
    rating: string
  } | null
  explanations: MatchExplanation[] | null
}

const explanationIcons: Record<MatchExplanation['type'], typeof Check> = {
  positive: Check,
  neutral: AlertTriangle,
  negative: XIcon,
}

const explanationIconColors: Record<MatchExplanation['type'], string> = {
  positive: 'text-match-green',
  neutral: 'text-match-yellow',
  negative: 'text-match-red',
}

const matchTitles: Record<MatchColor, string> = {
  green: 'Great match for you',
  yellow: 'Moderate match',
  red: 'Not your style',
}

export default function WineDetailPage() {
  const router = useRouter()
  const params = useParams()
  const wineId = params.id as string

  const [data, setData] = useState<WineDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!wineId) return

    fetch(`/api/wines/${wineId}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [wineId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce" />
        </div>
      </div>
    )
  }

  if (!data || !data.wine) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-4">
        <Typography variant="h2">Wine not found</Typography>
        <Button variant="secondary" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  const { wine, scan, feedback, explanations } = data

  return (
    <div className="px-4 pt-4 pb-24 max-w-lg mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 min-w-[44px] min-h-[44px] mb-6"
        type="button"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-text-primary" />
        <span className="font-sans text-body-sm text-text-secondary">Back</span>
      </button>

      {/* Header */}
      <div className="mb-8 motion-safe:animate-fade-in">
        <div className="w-full h-48 rounded-lg bg-wine-primary/10 flex items-center justify-center mb-4">
          <Grape className="w-16 h-16 text-wine-primary/40" />
        </div>
        <Typography variant="h1">{wine.name}</Typography>
        {wine.producer && (
          <Typography variant="body" className="mt-1 text-text-secondary">
            {wine.producer}
          </Typography>
        )}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {wine.grape && <Typography variant="caption">{wine.grape}</Typography>}
          {wine.grape && wine.region && (
            <span className="text-text-secondary text-caption">·</span>
          )}
          {wine.region && <Typography variant="caption">{wine.region}</Typography>}
          {wine.vintage && (
            <>
              <span className="text-text-secondary text-caption">·</span>
              <Typography variant="caption">{wine.vintage}</Typography>
            </>
          )}
        </div>
        <span className="inline-block mt-2 px-2 py-0.5 bg-wine-primary/10 text-wine-primary font-sans text-caption rounded capitalize">
          {wine.type}
        </span>
      </div>

      {/* Match Score */}
      <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        {scan && scan.score !== null && scan.matchColor ? (
          <div>
            <Typography variant="h3" className="mb-4">Your Match</Typography>
            <div className="flex items-center gap-4 mb-4">
              <MatchBadge score={scan.score} size="lg" />
              <Typography variant="body" className="font-medium">
                {matchTitles[scan.matchColor]}
              </Typography>
            </div>
            {explanations && explanations.length > 0 && (
              <div className="flex flex-col gap-2">
                {explanations.map((exp, i) => {
                  const Icon = explanationIcons[exp.type]
                  const iconColor = explanationIconColors[exp.type]
                  return (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                      <div className={`flex-shrink-0 mt-0.5 ${iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <Typography variant="body-sm">{exp.text}</Typography>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-bg-primary rounded-lg p-6 text-center">
            <Typography variant="body" className="mb-3 text-text-secondary">
              Scan this wine to see your personal match score
            </Typography>
            <Button variant="primary" onClick={() => router.push('/scan')}>
              Scan Wine
            </Button>
          </div>
        )}
      </div>

      {/* Taste Profile */}
      {wine.tastVector && (
        <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <Typography variant="h3" className="mb-4">Taste Profile</Typography>
          <TasteBars tastVector={wine.tastVector} />
        </div>
      )}

      {/* Maturity */}
      {wine.vintage && wine.drinkingWindowStart && wine.drinkingWindowEnd && wine.storagePotential && wine.maturityPhase && (
        <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <Typography variant="h3" className="mb-4">Maturity</Typography>
          <MaturityCurve
            vintage={wine.vintage}
            drinkingWindowStart={wine.drinkingWindowStart}
            drinkingWindowEnd={wine.drinkingWindowEnd}
            storagePotential={wine.storagePotential}
            maturityPhase={wine.maturityPhase as MaturityPhase}
          />
        </div>
      )}

      {/* Food Pairings */}
      {wine.foodPairings && wine.foodPairings.length > 0 && (
        <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <Typography variant="h3" className="mb-4">Food Pairings</Typography>
          <FoodPairings pairings={wine.foodPairings} />
        </div>
      )}

      {/* Storage Info */}
      {wine.storagePotential && (
        <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <Typography variant="h3" className="mb-4">Storage</Typography>
          <StorageInfo storagePotential={wine.storagePotential} wineType={wine.type} />
        </div>
      )}

      {/* Where to Buy */}
      <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <WhereToBuy wineName={wine.name} />
      </div>

      {/* Feedback */}
      {scan && (
        <div className="mb-8 motion-safe:animate-fade-in-up motion-safe:opacity-0" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
          <Typography variant="h3" className="mb-4">Your Feedback</Typography>
          <FeedbackButtons
            wineId={wine.id}
            currentFeedback={feedback?.rating as 'thumbs_up' | 'neutral' | 'thumbs_down' | undefined}
          />
        </div>
      )}
    </div>
  )
}
