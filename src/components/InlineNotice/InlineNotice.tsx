import { AlertTriangle, CheckCircle2, CircleAlert, Info } from 'lucide-react'
import { useId, type ReactNode } from 'react'
import type { FoundationStyle } from '../types'
import styles from './InlineNotice.module.css'

export type InlineNoticeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface InlineNoticeProps {
  actions?: ReactNode
  children: ReactNode
  className?: string
  icon?: ReactNode
  role?: 'note' | 'status' | 'alert'
  style?: FoundationStyle
  title?: ReactNode
  tone?: InlineNoticeTone
}

function NoticeIcon({ tone }: { tone: InlineNoticeTone }) {
  if (tone === 'success') return <CheckCircle2 aria-hidden size={18} />
  if (tone === 'warning') return <AlertTriangle aria-hidden size={18} />
  if (tone === 'danger') return <CircleAlert aria-hidden size={18} />
  return <Info aria-hidden size={18} />
}

export function InlineNotice({
  actions,
  children,
  className,
  icon,
  role = 'note',
  style,
  title,
  tone = 'neutral',
}: InlineNoticeProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      className={[styles.notice, className].filter(Boolean).join(' ')}
      data-slot="inline-notice"
      data-tone={tone}
      role={role}
      style={style}
    >
      <div aria-hidden className={styles.icon} data-slot="inline-notice-icon">{icon ?? <NoticeIcon tone={tone} />}</div>
      <div className={styles.content} data-slot="inline-notice-content">
        {title ? <h2 data-slot="inline-notice-title" id={titleId}>{title}</h2> : null}
        <div className={styles.body} data-slot="inline-notice-body">{children}</div>
      </div>
      {actions ? <div className={styles.actions} data-slot="inline-notice-actions">{actions}</div> : null}
    </section>
  )
}
