import type { CSSProperties, ReactNode } from 'react'
import styles from './WorkbenchShell.module.css'

export type WorkbenchContentAnchor = 'viewport' | 'available'

export interface WorkbenchShellStyle extends CSSProperties {
  '--workbench-content-width'?: string
  '--workbench-context-width'?: string
  '--workbench-navigation-width'?: string
  '--workbench-rail-width'?: string
}

export interface WorkbenchShellProps {
  className?: string
  context?: ReactNode
  contextCollapsed?: boolean
  contextLabel?: string
  contentAnchor?: WorkbenchContentAnchor
  main: ReactNode
  mainLabel?: string
  navigation?: ReactNode
  navigationCollapsed?: boolean
  navigationLabel?: string
  rail: ReactNode
  style?: WorkbenchShellStyle
}

export function WorkbenchShell({
  className,
  context,
  contextCollapsed = false,
  contextLabel = 'Context',
  contentAnchor = 'viewport',
  main,
  mainLabel = 'Workspace',
  navigation,
  navigationCollapsed = false,
  navigationLabel = 'Navigation',
  rail,
  style,
}: WorkbenchShellProps) {
  const hasContext = context !== undefined && context !== null
  const hasNavigation = navigation !== undefined && navigation !== null
  const classes = [styles.shell, className].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      data-context-collapsed={contextCollapsed || !hasContext}
      data-navigation-collapsed={navigationCollapsed || !hasNavigation}
      style={style}
    >
      <div className={styles.rail}>{rail}</div>
      {hasNavigation && !navigationCollapsed ? (
        <aside aria-label={navigationLabel} className={styles.navigation}>{navigation}</aside>
      ) : null}
      <main aria-label={mainLabel} className={styles.main}>
        <div className={styles.mainContent} data-anchor={contentAnchor}>{main}</div>
      </main>
      {hasContext && !contextCollapsed ? (
        <aside aria-label={contextLabel} className={styles.context}>{context}</aside>
      ) : null}
    </div>
  )
}
