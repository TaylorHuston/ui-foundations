import type { ReactNode } from 'react'
import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  action?: ReactNode
  description: ReactNode
  icon?: ReactNode
  title: ReactNode
}

export function EmptyState({ action, description, icon, title }: EmptyStateProps) {
  return (
    <section className={styles.empty}>
      {icon ? <div aria-hidden className={styles.icon}>{icon}</div> : null}
      <div className={styles.copy}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  )
}
