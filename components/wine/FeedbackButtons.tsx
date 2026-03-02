'use client'

import { useState } from 'react'
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react'

type FeedbackRating = 'thumbs_up' | 'neutral' | 'thumbs_down'

interface FeedbackButtonsProps {
  wineId: string
  currentFeedback?: FeedbackRating | null
  onFeedbackGiven?: (rating: FeedbackRating) => void
}

const feedbackOptions: { rating: FeedbackRating; icon: typeof ThumbsUp; label: string }[] = [
  { rating: 'thumbs_up', icon: ThumbsUp, label: 'Loved it' },
  { rating: 'neutral', icon: Minus, label: 'It was OK' },
  { rating: 'thumbs_down', icon: ThumbsDown, label: 'Not for me' },
]

export default function FeedbackButtons({ wineId, currentFeedback, onFeedbackGiven }: FeedbackButtonsProps) {
  const [selected, setSelected] = useState<FeedbackRating | null>(currentFeedback || null)
  const [submitting, setSubmitting] = useState(false)

  const handleFeedback = async (rating: FeedbackRating) => {
    if (submitting) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wineId, rating }),
      })

      if (res.ok) {
        setSelected(rating)
        onFeedbackGiven?.(rating)
      }
    } catch {
      // Silently fail — feedback is optional
    } finally {
      setSubmitting(false)
    }
  }

  if (selected) {
    const option = feedbackOptions.find((o) => o.rating === selected)
    const Icon = option?.icon || ThumbsUp
    return (
      <div className="flex items-center gap-2 text-wine-primary">
        <Icon className="w-4 h-4" />
        <span className="font-sans text-body-sm font-medium">{option?.label}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {feedbackOptions.map(({ rating, icon: Icon, label }) => (
        <button
          key={rating}
          onClick={() => handleFeedback(rating)}
          disabled={submitting}
          className="
            flex items-center gap-1.5 px-3 h-10 rounded-md
            border border-gray-200 bg-white
            font-sans text-body-sm font-medium text-text-primary
            hover:border-wine-primary hover:text-wine-primary
            active:bg-wine-primary/5
            transition-colors min-h-[44px]
            disabled:opacity-50
          "
          type="button"
          aria-label={label}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
