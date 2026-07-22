import { ChevronDown, ChevronRight, FileText, Folder, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import styles from './FileBrowser.module.css'

export interface FileBrowserItem {
  children?: FileBrowserItem[]
  id: string
  kind: 'file' | 'folder'
  label: string
}

export interface FileBrowserProps {
  defaultExpandedIds?: string[]
  defaultSelectedId?: string
  emptyMessage?: string
  items: FileBrowserItem[]
  label?: string
  onSelect?: (item: FileBrowserItem) => void
  searchable?: boolean
  selectedId?: string
}

function flattenItems(items: FileBrowserItem[]): FileBrowserItem[] {
  return items.flatMap((item) => [item, ...flattenItems(item.children ?? [])])
}

interface BranchProps {
  depth: number
  expandedIds: Set<string>
  item: FileBrowserItem
  onSelect: (item: FileBrowserItem) => void
  onToggle: (id: string) => void
  selectedId?: string
}

function Branch({ depth, expandedIds, item, onSelect, onToggle, selectedId }: BranchProps) {
  const isFolder = item.kind === 'folder'
  const isExpanded = isFolder && expandedIds.has(item.id)
  const isSelected = selectedId === item.id

  return (
    <li
      aria-expanded={isFolder ? isExpanded : undefined}
      aria-label={item.label}
      aria-selected={isSelected}
      className={styles.branch}
      role="treeitem"
    >
      <div className={[styles.row, isSelected && styles.selected].filter(Boolean).join(' ')} style={{ '--tree-depth': depth } as React.CSSProperties}>
        {isFolder ? (
          <button
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
            className={styles.disclosure}
            onClick={() => onToggle(item.id)}
            type="button"
          >
            {isExpanded ? <ChevronDown aria-hidden size={16} /> : <ChevronRight aria-hidden size={16} />}
          </button>
        ) : <span aria-hidden className={styles.disclosureSpacer} />}
        <button className={styles.itemButton} onClick={() => onSelect(item)} type="button">
          {isFolder ? <Folder aria-hidden size={16} /> : <FileText aria-hidden size={16} />}
          <span>{item.label}</span>
        </button>
      </div>
      {isFolder && isExpanded && item.children?.length ? (
        <ul className={styles.group} role="group">
          {item.children.map((child) => (
            <Branch
              depth={depth + 1}
              expandedIds={expandedIds}
              item={child}
              key={child.id}
              onSelect={onSelect}
              onToggle={onToggle}
              selectedId={selectedId}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function FileBrowser({
  defaultExpandedIds = [],
  defaultSelectedId,
  emptyMessage = 'No files found.',
  items,
  label = 'Files',
  onSelect,
  searchable = false,
  selectedId,
}: FileBrowserProps) {
  const [expandedIds, setExpandedIds] = useState(() => new Set(defaultExpandedIds))
  const [internalSelectedId, setInternalSelectedId] = useState(defaultSelectedId)
  const [query, setQuery] = useState('')
  const activeSelectedId = selectedId ?? internalSelectedId
  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return []
    return flattenItems(items).filter((item) => item.label.toLocaleLowerCase().includes(normalizedQuery))
  }, [items, query])

  function handleSelect(item: FileBrowserItem) {
    if (selectedId === undefined) setInternalSelectedId(item.id)
    onSelect?.(item)
  }

  function handleToggle(id: string) {
    setExpandedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const isSearching = query.trim().length > 0

  return (
    <nav aria-label={label} className={styles.browser}>
      {searchable ? (
        <label className={styles.search}>
          <Search aria-hidden size={16} />
          <span className="visually-hidden">Search files</span>
          <input
            aria-label="Search files"
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search"
            type="search"
            value={query}
          />
        </label>
      ) : null}
      {isSearching ? (
        matches.length ? (
          <div aria-label="Search results" className={styles.results} role="listbox">
            {matches.map((item) => (
              <button
                aria-selected={activeSelectedId === item.id}
                className={[styles.result, activeSelectedId === item.id && styles.selected].filter(Boolean).join(' ')}
                key={item.id}
                onClick={() => handleSelect(item)}
                role="option"
                type="button"
              >
                {item.kind === 'folder' ? <Folder aria-hidden size={16} /> : <FileText aria-hidden size={16} />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : <p className={styles.empty}>{emptyMessage}</p>
      ) : items.length ? (
        <ul aria-label={label} className={styles.tree} role="tree">
          {items.map((item) => (
            <Branch
              depth={0}
              expandedIds={expandedIds}
              item={item}
              key={item.id}
              onSelect={handleSelect}
              onToggle={handleToggle}
              selectedId={activeSelectedId}
            />
          ))}
        </ul>
      ) : <p className={styles.empty}>{emptyMessage}</p>}
    </nav>
  )
}
