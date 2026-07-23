import '@taylorhuston/ui-foundations/styles.css'
import '@taylorhuston/ui-foundations/components.css'
import './theme.css'

import { StrictMode, type ComponentProps } from 'react'
import { createRoot } from 'react-dom/client'
import type { ButtonProps as PublicButtonProps } from '@taylorhuston/ui-foundations/components'
import { WorkbenchShell, type WorkbenchShellProps } from '@taylorhuston/ui-foundations/patterns'
import {
  themeProfiles,
  type ThemeProfileId,
} from '@taylorhuston/ui-foundations/theme-profiles'
import {
  Button,
  Dialog,
  InlineNotice,
  TextField,
} from '@taylorhuston/ui-foundations'

type AppButtonProps = ComponentProps<typeof Button> & PublicButtonProps

function AppButton({ className, ...props }: AppButtonProps) {
  return <Button className={['app-button', className].filter(Boolean).join(' ')} {...props} />
}

function App() {
  const identityProfile: ThemeProfileId = themeProfiles[0].id
  const contentAnchor: WorkbenchShellProps['contentAnchor'] = 'viewport'

  return (
    <WorkbenchShell
      className="consumer-shell"
      contentAnchor={contentAnchor}
      context={<aside><strong>Context</strong><p>Application-owned content</p></aside>}
      main={(
        <div className="consumer-main">
          <header>
            <p>Installed package fixture</p>
            <h1>Shared defaults with local identity</h1>
            <span>{themeProfiles.length} identity profiles available; default is {identityProfile}.</span>
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
        </div>
      )}
      navigation={<nav aria-label="Files"><strong>Files</strong><p>Package adoption</p></nav>}
      rail={<nav aria-label="Application"><span>UF</span></nav>}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
