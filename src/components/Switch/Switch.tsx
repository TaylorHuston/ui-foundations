import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { useId } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Switch.module.css'

export interface SwitchProps {
  checked?: boolean
  className?: string
  defaultChecked?: boolean
  description?: string
  disabled?: boolean
  label: string
  name?: string
  onCheckedChange?: (checked: boolean) => void
  style?: FoundationStyle
}

export function Switch({
  checked,
  className,
  defaultChecked,
  description,
  disabled,
  label,
  name,
  onCheckedChange,
  style,
}: SwitchProps) {
  const descriptionId = useId()

  return (
    <label
      className={[styles.label, className].filter(Boolean).join(' ')}
      data-slot="switch"
      style={style}
    >
      <span className={styles.copy} data-slot="switch-copy">
        <span className={styles.text} data-slot="switch-label">{label}</span>
        {description ? <span className={styles.description} data-slot="switch-description" id={descriptionId}>{description}</span> : null}
      </span>
      <BaseSwitch.Root
        aria-describedby={description ? descriptionId : undefined}
        checked={checked}
        className={styles.control}
        data-slot="switch-control"
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        onCheckedChange={(nextChecked) => onCheckedChange?.(nextChecked)}
      >
        <BaseSwitch.Thumb className={styles.thumb} data-slot="switch-thumb" />
      </BaseSwitch.Root>
    </label>
  )
}
