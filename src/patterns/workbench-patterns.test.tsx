import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../components/Button/Button'
import { InlineNotice } from '../components/InlineNotice/InlineNotice'
import { OperationStatus } from '../components/OperationStatus/OperationStatus'
import { SegmentedControl } from '../components/SegmentedControl/SegmentedControl'
import { ConfirmationDialog } from './ConfirmationDialog/ConfirmationDialog'
import { DocumentHeader } from './DocumentHeader/DocumentHeader'
import { EditorSurface } from './EditorSurface/EditorSurface'
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

    fireEvent.click(screen.getByRole('treeitem', { name: 'Notes' }))
    fireEvent.click(screen.getByRole('treeitem', { name: 'Session 12.md' }))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'session' }))
    expect(screen.getByRole('treeitem', { name: 'Session 12.md' })).toHaveAttribute('aria-selected', 'true')

    const search = screen.getByRole('searchbox', { name: 'Search files' })
    fireEvent.change(search, { target: { value: 'read' } })
    expect(screen.getByRole('option', { name: 'README.md' })).toBeInTheDocument()

    fireEvent.change(search, { target: { value: 'missing' } })
    expect(screen.getByText('No files found.')).toBeInTheDocument()
  })

  it('moves one tree tab stop with Arrow, Home, End, Left, and Right', async () => {
    render(<FileBrowser items={items} />)

    const notes = screen.getByRole('treeitem', { name: 'Notes' })
    const readme = screen.getByRole('treeitem', { name: 'README.md' })
    notes.focus()

    expect(screen.getAllByRole('treeitem').filter((item) => item.tabIndex === 0)).toEqual([notes])
    fireEvent.keyDown(notes, { key: 'ArrowRight' })
    expect(notes).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(notes, { key: 'ArrowRight' })
    const session = screen.getByRole('treeitem', { name: 'Session 12.md' })
    await waitFor(() => expect(session).toHaveFocus())
    expect(screen.getAllByRole('treeitem').filter((item) => item.tabIndex === 0)).toEqual([session])

    fireEvent.keyDown(session, { key: 'End' })
    await waitFor(() => expect(readme).toHaveFocus())
    fireEvent.keyDown(readme, { key: 'Home' })
    await waitFor(() => expect(notes).toHaveFocus())

    fireEvent.keyDown(notes, { key: 'ArrowDown' })
    await waitFor(() => expect(session).toHaveFocus())
    fireEvent.keyDown(session, { key: 'ArrowLeft' })
    await waitFor(() => expect(notes).toHaveFocus())
    fireEvent.keyDown(notes, { key: 'ArrowLeft' })
    expect(notes).toHaveAttribute('aria-expanded', 'false')
  })

  it('exposes text-first editor modes and delegates controlled changes', () => {
    const onModeChange = vi.fn()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <>
        <EditorToolbar mode="source" onModeChange={onModeChange} status="Saved" />
        <SegmentedControl
          label="Editor density"
          onValueChange={onValueChange}
          options={[
            { label: 'Comfortable', value: 'comfortable' },
            { disabled: true, label: 'Compact', value: 'compact' },
          ]}
          value="comfortable"
        />
      </>,
    )

    const toolbar = screen.getByRole('toolbar', { name: 'Editor controls' })
    const modeSwitch = screen.getByRole('group', { name: 'Editor view' })
    expect(toolbar.querySelector('[data-slot="editor-toolbar-trailing"]')).toContainElement(modeSwitch)
    expect(toolbar.querySelector('[data-slot="editor-toolbar-center"]')).not.toContainElement(modeSwitch)
    expect(screen.getByRole('button', { name: 'Source' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Rendered' }))
    expect(onModeChange).toHaveBeenCalledWith('rendered')
    expect(screen.getByRole('group', { name: 'Editor density' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Comfortable' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Compact' }))
    expect(onValueChange).not.toHaveBeenCalled()

    rerender(<EditorToolbar mode="source" modePlacement="center" onModeChange={onModeChange} status="Saved" />)
    const centeredToolbar = screen.getByRole('toolbar', { name: 'Editor controls' })
    expect(centeredToolbar.querySelector('[data-slot="editor-toolbar-center"]')).toContainElement(screen.getByRole('group', { name: 'Editor view' }))
  })

  it('delegates inline document-name editing through visible actions', async () => {
    const onRename = vi.fn()

    function HeaderHarness() {
      const [editing, setEditing] = useState(false)
      const [value, setValue] = useState('Session 12.md')
      return (
        <DocumentHeader
          path="Campaign notes / Sessions"
          rename={{
            editing,
            onCancel: () => setEditing(false),
            onChange: setValue,
            onStart: () => setEditing(true),
            onSubmit: () => onRename(value),
            value,
          }}
          title="Session 12.md"
        />
      )
    }

    const { rerender } = render(<HeaderHarness />)
    const renameTitle = screen.getByRole('button', { name: 'Session 12.md' })
    fireEvent.click(renameTitle)
    const filename = screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement
    await waitFor(() => expect(filename).toHaveFocus())
    expect(filename).toHaveValue('Session 12')
    expect(screen.getByText('.md')).toHaveAttribute('data-slot', 'document-header-extension')
    expect(filename.selectionStart).toBe(0)
    expect(filename.selectionEnd).toBe(filename.value.length)
    expect(screen.queryByRole('button', { name: 'Rename' })).not.toBeInTheDocument()
    fireEvent.change(filename, { target: { value: 'Session 13' } })
    fireEvent.submit(filename.closest('form')!)
    expect(onRename).toHaveBeenCalledWith('Session 13.md')
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    fireEvent.keyDown(filename, { key: 'Escape' })
    expect(await screen.findByRole('button', { name: 'Session 12.md' })).toBeInTheDocument()

    rerender(<DocumentHeader readOnlyReason="This document has a protected filename." title="tasks.md" />)
    expect(screen.queryByRole('button', { name: 'Rename' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'tasks.md' })).not.toBeInTheDocument()
    expect(screen.getByText('This document has a protected filename.')).toBeInTheDocument()
  })

  it('exposes stable editor regions and shared alignment variables', () => {
    render(
      <EditorSurface
        ariaLabel="Markdown editor"
        header={<p>Document identity</p>}
        notice={<p>Recovery notice</p>}
        style={{ '--editor-content-width': '52rem', '--editor-text-inset': '24px' }}
        toolbar={<p>Editor actions</p>}
      >
        <div>Editor engine</div>
      </EditorSurface>,
    )

    const surface = screen.getByRole('region', { name: 'Markdown editor' })
    expect(surface).toHaveStyle({ '--editor-content-width': '52rem', '--editor-text-inset': '24px' })
    expect(surface.querySelector('[data-slot="editor-surface-header"]')).toHaveTextContent('Document identity')
    expect(surface.querySelector('[data-slot="editor-surface-toolbar"]')).toHaveTextContent('Editor actions')
    expect(surface.querySelector('[data-slot="editor-surface-notice"]')).toHaveTextContent('Recovery notice')
    expect(surface.querySelector('[data-slot="editor-surface-editor"]')).toHaveTextContent('Editor engine')
  })

  it('composes one routine live status with an assertive recovery notice', () => {
    render(
      <>
        <EditorToolbar status={<OperationStatus label="Saving…" phase="pending" />} />
        <InlineNotice actions={<Button>Retry save</Button>} role="alert" title="Save failed" tone="danger">
          Your text remains in the editor.
        </InlineNotice>
      </>,
    )

    expect(screen.getAllByRole('status')).toHaveLength(1)
    expect(screen.getByRole('alert')).toHaveTextContent('Your text remains in the editor.')
    expect(document.querySelector('[data-slot="editor-toolbar-status"]')).not.toHaveAttribute('aria-live')
    expect(screen.getByRole('button', { name: 'Retry save' })).toBeInTheDocument()
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
    expect(document.querySelector('[data-slot="workbench-shell"]')).toBeInTheDocument()
    expect(document.querySelector('[data-slot="workbench-rail"]')).toBeInTheDocument()
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

  it('applies public root styles and stable named slots across workbench patterns', () => {
    render(
      <WorkbenchShell
        className="app-shell"
        context={<p>Context</p>}
        main={(
          <EditorSurface className="app-editor" style={{ '--editor-content-width': '48rem' }}>
            <EmptyState
              action={<Button>Create note</Button>}
              className="app-empty"
              description="Start with a blank note."
              title="No notes yet"
            />
          </EditorSurface>
        )}
        navigation={<FileBrowser className="app-browser" items={items} />}
        rail={<span>UF</span>}
        style={{ '--workbench-navigation-width': '16rem' }}
      />,
    )

    expect(document.querySelector('[data-slot="workbench-shell"]')).toHaveClass('app-shell')
    expect(document.querySelector('[data-slot="workbench-shell"]')).toHaveStyle({
      '--workbench-navigation-width': '16rem',
    })
    expect(document.querySelector('[data-slot="editor-surface"]')).toHaveClass('app-editor')
    expect(document.querySelector('[data-slot="editor-surface"]')).toHaveStyle({
      '--editor-content-width': '48rem',
    })
    expect(document.querySelector('[data-slot="file-browser"]')).toHaveClass('app-browser')
    expect(document.querySelector('[data-slot="empty-state"]')).toHaveClass('app-empty')
    expect(document.querySelector('[data-slot="empty-state-action"]')).toHaveTextContent('Create note')
  })
})
