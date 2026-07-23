import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Tooltip } from '../../components/Tooltip/Tooltip'
import type { FoundationStyle } from '../../components/types'
import styles from './NavigationRail.module.css'

interface NavigationRailItemBase {
  active?: boolean
  icon: ReactNode
  label: string
}

export interface NavigationRailButtonProps
  extends NavigationRailItemBase,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'children'> {}

export interface NavigationRailLinkProps
  extends NavigationRailItemBase,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label' | 'children'> {}

function ItemContent({ icon }: { icon: ReactNode }) {
  return <span aria-hidden className={styles.icon}>{icon}</span>
}

export function NavigationRailButton({ active = false, icon, label, type = 'button', ...props }: NavigationRailButtonProps) {
  return (
    <Tooltip content={label}>
      <button
        {...props}
        aria-label={label}
        aria-pressed={active}
        className={[styles.item, props.className].filter(Boolean).join(' ')}
        data-active={active || undefined}
        data-slot="navigation-rail-item"
        type={type}
      >
        <ItemContent icon={icon} />
      </button>
    </Tooltip>
  )
}

export function NavigationRailLink({ active = false, icon, label, ...props }: NavigationRailLinkProps) {
  return (
    <Tooltip content={label}>
      <a
        {...props}
        aria-current={active ? 'page' : undefined}
        aria-label={label}
        className={[styles.item, props.className].filter(Boolean).join(' ')}
        data-active={active || undefined}
        data-slot="navigation-rail-item"
      >
        <ItemContent icon={icon} />
      </a>
    </Tooltip>
  )
}

export interface NavigationRailProps {
  brand: ReactNode
  className?: string
  label?: string
  primary: ReactNode
  secondary?: ReactNode
  style?: FoundationStyle
}

export function NavigationRail({
  brand,
  className,
  label = 'Application navigation',
  primary,
  secondary,
  style,
}: NavigationRailProps) {
  return (
    <nav
      aria-label={label}
      className={[styles.rail, className].filter(Boolean).join(' ')}
      data-slot="navigation-rail"
      style={style}
    >
      <div className={styles.group} data-slot="navigation-rail-primary">
        <div className={styles.brand} data-slot="navigation-rail-brand">{brand}</div>
        {primary}
      </div>
      {secondary ? <div className={styles.group} data-slot="navigation-rail-secondary">{secondary}</div> : null}
    </nav>
  )
}
