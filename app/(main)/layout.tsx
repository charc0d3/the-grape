'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, Wine, User } from 'lucide-react'
import FeedbackPrompt from '@/components/wine/FeedbackPrompt'

const navItems = [
  { href: '/scan', label: 'Scan', icon: Camera },
  { href: '/my-wines', label: 'My Wines', icon: Wine },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {children}
      <FeedbackPrompt />

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-pb" aria-label="Main navigation">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-3
                  transition-colors duration-150
                  ${isActive ? 'text-wine-primary' : 'text-text-secondary'}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-wine-primary" />
                  )}
                </div>
                <span className="font-sans text-[0.625rem] font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
