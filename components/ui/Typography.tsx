import { ElementType, HTMLAttributes, ReactNode } from 'react'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: ElementType
  children: ReactNode
}

const variantConfig: Record<TypographyVariant, { tag: ElementType; className: string }> = {
  h1: { tag: 'h1', className: 'font-display font-bold text-h1 text-text-primary' },
  h2: { tag: 'h2', className: 'font-display font-semibold text-h2 text-text-primary' },
  h3: { tag: 'h3', className: 'font-display font-semibold text-h3 text-text-primary' },
  body: { tag: 'p', className: 'font-sans text-body text-text-primary' },
  'body-sm': { tag: 'p', className: 'font-sans text-body-sm text-text-secondary' },
  caption: { tag: 'span', className: 'font-sans text-caption text-text-secondary' },
}

export default function Typography({ variant = 'body', as, className = '', children, ...props }: TypographyProps) {
  const config = variantConfig[variant]
  const Component = as || config.tag

  return (
    <Component className={`${config.className} ${className}`} {...props}>
      {children}
    </Component>
  )
}
