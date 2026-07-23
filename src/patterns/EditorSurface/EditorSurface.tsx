import type { CSSProperties, ReactNode } from 'react'
import styles from './EditorSurface.module.css'

export interface EditorSurfaceStyle extends CSSProperties {
  '--editor-content-width'?: string
  '--editor-text-inset'?: string
}

export interface EditorSurfaceProps {
  ariaLabel?: string
  children: ReactNode
  className?: string
  header?: ReactNode
  notice?: ReactNode
  style?: EditorSurfaceStyle
  toolbar?: ReactNode
}

export function EditorSurface({
  ariaLabel,
  children,
  className,
  header,
  notice,
  style,
  toolbar,
}: EditorSurfaceProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={[styles.surface, className].filter(Boolean).join(' ')}
      data-slot="editor-surface"
      style={style}
    >
      {header ? <div className={styles.header} data-slot="editor-surface-header">{header}</div> : null}
      {toolbar ? <div className={styles.toolbar} data-slot="editor-surface-toolbar">{toolbar}</div> : null}
      {notice ? <div className={styles.notice} data-slot="editor-surface-notice">{notice}</div> : null}
      <div className={styles.editor} data-slot="editor-surface-editor">{children}</div>
    </section>
  )
}
