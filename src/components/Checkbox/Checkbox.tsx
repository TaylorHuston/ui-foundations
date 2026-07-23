import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Check, Minus } from 'lucide-react'
import { useId } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  checked?: boolean
  className?: string
  defaultChecked?: boolean
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  label: string
  name?: string
  onCheckedChange?: (checked: boolean) => void
  style?: FoundationStyle
}

export function Checkbox({
  checked,
  className,
  defaultChecked,
  description,
  disabled,
  indeterminate,
  label,
  name,
  onCheckedChange,
  style,
}: CheckboxProps) {
  const descriptionId = useId()

  return (
    <label
      className={[styles.label, className].filter(Boolean).join(' ')}
      data-slot="checkbox"
      style={style}
    >
      <BaseCheckbox.Root
        aria-describedby={description ? descriptionId : undefined}
        checked={checked}
        className={styles.control}
        data-slot="checkbox-control"
        defaultChecked={defaultChecked}
        disabled={disabled}
        indeterminate={indeterminate}
        name={name}
        onCheckedChange={(nextChecked) => onCheckedChange?.(nextChecked)}
      >
        <BaseCheckbox.Indicator className={styles.indicator} data-slot="checkbox-indicator" keepMounted>
          {indeterminate ? <Minus aria-hidden size={14} /> : <Check aria-hidden size={14} />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span className={styles.copy} data-slot="checkbox-copy">
        <span className={styles.text} data-slot="checkbox-label">{label}</span>
        {description ? <span className={styles.description} data-slot="checkbox-description" id={descriptionId}>{description}</span> : null}
      </span>
    </label>
  )
}
