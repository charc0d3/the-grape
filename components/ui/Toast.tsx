'use client'

import { useEffect } from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({ message, visible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  if (!visible) return null

  return (
    <div
      className="fixed top-4 left-4 right-4 z-[70] motion-safe:animate-fade-in-up"
      role="alert"
    >
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-match-red flex-shrink-0" />
        <p className="font-sans text-body-sm text-text-primary flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 min-w-[44px] min-h-[44px]"
          type="button"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
    </div>
  )
}
