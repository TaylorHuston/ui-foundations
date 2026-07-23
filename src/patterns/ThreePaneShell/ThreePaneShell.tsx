import type { ReactNode } from 'react'
import type { FoundationStyle } from '../../components/types'
import styles from './ThreePaneShell.module.css'

export interface ThreePaneShellProps {
  className?: string
  context: ReactNode
  contextLabel?: string
  main: ReactNode
  mainLabel?: string
  navigation: ReactNode
  navigationLabel?: string
  style?: FoundationStyle
}

export function ThreePaneShell({
  className,
  context,
  contextLabel = 'Context',
  main,
  mainLabel = 'Workspace',
  navigation,
  navigationLabel = 'Navigation',
  style,
}: ThreePaneShellProps) {
  return (
    <div
      className={[styles.shell, className].filter(Boolean).join(' ')}
      data-slot="three-pane-shell"
      style={style}
    >
      <aside aria-label={navigationLabel} className={styles.navigation} data-slot="three-pane-navigation">{navigation}</aside>
      <main aria-label={mainLabel} className={styles.main} data-slot="three-pane-main">{main}</main>
      <aside aria-label={contextLabel} className={styles.context} data-slot="three-pane-context">{context}</aside>
    </div>
  )
}
