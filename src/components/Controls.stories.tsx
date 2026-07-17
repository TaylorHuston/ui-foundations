import { Search, Settings } from 'lucide-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button/Button'
import { IconButton } from './IconButton/IconButton'
import { Textarea } from './Textarea/Textarea'
import { TextField } from './TextField/TextField'
import styles from './Controls.stories.module.css'

function ControlReference() {
  return (
    <main className={styles.reference}>
      <section>
        <h2>Buttons</h2>
        <div className={styles.row}>
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Delete</Button>
          <Button pending>Save</Button>
          <Button disabled>Disabled</Button>
          <IconButton label="Search"><Search aria-hidden size={18} /></IconButton>
          <IconButton label="Settings"><Settings aria-hidden size={18} /></IconButton>
        </div>
      </section>
      <section className={styles.fields}>
        <TextField label="Workspace name" placeholder="My project" supportingText="Used in local navigation." />
        <TextField error="Enter a valid email address." label="Email" value="invalid" readOnly />
        <Textarea label="Description" placeholder="Describe the workspace" supportingText="Plain text is sufficient." />
      </section>
    </main>
  )
}

const meta = {
  title: 'Components/Controls',
  component: ControlReference,
} satisfies Meta<typeof ControlReference>

export default meta
type Story = StoryObj<typeof meta>

export const Reference: Story = {}
