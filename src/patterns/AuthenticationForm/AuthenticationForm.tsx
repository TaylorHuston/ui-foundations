import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '../../components/Button/Button'
import { TextField } from '../../components/TextField/TextField'
import type { FoundationStyle } from '../../components/types'
import styles from './AuthenticationForm.module.css'

export type AuthenticationMode = 'sign-in' | 'sign-up'

export interface AuthenticationValues {
  email: string
  password: string
  confirmPassword?: string
}

export interface AuthenticationFormProps {
  className?: string
  mode: AuthenticationMode
  pending?: boolean
  error?: string
  onSubmit: (values: AuthenticationValues) => void | Promise<void>
  style?: FoundationStyle
}

export function AuthenticationForm({
  className,
  error,
  mode,
  onSubmit,
  pending = false,
  style,
}: AuthenticationFormProps) {
  const [passwordMismatch, setPasswordMismatch] = useState(false)
  const isSignUp = mode === 'sign-up'

  useEffect(() => {
    setPasswordMismatch(false)
  }, [mode])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: AuthenticationValues = {
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
    }

    if (isSignUp) {
      values.confirmPassword = String(data.get('confirmPassword') ?? '')
      if (values.password !== values.confirmPassword) {
        setPasswordMismatch(true)
        return
      }
    }

    setPasswordMismatch(false)
    void onSubmit(values)
  }

  return (
    <form
      className={[styles.form, className].filter(Boolean).join(' ')}
      data-slot="authentication-form"
      onSubmit={handleSubmit}
      style={style}
    >
      <header className={styles.header} data-slot="authentication-form-header">
        <h1>{isSignUp ? 'Create account' : 'Sign in'}</h1>
        <p>{isSignUp ? 'Create your credentials to continue.' : 'Use your account credentials to continue.'}</p>
      </header>

      <TextField autoComplete="email" label="Email" name="email" required type="email" />
      <TextField
        autoComplete={isSignUp ? 'new-password' : 'current-password'}
        label="Password"
        name="password"
        required
        type="password"
      />
      {isSignUp ? (
        <TextField
          autoComplete="new-password"
          error={passwordMismatch ? 'Passwords do not match.' : undefined}
          label="Confirm password"
          name="confirmPassword"
          onChange={() => passwordMismatch && setPasswordMismatch(false)}
          required
          type="password"
        />
      ) : null}

      {error ? <p className={styles.formError} data-slot="authentication-form-error" role="alert">{error}</p> : null}
      <Button pending={pending} pendingLabel={isSignUp ? 'Creating account...' : 'Signing in...'} type="submit">
        {isSignUp ? 'Create account' : 'Sign in'}
      </Button>
    </form>
  )
}
