import type { ReactNode } from 'react'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl'
import type { FoundationStyle } from '../../components/types'
import styles from './EditorToolbar.module.css'

export type EditorMode = 'source' | 'rendered'
export type EditorModePlacement = 'center' | 'trailing'

export interface EditorToolbarProps {
  className?: string
  center?: ReactNode
  leadingActions?: ReactNode
  mode?: EditorMode
  modePlacement?: EditorModePlacement
  onModeChange?: (mode: EditorMode) => void
  status?: ReactNode
  style?: FoundationStyle
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

export function EditorToolbar({
  center,
  className,
  leadingActions,
  mode,
  modePlacement = 'trailing',
  onModeChange,
  status,
  style,
  trailingActions,
}: EditorToolbarProps) {
  const modeControl = mode && onModeChange ? <EditorModeSwitch mode={mode} onModeChange={onModeChange} /> : null
  const centerControl = center ?? (modePlacement === 'center' ? modeControl : null)
  const trailingModeControl = center ? null : modePlacement === 'trailing' ? modeControl : null

  return (
    <div
      aria-label="Editor controls"
      className={[styles.toolbar, className].filter(Boolean).join(' ')}
      data-slot="editor-toolbar"
      role="toolbar"
      style={style}
    >
      <div className={styles.actions} data-slot="editor-toolbar-leading">{leadingActions}</div>
      <div className={styles.center} data-slot="editor-toolbar-center">{centerControl}</div>
      <div className={styles.trailing} data-slot="editor-toolbar-trailing">
        {trailingModeControl}
        {status ? <div className={styles.status} data-slot="editor-toolbar-status">{status}</div> : null}
        {trailingActions}
      </div>
    </div>
  )
}
