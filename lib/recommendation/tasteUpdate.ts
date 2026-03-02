import { TasteVector } from '@/types/wine'

type FeedbackType = 'thumbs_up' | 'neutral' | 'thumbs_down'

const ADJUSTMENT_FACTORS: Record<FeedbackType, number> = {
  thumbs_up: 1.0,
  neutral: 0.3,
  thumbs_down: -0.5,
}

const DIMENSIONS: (keyof TasteVector)[] = [
  'acidity', 'tannin', 'fruit', 'sweetness', 'body', 'style',
]

export function updateTasteProfile(
  currentTaste: TasteVector,
  wineProfile: TasteVector,
  feedback: FeedbackType,
  numFeedbacks: number
): TasteVector {
  const learningRate = Math.max(0.1, 1.0 / (1 + numFeedbacks / 10))
  const adjustmentFactor = ADJUSTMENT_FACTORS[feedback]

  const newTaste = { ...currentTaste }

  for (const dim of DIMENSIONS) {
    const diff = wineProfile[dim] - currentTaste[dim]
    const adjustment = learningRate * adjustmentFactor * diff
    newTaste[dim] = Math.max(0, Math.min(1, newTaste[dim] + adjustment))
  }

  return newTaste
}
