import type { Meta, StoryObj } from '@storybook/react-vite'

const colors = [
  ['Canvas', 'var(--background)', '#09090B'],
  ['Surface', 'var(--surface)', '#18181B'],
  ['Raised', 'var(--surface-raised)', '#27272A'],
  ['Primary text', 'var(--text-primary)', '#F4F4F5'],
  ['Secondary text', 'var(--text-secondary)', '#D4D4D8'],
  ['Action / information', 'var(--action)', '#356FA3'],
  ['Success', 'var(--success)', '#4ADE80'],
  ['Warning', 'var(--warning)', '#FBBF24'],
  ['Danger', 'var(--danger)', '#DC5060'],
] as const

function FoundationsReference() {
  return (
    <main className="foundations-reference">
      <header className="foundations-header">
        <p>UI Foundations</p>
        <h1>Implementation reference</h1>
        <span>Starting values for comparison, not a mandatory application identity.</span>
      </header>

      <section aria-labelledby="foundation-colors">
        <h2 id="foundation-colors">Color roles</h2>
        <div className="swatch-grid">
          {colors.map(([name, value, hex]) => (
            <article className="swatch" key={name}>
              <span className="swatch-color" style={{ background: value }} />
              <strong>{name}</strong>
              <code>{hex}</code>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="foundation-type">
        <h2 id="foundation-type">Typography</h2>
        <div className="type-samples">
          <div>
            <span>Interface</span>
            <strong>Clear hierarchy for repeated work</strong>
            <p>General controls and prose use the interface family.</p>
          </div>
          <div className="technical-sample">
            <span>Technical</span>
            <strong>docs/changes/ui-reconciliation/tasks.md</strong>
            <p>status: in_review | branch: change/ui-cleanup</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="foundation-controls">
        <h2 id="foundation-controls">Controls and states</h2>
        <div className="control-row">
          <button type="button">Primary action</button>
          <button className="secondary-control" type="button">Secondary</button>
          <label>
            <span>Search</span>
            <input type="search" placeholder="Filter files" />
          </label>
          <span className="status-sample">Ready</span>
        </div>
      </section>
    </main>
  )
}

const meta = {
  title: 'Foundations/Reference',
  component: FoundationsReference,
} satisfies Meta<typeof FoundationsReference>

export default meta
type Story = StoryObj<typeof meta>

export const DarkBaseline: Story = {}
