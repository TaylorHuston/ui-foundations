import type { ReactNode } from 'react'
import styles from './ThreePaneShell.module.css'

export interface ThreePaneShellProps {
  context: ReactNode
  contextLabel?: string
  main: ReactNode
  mainLabel?: string
  navigation: ReactNode
  navigationLabel?: string
}

export function ThreePaneShell({
  context,
  contextLabel = 'Context',
  main,
  mainLabel = 'Workspace',
  navigation,
  navigationLabel = 'Navigation',
}: ThreePaneShellProps) {
  return (
    <div className={styles.shell}>
      <aside aria-label={navigationLabel} className={styles.navigation}>{navigation}</aside>
      <main aria-label={mainLabel} className={styles.main}>{main}</main>
      <aside aria-label={contextLabel} className={styles.context}>{context}</aside>
    </div>
  )
}
