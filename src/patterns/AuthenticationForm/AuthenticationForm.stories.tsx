import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthenticationForm } from './AuthenticationForm'
import styles from './AuthenticationForm.stories.module.css'

const meta = {
  title: 'Patterns/Authentication Form',
  component: AuthenticationForm,
  decorators: [
    (Story) => <main className={styles.canvas}><Story /></main>,
  ],
  args: {
    onSubmit: () => undefined,
  },
} satisfies Meta<typeof AuthenticationForm>

export default meta
type Story = StoryObj<typeof meta>

export const SignIn: Story = { args: { mode: 'sign-in' } }
export const SignUp: Story = { args: { mode: 'sign-up' } }
export const Pending: Story = { args: { mode: 'sign-in', pending: true } }
export const Failed: Story = { args: { mode: 'sign-in', error: 'Those credentials were not accepted.' } }
