import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button/Button'
import { TextField } from './TextField/TextField'

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
})
