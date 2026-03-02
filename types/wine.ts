export interface TasteVector {
  acidity: number
  tannin: number
  fruit: number
  sweetness: number
  body: number
  style: number
}

export type WinePersonalityId =
  | 'fresh_classic'
  | 'smooth_operator'
  | 'bold_adventurer'
  | 'crisp_minimalist'
  | 'rich_indulger'
  | 'sweet_tooth'
  | 'wild_experimenter'
  | 'elegant_classicist'

export interface WinePersonality {
  id: WinePersonalityId
  name: string
  description: string
  characteristics: string[]
  color: string
  exampleWines: string[]
  vector: TasteVector
}

export type MaturityPhase = 'young' | 'maturing' | 'peak' | 'declining'

export const MATURITY_LABELS: Record<MaturityPhase, { label: string; color: string }> = {
  young:     { label: 'Young',     color: '#5A9367' },
  maturing:  { label: 'Maturing',  color: '#C9A961' },
  peak:      { label: 'Peak',      color: '#6B2737' },
  declining: { label: 'Declining', color: '#787878' },
}

export type MatchColor = 'green' | 'yellow' | 'red'

export function getMatchColor(score: number): MatchColor {
  if (score >= 85) return 'green'
  if (score >= 60) return 'yellow'
  return 'red'
}
