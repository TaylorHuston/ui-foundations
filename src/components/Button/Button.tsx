import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'dense' | 'toolbar' | 'standard'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant
  size?: ButtonSize
  pending?: boolean
  pendingLabel?: ReactNode
  style?: FoundationStyle
}

export function Button({
  children,
  className,
  disabled,
  pending = false,
  pendingLabel = 'Working...',
  size = 'standard',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')

  return (
    <button
      {...props}
      aria-busy={pending || undefined}
      className={classes}
      data-slot="button"
      disabled={disabled || pending}
      type={type}
    >
      {pending ? pendingLabel : children}
    </button>
  )
}
