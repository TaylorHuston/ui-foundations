import { Tabs as BaseTabs } from '@base-ui/react/tabs'
import type { ReactNode } from 'react'
import styles from './Tabs.module.css'

export interface TabItem {
  content: ReactNode
  disabled?: boolean
  label: ReactNode
  value: string
}

export interface TabsProps {
  defaultValue?: string
  items: TabItem[]
  label: string
  onValueChange?: (value: string) => void
  value?: string
}

export function Tabs({ defaultValue, items, label, onValueChange, value }: TabsProps) {
  const initialValue = defaultValue ?? items.find((item) => !item.disabled)?.value

  return (
    <BaseTabs.Root
      className={styles.root}
      defaultValue={initialValue}
      onValueChange={(nextValue) => onValueChange?.(String(nextValue))}
      value={value}
    >
      <BaseTabs.List aria-label={label} className={styles.list}>
        {items.map((item) => (
          <BaseTabs.Tab className={styles.tab} disabled={item.disabled} key={item.value} value={item.value}>
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel className={styles.panel} key={item.value} value={item.value}>
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  )
}
