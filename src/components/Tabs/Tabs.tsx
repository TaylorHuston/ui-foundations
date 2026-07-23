import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { ReactNode } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Tabs.module.css'

export interface TabItem {
  content: ReactNode
  disabled?: boolean
  label: ReactNode
  value: string
}

export interface TabsProps {
  className?: string
  defaultValue?: string
  items: TabItem[]
  label: string
  onValueChange?: (value: string) => void
  style?: FoundationStyle
  value?: string
}

export function Tabs({ className, defaultValue, items, label, onValueChange, style, value }: TabsProps) {
  const initialValue = defaultValue ?? items.find((item) => !item.disabled)?.value

  return (
    <BaseTabs.Root
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-slot="tabs"
      defaultValue={initialValue}
      onValueChange={(nextValue) => onValueChange?.(String(nextValue))}
      style={style}
      value={value}
    >
      <BaseTabs.List aria-label={label} className={styles.list} data-slot="tabs-list">
        {items.map((item) => (
          <BaseTabs.Tab className={styles.tab} data-slot="tabs-tab" disabled={item.disabled} key={item.value} value={item.value}>
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel className={styles.panel} data-slot="tabs-panel" key={item.value} value={item.value}>
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  )
}
