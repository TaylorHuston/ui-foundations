import { FileText, Folder, FolderOpen, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { TreeView, type TreeViewItem } from '../../components/TreeView/TreeView'
import styles from './FileBrowser.module.css'

export interface FileBrowserItem {
  children?: FileBrowserItem[]
  id: string
  kind: 'file' | 'folder'
  label: string
}

export interface FileTreeProps {
  defaultExpandedIds?: string[]
  defaultSelectedId?: string
  expandedIds?: string[]
  items: FileBrowserItem[]
  label?: string
  onExpandedIdsChange?: (expandedIds: string[]) => void
  onSelect?: (item: FileBrowserItem) => void
  selectedId?: string
}

export interface FileBrowserProps extends FileTreeProps {
  emptyMessage?: string
  searchable?: boolean
}

function flattenItems(items: FileBrowserItem[]): FileBrowserItem[] {
  return items.flatMap((item) => [item, ...flattenItems(item.children ?? [])])
}

function normalizeTree(items: FileBrowserItem[]): TreeViewItem[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    ...(item.kind === 'folder' ? { children: normalizeTree(item.children ?? []) } : {}),
  }))
}

export function FileTree({
  defaultExpandedIds,
  defaultSelectedId,
  expandedIds,
  items,
  label = 'Files',
  onExpandedIdsChange,
  onSelect,
  selectedId,
}: FileTreeProps) {
  const normalizedItems = useMemo(() => normalizeTree(items), [items])
  const itemById = useMemo(() => new Map(flattenItems(items).map((item) => [item.id, item])), [items])

  return (
    <TreeView
      defaultExpandedIds={defaultExpandedIds}
      defaultSelectedId={defaultSelectedId}
      expandedIds={expandedIds}
      items={normalizedItems}
      label={label}
      onExpandedIdsChange={onExpandedIdsChange}
      onSelect={(item) => {
        const fileItem = itemById.get(item.id)
        if (fileItem) onSelect?.(fileItem)
      }}
      renderIcon={(_, state) => state.branch
        ? state.expanded
          ? <FolderOpen aria-hidden size={16} strokeWidth={1.75} />
          : <Folder aria-hidden size={16} strokeWidth={1.75} />
        : <FileText aria-hidden size={16} strokeWidth={1.75} />}
      selectedId={selectedId}
    />
  )
}

export function FileBrowser({
  defaultExpandedIds,
  defaultSelectedId,
  emptyMessage = 'No files found.',
  expandedIds,
  items,
  label = 'Files',
  onExpandedIdsChange,
  onSelect,
  searchable = false,
  selectedId,
}: FileBrowserProps) {
  const [internalSelectedId, setInternalSelectedId] = useState(defaultSelectedId)
  const [query, setQuery] = useState('')
  const activeSelectedId = selectedId ?? internalSelectedId
  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return []
    return flattenItems(items).filter((item) => item.label.toLocaleLowerCase().includes(normalizedQuery))
  }, [items, query])
  const isSearching = query.trim().length > 0

  function handleSelect(item: FileBrowserItem) {
    if (selectedId === undefined) setInternalSelectedId(item.id)
    onSelect?.(item)
  }

  return (
    <nav aria-label={label} className={styles.browser} data-slot="file-browser">
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
                className={styles.result}
                data-selected={activeSelectedId === item.id || undefined}
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
        <FileTree
          defaultExpandedIds={defaultExpandedIds}
          defaultSelectedId={defaultSelectedId}
          expandedIds={expandedIds}
          items={items}
          label={label}
          onExpandedIdsChange={onExpandedIdsChange}
          onSelect={handleSelect}
          selectedId={activeSelectedId}
        />
      ) : <p className={styles.empty}>{emptyMessage}</p>}
    </nav>
  )
}
