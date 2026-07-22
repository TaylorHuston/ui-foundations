import { AlertTriangle, CheckCircle2, CircleAlert, Info } from 'lucide-react'
import { useId, type ReactNode } from 'react'
import styles from './InlineNotice.module.css'

export type InlineNoticeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface InlineNoticeProps {
  actions?: ReactNode
  children: ReactNode
  icon?: ReactNode
  role?: 'note' | 'status' | 'alert'
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
  icon,
  role = 'note',
  title,
  tone = 'neutral',
}: InlineNoticeProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      className={styles.notice}
      data-tone={tone}
      role={role}
    >
      <div aria-hidden className={styles.icon}>{icon ?? <NoticeIcon tone={tone} />}</div>
      <div className={styles.content}>
        {title ? <h2 id={titleId}>{title}</h2> : null}
        <div className={styles.body}>{children}</div>
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </section>
  )
}
