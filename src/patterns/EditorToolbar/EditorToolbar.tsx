import type { ReactNode } from 'react'
import { Button } from '../../components/Button/Button'
import styles from './EditorToolbar.module.css'

export type EditorMode = 'source' | 'rendered'

export interface EditorToolbarProps {
  leadingActions?: ReactNode
  mode: EditorMode
  onModeChange: (mode: EditorMode) => void
  status?: ReactNode
  trailingActions?: ReactNode
}

export function EditorToolbar({ leadingActions, mode, onModeChange, status, trailingActions }: EditorToolbarProps) {
  return (
    <div aria-label="Editor controls" className={styles.toolbar} role="toolbar">
      <div className={styles.actions}>{leadingActions}</div>
      <div aria-label="Editor view" className={styles.modes} role="group">
        <Button
          aria-pressed={mode === 'source'}
          onClick={() => onModeChange('source')}
          size="toolbar"
          variant={mode === 'source' ? 'primary' : 'ghost'}
        >
          Source
        </Button>
        <Button
          aria-pressed={mode === 'rendered'}
          onClick={() => onModeChange('rendered')}
          size="toolbar"
          variant={mode === 'rendered' ? 'primary' : 'ghost'}
        >
          Rendered
        </Button>
      </div>
      <div className={styles.trailing}>
        {status ? <span aria-live="polite" className={styles.status}>{status}</span> : null}
        {trailingActions}
      </div>
    </div>
  )
}
