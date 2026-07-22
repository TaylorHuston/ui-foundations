import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, FilePlus2, FileText, FolderSearch, Italic, MoreHorizontal, Save, Settings } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/Button/Button'
import { IconButton } from '../components/IconButton/IconButton'
import { ConfirmationDialog } from './ConfirmationDialog/ConfirmationDialog'
import { EditorToolbar, type EditorMode } from './EditorToolbar/EditorToolbar'
import { EmptyState } from './EmptyState/EmptyState'
import { FileBrowser, type FileBrowserItem } from './FileBrowser/FileBrowser'
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
      <h1>File browser</h1>
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

function EditorToolbarReference() {
  const [mode, setMode] = useState<EditorMode>('source')

  return (
    <main className={styles.patternPage}>
      <h1>Editor toolbar</h1>
      <div className={styles.editorFrame}>
        <EditorToolbar
          leadingActions={(
            <>
              <IconButton label="Bold"><Bold aria-hidden size={17} /></IconButton>
              <IconButton label="Italic"><Italic aria-hidden size={17} /></IconButton>
            </>
          )}
          mode={mode}
          onModeChange={setMode}
          status="Saved"
          trailingActions={(
            <>
              <IconButton label="Save"><Save aria-hidden size={17} /></IconButton>
              <IconButton label="More actions"><MoreHorizontal aria-hidden size={17} /></IconButton>
            </>
          )}
        />
        <article className={styles.editorContent}>
          {mode === 'source' ? '# The observatory\n\nThe brass doors opened at midnight.' : (
            <><h2>The observatory</h2><p>The brass doors opened at midnight.</p></>
          )}
        </article>
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
            status="Saved"
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
export const EditorCommands: Story = { render: () => <EditorToolbarReference /> }
export const DestructiveConfirmation: Story = { render: () => <ConfirmationReference /> }
export const EmptyCollection: Story = { render: () => <EmptyStateReference /> }
export const ThreePaneComposition: Story = { name: 'Inspector Workbench', render: () => <ThreePaneReference /> }
export const ApplicationNavigation: Story = { render: () => <NavigationRailReference /> }
