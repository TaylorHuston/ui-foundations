import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.css'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  label: string
  children: ReactNode
  size?: 'toolbar' | 'touch'
}

export function IconButton({ children, className, label, size = 'toolbar', title, type = 'button', ...props }: IconButtonProps) {
  const classes = [styles.button, styles[size], className].filter(Boolean).join(' ')

  return (
    <button {...props} aria-label={label} className={classes} title={title ?? label} type={type}>
      {children}
    </button>
  )
}
