import { useEffect, useId, useRef, type FormEvent, type ReactNode } from 'react'
import { Button } from '../../components/Button/Button'
import type { FoundationStyle } from '../../components/types'
import styles from './DocumentHeader.module.css'

export interface DocumentRenameControl {
  editing: boolean
  error?: ReactNode
  label?: string
  onCancel: () => void
  onChange: (value: string) => void
  onStart: () => void
  onSubmit: () => void
  pending?: boolean
  value: string
}

function splitFilename(filename: string) {
  const extensionStart = filename.lastIndexOf('.')
  if (extensionStart <= 0 || extensionStart === filename.length - 1) {
    return { extension: '', name: filename }
  }

  return {
    extension: filename.slice(extensionStart),
    name: filename.slice(0, extensionStart),
  }
}

export interface DocumentHeaderProps {
  className?: string
  leadingActions?: ReactNode
  path?: ReactNode
  readOnlyReason?: ReactNode
  rename?: DocumentRenameControl
  status?: ReactNode
  style?: FoundationStyle
  title: string
  trailingActions?: ReactNode
}

export function DocumentHeader({
  className,
  leadingActions,
  path,
  readOnlyReason,
  rename,
  status,
  style,
  title,
  trailingActions,
}: DocumentHeaderProps) {
  const generatedId = useId()
  const input = useRef<HTMLInputElement>(null)
  const extensionRef = useRef('')
  const inputId = `${generatedId}-filename`
  const filenameParts = splitFilename(rename?.value ?? title)
  const extension = rename?.editing ? extensionRef.current || filenameParts.extension : filenameParts.extension
  const name = extension && rename?.value?.endsWith(extension)
    ? rename.value.slice(0, -extension.length)
    : filenameParts.name
  const extensionId = extension ? `${generatedId}-extension` : undefined

  useEffect(() => {
    if (rename?.editing) {
      extensionRef.current = filenameParts.extension
      input.current?.select()
      if (input.current) input.current.scrollLeft = 0
    }
  }, [filenameParts.extension, rename?.editing])
  const errorId = rename?.error ? `${generatedId}-error` : undefined
  const inputDescription = [extensionId, errorId].filter(Boolean).join(' ') || undefined

  function submitRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    rename?.onSubmit()
  }

  return (
    <header
      className={[styles.header, className].filter(Boolean).join(' ')}
      data-slot="document-header"
      style={style}
    >
      {leadingActions ? <div className={styles.leading} data-slot="document-header-leading">{leadingActions}</div> : null}
      <div className={styles.identity} data-slot="document-header-identity">
        {path ? <p className={styles.path} data-slot="document-header-path">{path}</p> : null}
        {rename?.editing ? (
          <form className={styles.rename} data-slot="document-header-rename" onSubmit={submitRename}>
            <label className={styles.label} htmlFor={inputId}>{rename.label ?? 'Name'}</label>
            <div className={styles.renameRow}>
              <div className={styles.nameField}>
                <input
                  aria-describedby={inputDescription}
                  aria-invalid={rename.error ? true : undefined}
                  autoComplete="off"
                  autoFocus
                  className={styles.input}
                  disabled={rename.pending}
                  id={inputId}
                  onChange={(event) => rename.onChange(`${event.target.value}${extension}`)}
                  ref={input}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      rename.onCancel()
                    }
                  }}
                  value={name}
                />
                {extension ? <span className={styles.extension} data-slot="document-header-extension" id={extensionId}>{extension}</span> : null}
              </div>
              <Button pending={rename.pending} pendingLabel="Saving name…" size="toolbar" type="submit">Save name</Button>
              <Button disabled={rename.pending} onClick={rename.onCancel} size="toolbar" variant="ghost">Cancel</Button>
            </div>
            {rename.error ? <p className={styles.error} id={errorId} role="alert">{rename.error}</p> : null}
          </form>
        ) : (
          <div className={styles.titleRow} data-slot="document-header-title">
            <h1 title={title}>{rename ? <button className={styles.titleButton} onClick={rename.onStart} type="button">{title}</button> : title}</h1>
          </div>
        )}
        {readOnlyReason && !rename?.editing ? <p className={styles.reason} data-slot="document-header-read-only">{readOnlyReason}</p> : null}
      </div>
      {status || trailingActions ? (
        <div className={styles.trailing} data-slot="document-header-trailing">
          {status}
          {trailingActions}
        </div>
      ) : null}
    </header>
  )
}
