import type { Meta, StoryObj } from '@storybook/react-vite'
import { Ellipsis, FilePlus2, FileText, FolderSearch, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/Button/Button'
import { IconButton } from '../components/IconButton/IconButton'
import { InlineNotice } from '../components/InlineNotice/InlineNotice'
import { OperationStatus, type OperationPhase } from '../components/OperationStatus/OperationStatus'
import { ConfirmationDialog } from './ConfirmationDialog/ConfirmationDialog'
import { DocumentHeader } from './DocumentHeader/DocumentHeader'
import { EditorSurface } from './EditorSurface/EditorSurface'
import { EditorModeSwitch, EditorToolbar, type EditorMode } from './EditorToolbar/EditorToolbar'
import { EmptyState } from './EmptyState/EmptyState'
import { FileBrowser, FileTree, type FileBrowserItem } from './FileBrowser/FileBrowser'
import { NavigationRail, NavigationRailButton, NavigationRailLink } from './NavigationRail/NavigationRail'
import { WorkbenchShell } from './WorkbenchShell/WorkbenchShell'
import styles from './WorkbenchPatterns.stories.module.css'

const files: FileBrowserItem[] = [
  {
    id: 'campaign',
    kind: 'folder',
    label: 'Campaign notes',
    children: [
      { id: 'session-12', kind: 'file', label: 'Session 12 - The observatory.md' },
      { id: 'session-11', kind: 'file', label: 'Session 11 - A very long filename that demonstrates wrapping instead of truncation.md' },
    ],
  },
  {
    id: 'people',
    kind: 'folder',
    label: 'People',
    children: [
      { id: 'mara', kind: 'file', label: 'Mara Venn.md' },
      { id: 'orin', kind: 'file', label: 'Orin Vale.md' },
    ],
  },
  { id: 'readme', kind: 'file', label: 'README.md' },
]

function FileBrowserReference() {
  const [selected, setSelected] = useState('session-12')

  return (
    <main className={styles.patternPage}>
      <h1>Searchable file browser</h1>
      <div className={styles.browserFrame}>
        <FileBrowser
          defaultExpandedIds={['campaign']}
          items={files}
          onSelect={(item) => setSelected(item.id)}
          searchable
          selectedId={selected}
        />
      </div>
    </main>
  )
}

function FileTreeReference() {
  const [selected, setSelected] = useState('session-12')

  return (
    <main className={styles.patternPage}>
      <h1>File tree</h1>
      <p className={styles.patternIntroduction}>Use Arrow keys, Home, and End to move. Right expands a folder; Left collapses it or returns to its parent.</p>
      <div className={styles.browserFrame}>
        <FileTree
          defaultExpandedIds={['campaign']}
          items={files}
          onSelect={(item) => setSelected(item.id)}
          selectedId={selected}
        />
      </div>
    </main>
  )
}

const sourceDocument = '# The observatory\n\nThe brass doors opened at midnight.'

const saveLabels: Record<OperationPhase, string> = {
  dirty: 'Unsaved changes',
  error: 'Save failed',
  idle: 'Ready',
  pending: 'Saving…',
  success: 'Saved',
  warning: 'Needs attention',
}

function DocumentEditingReference() {
  const [mode, setMode] = useState<EditorMode>('source')
  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState('Session 12 - The observatory.md')
  const [title, setTitle] = useState(draftName)
  const [savePhase, setSavePhase] = useState<OperationPhase>('dirty')

  function markDirty() {
    setSavePhase('dirty')
  }

  return (
    <main className={styles.patternPage}>
      <h1>Document editing</h1>
      <p className={styles.patternIntroduction}>A stable editor frame keeps document identity, view mode, autosave state, notices, and the app-owned editor engine aligned.</p>
      <div className={styles.editorFrame}>
        <EditorSurface
          ariaLabel="Document editor"
          header={(
            <DocumentHeader
              path="Campaign notes / Sessions"
              rename={{
                editing: editingName,
                onCancel: () => {
                  setDraftName(title)
                  setEditingName(false)
                },
                onChange: setDraftName,
                onStart: () => setEditingName(true),
                onSubmit: () => {
                  setTitle(draftName)
                  setEditingName(false)
                  markDirty()
                },
                value: draftName,
              }}
              title={title}
              trailingActions={(
                <>
                  <EditorModeSwitch mode={mode} onModeChange={setMode} />
                  <OperationStatus label={saveLabels[savePhase]} phase={savePhase} />
                  <IconButton label="More actions"><Ellipsis aria-hidden size={18} /></IconButton>
                </>
              )}
            />
          )}
        >
          <article className={styles.editorContent}>
            {mode === 'source' ? sourceDocument : (
              <><h2>The observatory</h2><p>The brass doors opened at midnight.</p></>
            )}
          </article>
        </EditorSurface>
      </div>
    </main>
  )
}

function EditorRecoveryReference() {
  return (
    <main className={styles.patternPage}>
      <h1>Editor state and recovery</h1>
      <p className={styles.patternIntroduction}>Keep routine save feedback quiet and persistent. Reserve assertive notices for failures that require a decision.</p>
      <div className={styles.recoveryFrame}>
        <EditorSurface
          ariaLabel="Editor recovery example"
          header={(
            <DocumentHeader
              path="Campaign notes / Sessions"
              readOnlyReason="Read-only while reviewing this revision."
              title="Session 12 - The observatory.md"
              trailingActions={<Button size="toolbar" variant="secondary">Return to current version</Button>}
            />
          )}
          notice={(
            <div className={styles.noticeStack}>
              <InlineNotice
                actions={<><Button size="toolbar">Compare versions</Button><Button size="toolbar" variant="ghost">Keep local copy</Button></>}
                role="alert"
                title="This file changed elsewhere"
                tone="warning"
              >Review both versions before replacing either copy.</InlineNotice>
              <InlineNotice
                actions={<Button size="toolbar">Retry save</Button>}
                role="alert"
                title="The latest changes were not saved"
                tone="danger"
              >Your text remains in this editor. Retry when the workspace is available.</InlineNotice>
              <InlineNotice title="Literal source is preserved" tone="info">
                Rendered view is a projection. Source mode remains the exact editable Markdown value.
              </InlineNotice>
            </div>
          )}
          toolbar={(
            <EditorToolbar
              center={<span className={styles.readOnlyLabel}>Read-only revision</span>}
              status={<OperationStatus label="Saved" phase="success" />}
            />
          )}
        >
          <div className={styles.stateSamples} aria-label="Save lifecycle examples">
            <OperationStatus label="Unsaved changes" live="off" phase="dirty" />
            <OperationStatus label="Saving…" live="off" phase="pending" />
            <OperationStatus label="Saved" live="off" phase="success" />
            <OperationStatus label="Read-only" live="off" phase="idle" />
          </div>
        </EditorSurface>
      </div>
    </main>
  )
}

function ConfirmationReference() {
  const [message, setMessage] = useState('No action taken.')

  return (
    <main className={styles.patternPage}>
      <h1>Confirmation dialog</h1>
      <ConfirmationDialog
        confirmLabel="Delete file"
        description="This removes the file from the current workspace. This action cannot be undone."
        destructive
        onConfirm={() => setMessage('File deletion delegated.')}
        title="Delete Session 12?"
        trigger={<Button variant="danger">Delete file</Button>}
      />
      <p aria-live="polite" className={styles.status}>{message}</p>
    </main>
  )
}

function EmptyStateReference() {
  return (
    <main className={styles.patternPage}>
      <h1>Empty state</h1>
      <EmptyState
        action={<Button><FilePlus2 aria-hidden size={17} />Create file</Button>}
        description="Create the first file here or choose another folder."
        icon={<FileText aria-hidden size={22} />}
        title="This folder is empty"
      />
    </main>
  )
}

function ThreePaneReference() {
  const [mode, setMode] = useState<EditorMode>('rendered')
  const [navigationCollapsed, setNavigationCollapsed] = useState(false)
  const [contextCollapsed, setContextCollapsed] = useState(false)

  return (
    <WorkbenchShell
      context={(
        <section className={styles.paneContent}>
          <p className={styles.eyebrow}>Current scene</p>
          <h2>The observatory</h2>
          <dl>
            <div><dt>Weather</dt><dd>Clear</dd></div>
            <div><dt>Time</dt><dd>Midnight</dd></div>
          </dl>
        </section>
      )}
      contextCollapsed={contextCollapsed}
      contextLabel="Scene context"
      main={(
        <div className={styles.mainPane}>
          <EditorToolbar
            leadingActions={(
              <>
                <Button onClick={() => setNavigationCollapsed((collapsed) => !collapsed)} size="toolbar" variant="ghost">
                  {navigationCollapsed ? 'Show files' : 'Hide files'}
                </Button>
                <Button onClick={() => setContextCollapsed((collapsed) => !collapsed)} size="toolbar" variant="ghost">
                  {contextCollapsed ? 'Show context' : 'Hide context'}
                </Button>
              </>
            )}
            mode={mode}
            onModeChange={setMode}
            status={<OperationStatus label="Saved" phase="success" />}
          />
          <article className={styles.document}>
            <p className={styles.eyebrow}>Campaign notes</p>
            <h1>The observatory</h1>
            <p>The brass doors opened at midnight. Beyond them, the old instruments had begun tracking a star no chart recorded.</p>
          </article>
        </div>
      )}
      mainLabel="Document editor"
      navigation={(
        <FileBrowser defaultExpandedIds={['campaign']} defaultSelectedId="session-12" items={files} searchable />
      )}
      navigationCollapsed={navigationCollapsed}
      navigationLabel="Workspace files"
      rail={(
        <NavigationRail
          brand={<a aria-label="UI Foundations home" href="#home">UI</a>}
          primary={(
            <>
              <NavigationRailLink active href="#documents" icon={<FileText size={19} />} label="Documents" />
              <NavigationRailButton icon={<FolderSearch size={19} />} label="Search" />
            </>
          )}
          secondary={<NavigationRailButton icon={<Settings size={19} />} label="Settings" />}
        />
      )}
    />
  )
}

function NavigationRailReference() {
  const [activeTool, setActiveTool] = useState('documents')

  return (
    <main className={styles.railReference}>
      <NavigationRail
        brand={<a aria-label="UI Foundations home" href="#home">UI</a>}
        primary={(
          <>
            <NavigationRailLink
              active={activeTool === 'documents'}
              href="#documents"
              icon={<FileText size={19} />}
              label="Documents"
              onClick={() => setActiveTool('documents')}
            />
            <NavigationRailButton
              active={activeTool === 'search'}
              icon={<FolderSearch size={19} />}
              label="Search"
              onClick={() => setActiveTool('search')}
            />
          </>
        )}
        secondary={(
          <NavigationRailButton icon={<Settings size={19} />} label="Settings" />
        )}
      />
      <section className={styles.railCanvas}>
        <p className={styles.eyebrow}>Active destination</p>
        <h1>{activeTool === 'documents' ? 'Documents' : 'Search'}</h1>
        <p>The rail stays compact while every destination retains a name through its tooltip and accessible label.</p>
      </section>
    </main>
  )
}

const meta = {
  title: 'Patterns/Workbench',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FileNavigation: Story = { render: () => <FileBrowserReference /> }
export const FileTreeNavigation: Story = { render: () => <FileTreeReference /> }
export const DocumentEditing: Story = { render: () => <DocumentEditingReference /> }
export const EditorRecovery: Story = { render: () => <EditorRecoveryReference /> }
export const DestructiveConfirmation: Story = { render: () => <ConfirmationReference /> }
export const EmptyCollection: Story = { render: () => <EmptyStateReference /> }
export const ThreePaneComposition: Story = { name: 'Inspector Workbench', render: () => <ThreePaneReference /> }
export const ApplicationNavigation: Story = { render: () => <NavigationRailReference /> }
