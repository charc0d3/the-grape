'use client'

import { Camera, Search } from 'lucide-react'

interface ScanViewfinderProps {
  onCapture: () => void
  onGallery: () => void
}

export default function ScanViewfinder({ onCapture, onGallery }: ScanViewfinderProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gray-900 -mx-4 -mt-4 overflow-hidden">
      {/* Scan frame overlay */}
      <div className="relative w-64 h-64 mb-12">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/80 rounded-tl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/80 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/80 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/80 rounded-br" />

        {/* Animated scan line */}
        <div className="absolute top-0 left-2 right-2 motion-safe:animate-scan-line">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-wine-secondary to-transparent" />
        </div>

        {/* Center hint text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-sans text-body-sm text-white/60 text-center px-8">
            Point your camera at a wine label
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-12">
        {/* Search button */}
        <button
          onClick={onGallery}
          className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center min-w-[44px] min-h-[44px] active:bg-white/30 transition-colors"
          aria-label="Search for wine"
          type="button"
        >
          <Search className="w-5 h-5 text-white" />
        </button>

        {/* Capture button with pulse ring */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-white/30 motion-safe:animate-pulse-ring" />
          <button
            onClick={onCapture}
            className="relative w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center min-w-[44px] min-h-[44px] active:scale-95 transition-transform"
            aria-label="Scan wine"
            type="button"
          >
            <Camera className="w-8 h-8 text-gray-900" />
          </button>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-12 h-12" />
      </div>

      {/* Bottom instruction */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="font-sans text-caption text-white/40">
          Tap the button or search by name
        </p>
      </div>
    </div>
  )
}
