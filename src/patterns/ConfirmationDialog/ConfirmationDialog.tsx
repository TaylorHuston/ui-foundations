import type { ReactElement, ReactNode } from 'react'
import { Dialog } from '../../components/Dialog/Dialog'

export interface ConfirmationDialogProps {
  confirmLabel?: string
  description: ReactNode
  destructive?: boolean
  onConfirm: () => void
  title: ReactNode
  trigger: ReactElement
}

export function ConfirmationDialog({
  confirmLabel = 'Confirm',
  description,
  destructive = false,
  onConfirm,
  title,
  trigger,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      description={description}
      onPrimaryAction={onConfirm}
      primaryActionLabel={confirmLabel}
      primaryActionVariant={destructive ? 'danger' : 'primary'}
      title={title}
      trigger={trigger}
    />
  )
}
