import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { ReactElement, ReactNode } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Menu.module.css'

export interface MenuItem {
  destructive?: boolean
  disabled?: boolean
  icon?: ReactNode
  id: string
  label: string
  onSelect?: () => void
}

export interface MenuProps {
  items: MenuItem[]
  portalClassName?: string
  portalStyle?: FoundationStyle
  surfaceClassName?: string
  surfaceStyle?: FoundationStyle
  trigger: ReactElement
}

export function Menu({
  items,
  portalClassName,
  portalStyle,
  surfaceClassName,
  surfaceStyle,
  trigger,
}: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <div
          className={[styles.portal, portalClassName].filter(Boolean).join(' ')}
          data-slot="menu-portal"
          style={portalStyle}
        >
          <BaseMenu.Positioner align="end" className={styles.positioner} data-slot="menu-positioner" sideOffset={8}>
            <BaseMenu.Popup
              className={[styles.popup, surfaceClassName].filter(Boolean).join(' ')}
              data-slot="menu-surface"
              style={surfaceStyle}
            >
              {items.map((item) => (
                <BaseMenu.Item
                  className={[styles.item, item.destructive && styles.destructive].filter(Boolean).join(' ')}
                  data-slot="menu-item"
                  disabled={item.disabled}
                  key={item.id}
                  onClick={item.onSelect}
                >
                  {item.icon ? <span className={styles.icon} data-slot="menu-item-icon">{item.icon}</span> : null}
                  <span data-slot="menu-item-label">{item.label}</span>
                </BaseMenu.Item>
              ))}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </div>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  )
}
