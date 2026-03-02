import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'
import { ExternalLink } from 'lucide-react'

interface WhereToBuyProps {
  wineName: string
}

const MOCK_RETAILERS = [
  {
    name: 'Wine.com',
    price: '$29.99',
    availability: 'In Stock',
    url: '#',
  },
  {
    name: 'Vivino',
    price: '$32.50',
    availability: 'Available',
    url: '#',
  },
  {
    name: 'Local Wine Shop',
    price: '$27.00',
    availability: 'Check in store',
    url: '#',
  },
]

export default function WhereToBuy({ wineName }: WhereToBuyProps) {
  return (
    <div>
      <Typography variant="h3" className="mb-1">Where to Buy</Typography>
      <Typography variant="body-sm" className="mb-6">{wineName}</Typography>

      <div className="flex flex-col gap-3">
        {MOCK_RETAILERS.map((retailer) => (
          <div
            key={retailer.name}
            className="bg-bg-primary rounded-lg p-4 flex items-center gap-4"
          >
            {/* Retailer logo placeholder */}
            <div className="w-10 h-10 rounded-md bg-wine-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-wine-primary text-body">
                {retailer.name[0]}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <Typography variant="body" className="font-semibold truncate">
                {retailer.name}
              </Typography>
              <div className="flex items-center gap-2">
                <Typography variant="body-sm" className="font-semibold text-text-primary">
                  {retailer.price}
                </Typography>
                <span className="text-text-secondary text-caption">·</span>
                <Typography variant="caption">{retailer.availability}</Typography>
              </div>
            </div>

            <a
              href={retailer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button variant="secondary" size="sm">
                <span className="flex items-center gap-1">
                  View <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </Button>
            </a>
          </div>
        ))}
      </div>

      <Typography variant="caption" className="block text-center mt-6">
        Prices are approximate and may vary
      </Typography>
    </div>
  )
}
