import type { Meta, StoryObj } from '@storybook/react-vite'

const colors = [
  ['Canvas', '--canvas'],
  ['Surface', '--surface'],
  ['Raised', '--surface-raised'],
  ['Identity', '--identity'],
  ['Action', '--action'],
  ['Action text', '--action-text'],
  ['Focus', '--focus-ring'],
  ['Primary text', '--text'],
  ['Secondary text', '--text-secondary'],
  ['Success', '--success'],
  ['Warning', '--warning'],
  ['Danger', '--danger'],
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
          {colors.map(([name, token]) => (
            <article className="swatch" key={name}>
              <span className="swatch-color" style={{ background: `var(${token})` }} />
              <strong>{name}</strong>
              <code>{token}</code>
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
          <button className="primaryAction" type="button">Primary action</button>
          <button className="secondaryAction" type="button">Secondary action</button>
          <label>
            <span>Search</span>
            <input className="textControl" type="search" placeholder="Filter files" />
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
