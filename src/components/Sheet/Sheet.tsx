import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'
import { IconButton } from '../IconButton/IconButton'
import type { FoundationStyle } from '../types'
import styles from './Sheet.module.css'

export interface SheetProps {
  children: ReactNode
  closeLabel?: string
  defaultOpen?: boolean
  description?: ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  portalClassName?: string
  portalStyle?: FoundationStyle
  side?: 'start' | 'end'
  surfaceClassName?: string
  surfaceStyle?: FoundationStyle
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
  portalClassName,
  portalStyle,
  side = 'start',
  surfaceClassName,
  surfaceStyle,
  title,
  trigger,
}: SheetProps) {
  return (
    <BaseDialog.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal>
        <div
          className={[styles.portal, portalClassName].filter(Boolean).join(' ')}
          data-slot="sheet-portal"
          style={portalStyle}
        >
          <BaseDialog.Backdrop className={styles.backdrop} data-slot="sheet-backdrop" />
          <BaseDialog.Viewport className={styles.viewport} data-side={side} data-slot="sheet-viewport">
            <BaseDialog.Popup
              className={[styles.popup, surfaceClassName].filter(Boolean).join(' ')}
              data-side={side}
              data-slot="sheet-surface"
              style={surfaceStyle}
            >
              <header className={styles.header} data-slot="sheet-header">
                <div className={styles.heading} data-slot="sheet-heading">
                  <BaseDialog.Title className={styles.title} data-slot="sheet-title">{title}</BaseDialog.Title>
                  {description ? (
                    <BaseDialog.Description className={styles.description} data-slot="sheet-description">
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
              <div className={styles.content} data-slot="sheet-content">{children}</div>
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
