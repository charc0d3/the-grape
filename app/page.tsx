import Link from 'next/link'
import Typography from '@/components/ui/Typography'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        {/* Placeholder logo */}
        <div className="w-20 h-20 rounded-full bg-wine-primary flex items-center justify-center">
          <span className="font-display text-white text-4xl font-bold">G</span>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <Typography variant="h1">
            Never buy the wrong wine again
          </Typography>
          <Typography variant="body-sm" className="max-w-xs">
            Scan any bottle for an instant personal match score. Your taste, your rules.
          </Typography>
        </div>

        <div className="flex flex-col gap-3 w-full mt-4">
          <Link href="/signup" className="w-full">
            <Button variant="primary" size="lg" fullWidth>
              Get Started
            </Button>
          </Link>
          <Link href="/login" className="w-full">
            <Button variant="tertiary" size="md" fullWidth>
              I already have an account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
