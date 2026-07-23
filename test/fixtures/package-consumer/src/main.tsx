import '@taylorhuston/ui-foundations/fonts.css'
import '@taylorhuston/ui-foundations/tokens.css'
import '@taylorhuston/ui-foundations/global.css'
import '@taylorhuston/ui-foundations/primitives.css'
import '@taylorhuston/ui-foundations/styles.css'
import '@taylorhuston/ui-foundations/components.css'
import './theme.css'

import { StrictMode, type ComponentProps } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Button,
  Dialog,
  InlineNotice,
  TextField,
  themeProfiles,
} from '@taylorhuston/ui-foundations'
import { WorkbenchShell } from '@taylorhuston/ui-foundations/patterns'

function AppButton({ className, ...props }: ComponentProps<typeof Button>) {
  return <Button className={['app-button', className].filter(Boolean).join(' ')} {...props} />
}

function App() {
  return (
    <WorkbenchShell
      className="consumer-shell"
      context={<aside><strong>Context</strong><p>Application-owned content</p></aside>}
      main={(
        <main className="consumer-main">
          <header>
            <p>Installed package fixture</p>
            <h1>Shared defaults with local identity</h1>
            <span>{themeProfiles.length} identity profiles available.</span>
          </header>
          <div className="comparison">
            <section className="example">
              <h2>Foundation default</h2>
              <TextField label="Workspace" supportingText="No consumer overrides." />
              <Button>Save changes</Button>
            </section>
            <section className="example product-identity">
              <h2>App wrapper</h2>
              <TextField label="Workspace" rootClassName="app-field" supportingText="Local semantic override." />
              <div className="actions">
                <AppButton>Save changes</AppButton>
                <Dialog
                  portalClassName="app-portal"
                  surfaceClassName="app-dialog"
                  title="Portal-safe product surface"
                  trigger={<AppButton variant="secondary">Review dialog</AppButton>}
                >
                  The consuming app owns this content and behavior.
                </Dialog>
              </div>
              <InlineNotice className="app-notice" title="Application boundary">
                Package behavior stays shared; product defaults remain local.
              </InlineNotice>
            </section>
          </div>
        </main>
      )}
      navigation={<nav aria-label="Files"><strong>Files</strong><p>Package adoption</p></nav>}
      rail={<span aria-label="Application">UF</span>}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
