import { Switch as BaseSwitch } from '@base-ui/react/switch'
import { useId } from 'react'
import styles from './Switch.module.css'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  description?: string
  disabled?: boolean
  label: string
  name?: string
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  checked,
  defaultChecked,
  description,
  disabled,
  label,
  name,
  onCheckedChange,
}: SwitchProps) {
  const descriptionId = useId()

  return (
    <label className={styles.label}>
      <span className={styles.copy}>
        <span className={styles.text}>{label}</span>
        {description ? <span className={styles.description} id={descriptionId}>{description}</span> : null}
      </span>
      <BaseSwitch.Root
        aria-describedby={description ? descriptionId : undefined}
        checked={checked}
        className={styles.control}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        onCheckedChange={(nextChecked) => onCheckedChange?.(nextChecked)}
      >
        <BaseSwitch.Thumb className={styles.thumb} />
      </BaseSwitch.Root>
    </label>
  )
}
