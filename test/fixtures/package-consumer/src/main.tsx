import '@taylorhuston/ui-foundations/fonts.css'
import '@taylorhuston/ui-foundations/tokens.css'
import '@taylorhuston/ui-foundations/global.css'
import '@taylorhuston/ui-foundations/primitives.css'
import '@taylorhuston/ui-foundations/styles.css'
import '@taylorhuston/ui-foundations/components.css'
import './theme.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button, themeProfiles } from '@taylorhuston/ui-foundations'
import { WorkbenchShell } from '@taylorhuston/ui-foundations/patterns'

function App() {
  return (
    <WorkbenchShell
      className="consumer-shell"
      context={<p>Context</p>}
      main={(
        <article>
          <p>{themeProfiles.length} identity profiles available.</p>
          <Button>Save changes</Button>
        </article>
      )}
      navigation={<nav aria-label="Files">Files</nav>}
      rail={<span aria-label="Application">UF</span>}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
