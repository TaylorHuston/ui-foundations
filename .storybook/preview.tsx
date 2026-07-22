import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import '../stories/foundations.css'
import { themeProfiles } from '../src/theme-profiles'

const preview: Preview = {
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = String(context.globals.theme ?? 'graphite')
      return <Story />
    },
  ],
  globalTypes: {
    theme: {
      description: 'Identity theme',
      toolbar: {
        icon: 'paintbrush',
        items: themeProfiles.map((theme) => ({ title: theme.name, value: theme.id })),
      },
    },
  },
  initialGlobals: {
    theme: 'graphite',
  },
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    a11y: { test: 'error' },
  },
}

export default preview
