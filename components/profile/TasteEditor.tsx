'use client'

import { useState } from 'react'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import { TasteVector } from '@/types/wine'

interface TasteEditorProps {
  tasteVector: TasteVector
  onSave: (newTaste: TasteVector) => void
  onCancel: () => void
  saving?: boolean
}

const DIMENSIONS: {
  key: keyof TasteVector
  label: string
  lowLabel: string
  highLabel: string
}[] = [
  { key: 'acidity', label: 'Acidity', lowLabel: 'Low', highLabel: 'High' },
  { key: 'tannin', label: 'Tannin', lowLabel: 'Soft', highLabel: 'Grippy' },
  { key: 'fruit', label: 'Fruit', lowLabel: 'Subtle', highLabel: 'Bold' },
  { key: 'sweetness', label: 'Sweetness', lowLabel: 'Dry', highLabel: 'Sweet' },
  { key: 'body', label: 'Body', lowLabel: 'Light', highLabel: 'Full' },
  { key: 'style', label: 'Style', lowLabel: 'Classic', highLabel: 'Natural' },
]

export default function TasteEditor({ tasteVector, onSave, onCancel, saving }: TasteEditorProps) {
  const [values, setValues] = useState<TasteVector>({ ...tasteVector })

  const handleChange = (key: keyof TasteVector, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  return (
    <div>
      <Typography variant="h3" className="mb-1">Edit Taste Preferences</Typography>
      <Typography variant="body-sm" className="mb-6">
        Adjust the sliders to fine-tune your taste profile
      </Typography>

      <div className="flex flex-col gap-5">
        {DIMENSIONS.map(({ key, label, lowLabel, highLabel }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <Typography variant="body" className="font-medium">{label}</Typography>
              <Typography variant="caption">{Math.round(values[key] * 100)}%</Typography>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(values[key] * 100)}
              onChange={(e) => handleChange(key, parseInt(e.target.value) / 100)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                bg-gray-200 accent-wine-primary
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wine-primary
                [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-wine-primary
                [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md
              "
              aria-label={`${label} preference`}
            />
            <div className="flex justify-between mt-1">
              <Typography variant="caption">{lowLabel}</Typography>
              <Typography variant="caption">{highLabel}</Typography>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <Button variant="secondary" fullWidth onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="primary"
          fullWidth
          onClick={() => onSave(values)}
          loading={saving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
