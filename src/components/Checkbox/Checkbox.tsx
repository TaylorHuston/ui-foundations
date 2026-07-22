import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import { Check, Minus } from 'lucide-react'
import { useId } from 'react'
import styles from './Checkbox.module.css'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  description?: string
  disabled?: boolean
  indeterminate?: boolean
  label: string
  name?: string
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({
  checked,
  defaultChecked,
  description,
  disabled,
  indeterminate,
  label,
  name,
  onCheckedChange,
}: CheckboxProps) {
  const descriptionId = useId()

  return (
    <label className={styles.label}>
      <BaseCheckbox.Root
        aria-describedby={description ? descriptionId : undefined}
        checked={checked}
        className={styles.control}
        defaultChecked={defaultChecked}
        disabled={disabled}
        indeterminate={indeterminate}
        name={name}
        onCheckedChange={(nextChecked) => onCheckedChange?.(nextChecked)}
      >
        <BaseCheckbox.Indicator className={styles.indicator} keepMounted>
          {indeterminate ? <Minus aria-hidden size={14} /> : <Check aria-hidden size={14} />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <span className={styles.copy}>
        <span className={styles.text}>{label}</span>
        {description ? <span className={styles.description} id={descriptionId}>{description}</span> : null}
      </span>
    </label>
  )
}
