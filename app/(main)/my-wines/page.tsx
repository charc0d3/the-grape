'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Wine, ShoppingCart, Heart } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import MatchBadge from '@/components/wine/MatchBadge'
import FeedbackButtons from '@/components/wine/FeedbackButtons'

type TabId = 'scanned' | 'tried' | 'loved'

interface ScanItem {
  id: string
  wineId: string
  wineName: string
  producer: string | null
  region: string | null
  grape: string | null
  vintage: number | null
  type: string
  score: number | null
  matchColor: string | null
  scannedAt: string
  feedback: 'thumbs_up' | 'neutral' | 'thumbs_down' | null
}

const tabs: { id: TabId; label: string; icon?: typeof Heart }[] = [
  { id: 'scanned', label: 'Scanned' },
  { id: 'tried', label: 'Tried' },
  { id: 'loved', label: 'Loved', icon: Heart },
]

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  return `${Math.floor(diffDays / 30)} months ago`
}

const feedbackLabels: Record<string, string> = {
  thumbs_up: 'Loved it',
  neutral: 'It was OK',
  thumbs_down: 'Not for me',
}

export default function MyWinesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('scanned')
  const [scans, setScans] = useState<ScanItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchScans = useCallback(async (tab: TabId) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/scans?tab=${tab}`)
      const data = await res.json()
      setScans(data.scans || [])
    } catch {
      setScans([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchScans(activeTab)
  }, [activeTab, fetchScans])

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab)
  }

  const handleFeedbackGiven = () => {
    // Refresh the list after feedback to update status
    fetchScans(activeTab)
  }

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Typography variant="h1">My Wines</Typography>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              flex items-center gap-1.5 px-4 py-3 font-sans text-body-sm font-medium
              border-b-2 transition-colors min-h-[44px]
              ${activeTab === tab.id
                ? 'border-wine-primary text-wine-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
              }
            `}
            type="button"
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && scans.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-16 h-16 rounded-full bg-wine-secondary/10 flex items-center justify-center">
            <Wine className="w-8 h-8 text-wine-secondary" />
          </div>
          <Typography variant="h3" className="text-center">
            {activeTab === 'scanned' && 'No wines yet'}
            {activeTab === 'tried' && 'No tried wines yet'}
            {activeTab === 'loved' && 'No loved wines yet'}
          </Typography>
          <Typography variant="body-sm" className="text-center">
            {activeTab === 'scanned' && 'Scan your first bottle to get started'}
            {activeTab === 'tried' && 'Give feedback on scanned wines to see them here'}
            {activeTab === 'loved' && 'Wines you love will appear here'}
          </Typography>
          {activeTab === 'scanned' && (
            <Button variant="primary" onClick={() => router.push('/scan')}>
              Open Camera
            </Button>
          )}
        </div>
      )}

      {/* Wine list */}
      {!loading && scans.length > 0 && (
        <div className="flex flex-col gap-3">
          {scans.map((scan, index) => (
            <div
              key={scan.id}
              className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm motion-safe:animate-fade-in-up motion-safe:opacity-0"
              style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
            >
              {/* Top row: badge + wine info */}
              <div className="flex items-start gap-3">
                {scan.score !== null && (
                  <div className="flex-shrink-0 pt-1">
                    <MatchBadge score={scan.score} size="sm" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <Typography variant="h3" className="truncate">
                    {scan.wineName}
                  </Typography>
                  {scan.producer && (
                    <Typography variant="body-sm" className="truncate">
                      {scan.producer}
                    </Typography>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <Typography variant="caption">
                  Scanned {formatRelativeDate(scan.scannedAt)}
                </Typography>
                {scan.feedback && (
                  <>
                    <span className="text-text-secondary text-caption">·</span>
                    <Typography variant="caption" className="text-wine-primary font-medium">
                      {feedbackLabels[scan.feedback]}
                    </Typography>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                {!scan.feedback && (
                  <FeedbackButtons
                    wineId={scan.wineId}
                    onFeedbackGiven={handleFeedbackGiven}
                  />
                )}
                <button
                  onClick={() => router.push(`/scan/result?id=${scan.id}`)}
                  className="
                    flex items-center gap-1.5 px-3 h-10 rounded-md
                    bg-wine-primary text-white
                    font-sans text-body-sm font-medium
                    hover:bg-wine-primary/90 active:bg-wine-primary/80
                    transition-colors min-h-[44px]
                  "
                  type="button"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy {scan.feedback ? 'again' : ''}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
