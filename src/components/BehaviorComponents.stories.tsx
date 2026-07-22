import type { Meta, StoryObj } from '@storybook/react-vite'
import { Archive, Ellipsis, HelpCircle, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button/Button'
import { Checkbox } from './Checkbox/Checkbox'
import { Dialog } from './Dialog/Dialog'
import { IconButton } from './IconButton/IconButton'
import { Menu } from './Menu/Menu'
import { Sheet } from './Sheet/Sheet'
import { Switch } from './Switch/Switch'
import { Tabs } from './Tabs/Tabs'
import { Tooltip } from './Tooltip/Tooltip'
import styles from './BehaviorComponents.stories.module.css'

function OverlayReferences() {
  return (
    <main className={styles.reference}>
      <h1>Overlay references</h1>
      <section>
        <h2>Tooltip</h2>
        <Tooltip content="Open help documentation">
          <IconButton label="Help"><HelpCircle aria-hidden size={18} /></IconButton>
        </Tooltip>
      </section>
      <section>
        <h2>Dialog</h2>
        <Dialog
          description="Change the local presentation without affecting saved content."
          primaryActionLabel="Apply"
          title="Display settings"
          trigger={<Button variant="secondary">Open settings</Button>}
        >
          <p className={styles.bodyCopy}>Dialog content remains application-owned and can contain forms or other semantic compositions.</p>
        </Dialog>
      </section>
      <section>
        <h2>Sheet</h2>
        <Sheet
          description="The document remains primary while navigation moves into an accessible overlay."
          title="Workspace navigation"
          trigger={<Button variant="secondary">Open navigation</Button>}
        >
          <nav aria-label="Files" className={styles.sheetNavigation}>
            <a href="#current" aria-current="page">Current document</a>
            <a href="#archive">Archive</a>
            <button type="button">Create document</button>
          </nav>
        </Sheet>
      </section>
      <section>
        <h2>Menu</h2>
        <Menu
          items={[
            { id: 'rename', icon: <Pencil aria-hidden size={16} />, label: 'Rename' },
            { id: 'archive', icon: <Archive aria-hidden size={16} />, label: 'Archive' },
            { destructive: true, id: 'delete', icon: <Trash2 aria-hidden size={16} />, label: 'Delete' },
          ]}
          trigger={<IconButton label="File actions"><Ellipsis aria-hidden size={18} /></IconButton>}
        />
      </section>
    </main>
  )
}

function SelectionReferences() {
  const [tab, setTab] = useState('overview')
  const [checked, setChecked] = useState(true)
  const [enabled, setEnabled] = useState(false)

  return (
    <main className={styles.reference}>
      <h1>Selection references</h1>
      <section className={styles.wide}>
        <h2>Tabs</h2>
        <Tabs
          items={[
            { content: 'Overview content', label: 'Overview', value: 'overview' },
            { content: 'Activity content', label: 'Activity', value: 'activity' },
            { content: 'Disabled content', disabled: true, label: 'History', value: 'history' },
          ]}
          label="Project details"
          onValueChange={setTab}
          value={tab}
        />
      </section>
      <section>
        <h2>Checkbox</h2>
        <div className={styles.stack}>
          <Checkbox checked={checked} label="Include archived files" onCheckedChange={setChecked} />
          <Checkbox indeterminate label="Some child items selected" />
          <Checkbox disabled label="Unavailable option" />
        </div>
      </section>
      <section>
        <h2>Switch</h2>
        <div className={styles.stack}>
          <Switch
            checked={enabled}
            description="Show changes while other people edit."
            label="Live updates"
            onCheckedChange={setEnabled}
          />
          <Switch disabled label="Unavailable integration" />
        </div>
      </section>
    </main>
  )
}

const meta = {
  title: 'Components/Behavior',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overlays: Story = { render: () => <OverlayReferences /> }
export const Selection: Story = { render: () => <SelectionReferences /> }
