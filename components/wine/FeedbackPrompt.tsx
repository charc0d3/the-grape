'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, Minus, ThumbsDown, X } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import MatchBadge from '@/components/wine/MatchBadge'

interface PendingFeedback {
  scanId: string
  wineId: string
  wineName: string
  producer: string | null
  score: number | null
  matchColor: string | null
  scannedAt: string
}

type FeedbackRating = 'thumbs_up' | 'neutral' | 'thumbs_down'

const options: { rating: FeedbackRating; icon: typeof ThumbsUp; label: string }[] = [
  { rating: 'thumbs_up', icon: ThumbsUp, label: 'Loved it' },
  { rating: 'neutral', icon: Minus, label: 'It was OK' },
  { rating: 'thumbs_down', icon: ThumbsDown, label: 'Not for me' },
]

export default function FeedbackPrompt() {
  const [pending, setPending] = useState<PendingFeedback | null>(null)
  const [visible, setVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/feedback/pending')
      .then((res) => res.json())
      .then((data) => {
        if (data.pending) {
          setPending(data.pending)
          setVisible(true)
        }
      })
      .catch(() => {})
  }, [])

  const handleFeedback = async (rating: FeedbackRating) => {
    if (!pending || submitting) return
    setSubmitting(true)

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wineId: pending.wineId, rating }),
      })
    } catch {
      // Feedback is optional
    }

    setVisible(false)
  }

  const handleSkip = () => {
    setVisible(false)
  }

  if (!visible || !pending) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm motion-safe:animate-fade-in"
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-xl p-6 w-full max-w-sm shadow-lg motion-safe:animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-label="Wine feedback"
      >
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 min-w-[44px] min-h-[44px]"
          type="button"
          aria-label="Skip"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        <Typography variant="h3" className="mb-4 pr-8">
          Did you try this?
        </Typography>

        {/* Wine info */}
        <div className="mb-6">
          <Typography variant="body" className="font-semibold">
            {pending.wineName}
          </Typography>
          {pending.producer && (
            <Typography variant="body-sm">{pending.producer}</Typography>
          )}
          <div className="flex items-center gap-2 mt-2">
            {pending.score !== null && (
              <MatchBadge score={pending.score} size="sm" />
            )}
            <Typography variant="caption">
              Scanned {formatTimeAgo(pending.scannedAt)}
            </Typography>
          </div>
        </div>

        {/* Feedback buttons */}
        <div className="flex flex-col gap-3">
          {options.map(({ rating, icon: Icon, label }) => (
            <button
              key={rating}
              onClick={() => handleFeedback(rating)}
              disabled={submitting}
              className="
                flex items-center gap-3 w-full px-4 h-12 rounded-md
                border border-gray-200 bg-white
                font-sans text-body font-medium text-text-primary
                hover:border-wine-primary hover:text-wine-primary
                active:bg-wine-primary/5
                transition-colors min-h-[44px]
                disabled:opacity-50
              "
              type="button"
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Skip link */}
        <button
          onClick={handleSkip}
          className="w-full mt-4 py-2 font-sans text-body-sm text-text-secondary text-center hover:text-text-primary transition-colors min-h-[44px]"
          type="button"
        >
          Skip
        </button>
      </div>
    </div>
  )
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return 'last week'
  return `${Math.floor(diffDays / 7)} weeks ago`
}
