import { useId, type InputHTMLAttributes } from 'react'
import type { FoundationStyle } from '../types'
import styles from './TextField.module.css'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  supportingText?: string
  error?: string
  rootClassName?: string
  rootStyle?: FoundationStyle
}

export function TextField({
  className,
  error,
  id,
  label,
  rootClassName,
  rootStyle,
  supportingText,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const supportingId = supportingText ? `${inputId}-supporting` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [props['aria-describedby'], supportingId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div
      className={[styles.field, rootClassName].filter(Boolean).join(' ')}
      data-slot="text-field"
      style={rootStyle}
    >
      <label className={styles.label} data-slot="text-field-label" htmlFor={inputId}>{label}</label>
      <input
        {...props}
        aria-describedby={describedBy}
        aria-invalid={error ? true : props['aria-invalid']}
        className={[styles.input, className].filter(Boolean).join(' ')}
        data-slot="text-field-control"
        id={inputId}
      />
      {supportingText ? <span className={styles.supporting} data-slot="text-field-supporting" id={supportingId}>{supportingText}</span> : null}
      {error ? <span className={styles.error} data-slot="text-field-error" id={errorId}>{error}</span> : null}
    </div>
  )
}
