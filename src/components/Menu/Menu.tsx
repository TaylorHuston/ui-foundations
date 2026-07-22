import { Menu as BaseMenu } from '@base-ui/react/menu'
import type { ReactElement, ReactNode } from 'react'
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
  trigger: ReactElement
}

export function Menu({ items, trigger }: MenuProps) {
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger render={trigger} />
      <BaseMenu.Portal>
        <BaseMenu.Positioner align="end" className={styles.positioner} sideOffset={8}>
          <BaseMenu.Popup className={styles.popup}>
            {items.map((item) => (
              <BaseMenu.Item
                className={[styles.item, item.destructive && styles.destructive].filter(Boolean).join(' ')}
                disabled={item.disabled}
                key={item.id}
                onClick={item.onSelect}
              >
                {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
                <span>{item.label}</span>
              </BaseMenu.Item>
            ))}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  )
}
