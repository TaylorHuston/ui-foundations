import { AlertTriangle, Check, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './OperationStatus.module.css'

export type OperationPhase = 'idle' | 'dirty' | 'pending' | 'success' | 'warning' | 'error'

export interface OperationStatusProps {
  action?: ReactNode
  label: ReactNode
  live?: 'off' | 'polite' | 'assertive'
  phase?: OperationPhase
}

function StatusIcon({ phase }: { phase: OperationPhase }) {
  if (phase === 'pending') return <LoaderCircle aria-hidden className={styles.spinner} size={15} />
  if (phase === 'success') return <Check aria-hidden size={15} />
  if (phase === 'warning' || phase === 'error') return <AlertTriangle aria-hidden size={15} />
  return null
}

export function OperationStatus({ action, label, live = 'polite', phase = 'idle' }: OperationStatusProps) {
  return (
    <div
      aria-atomic="true"
      aria-live={live}
      className={styles.status}
      data-phase={phase}
      role={live === 'off' ? undefined : 'status'}
    >
      <span className={styles.message}>
        <StatusIcon phase={phase} />
        <span>{label}</span>
      </span>
      {action ? <span className={styles.action}>{action}</span> : null}
    </div>
  )
}
