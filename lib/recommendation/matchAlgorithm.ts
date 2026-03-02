import { TasteVector, MatchColor, getMatchColor } from '@/types/wine'

const DIMENSION_WEIGHTS: Record<keyof TasteVector, number> = {
  tannin: 1.2,
  sweetness: 1.1,
  acidity: 1.0,
  body: 1.0,
  fruit: 0.9,
  style: 0.8,
}

const DIMENSIONS = Object.keys(DIMENSION_WEIGHTS) as (keyof TasteVector)[]

export function calculateMatchScore(userTaste: TasteVector, wineProfile: TasteVector): number {
  let weightedSumSq = 0
  let totalWeight = 0

  for (const dim of DIMENSIONS) {
    const w = DIMENSION_WEIGHTS[dim]
    const diff = userTaste[dim] - wineProfile[dim]
    weightedSumSq += w * diff * diff
    totalWeight += w
  }

  const maxDistance = Math.sqrt(totalWeight)
  const distance = Math.sqrt(weightedSumSq)
  const score = Math.round((1 - distance / maxDistance) * 100)

  return Math.max(0, Math.min(100, score))
}

const DIMENSION_LABELS: Record<keyof TasteVector, { low: string; high: string; name: string }> = {
  acidity: { low: 'low acidity', high: 'high acidity', name: 'Acidity' },
  tannin: { low: 'soft tannins', high: 'grippy tannins', name: 'Tannin' },
  fruit: { low: 'subtle fruit', high: 'bold fruit', name: 'Fruit' },
  sweetness: { low: 'bone dry', high: 'sweet', name: 'Sweetness' },
  body: { low: 'light body', high: 'full body', name: 'Body' },
  style: { low: 'classic style', high: 'natural/funky style', name: 'Style' },
}

export interface MatchExplanation {
  text: string
  type: 'positive' | 'neutral' | 'negative'
}

export function generateExplanation(
  userTaste: TasteVector,
  wineProfile: TasteVector,
  score: number
): MatchExplanation[] {
  const diffs: { dim: keyof TasteVector; diff: number; absDiff: number }[] = DIMENSIONS.map((dim) => ({
    dim,
    diff: userTaste[dim] - wineProfile[dim],
    absDiff: Math.abs(userTaste[dim] - wineProfile[dim]),
  }))

  diffs.sort((a, b) => a.absDiff - b.absDiff)

  const explanations: MatchExplanation[] = []

  // Best matches first (smallest diffs)
  for (const { dim, absDiff } of diffs) {
    if (explanations.length >= 3) break
    if (absDiff <= 0.15) {
      explanations.push({
        text: `${DIMENSION_LABELS[dim].name} matches your preference perfectly`,
        type: 'positive',
      })
    }
  }

  // Then biggest mismatches
  const sorted = [...diffs].sort((a, b) => b.absDiff - a.absDiff)
  for (const { dim, diff, absDiff } of sorted) {
    if (explanations.length >= 3) break
    if (absDiff > 0.3) {
      const wineIsHigher = diff < 0
      const label = wineIsHigher ? DIMENSION_LABELS[dim].high : DIMENSION_LABELS[dim].low
      explanations.push({
        text: `This wine has ${label} — ${absDiff > 0.5 ? 'far from' : 'different from'} your preference`,
        type: absDiff > 0.5 ? 'negative' : 'neutral',
      })
    }
  }

  // Fill remaining slots with neutral info
  if (explanations.length < 2) {
    const matchColor = getMatchColor(score)
    if (matchColor === 'green') {
      explanations.push({ text: 'Overall a great match for your palate', type: 'positive' })
    } else if (matchColor === 'yellow') {
      explanations.push({ text: 'Some aspects match, others may surprise you', type: 'neutral' })
    } else {
      explanations.push({ text: 'This wine differs significantly from your preferences', type: 'negative' })
    }
  }

  return explanations.slice(0, 3)
}

export interface MatchResult {
  score: number
  matchColor: MatchColor
  explanations: MatchExplanation[]
}

export function getFullMatch(userTaste: TasteVector, wineProfile: TasteVector): MatchResult {
  const score = calculateMatchScore(userTaste, wineProfile)
  const matchColor = getMatchColor(score)
  const explanations = generateExplanation(userTaste, wineProfile, score)
  return { score, matchColor, explanations }
}
