import { AlertTriangle, Check, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FoundationStyle } from '../types'
import styles from './OperationStatus.module.css'

export type OperationPhase = 'idle' | 'dirty' | 'pending' | 'success' | 'warning' | 'error'

export interface OperationStatusProps {
  action?: ReactNode
  className?: string
  label: ReactNode
  live?: 'off' | 'polite' | 'assertive'
  phase?: OperationPhase
  style?: FoundationStyle
}

function StatusIcon({ phase }: { phase: OperationPhase }) {
  if (phase === 'pending') return <LoaderCircle aria-hidden className={styles.spinner} size={15} />
  if (phase === 'success') return <Check aria-hidden size={15} />
  if (phase === 'warning' || phase === 'error') return <AlertTriangle aria-hidden size={15} />
  return null
}

export function OperationStatus({
  action,
  className,
  label,
  live = 'polite',
  phase = 'idle',
  style,
}: OperationStatusProps) {
  return (
    <div
      aria-atomic="true"
      aria-live={live}
      className={[styles.status, className].filter(Boolean).join(' ')}
      data-phase={phase}
      data-slot="operation-status"
      role={live === 'off' ? undefined : 'status'}
      style={style}
    >
      <span className={styles.message} data-slot="operation-status-message">
        <StatusIcon phase={phase} />
        <span>{label}</span>
      </span>
      {action ? <span className={styles.action} data-slot="operation-status-action">{action}</span> : null}
    </div>
  )
}
