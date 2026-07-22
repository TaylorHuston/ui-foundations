import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'
import { IconButton } from '../IconButton/IconButton'
import styles from './Sheet.module.css'

export interface SheetProps {
  children: ReactNode
  closeLabel?: string
  defaultOpen?: boolean
  description?: ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  side?: 'start' | 'end'
  title: ReactNode
  trigger?: ReactElement
}

export function Sheet({
  children,
  closeLabel = 'Close',
  defaultOpen,
  description,
  onOpenChange,
  open,
  side = 'start',
  title,
  trigger,
}: SheetProps) {
  return (
    <BaseDialog.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Viewport className={styles.viewport} data-side={side}>
          <BaseDialog.Popup className={styles.popup} data-side={side}>
            <header className={styles.header}>
              <div className={styles.heading}>
                <BaseDialog.Title className={styles.title}>{title}</BaseDialog.Title>
                {description ? (
                  <BaseDialog.Description className={styles.description}>
                    {description}
                  </BaseDialog.Description>
                ) : null}
              </div>
              <BaseDialog.Close
                render={(
                  <IconButton label={closeLabel} size="touch">
                    <X aria-hidden size={19} />
                  </IconButton>
                )}
              />
            </header>
            <div className={styles.content}>{children}</div>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
