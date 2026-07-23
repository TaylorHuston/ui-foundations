import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import type { ReactElement, ReactNode } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  children: ReactElement
  content: ReactNode
  delay?: number
  disabled?: boolean
  portalClassName?: string
  portalStyle?: FoundationStyle
  surfaceClassName?: string
  surfaceStyle?: FoundationStyle
}

export function Tooltip({
  children,
  content,
  delay = 400,
  disabled = false,
  portalClassName,
  portalStyle,
  surfaceClassName,
  surfaceStyle,
}: TooltipProps) {
  return (
    <BaseTooltip.Root disabled={disabled}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <div
          className={[styles.portal, portalClassName].filter(Boolean).join(' ')}
          data-slot="tooltip-portal"
          style={portalStyle}
        >
          <BaseTooltip.Positioner className={styles.positioner} data-slot="tooltip-positioner" sideOffset={8}>
            <BaseTooltip.Popup
              className={[styles.popup, surfaceClassName].filter(Boolean).join(' ')}
              data-slot="tooltip-surface"
              role="tooltip"
              style={surfaceStyle}
            >
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </div>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}
