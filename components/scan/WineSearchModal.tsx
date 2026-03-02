'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import WineCard from '@/components/wine/WineCard'

interface Wine {
  id: string
  name: string
  producer: string | null
  region: string | null
  grape: string | null
  vintage: number | null
  type: string
}

interface WineSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (wine: Wine) => void
}

export default function WineSearchModal({ isOpen, onClose, onSelect }: WineSearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Wine[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
      setSearched(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/wines?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.wines)
        setSearched(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-bg-primary motion-safe:animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-bg-primary z-10 px-4 pt-4 pb-2 safe-area-pt">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-md hover:bg-gray-100 min-w-[44px] min-h-[44px]"
            aria-label="Close search"
            type="button"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
          <Typography variant="h3" className="flex-1">Find Your Wine</Typography>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by wine name, producer, or grape..."
            className="w-full h-12 pl-10 pr-10 rounded-lg border border-gray-200 bg-white font-sans text-body text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-wine-primary/30 focus:border-wine-primary"
            aria-label="Search wines"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary animate-spin" />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pt-4 pb-24 overflow-y-auto max-h-[calc(100vh-140px)]">
        {!searched && !loading && (
          <div className="text-center pt-12">
            <Typography variant="body-sm">
              Type at least 2 characters to search
            </Typography>
          </div>
        )}

        {searched && results.length === 0 && !loading && (
          <div className="text-center pt-12">
            <Typography variant="body-sm">No wines found</Typography>
            <Typography variant="caption" className="mt-2 block">
              Try a different search term
            </Typography>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {results.map((wine) => (
            <WineCard
              key={wine.id}
              name={wine.name}
              producer={wine.producer}
              region={wine.region}
              grape={wine.grape}
              vintage={wine.vintage}
              type={wine.type}
              onClick={() => onSelect(wine)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
