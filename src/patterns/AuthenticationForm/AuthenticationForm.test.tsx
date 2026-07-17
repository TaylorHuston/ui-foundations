import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AuthenticationForm } from './AuthenticationForm'

describe('AuthenticationForm', () => {
  it('renders password confirmation for sign-up', () => {
    render(<AuthenticationForm mode="sign-up" onSubmit={() => undefined} />)
    expect(screen.getByLabelText('Confirm password')).toBeVisible()
  })

  it('rejects mismatched sign-up passwords before delegation', () => {
    const onSubmit = vi.fn()
    render(<AuthenticationForm mode="sign-up" onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'taylor@example.com' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'one-password' } })
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'another-password' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Confirm password')).toHaveAccessibleDescription('Passwords do not match.')
  })

  it('delegates valid sign-up values', () => {
    const onSubmit = vi.fn()
    render(<AuthenticationForm mode="sign-up" onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'taylor@example.com' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'same-password' } })
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'same-password' } })
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'taylor@example.com',
      password: 'same-password',
      confirmPassword: 'same-password',
    })
  })
})
