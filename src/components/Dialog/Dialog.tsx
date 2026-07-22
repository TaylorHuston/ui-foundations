import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type { ReactElement, ReactNode } from 'react'
import type { ButtonVariant } from '../Button/Button'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'
import styles from './Dialog.module.css'

export interface DialogProps {
  children?: ReactNode
  closeLabel?: string
  defaultOpen?: boolean
  description?: ReactNode
  onOpenChange?: (open: boolean) => void
  onPrimaryAction?: () => void
  open?: boolean
  primaryActionLabel?: string
  primaryActionVariant?: ButtonVariant
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
  primaryActionLabel,
  primaryActionVariant = 'primary',
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
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Viewport className={styles.viewport}>
          <BaseDialog.Popup className={styles.popup}>
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
                  <IconButton label={closeLabel}>
                    <X aria-hidden size={18} />
                  </IconButton>
                )}
              />
            </header>
            {children ? <div className={styles.content}>{children}</div> : null}
            {primaryActionLabel ? (
              <footer className={styles.actions}>
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
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
