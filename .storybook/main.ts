import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  refs: {
    dashboard: {
      title: 'Dashboard',
      url: process.env.DASHBOARD_STORYBOOK_URL ?? 'http://127.0.0.1:6006',
    },
    coordinator: {
      title: 'Coordinator-Local',
      url: process.env.COORDINATOR_STORYBOOK_URL ?? 'http://127.0.0.1:6007',
    },
    '49th-floor': {
      title: '49th Floor',
      url: process.env.FORTY_NINTH_FLOOR_STORYBOOK_URL ?? 'http://127.0.0.1:6009',
    },
  },
}

export default config
