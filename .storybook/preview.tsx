import type { Preview } from '@storybook/react-vite'
import '../src/index.css'
import '../stories/foundations.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    a11y: { test: 'error' },
  },
}

export default preview
