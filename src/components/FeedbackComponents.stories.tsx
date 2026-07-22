import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from './Button/Button'
import { InlineNotice } from './InlineNotice/InlineNotice'
import { OperationStatus, type OperationPhase } from './OperationStatus/OperationStatus'
import styles from './FeedbackComponents.stories.module.css'

const phases: { label: string; phase: OperationPhase }[] = [
  { label: 'Unsaved changes', phase: 'dirty' },
  { label: 'Saving…', phase: 'pending' },
  { label: 'Saved', phase: 'success' },
  { label: 'A newer version is available', phase: 'warning' },
  { label: 'Save failed', phase: 'error' },
]

function FeedbackReference() {
  const [retrying, setRetrying] = useState(false)

  return (
    <main className={styles.reference}>
      <h1>Feedback references</h1>
      <section>
        <h2>Operation status</h2>
        <div className={styles.stack}>
          {phases.map(({ label, phase }) => (
            <OperationStatus
              action={phase === 'error' ? (
                <Button
                  onClick={() => setRetrying(true)}
                  size="toolbar"
                  variant="secondary"
                >
                  Retry save
                </Button>
              ) : undefined}
              key={phase}
              label={retrying && phase === 'error' ? 'Retrying…' : label}
              phase={retrying && phase === 'error' ? 'pending' : phase}
            />
          ))}
        </div>
      </section>
      <section>
        <h2>Inline notices</h2>
        <div className={styles.stack}>
          <InlineNotice title="Local draft preserved" tone="warning">
            <p>A newer saved version exists. Compare both versions before replacing either one.</p>
          </InlineNotice>
          <InlineNotice
            actions={<Button size="toolbar" variant="secondary">Try again</Button>}
            role="alert"
            title="Workspace unavailable"
            tone="danger"
          >
            <p>The service could not be reached. Your local work has not been changed.</p>
          </InlineNotice>
          <InlineNotice role="status" title="Index rebuilt" tone="success">
            <p>Twenty-four documents are ready to search.</p>
          </InlineNotice>
        </div>
      </section>
    </main>
  )
}

const meta = {
  title: 'Components/Feedback',
  component: FeedbackReference,
} satisfies Meta<typeof FeedbackReference>

export default meta
type Story = StoryObj<typeof meta>

export const Reference: Story = {}
