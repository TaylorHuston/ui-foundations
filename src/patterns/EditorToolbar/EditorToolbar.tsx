import type { ReactNode } from 'react'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl'
import styles from './EditorToolbar.module.css'

export type EditorMode = 'source' | 'rendered'

export interface EditorToolbarProps {
  center?: ReactNode
  leadingActions?: ReactNode
  mode?: EditorMode
  onModeChange?: (mode: EditorMode) => void
  status?: ReactNode
  trailingActions?: ReactNode
}

const editorModes = [
  { label: 'Source', value: 'source' },
  { label: 'Rendered', value: 'rendered' },
] as const

export interface EditorModeSwitchProps {
  mode: EditorMode
  onModeChange: (mode: EditorMode) => void
}

export function EditorModeSwitch({ mode, onModeChange }: EditorModeSwitchProps) {
  return (
    <SegmentedControl
      label="Editor view"
      onValueChange={onModeChange}
      options={editorModes}
      value={mode}
    />
  )
}

export function EditorToolbar({ center, leadingActions, mode, onModeChange, status, trailingActions }: EditorToolbarProps) {
  const modeControl = center ?? (mode && onModeChange ? <EditorModeSwitch mode={mode} onModeChange={onModeChange} /> : null)

  return (
    <div aria-label="Editor controls" className={styles.toolbar} data-slot="editor-toolbar" role="toolbar">
      <div className={styles.actions} data-slot="editor-toolbar-leading">{leadingActions}</div>
      <div className={styles.center} data-slot="editor-toolbar-center">{modeControl}</div>
      <div className={styles.trailing}>
        {status ? <div className={styles.status} data-slot="editor-toolbar-status">{status}</div> : null}
        {trailingActions}
      </div>
    </div>
  )
}
