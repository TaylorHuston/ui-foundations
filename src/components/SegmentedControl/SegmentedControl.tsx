import type { HTMLAttributes } from 'react'
import { Button, type ButtonSize } from '../Button/Button'
import styles from './SegmentedControl.module.css'

export interface SegmentedControlOption<Value extends string> {
  disabled?: boolean
  label: string
  value: Value
}

export interface SegmentedControlProps<Value extends string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string
  onValueChange: (value: Value) => void
  options: readonly SegmentedControlOption<Value>[]
  size?: ButtonSize
  value: Value
}

export function SegmentedControl<Value extends string>({
  className,
  label,
  onValueChange,
  options,
  size = 'toolbar',
  value,
  ...props
}: SegmentedControlProps<Value>) {
  return (
    <div
      {...props}
      aria-label={label}
      className={[styles.control, className].filter(Boolean).join(' ')}
      data-slot="segmented-control"
      role="group"
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <Button
            aria-pressed={selected}
            data-segment-value={option.value}
            disabled={option.disabled}
            key={option.value}
            onClick={() => onValueChange(option.value)}
            size={size}
            variant={selected ? 'primary' : 'ghost'}
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
