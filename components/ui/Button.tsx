'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'lg' | 'md' | 'sm'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-wine-primary text-white hover:bg-wine-primary/90 active:bg-wine-primary/80',
  secondary: 'bg-white text-wine-primary border-2 border-wine-primary hover:bg-wine-primary/5 active:bg-wine-primary/10',
  tertiary: 'bg-transparent text-wine-primary hover:bg-wine-primary/5 active:bg-wine-primary/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-14 px-8 text-body font-semibold',
  md: 'h-12 px-6 text-body-sm font-semibold',
  sm: 'h-11 px-4 text-body-sm font-medium',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center rounded-md font-sans
          transition-colors duration-150 min-w-[44px] min-h-[44px]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
