import type { ReactNode } from 'react'
import type { FoundationStyle } from '../../components/types'
import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  action?: ReactNode
  className?: string
  description: ReactNode
  icon?: ReactNode
  title: ReactNode
  style?: FoundationStyle
}

export function EmptyState({ action, className, description, icon, style, title }: EmptyStateProps) {
  return (
    <section
      className={[styles.empty, className].filter(Boolean).join(' ')}
      data-slot="empty-state"
      style={style}
    >
      {icon ? <div aria-hidden className={styles.icon} data-slot="empty-state-icon">{icon}</div> : null}
      <div className={styles.copy} data-slot="empty-state-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action ? <div className={styles.action} data-slot="empty-state-action">{action}</div> : null}
    </section>
  )
}
