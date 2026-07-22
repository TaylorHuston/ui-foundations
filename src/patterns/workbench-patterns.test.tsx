import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../components/Button/Button'
import { ConfirmationDialog } from './ConfirmationDialog/ConfirmationDialog'
import { EditorToolbar } from './EditorToolbar/EditorToolbar'
import { EmptyState } from './EmptyState/EmptyState'
import { FileBrowser, type FileBrowserItem } from './FileBrowser/FileBrowser'
import { NavigationRail, NavigationRailButton, NavigationRailLink } from './NavigationRail/NavigationRail'
import { ThreePaneShell } from './ThreePaneShell/ThreePaneShell'
import { WorkbenchShell } from './WorkbenchShell/WorkbenchShell'

const items: FileBrowserItem[] = [
  {
    id: 'notes',
    kind: 'folder',
    label: 'Notes',
    children: [{ id: 'session', kind: 'file', label: 'Session 12.md' }],
  },
  { id: 'readme', kind: 'file', label: 'README.md' },
]

describe('workbench pattern references', () => {
  it('discloses, selects, searches, and reports an empty file result', () => {
    const onSelect = vi.fn()
    render(<FileBrowser items={items} onSelect={onSelect} searchable />)

    fireEvent.click(screen.getByRole('button', { name: 'Expand Notes' }))
    fireEvent.click(screen.getByRole('button', { name: 'Session 12.md' }))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'session' }))
    expect(screen.getByRole('treeitem', { name: 'Session 12.md' })).toHaveAttribute('aria-selected', 'true')

    const search = screen.getByRole('searchbox', { name: 'Search files' })
    fireEvent.change(search, { target: { value: 'read' } })
    expect(screen.getByRole('option', { name: 'README.md' })).toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'missing' } })
    expect(screen.getByText('No files found.')).toBeInTheDocument()
  })

  it('exposes Source and Rendered editor modes and delegates changes', () => {
    const onModeChange = vi.fn()
    render(<EditorToolbar mode="source" onModeChange={onModeChange} status="Saved" />)

    expect(screen.getByRole('button', { name: 'Source' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Rendered' }))
    expect(onModeChange).toHaveBeenCalledWith('rendered')
    expect(screen.getByText('Saved')).toHaveAttribute('aria-live', 'polite')
  })

  it('delegates destructive work only after explicit confirmation', async () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmationDialog
        confirmLabel="Delete file"
        description="This cannot be undone."
        destructive
        onConfirm={onConfirm}
        title="Delete this file?"
        trigger={<Button variant="danger">Delete</Button>}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('dialog', { name: 'Delete this file?' })
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(onConfirm).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }))
    await screen.findByRole('dialog', { name: 'Delete this file?' })
    fireEvent.click(screen.getByRole('button', { name: 'Delete file' }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it('renders an empty state action only when supplied', () => {
    const { rerender } = render(<EmptyState description="Create a file to begin." title="No files" />)
    expect(screen.getByRole('heading', { name: 'No files' })).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    rerender(<EmptyState action={<Button>Create file</Button>} description="Create a file to begin." title="No files" />)
    expect(screen.getByRole('button', { name: 'Create file' })).toBeInTheDocument()
  })

  it('provides distinct labeled navigation, primary, and context regions', () => {
    render(
      <ThreePaneShell
        context={<p>Context content</p>}
        contextLabel="Inspector"
        main={<p>Primary content</p>}
        mainLabel="Editor"
        navigation={<p>Navigation content</p>}
        navigationLabel="Files"
      />,
    )

    expect(screen.getByRole('complementary', { name: 'Files' })).toBeInTheDocument()
    expect(screen.getByRole('main', { name: 'Editor' })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Inspector' })).toBeInTheDocument()
  })

  it('supports named link and button destinations in an application rail', () => {
    const onSearch = vi.fn()
    render(
      <NavigationRail
        brand={<a href="#home">UI</a>}
        primary={(
          <>
            <NavigationRailLink active href="#documents" icon={<span>D</span>} label="Documents" />
            <NavigationRailButton icon={<span>S</span>} label="Search" onClick={onSearch} />
          </>
        )}
      />,
    )

    expect(screen.getByRole('navigation', { name: 'Application navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Documents' })).toHaveAttribute('aria-current', 'page')
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))
    expect(onSearch).toHaveBeenCalledOnce()
  })

  it('composes optional controlled side regions around a stable work surface', () => {
    const { rerender } = render(
      <WorkbenchShell
        context={<p>Context content</p>}
        contextLabel="Inspector"
        main={<p>Primary content</p>}
        mainLabel="Editor"
        navigation={<p>Navigation content</p>}
        navigationLabel="Files"
        rail={<nav aria-label="App switcher">Rail content</nav>}
      />,
    )

    expect(screen.getByRole('navigation', { name: 'App switcher' })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Files' })).toBeInTheDocument()
    expect(screen.getByRole('main', { name: 'Editor' })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Inspector' })).toBeInTheDocument()

    rerender(
      <WorkbenchShell
        context={<p>Context content</p>}
        contextCollapsed
        main={<p>Primary content</p>}
        navigation={<p>Navigation content</p>}
        navigationCollapsed
        rail={<nav aria-label="App switcher">Rail content</nav>}
      />,
    )

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    expect(screen.getByRole('main', { name: 'Workspace' })).toBeInTheDocument()
  })
})
