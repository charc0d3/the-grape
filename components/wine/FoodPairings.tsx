'use client'

import {
  Beef,
  Fish,
  Salad,
  CircleDot,
  Drumstick,
  UtensilsCrossed,
  Cherry,
  Dessert,
  Soup,
  Sandwich,
} from 'lucide-react'
import Typography from '@/components/ui/Typography'

interface FoodPairingsProps {
  pairings: string[]
}

const FOOD_ICON_MAP: Record<string, typeof UtensilsCrossed> = {
  beef: Beef,
  steak: Beef,
  lamb: Beef,
  ribs: Beef,
  venison: Beef,
  boar: Beef,
  pork: Beef,
  fish: Fish,
  salmon: Fish,
  lobster: Fish,
  oysters: Fish,
  shrimp: Fish,
  seafood: Fish,
  ceviche: Fish,
  sushi: Fish,
  salad: Salad,
  asparagus: Salad,
  vegetables: Salad,
  cheese: CircleDot,
  gouda: CircleDot,
  parmesan: CircleDot,
  pecorino: CircleDot,
  manchego: CircleDot,
  cheddar: CircleDot,
  comté: CircleDot,
  roquefort: CircleDot,
  munster: CircleDot,
  gruyère: CircleDot,
  chicken: Drumstick,
  duck: Drumstick,
  fruit: Cherry,
  apricot: Cherry,
  chocolate: Dessert,
  dessert: Dessert,
  cake: Dessert,
  tart: Dessert,
  biscotti: Dessert,
  brûlée: Dessert,
  stew: Soup,
  bouillabaisse: Soup,
  curry: Soup,
  pizza: Sandwich,
  bruschetta: Sandwich,
  quiche: Sandwich,
  empanadas: Sandwich,
}

function getIconForFood(food: string): typeof UtensilsCrossed {
  const lower = food.toLowerCase()
  for (const [keyword, icon] of Object.entries(FOOD_ICON_MAP)) {
    if (lower.includes(keyword)) return icon
  }
  return UtensilsCrossed
}

export default function FoodPairings({ pairings }: FoodPairingsProps) {
  if (!pairings || pairings.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-3">
      {pairings.map((pairing, index) => {
        const Icon = getIconForFood(pairing)
        return (
          <div
            key={pairing}
            className="bg-bg-primary rounded-lg p-3 flex items-center gap-3 motion-safe:animate-fade-in-up motion-safe:opacity-0"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
          >
            <div className="w-9 h-9 rounded-md bg-wine-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-wine-primary" />
            </div>
            <Typography variant="body-sm" className="font-medium">
              {pairing}
            </Typography>
          </div>
        )
      })}
    </div>
  )
}
