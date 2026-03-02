'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="font-sans text-body-sm font-medium text-text-primary">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            h-14 px-4 rounded-md border font-sans text-body text-text-primary
            bg-white placeholder:text-text-secondary/50
            focus:outline-none focus:ring-2 focus:ring-wine-primary focus:border-transparent
            transition-shadow duration-150
            ${error ? 'border-match-red ring-1 ring-match-red' : 'border-gray-200'}
            ${className}
          `}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="font-sans text-body-sm text-match-red" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
