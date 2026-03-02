'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import { getPersonalityById } from '@/lib/recommendation/personalities'
import type { WinePersonality } from '@/types/wine'

function LoadingDots() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 bg-wine-primary rounded-full animate-bounce" />
      </div>
    </div>
  )
}

function RevealContent() {
  const searchParams = useSearchParams()
  const personalityId = searchParams.get('p')
  const [personality, setPersonality] = useState<WinePersonality | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (personalityId) {
      const p = getPersonalityById(personalityId)
      if (p) setPersonality(p)
    } else {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data.personality) {
            const p = getPersonalityById(data.personality)
            if (p) setPersonality(p)
          }
        })
    }
  }, [personalityId])

  useEffect(() => {
    if (personality) {
      const timer = setTimeout(() => setVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [personality])

  if (!personality) {
    return <LoadingDots />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div
        className={`
          flex flex-col items-center gap-8 max-w-md w-full text-center
          transition-all duration-700 ease-out
          motion-reduce:transition-none
          ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
      >
        {/* Personality badge */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ backgroundColor: personality.color + '20' }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: personality.color }}
          >
            <span className="font-display text-white text-2xl font-bold">
              {personality.name.charAt(4).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <Typography variant="body-sm">You&apos;re a</Typography>
          <h1
            className="font-display font-bold text-h1"
            style={{ color: personality.color }}
          >
            {personality.name}
          </h1>
        </div>

        {/* Description */}
        <Typography variant="body" className="text-text-secondary">
          {personality.description}
        </Typography>

        {/* Characteristics */}
        <div className="flex flex-col gap-3 w-full">
          {personality.characteristics.map((trait) => (
            <div key={trait} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-match-green/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-match-green" />
              </div>
              <span className="font-sans text-body-sm text-text-primary text-left">{trait}</span>
            </div>
          ))}
        </div>

        {/* Example wines */}
        <div className="flex flex-wrap gap-2 justify-center">
          {personality.exampleWines.map((wine) => (
            <span
              key={wine}
              className="px-3 py-1.5 rounded-full text-caption font-sans font-medium"
              style={{
                backgroundColor: personality.color + '15',
                color: personality.color,
              }}
            >
              {wine}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link href="/scan" className="w-full mt-4">
          <Button variant="primary" size="lg" fullWidth>
            Scan Your First Wine
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function RevealPage() {
  return (
    <Suspense fallback={<LoadingDots />}>
      <RevealContent />
    </Suspense>
  )
}
