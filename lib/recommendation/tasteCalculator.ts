import { TasteVector, WinePersonalityId } from '@/types/wine'
import { personalities } from './personalities'

type QuizAnswers = Record<number, 'a' | 'b'>

/**
 * Maps 5 quiz answers to a 6-dimension taste vector.
 *
 * Q1 (lemons): a=high acidity, b=sweetness
 * Q2 (dinner): a=full body + tannin, b=light body
 * Q3 (coffee): a=dry/minimal, b=rich/creamy
 * Q4 (new food): a=adventurous/funky style, b=classic style
 * Q5 (chocolate): a=bold/intense, b=sweet/fruity
 */
export function calculateTasteVector(answers: QuizAnswers): TasteVector {
  const vector: TasteVector = {
    acidity: 0.5,
    tannin: 0.5,
    fruit: 0.5,
    sweetness: 0.5,
    body: 0.5,
    style: 0.5,
  }

  // Q1: Acidity vs Sweetness
  if (answers[1] === 'a') {
    vector.acidity = 0.8
    vector.sweetness = 0.2
  } else {
    vector.acidity = 0.3
    vector.sweetness = 0.7
  }

  // Q2: Body & Tannin
  if (answers[2] === 'a') {
    vector.body = 0.8
    vector.tannin = 0.7
  } else {
    vector.body = 0.3
    vector.tannin = 0.2
  }

  // Q3: Richness (modifies body and fruit)
  if (answers[3] === 'a') {
    vector.body = Math.max(vector.body - 0.1, 0)
    vector.fruit = 0.3
  } else {
    vector.body = Math.min(vector.body + 0.1, 1)
    vector.fruit = 0.7
  }

  // Q4: Style (conventional vs funky)
  if (answers[4] === 'a') {
    vector.style = 0.8
  } else {
    vector.style = 0.2
  }

  // Q5: Intensity (modifies tannin and sweetness)
  if (answers[5] === 'a') {
    vector.tannin = Math.min(vector.tannin + 0.15, 1)
    vector.sweetness = Math.max(vector.sweetness - 0.1, 0)
  } else {
    vector.tannin = Math.max(vector.tannin - 0.1, 0)
    vector.sweetness = Math.min(vector.sweetness + 0.15, 1)
  }

  return vector
}

function euclideanDistance(a: TasteVector, b: TasteVector): number {
  const keys: (keyof TasteVector)[] = ['acidity', 'tannin', 'fruit', 'sweetness', 'body', 'style']
  let sum = 0
  for (const key of keys) {
    sum += Math.pow(a[key] - b[key], 2)
  }
  return Math.sqrt(sum)
}

export function determinePersonality(vector: TasteVector): WinePersonalityId {
  let closestId: WinePersonalityId = 'fresh_classic'
  let closestDistance = Infinity

  for (const personality of personalities) {
    const distance = euclideanDistance(vector, personality.vector)
    if (distance < closestDistance) {
      closestDistance = distance
      closestId = personality.id
    }
  }

  return closestId
}
