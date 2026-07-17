import { useId, type InputHTMLAttributes } from 'react'
import styles from './TextField.module.css'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  supportingText?: string
  error?: string
}

export function TextField({ className, error, id, label, supportingText, ...props }: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const supportingId = supportingText ? `${inputId}-supporting` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [props['aria-describedby'], supportingId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>{label}</label>
      <input
        {...props}
        aria-describedby={describedBy}
        aria-invalid={error ? true : props['aria-invalid']}
        className={[styles.input, className].filter(Boolean).join(' ')}
        id={inputId}
      />
      {supportingText ? <span className={styles.supporting} id={supportingId}>{supportingText}</span> : null}
      {error ? <span className={styles.error} id={errorId}>{error}</span> : null}
    </div>
  )
}
