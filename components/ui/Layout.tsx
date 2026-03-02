import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-bg-primary ${className}`}>
      <div className="mx-auto max-w-md px-6 py-8">
        {children}
      </div>
    </div>
  )
}
