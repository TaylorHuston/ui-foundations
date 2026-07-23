import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from './Button/Button'
import { Checkbox } from './Checkbox/Checkbox'
import { Dialog } from './Dialog/Dialog'
import { InlineNotice } from './InlineNotice/InlineNotice'
import { Menu } from './Menu/Menu'
import { Sheet } from './Sheet/Sheet'
import { Switch } from './Switch/Switch'
import { Tabs } from './Tabs/Tabs'
import { TextField } from './TextField/TextField'
import { Tooltip } from './Tooltip/Tooltip'

describe('public styling override contract', () => {
  it('exposes stable root and named slot hooks without generated selectors', () => {
    render(
      <>
        <Button className="app-button" style={{ '--control-min-inline-size': '12rem' }}>Save</Button>
        <Checkbox className="app-checkbox" label="Include archived" />
        <Switch className="app-switch" label="Live updates" />
        <Tabs
          className="app-tabs"
          items={[{ content: 'Overview panel', label: 'Overview', value: 'overview' }]}
          label="Project details"
        />
        <InlineNotice className="app-notice" title="Draft saved">Safe locally.</InlineNotice>
      </>,
    )

    const saveButton = screen.getByRole('button', { name: 'Save' })
    expect(saveButton).toHaveAttribute('data-slot', 'button')
    expect(saveButton).toHaveClass('app-button')
    expect(saveButton).toHaveStyle({ '--control-min-inline-size': '12rem' })
    expect(screen.getByRole('checkbox', { name: 'Include archived' }).closest('[data-slot="checkbox"]')).toHaveClass('app-checkbox')
    expect(screen.getByRole('switch', { name: 'Live updates' }).closest('[data-slot="switch"]')).toHaveClass('app-switch')
    expect(screen.getByRole('tablist', { name: 'Project details' }).closest('[data-slot="tabs"]')).toHaveClass('app-tabs')
    expect(screen.getByRole('note', { name: 'Draft saved' })).toHaveClass('app-notice')
    expect(screen.getByRole('note', { name: 'Draft saved' })).toHaveAttribute('data-slot', 'inline-notice')
  })

  it('preserves field control props while exposing a separate field root hook', () => {
    render(
      <TextField
        className="app-input"
        error="Required"
        label="Title"
        rootClassName="app-field"
        rootStyle={{ '--field-gap': '0.75rem' }}
        supportingText="Use a descriptive title."
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Title' })
    const field = input.closest('[data-slot="text-field"]')
    expect(input).toHaveClass('app-input')
    expect(input).toHaveAttribute('data-slot', 'text-field-control')
    expect(field).toHaveClass('app-field')
    expect(field).toHaveStyle({ '--field-gap': '0.75rem' })
    expect(field?.querySelector('[data-slot="text-field-label"]')).toHaveTextContent('Title')
    expect(field?.querySelector('[data-slot="text-field-supporting"]')).toHaveTextContent('Use a descriptive title.')
    expect(field?.querySelector('[data-slot="text-field-error"]')).toHaveTextContent('Required')
  })

  it('reaches every portaled overlay surface through explicit public hooks', async () => {
    const dialogRender = render(
      <Dialog
        defaultOpen
        portalClassName="app-dialog-portal"
        surfaceClassName="app-dialog-surface"
        surfaceStyle={{ '--dialog-inline-size': '42rem' }}
        title="Preferences"
        trigger={<Button>Open preferences</Button>}
      />,
    )
    expect(document.querySelector('[data-slot="dialog-portal"]')).toHaveClass('app-dialog-portal')
    expect(screen.getByRole('dialog', { name: 'Preferences' })).toHaveClass('app-dialog-surface')
    expect(screen.getByRole('dialog', { name: 'Preferences' })).toHaveStyle({ '--dialog-inline-size': '42rem' })
    dialogRender.unmount()

    const sheetRender = render(
      <Sheet
        defaultOpen
        portalClassName="app-sheet-portal"
        surfaceClassName="app-sheet-surface"
        title="Navigation"
      >
        Navigation content
      </Sheet>,
    )
    expect(document.querySelector('[data-slot="sheet-portal"]')).toHaveClass('app-sheet-portal')
    expect(screen.getByRole('dialog', { name: 'Navigation' })).toHaveClass('app-sheet-surface')
    sheetRender.unmount()

    const menuRender = render(
      <Menu
        items={[{ id: 'rename', label: 'Rename' }]}
        portalClassName="app-menu-portal"
        surfaceClassName="app-menu-surface"
        trigger={<Button>Actions</Button>}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }))
    expect(await screen.findByRole('menu', { name: 'Actions' })).toHaveClass('app-menu-surface')
    expect(document.querySelector('[data-slot="menu-portal"]')).toHaveClass('app-menu-portal')
    menuRender.unmount()

    render(
      <Tooltip
        content="Helpful context"
        delay={0}
        portalClassName="app-tooltip-portal"
        surfaceClassName="app-tooltip-surface"
      >
        <button type="button">Help</button>
      </Tooltip>,
    )
    fireEvent.focus(screen.getByRole('button', { name: 'Help' }))
    expect(await screen.findByRole('tooltip')).toHaveClass('app-tooltip-surface')
    expect(document.querySelector('[data-slot="tooltip-portal"]')).toHaveClass('app-tooltip-portal')
  })

  it('keeps product defaults and deliberate replacement behind an app-owned wrapper', () => {
    type AppButtonProps = { children: string; onClick?: () => void }
    let CurrentImplementation = ({ children, onClick }: AppButtonProps) => (
      <Button className="product-action" onClick={onClick}>{children}</Button>
    )
    const AppButton = (props: AppButtonProps) => <CurrentImplementation {...props} />
    const Feature = () => <AppButton>Publish note</AppButton>
    const { rerender } = render(<Feature />)

    expect(screen.getByRole('button', { name: 'Publish note' })).toHaveClass('product-action')
    expect(screen.getByRole('button', { name: 'Publish note' })).toHaveAttribute('data-slot', 'button')

    CurrentImplementation = ({ children, onClick }: AppButtonProps) => (
      <button data-local-replacement onClick={onClick} type="button">{children}</button>
    )
    rerender(<Feature />)

    expect(screen.getByRole('button', { name: 'Publish note' })).toHaveAttribute('data-local-replacement')
    expect(screen.getByRole('button', { name: 'Publish note' })).not.toHaveAttribute('data-slot')
  })
})
