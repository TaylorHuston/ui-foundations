import { useId, type TextareaHTMLAttributes } from 'react'
import styles from './Textarea.module.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  supportingText?: string
  error?: string
}

export function Textarea({ className, error, id, label, supportingText, ...props }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const supportingId = supportingText ? `${textareaId}-supporting` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
  const describedBy = [props['aria-describedby'], supportingId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={textareaId}>{label}</label>
      <textarea
        {...props}
        aria-describedby={describedBy}
        aria-invalid={error ? true : props['aria-invalid']}
        className={[styles.textarea, className].filter(Boolean).join(' ')}
        id={textareaId}
      />
      {supportingText ? <span className={styles.supporting} id={supportingId}>{supportingText}</span> : null}
      {error ? <span className={styles.error} id={errorId}>{error}</span> : null}
    </div>
  )
}
