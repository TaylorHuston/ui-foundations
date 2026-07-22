import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Tooltip } from '../../components/Tooltip/Tooltip'
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
      >
        <ItemContent icon={icon} />
      </a>
    </Tooltip>
  )
}

export interface NavigationRailProps {
  brand: ReactNode
  label?: string
  primary: ReactNode
  secondary?: ReactNode
}

export function NavigationRail({ brand, label = 'Application navigation', primary, secondary }: NavigationRailProps) {
  return (
    <nav aria-label={label} className={styles.rail}>
      <div className={styles.group}>
        <div className={styles.brand}>{brand}</div>
        {primary}
      </div>
      {secondary ? <div className={styles.group}>{secondary}</div> : null}
    </nav>
  )
}
