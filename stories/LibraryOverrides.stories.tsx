import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type ComponentProps } from 'react'
import {
  Button,
  Dialog,
  InlineNotice,
  TextField,
} from '../src/components'
import {
  EditorSurface,
  WorkbenchShell,
} from '../src/patterns'
import styles from './LibraryOverrides.stories.module.css'

function AppButton({ className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={[styles.productButton, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

function LibraryOverridesReference() {
  const [saved, setSaved] = useState(false)

  return (
    <div className={styles.page}>
      <header className={styles.introduction}>
        <p>UI Foundations · Consumer contract</p>
        <h1>Import defaults. Override identity. Own behavior.</h1>
        <span>
          Both examples use the same packaged components. The product example changes only
          documented tokens, root hooks, named slots, and an app-owned wrapper.
        </span>
      </header>

      <WorkbenchShell
        className={styles.shell}
        context={(
          <section className={styles.sidebarContent}>
            <strong>Context</strong>
            <span>Application-owned content</span>
          </section>
        )}
        main={(
          <EditorSurface
            ariaLabel="Library override comparison"
            className={styles.editor}
            header={<strong>Package adoption preview</strong>}
            style={{ '--editor-content-width': '68rem' }}
          >
            <div className={styles.comparison}>
              <section className={styles.example} id="comparison">
                <div>
                  <p className={styles.eyebrow}>Foundation default</p>
                  <h2>Graphite baseline</h2>
                  <p>Safe defaults work without consumer styling.</p>
                </div>
                <TextField label="Workspace name" supportingText="Component behavior remains shared." />
                <div className={styles.actions}>
                  <Button>Save workspace</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
                <InlineNotice title="Shared contract">
                  Semantics, focus, and state behavior remain library-owned.
                </InlineNotice>
              </section>

              <section className={[styles.example, styles.productIdentity].join(' ')} id="tokens">
                <div>
                  <p className={styles.eyebrow}>App-owned override</p>
                  <h2>Juniper identity</h2>
                  <p>Identity is concentrated in actions and accents.</p>
                </div>
                <TextField
                  label="Workspace name"
                  rootClassName={styles.productField}
                  supportingText="The app can scope local geometry and identity."
                />
                <div className={styles.actions}>
                  <AppButton onClick={() => setSaved(true)}>Save workspace</AppButton>
                  <Dialog
                    description="This surface is portaled, but its app hook remains explicit."
                    portalClassName={styles.productPortal}
                    portalStyle={{ '--surface': '#17241f', '--surface-raised': '#22332b' }}
                    surfaceClassName={styles.productDialog}
                    title="Portal-safe override"
                    trigger={<AppButton variant="secondary">Review dialog</AppButton>}
                  >
                    Product content and decisions stay in the consuming application.
                  </Dialog>
                </div>
                <InlineNotice
                  className={styles.productNotice}
                  role="status"
                  title={saved ? 'Saved by the app' : 'Wrapper boundary'}
                  tone={saved ? 'success' : 'neutral'}
                >
                  The wrapper owns local defaults and callbacks without patching package source.
                </InlineNotice>
              </section>
            </div>
          </EditorSurface>
        )}
        navigation={(
          <nav aria-label="Example files" className={styles.sidebarContent}>
            <strong>Files</strong>
            <a aria-current="page" href="#comparison">Package adoption</a>
            <a href="#tokens">Theme overrides</a>
          </nav>
        )}
        rail={<nav aria-label="Application"><span className={styles.mark}>UF</span></nav>}
        style={{
          '--workbench-content-width': '74rem',
          '--workbench-navigation-width': '14rem',
          '--workbench-rail-width': '3.5rem',
        }}
      />
    </div>
  )
}

const meta = {
  title: 'Foundations/Library Overrides',
  component: LibraryOverridesReference,
  parameters: {
    docs: {
      description: {
        component: 'The supported package-consumer seam: semantic tokens, root classes/styles, stable data slots, portal hooks, and app-owned wrappers.',
      },
    },
  },
} satisfies Meta<typeof LibraryOverridesReference>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAndProductIdentity: Story = {}
