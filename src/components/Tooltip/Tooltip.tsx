import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { ReactElement, ReactNode } from 'react'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  children: ReactElement
  content: ReactNode
  delay?: number
  disabled?: boolean
}

export function Tooltip({ children, content, delay = 400, disabled = false }: TooltipProps) {
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className={styles.positioner} sideOffset={8}>
          <BaseTooltip.Popup className={styles.popup} role="tooltip">{content}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}
