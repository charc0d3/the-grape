import type { Metadata } from 'next'
import { Playfair_Display, Work_Sans } from 'next/font/google'
import SessionProvider from '@/components/providers/SessionProvider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Grape — Your Personal Wine Companion',
  description: 'Never buy the wrong wine again. Scan any bottle for an instant personal match score.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  themeColor: '#6B2737',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable}`}>
      <body className="font-sans bg-bg-primary text-text-primary">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
