import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button/Button'
import { IconButton } from './IconButton/IconButton'
import { TextField } from './TextField/TextField'
import { Textarea } from './Textarea/Textarea'

describe('reference controls', () => {
  it('prevents repeated activation while a button is pending', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} pending>Save</Button>)

    const button = screen.getByRole('button', { name: 'Working...' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('associates field errors with the invalid input', () => {
    render(<TextField error="Enter a valid email." label="Email" />)

    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Enter a valid email.')
  })

  it('requires an accessible name for icon-only actions', () => {
    render(<IconButton label="Search"><span aria-hidden>+</span></IconButton>)
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('title', 'Search')
  })

  it('associates textarea errors without changing its name', () => {
    render(<Textarea error="Description is too long." label="Description" />)
    const textarea = screen.getByRole('textbox', { name: 'Description' })
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAccessibleDescription('Description is too long.')
  })

  it('preserves disabled semantics across button variants and sizes', () => {
    render(<Button disabled size="dense" variant="danger">Delete</Button>)
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled()
  })
})
