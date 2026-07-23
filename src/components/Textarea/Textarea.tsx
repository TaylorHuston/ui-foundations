import { useId, type TextareaHTMLAttributes } from 'react'
import type { FoundationStyle } from '../types'
import styles from './Textarea.module.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  supportingText?: string
  error?: string
  rootClassName?: string
  rootStyle?: FoundationStyle
}

export function Textarea({
  className,
  error,
  id,
  label,
  rootClassName,
  rootStyle,
  supportingText,
  ...props
}: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const supportingId = supportingText ? `${textareaId}-supporting` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
  const describedBy = [props['aria-describedby'], supportingId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div
      className={[styles.field, rootClassName].filter(Boolean).join(' ')}
      data-slot="textarea-field"
      style={rootStyle}
    >
      <label className={styles.label} data-slot="textarea-label" htmlFor={textareaId}>{label}</label>
      <textarea
        {...props}
        aria-describedby={describedBy}
        aria-invalid={error ? true : props['aria-invalid']}
        className={[styles.textarea, className].filter(Boolean).join(' ')}
        data-slot="textarea-control"
        id={textareaId}
      />
      {supportingText ? <span className={styles.supporting} data-slot="textarea-supporting" id={supportingId}>{supportingText}</span> : null}
      {error ? <span className={styles.error} data-slot="textarea-error" id={errorId}>{error}</span> : null}
    </div>
  )
}
