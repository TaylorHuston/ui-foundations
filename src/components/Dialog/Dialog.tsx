import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'
import type { ButtonVariant } from '../Button/Button'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'
import type { FoundationStyle } from '../types'
import styles from './Dialog.module.css'

export interface DialogProps {
  children?: ReactNode
  closeLabel?: string
  defaultOpen?: boolean
  description?: ReactNode
  onOpenChange?: (open: boolean) => void
  onPrimaryAction?: () => void
  open?: boolean
  portalClassName?: string
  portalStyle?: FoundationStyle
  primaryActionLabel?: string
  primaryActionVariant?: ButtonVariant
  surfaceClassName?: string
  surfaceStyle?: FoundationStyle
  title: ReactNode
  trigger: ReactElement
}

export function Dialog({
  children,
  closeLabel = 'Close',
  defaultOpen,
  description,
  onOpenChange,
  onPrimaryAction,
  open,
  portalClassName,
  portalStyle,
  primaryActionLabel,
  primaryActionVariant = 'primary',
  surfaceClassName,
  surfaceStyle,
  title,
  trigger,
}: DialogProps) {
  return (
    <BaseDialog.Root
      defaultOpen={defaultOpen}
      onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <BaseDialog.Trigger render={trigger} />
      <BaseDialog.Portal>
        <div
          className={[styles.portal, portalClassName].filter(Boolean).join(' ')}
          data-slot="dialog-portal"
          style={portalStyle}
        >
          <BaseDialog.Backdrop className={styles.backdrop} data-slot="dialog-backdrop" />
          <BaseDialog.Viewport className={styles.viewport} data-slot="dialog-viewport">
            <BaseDialog.Popup
              className={[styles.popup, surfaceClassName].filter(Boolean).join(' ')}
              data-slot="dialog-surface"
              style={surfaceStyle}
            >
              <header className={styles.header} data-slot="dialog-header">
                <div className={styles.heading} data-slot="dialog-heading">
                  <BaseDialog.Title className={styles.title} data-slot="dialog-title">{title}</BaseDialog.Title>
                  {description ? (
                    <BaseDialog.Description className={styles.description} data-slot="dialog-description">
                      {description}
                    </BaseDialog.Description>
                  ) : null}
                </div>
                <BaseDialog.Close
                  render={(
                    <IconButton label={closeLabel}>
                      <X aria-hidden size={18} />
                    </IconButton>
                  )}
                />
              </header>
              {children ? <div className={styles.content} data-slot="dialog-content">{children}</div> : null}
              {primaryActionLabel ? (
                <footer className={styles.actions} data-slot="dialog-actions">
                  <BaseDialog.Close render={<Button variant="secondary">Cancel</Button>} />
                  <BaseDialog.Close
                    render={(
                      <Button onClick={onPrimaryAction} variant={primaryActionVariant}>
                        {primaryActionLabel}
                      </Button>
                    )}
                  />
                </footer>
              ) : null}
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
