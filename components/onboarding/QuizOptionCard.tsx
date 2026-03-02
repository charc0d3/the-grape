'use client'

interface QuizOptionCardProps {
  title: string
  description: string
  selected: boolean
  onSelect: () => void
}

export default function QuizOptionCard({ title, description, selected, onSelect }: QuizOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        w-full p-6 rounded-lg text-left transition-all duration-200
        min-h-[44px] active:scale-[0.98]
        ${selected
          ? 'bg-white border-2 border-wine-primary shadow-sm'
          : 'bg-white border-2 border-transparent shadow-sm hover:border-gray-200'
        }
      `}
      aria-pressed={selected}
    >
      <p className="font-sans text-body font-semibold text-text-primary">{title}</p>
      <p className="font-sans text-body-sm text-text-secondary mt-1">{description}</p>
    </button>
  )
}
