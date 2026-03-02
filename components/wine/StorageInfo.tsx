'use client'

import { Wine, Thermometer, Droplets } from 'lucide-react'
import Typography from '@/components/ui/Typography'

interface StorageInfoProps {
  storagePotential: number
  wineType: string
}

function getOptimalTemp(wineType: string): string {
  switch (wineType) {
    case 'red':
      return '12-18°C'
    case 'white':
      return '8-12°C'
    case 'rosé':
      return '8-12°C'
    case 'sparkling':
      return '6-10°C'
    default:
      return '10-14°C'
  }
}

const items = (storagePotential: number, wineType: string) => [
  {
    icon: Wine,
    label: 'Storage potential',
    value: `${storagePotential} years`,
  },
  {
    icon: Thermometer,
    label: 'Optimal temperature',
    value: getOptimalTemp(wineType),
  },
  {
    icon: Droplets,
    label: 'Humidity',
    value: '60-70%',
  },
]

export default function StorageInfo({ storagePotential, wineType }: StorageInfoProps) {
  return (
    <div className="bg-bg-primary rounded-lg p-4">
      <div className="flex flex-col gap-4">
        {items(storagePotential, wineType).map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-wine-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-wine-primary" />
              </div>
              <div className="flex-1">
                <Typography variant="caption" className="text-text-secondary">
                  {item.label}
                </Typography>
                <Typography variant="body-sm" className="font-medium">
                  {item.value}
                </Typography>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
