import type { ReactElement, ReactNode } from 'react'
import { Dialog } from '../../components/Dialog/Dialog'
import type { FoundationStyle } from '../../components/types'

export interface ConfirmationDialogProps {
  confirmLabel?: string
  description: ReactNode
  destructive?: boolean
  onConfirm: () => void
  portalClassName?: string
  portalStyle?: FoundationStyle
  surfaceClassName?: string
  surfaceStyle?: FoundationStyle
  title: ReactNode
  trigger: ReactElement
}

export function ConfirmationDialog({
  confirmLabel = 'Confirm',
  description,
  destructive = false,
  onConfirm,
  portalClassName,
  portalStyle,
  surfaceClassName,
  surfaceStyle,
  title,
  trigger,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      description={description}
      onPrimaryAction={onConfirm}
      portalClassName={portalClassName}
      portalStyle={portalStyle}
      primaryActionLabel={confirmLabel}
      primaryActionVariant={destructive ? 'danger' : 'primary'}
      surfaceClassName={surfaceClassName}
      surfaceStyle={surfaceStyle}
      title={title}
      trigger={trigger}
    />
  )
}
