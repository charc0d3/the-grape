'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Check, AlertTriangle, X as XIcon, ArrowLeft } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import MatchBadge from '@/components/wine/MatchBadge'
import BottomSheet from '@/components/ui/BottomSheet'
import WhereToBuy from '@/components/wine/WhereToBuy'
import { MatchColor } from '@/types/wine'

interface MatchExplanation {
  text: string
  type: 'positive' | 'neutral' | 'negative'
}

interface ScanResult {
  scan: { id: string }
  wine: {
    id: string
    name: string
    producer: string | null
    region: string | null
    grape: string | null
    vintage: number | null
    type: string
  }
  score: number
  matchColor: MatchColor
  explanations: MatchExplanation[]
}

const matchTitles: Record<MatchColor, string> = {
  green: 'This wine is perfect for you',
  yellow: 'This could work, but moderate risk',
  red: 'Not recommended for your taste',
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

function LoadingState() {
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

function MatchResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const scanId = searchParams.get('id')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [buySheetOpen, setBuySheetOpen] = useState(false)
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    if (!scanId) return

    fetch(`/api/scan/${scanId}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [scanId])

  if (loading) return <LoadingState />

  if (!result || !result.score) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-4">
        <Typography variant="h2">Result not found</Typography>
        <Button variant="secondary" onClick={() => router.push('/scan')}>
          Back to Scan
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="px-4 pt-4 pb-24 max-w-lg mx-auto">
        <button
          onClick={() => router.push('/scan')}
          className="flex items-center gap-2 min-w-[44px] min-h-[44px] mb-6"
          type="button"
          aria-label="Back to scan"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
          <span className="font-sans text-body-sm text-text-secondary">Scan another</span>
        </button>

        <div className="flex flex-col items-center text-center gap-4 mb-8 motion-safe:animate-fade-in">
          <MatchBadge score={result.score} size="lg" />
          <Typography variant="h2" className="mt-2">
            {matchTitles[result.matchColor]}
          </Typography>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 motion-safe:animate-fade-in motion-safe:[animation-delay:100ms]">
          <Typography variant="h3">{result.wine.name}</Typography>
          {result.wine.producer && (
            <Typography variant="body-sm" className="mt-1">{result.wine.producer}</Typography>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {result.wine.grape && <Typography variant="caption">{result.wine.grape}</Typography>}
            {result.wine.grape && result.wine.region && (
              <span className="text-text-secondary text-caption">·</span>
            )}
            {result.wine.region && <Typography variant="caption">{result.wine.region}</Typography>}
            {result.wine.vintage && (
              <>
                <span className="text-text-secondary text-caption">·</span>
                <Typography variant="caption">{result.wine.vintage}</Typography>
              </>
            )}
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 bg-wine-primary/10 text-wine-primary font-sans text-caption rounded capitalize">
            {result.wine.type}
          </span>
        </div>

        {result.explanations && result.explanations.length > 0 && (
          <div className="flex flex-col gap-3 mb-8 motion-safe:animate-fade-in motion-safe:[animation-delay:200ms]">
            {result.explanations.map((exp, i) => {
              const Icon = explanationIcons[exp.type]
              const iconColor = explanationIconColors[exp.type]
              return (
                <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <div className={`flex-shrink-0 mt-0.5 ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Typography variant="body-sm" className="text-text-primary">
                    {exp.text}
                  </Typography>
                </div>
              )
            })}
          </div>
        )}

        <div className="flex flex-col gap-3 motion-safe:animate-fade-in motion-safe:[animation-delay:300ms]">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setSaved(true)}
            disabled={saved}
          >
            {saved ? 'Saved to My Wines' : 'Save to My Wines'}
          </Button>

          {result.matchColor === 'red' ? (
            <Button
              variant="primary"
              fullWidth
              onClick={() => router.push('/scan')}
            >
              Show Better Matches
            </Button>
          ) : (
            <Button
              variant="primary"
              fullWidth
              onClick={() => setBuySheetOpen(true)}
            >
              Where to Buy
            </Button>
          )}
        </div>
      </div>

      <BottomSheet isOpen={buySheetOpen} onClose={() => setBuySheetOpen(false)}>
        <WhereToBuy wineName={result.wine.name} />
      </BottomSheet>
    </>
  )
}

export default function MatchResultPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MatchResultContent />
    </Suspense>
  )
}
