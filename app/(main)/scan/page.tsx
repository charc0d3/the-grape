'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ScanViewfinder from '@/components/scan/ScanViewfinder'
import WineSearchModal from '@/components/scan/WineSearchModal'
import Toast from '@/components/ui/Toast'

export default function ScanPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectWine = async (wine: { id: string }) => {
    setScanning(true)
    setError(null)
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wineId: wine.id }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to scan wine')
        setScanning(false)
        return
      }

      const data = await res.json()
      setSearchOpen(false)
      router.push(`/scan/result?id=${data.scan.id}`)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  const dismissError = useCallback(() => setError(null), [])

  return (
    <>
      <ScanViewfinder
        onCapture={() => setSearchOpen(true)}
        onGallery={() => setSearchOpen(true)}
      />
      <WineSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelectWine}
      />
      {scanning && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center motion-safe:animate-fade-in">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg motion-safe:animate-fade-in-up">
            <div className="flex gap-1 justify-center mb-3">
              <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 bg-wine-primary rounded-full animate-bounce" />
            </div>
            <p className="font-sans text-body-sm text-text-primary">Analyzing your match...</p>
          </div>
        </div>
      )}
      <Toast message={error || ''} visible={!!error} onClose={dismissError} />
    </>
  )
}
