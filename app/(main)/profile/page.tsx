'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw, LogOut, Share2, SlidersHorizontal, ScanLine, MessageCircle } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import TasteRadar from '@/components/profile/TasteRadar'
import TasteEditor from '@/components/profile/TasteEditor'
import BottomSheet from '@/components/ui/BottomSheet'
import { TasteVector, WinePersonalityId } from '@/types/wine'
import { getPersonalityById } from '@/lib/recommendation/personalities'

interface ProfileData {
  email: string
  personality: WinePersonalityId | null
  tasteProfile: TasteVector | null
  scanCount: number
  feedbackCount: number
}

const DIMENSION_LABELS: Record<keyof TasteVector, { low: string; high: string }> = {
  acidity: { low: 'Low acidity wines', high: 'High acidity wines' },
  tannin: { low: 'Soft, gentle tannins', high: 'Bold, grippy tannins' },
  fruit: { low: 'Subtle, restrained fruit', high: 'Bold, fruit-forward wines' },
  sweetness: { low: 'Bone-dry wines', high: 'Sweeter wines' },
  body: { low: 'Light-bodied wines', high: 'Full-bodied wines' },
  style: { low: 'Classic, traditional styles', high: 'Natural, funky styles' },
}

function generateInsights(taste: TasteVector): string[] {
  const dims = Object.entries(taste) as [keyof TasteVector, number][]
  dims.sort((a, b) => Math.abs(b[1] - 0.5) - Math.abs(a[1] - 0.5))

  const insights: string[] = []
  for (const [dim, value] of dims) {
    if (insights.length >= 3) break
    if (Math.abs(value - 0.5) > 0.15) {
      const label = value > 0.5 ? DIMENSION_LABELS[dim].high : DIMENSION_LABELS[dim].low
      insights.push(label)
    }
  }

  return insights
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editorOpen, setEditorOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/user/stats')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSaveTaste = async (newTaste: TasteVector) => {
    setSaving(true)
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasteProfile: newTaste }),
      })
      if (res.ok) {
        setProfile((prev) => prev ? { ...prev, tasteProfile: newTaste } : prev)
        setEditorOpen(false)
      }
    } catch {
      // Silently fail
    } finally {
      setSaving(false)
    }
  }

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

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-4">
        <Typography variant="h2">Could not load profile</Typography>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  const personality = profile.personality
    ? getPersonalityById(profile.personality)
    : null
  const personalityColor = personality?.color || '#6B2737'
  const insights = profile.tasteProfile
    ? generateInsights(profile.tasteProfile)
    : []

  return (
    <>
      <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h1">Profile</Typography>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-2 px-3 h-10 rounded-md text-text-secondary hover:text-text-primary transition-colors min-w-[44px] min-h-[44px]"
            type="button"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Personality Card */}
        {personality && (
          <div
            className="rounded-2xl p-6 mb-8 border motion-safe:animate-fade-in"
            style={{
              background: `linear-gradient(135deg, ${personalityColor}20, transparent)`,
              borderColor: `${personalityColor}40`,
            }}
          >
            <Typography
              variant="h2"
              className="font-bold"
              style={{ color: personalityColor }}
            >
              {personality.name}
            </Typography>

            <Typography variant="body" className="mt-3 leading-relaxed">
              {personality.description}
            </Typography>

            <div className="flex flex-wrap gap-2 mt-4">
              {personality.characteristics.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-md font-sans text-caption font-medium"
                  style={{
                    backgroundColor: `${personalityColor}15`,
                    color: personalityColor,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            {personality.exampleWines.length > 0 && (
              <div className="mt-4">
                <Typography variant="caption" className="text-text-secondary">
                  Wines you might enjoy: {personality.exampleWines.join(', ')}
                </Typography>
              </div>
            )}

            <Button
              variant="secondary"
              fullWidth
              className="mt-4"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `I'm ${personality.name}!`,
                    text: `${personality.description} Discover your wine personality with The Grape.`,
                  }).catch(() => {})
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Type
            </Button>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-8 motion-safe:animate-fade-in motion-safe:[animation-delay:50ms]">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <ScanLine className="w-5 h-5 text-wine-primary mx-auto mb-2" />
            <Typography variant="h2" as="p" className="text-wine-primary">
              {profile.scanCount}
            </Typography>
            <Typography variant="caption">
              {profile.scanCount === 1 ? 'Wine Scanned' : 'Wines Scanned'}
            </Typography>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <MessageCircle className="w-5 h-5 text-wine-secondary mx-auto mb-2" />
            <Typography variant="h2" as="p" className="text-wine-secondary">
              {profile.feedbackCount}
            </Typography>
            <Typography variant="caption">
              {profile.feedbackCount === 1 ? 'Rating Given' : 'Ratings Given'}
            </Typography>
          </div>
        </div>

        {/* Taste DNA section */}
        {profile.tasteProfile && (
          <div className="mb-8 motion-safe:animate-fade-in motion-safe:[animation-delay:100ms]">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h3">Your Taste DNA</Typography>
              <button
                onClick={() => setEditorOpen(true)}
                className="flex items-center gap-1.5 px-3 h-10 rounded-md text-wine-primary hover:bg-wine-primary/5 transition-colors font-sans text-body-sm font-medium min-w-[44px] min-h-[44px]"
                type="button"
                aria-label="Edit taste preferences"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Edit
              </button>
            </div>
            <TasteRadar
              tasteVector={profile.tasteProfile}
              color={personalityColor}
            />
          </div>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <div className="mb-6 motion-safe:animate-fade-in motion-safe:[animation-delay:200ms]">
            <Typography variant="body" className="font-medium mb-3">
              You tend to prefer:
            </Typography>
            <ul className="flex flex-col gap-2">
              {insights.map((insight) => (
                <li key={insight} className="flex items-start gap-2">
                  <span className="text-text-secondary mt-0.5">•</span>
                  <Typography variant="body">{insight}</Typography>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Divider */}
        <hr className="border-gray-100 mb-6" />

        {/* Actions */}
        <div className="flex flex-col gap-3 motion-safe:animate-fade-in motion-safe:[animation-delay:300ms]">
          <Button
            variant="tertiary"
            fullWidth
            onClick={() => router.push('/onboarding/quiz')}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retake Personality Quiz
          </Button>
        </div>
      </div>

      {/* Taste Editor Bottom Sheet */}
      {profile.tasteProfile && (
        <BottomSheet isOpen={editorOpen} onClose={() => setEditorOpen(false)}>
          <TasteEditor
            tasteVector={profile.tasteProfile}
            onSave={handleSaveTaste}
            onCancel={() => setEditorOpen(false)}
            saving={saving}
          />
        </BottomSheet>
      )}
    </>
  )
}
