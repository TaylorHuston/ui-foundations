import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import styles from './TreeView.module.css'

export interface TreeViewItem {
  children?: TreeViewItem[]
  id: string
  label: string
}

export interface TreeViewItemState {
  expanded: boolean
  branch: boolean
  selected: boolean
}

export interface TreeViewProps {
  className?: string
  defaultExpandedIds?: string[]
  defaultSelectedId?: string
  expandedIds?: string[]
  items: TreeViewItem[]
  label?: string
  onExpandedIdsChange?: (expandedIds: string[]) => void
  onSelect?: (item: TreeViewItem) => void
  renderIcon?: (item: TreeViewItem, state: TreeViewItemState) => ReactNode
  selectedId?: string
}

interface VisibleItem {
  item: TreeViewItem
  level: number
  parentId?: string
  position: number
  setSize: number
}

function flattenVisible(items: TreeViewItem[], expandedIds: Set<string>, level = 1, parentId?: string): VisibleItem[] {
  return items.flatMap((item, position) => {
    const current = { item, level, parentId, position: position + 1, setSize: items.length }
    if (item.children === undefined || !expandedIds.has(item.id)) return [current]
    return [current, ...flattenVisible(item.children, expandedIds, level + 1, item.id)]
  })
}

export function TreeView({
  className,
  defaultExpandedIds = [],
  defaultSelectedId,
  expandedIds,
  items,
  label = 'Items',
  onExpandedIdsChange,
  onSelect,
  renderIcon,
  selectedId,
}: TreeViewProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState(() => new Set(defaultExpandedIds))
  const [internalSelectedId, setInternalSelectedId] = useState(defaultSelectedId)
  const activeExpandedIds = useMemo(
    () => expandedIds === undefined ? internalExpandedIds : new Set(expandedIds),
    [expandedIds, internalExpandedIds],
  )
  const activeSelectedId = selectedId ?? internalSelectedId
  const visibleItems = useMemo(() => flattenVisible(items, activeExpandedIds), [activeExpandedIds, items])
  const initialFocusId = visibleItems.some(({ item }) => item.id === activeSelectedId)
    ? activeSelectedId
    : visibleItems[0]?.item.id
  const [focusId, setFocusId] = useState(initialFocusId)
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())

  useEffect(() => {
    if (visibleItems.some(({ item }) => item.id === focusId)) return
    const nextFocusId = visibleItems.some(({ item }) => item.id === activeSelectedId)
      ? activeSelectedId
      : visibleItems[0]?.item.id
    setFocusId(nextFocusId)
  }, [activeSelectedId, focusId, visibleItems])

  function focusItem(id: string | undefined) {
    if (!id) return
    setFocusId(id)
    queueMicrotask(() => itemRefs.current.get(id)?.focus())
  }

  function setExpanded(id: string, expanded: boolean) {
    const next = new Set(activeExpandedIds)
    if (expanded) next.add(id)
    else next.delete(id)
    if (expandedIds === undefined) setInternalExpandedIds(next)
    onExpandedIdsChange?.([...next])
  }

  function activate(item: TreeViewItem) {
    if (item.children !== undefined) {
      setExpanded(item.id, !activeExpandedIds.has(item.id))
      return
    }
    if (selectedId === undefined) setInternalSelectedId(item.id)
    onSelect?.(item)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, visibleItem: VisibleItem) {
    const { item, parentId } = visibleItem
    const index = visibleItems.findIndex((entry) => entry.item.id === item.id)
    const branch = item.children !== undefined
    const expanded = branch && activeExpandedIds.has(item.id)

    if (event.key === 'ArrowDown') focusItem(visibleItems[index + 1]?.item.id)
    else if (event.key === 'ArrowUp') focusItem(visibleItems[index - 1]?.item.id)
    else if (event.key === 'Home') focusItem(visibleItems[0]?.item.id)
    else if (event.key === 'End') focusItem(visibleItems.at(-1)?.item.id)
    else if (event.key === 'ArrowRight' && branch) {
      if (!expanded) setExpanded(item.id, true)
      else focusItem(visibleItems.find((entry) => entry.parentId === item.id)?.item.id)
    } else if (event.key === 'ArrowLeft') {
      if (expanded) setExpanded(item.id, false)
      else focusItem(parentId)
    } else if (event.key === 'Enter' || event.key === ' ') activate(item)
    else return

    event.preventDefault()
  }

  return (
    <ul
      aria-label={label}
      className={[styles.tree, className].filter(Boolean).join(' ')}
      data-slot="tree-view"
      role="tree"
    >
      {visibleItems.map((visibleItem) => {
        const { item, level, position, setSize } = visibleItem
        const branch = item.children !== undefined
        const expanded = branch && activeExpandedIds.has(item.id)
        const selected = activeSelectedId === item.id

        return (
          <li key={item.id} role="none">
            <button
              aria-expanded={branch ? expanded : undefined}
              aria-level={level}
              aria-posinset={position}
              aria-selected={selected}
              aria-setsize={setSize}
              className={styles.item}
              data-branch={branch || undefined}
              data-selected={selected || undefined}
              data-slot="tree-view-item"
              onClick={() => {
                setFocusId(item.id)
                activate(item)
              }}
              onFocus={() => setFocusId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, visibleItem)}
              ref={(element) => {
                if (element) itemRefs.current.set(item.id, element)
                else itemRefs.current.delete(item.id)
              }}
              role="treeitem"
              style={{ '--tree-level': level - 1 } as CSSProperties}
              tabIndex={focusId === item.id ? 0 : -1}
              type="button"
            >
              {renderIcon?.(item, { branch, expanded, selected })}
              <span>{item.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
