import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button/Button'
import { Checkbox } from './Checkbox/Checkbox'
import { Dialog } from './Dialog/Dialog'
import { Menu } from './Menu/Menu'
import { Sheet } from './Sheet/Sheet'
import { Switch } from './Switch/Switch'
import { Tabs } from './Tabs/Tabs'
import { Tooltip } from './Tooltip/Tooltip'

describe('behavior component references', () => {
  it('opens a labeled tooltip from keyboard focus and dismisses it with Escape', async () => {
    render(<Tooltip content="Helpful context" delay={0}><button type="button">Help</button></Tooltip>)

    const trigger = screen.getByRole('button', { name: 'Help' })
    fireEvent.focus(trigger)
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Helpful context')

    fireEvent.keyDown(document.activeElement ?? trigger, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('moves focus into a dialog and restores it to the trigger after dismissal', async () => {
    render(
      <Dialog title="Preferences" trigger={<Button>Open preferences</Button>}>
        <button type="button">Focusable content</button>
      </Dialog>,
    )

    const trigger = screen.getByRole('button', { name: 'Open preferences' })
    fireEvent.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Preferences' })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus())

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('moves focus into a sheet and restores it after Escape dismissal', async () => {
    render(
      <Sheet title="Navigation" trigger={<Button>Open navigation</Button>}>
        <button type="button">Create document</button>
      </Sheet>,
    )

    const trigger = screen.getByRole('button', { name: 'Open navigation' })
    fireEvent.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Navigation' })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus())

    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('delegates enabled menu actions while respecting disabled items', async () => {
    const onRename = vi.fn()
    const onArchive = vi.fn()
    render(
      <Menu
        items={[
          { id: 'rename', label: 'Rename', onSelect: onRename },
          { disabled: true, id: 'archive', label: 'Archive', onSelect: onArchive },
        ]}
        trigger={<Button>Actions</Button>}
      />,
    )

    const trigger = screen.getByRole('button', { name: 'Actions' })
    fireEvent.click(trigger)
    const menu = await screen.findByRole('menu', { name: 'Actions' })
    expect(menu).toBeInTheDocument()
    fireEvent.click(screen.getByRole('menuitem', { name: 'Archive' }))
    expect(onArchive).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('menuitem', { name: 'Rename' }))
    expect(onRename).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('changes tabs while leaving disabled tabs unavailable', () => {
    const onValueChange = vi.fn()
    render(
      <Tabs
        defaultValue="overview"
        items={[
          { content: 'Overview panel', label: 'Overview', value: 'overview' },
          { content: 'Activity panel', label: 'Activity', value: 'activity' },
          { content: 'History panel', disabled: true, label: 'History', value: 'history' },
        ]}
        label="Project details"
        onValueChange={onValueChange}
      />,
    )

    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }))
    expect(onValueChange).toHaveBeenCalledWith('activity')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Activity panel')
    const disabledTab = screen.getByRole('tab', { name: 'History' })
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(disabledTab)
    expect(onValueChange).toHaveBeenCalledTimes(1)
  })

  it('exposes checkbox and switch state changes and disabled behavior', () => {
    const onCheckboxChange = vi.fn()
    const onSwitchChange = vi.fn()
    render(
      <>
        <Checkbox label="Include archived" onCheckedChange={onCheckboxChange} />
        <Switch label="Live updates" onCheckedChange={onSwitchChange} />
        <Checkbox disabled label="Disabled checkbox" onCheckedChange={onCheckboxChange} />
        <Switch disabled label="Disabled switch" onCheckedChange={onSwitchChange} />
      </>,
    )

    fireEvent.click(screen.getByRole('checkbox', { name: 'Include archived' }))
    fireEvent.click(screen.getByRole('switch', { name: 'Live updates' }))
    expect(onCheckboxChange).toHaveBeenCalledWith(true)
    expect(onSwitchChange).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('checkbox', { name: 'Disabled checkbox' }))
    fireEvent.click(screen.getByRole('switch', { name: 'Disabled switch' }))
    expect(onCheckboxChange).toHaveBeenCalledTimes(1)
    expect(onSwitchChange).toHaveBeenCalledTimes(1)
  })
})
