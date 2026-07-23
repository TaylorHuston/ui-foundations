import type { CSSProperties } from 'react'

export interface FoundationStyle extends CSSProperties {
  [customProperty: `--${string}`]: string | number | undefined
}
