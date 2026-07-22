import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AlertTriangle,
  Check,
  ChevronRight,
  FileText,
  Folder,
  Palette,
  PanelLeft,
  Search,
  Settings,
  X,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { themeProfiles, type ThemeProfileId } from '../src/theme-profiles'
import styles from './IdentityThemes.stories.module.css'

const files = [
  { name: 'Product direction.md', selected: false },
  { name: 'Theme architecture.md', selected: true },
  { name: 'Accessibility review.md', selected: false },
]

function IdentityThemePrototype() {
  const [theme, setTheme] = useState<ThemeProfileId>('graphite')
  const [navigationOpen, setNavigationOpen] = useState(false)
  const closeNavigationButtonRef = useRef<HTMLButtonElement>(null)
  const openNavigationButtonRef = useRef<HTMLButtonElement>(null)
  const activeTheme = themeProfiles.find((candidate) => candidate.id === theme) ?? themeProfiles[0]

  const openNavigation = () => {
    setNavigationOpen(true)
    requestAnimationFrame(() => closeNavigationButtonRef.current?.focus())
  }

  const closeNavigation = () => {
    setNavigationOpen(false)
    requestAnimationFrame(() => openNavigationButtonRef.current?.focus())
  }

  return (
    <div className={styles.prototype} data-theme={theme}>
      <header className={styles.pageHeader}>
        <a className={styles.skipLink} href="#theme-preview">Skip to theme preview</a>
        <div>
          <p className={styles.eyebrow}>UI Foundations · Candidate</p>
          <h1>Identity themes</h1>
          <p className={styles.introduction}>
            One semantic system with quiet structural neutrals and a saturated identity layer.
          </p>
        </div>

        <fieldset className={styles.themePicker}>
          <legend>Choose a theme</legend>
          <div className={styles.themeOptions}>
            {themeProfiles.map((candidate) => (
              <label className={styles.themeOption} data-option={candidate.id} key={candidate.id}>
                <input
                  checked={theme === candidate.id}
                  name="identity-theme"
                  onChange={() => setTheme(candidate.id)}
                  type="radio"
                  value={candidate.id}
                />
                <span className={styles.optionSwatch} aria-hidden="true" />
                <span>{candidate.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </header>

      <p className={styles.themeDescription} aria-live="polite">
        <strong>{activeTheme.name}</strong> — {activeTheme.description}
      </p>

      <main className={styles.workbench} id="theme-preview">
        <aside
          className={`${styles.navigation} ${navigationOpen ? styles.navigationOpen : ''}`}
          aria-label="Workspace navigation"
          id="theme-navigation"
        >
          <div className={styles.brand}>
            <span className={styles.brandMark} aria-hidden="true"><Palette size={17} /></span>
            <span>Fieldnotes</span>
            <button
              className={styles.closeNavigationButton}
              onClick={closeNavigation}
              ref={closeNavigationButtonRef}
              type="button"
            >
              <X aria-hidden="true" size={18} />
              Close
            </button>
          </div>

          <label className={styles.searchField}>
            <span>Search workspace</span>
            <span className={styles.searchControl}>
              <Search aria-hidden="true" size={16} />
              <input autoComplete="off" name="workspace-search" placeholder="Find a note…" type="search" />
            </span>
          </label>

          <nav aria-label="Files">
            <p className={styles.sectionLabel}>Workspace</p>
            <button className={styles.folderRow} type="button">
              <ChevronRight aria-hidden="true" size={15} />
              <Folder aria-hidden="true" size={15} />
              Product
            </button>
            <ul className={styles.fileList}>
              {files.map((file) => (
                <li key={file.name}>
                  <button
                    aria-current={file.selected ? 'page' : undefined}
                    className={styles.fileRow}
                    onClick={closeNavigation}
                    type="button"
                  >
                    <FileText aria-hidden="true" size={15} />
                    <span>{file.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button className={styles.settingsButton} type="button">
            <Settings aria-hidden="true" size={16} />
            Settings
          </button>
        </aside>

        <section className={styles.documentPane} aria-labelledby="document-title">
          <header className={styles.documentToolbar}>
            <button
              aria-controls="theme-navigation"
              aria-expanded={navigationOpen}
              className={styles.openNavigationButton}
              onClick={openNavigation}
              ref={openNavigationButtonRef}
              type="button"
            >
              <PanelLeft aria-hidden="true" size={18} />
              Files
            </button>
            <div>
              <p>Product / Theme architecture.md</p>
              <span><Check aria-hidden="true" size={14} /> Saved</span>
            </div>
            <button className={styles.primaryAction} type="button">Share Note</button>
          </header>

          <article className={styles.document}>
            <p className={styles.documentKicker}>Design system</p>
            <h2 id="document-title">Theme architecture</h2>
            <p className={styles.lede}>
              Product identity should change the atmosphere without changing the meaning of the interface.
            </p>

            <h3>Shared semantic roles</h3>
            <p>
              Every theme preserves the same canvas, surface, text, action, focus, and status relationships.
              The neutral family receives only enough hue to make the identity perceptible.
            </p>

            <blockquote>
              A theme should feel recognizable at a glance and predictable after an hour of work.
            </blockquote>

            <h3>Stable meaning</h3>
            <ul>
              <li>Identity colors remain sparse and product-specific.</li>
              <li>Controls maintain a visible boundary in every atmosphere.</li>
              <li>Success, warning, and danger keep conventional meanings.</li>
            </ul>
          </article>
        </section>

        <aside className={styles.inspector} aria-label="Theme details">
          <p className={styles.sectionLabel}>Active Theme</p>
          <h2>{activeTheme.name}</h2>
          <p className={styles.inspectorDescription}>{activeTheme.description}</p>

          <dl className={styles.tokenList}>
            <div><dt><span className={styles.canvasToken} />Canvas</dt><dd>Atmosphere</dd></div>
            <div><dt><span className={styles.surfaceToken} />Surface</dt><dd>Structure</dd></div>
            <div><dt><span className={styles.identityToken} />Identity</dt><dd>Selection</dd></div>
            <div><dt><span className={styles.actionToken} />Action</dt><dd>Interaction</dd></div>
          </dl>

          <div className={styles.stateList} aria-label="Semantic state examples">
            <p className={styles.successState}><Check aria-hidden="true" size={15} /> Synced</p>
            <p className={styles.warningState}><AlertTriangle aria-hidden="true" size={15} /> Review needed</p>
            <p className={styles.dangerState}><span aria-hidden="true">×</span> Connection failed</p>
          </div>

          <p className={styles.inspectorNote}>
            Status colors do not inherit the theme tint. Meaning stays stable across products.
          </p>
        </aside>
      </main>
    </div>
  )
}

const meta = {
  title: 'Foundations/Identity Themes',
  component: IdentityThemePrototype,
  parameters: {
    docs: {
      description: {
        component: 'Candidate theme architecture: shared semantic roles, subtly tinted neutral families, and selectable product identities.',
      },
    },
  },
} satisfies Meta<typeof IdentityThemePrototype>

export default meta
type Story = StoryObj<typeof meta>

export const InteractiveWorkbench: Story = {}
