import { rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import { build } from 'vite'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(repositoryRoot, 'dist')
const external = [
  /^@base-ui\/react(?:\/.*)?$/,
  /^lucide-react(?:\/.*)?$/,
  /^react(?:\/.*)?$/,
  /^react-dom(?:\/.*)?$/,
]

async function buildJavaScript() {
  await build({
    configFile: false,
    plugins: [react()],
    build: {
      cssCodeSplit: false,
      emptyOutDir: false,
      lib: {
        cssFileName: 'components',
        entry: {
          components: resolve(repositoryRoot, 'src/components/index.ts'),
          index: resolve(repositoryRoot, 'src/index.ts'),
          patterns: resolve(repositoryRoot, 'src/patterns/index.ts'),
          'theme-profiles': resolve(repositoryRoot, 'src/theme-profiles.ts'),
        },
        fileName: (_format, entryName) => `${entryName}.js`,
        formats: ['es'],
      },
      outDir,
      rolldownOptions: {
        external,
      },
      sourcemap: true,
    },
  })
}

async function buildStyles() {
  await build({
    configFile: false,
    build: {
      cssCodeSplit: true,
      emptyOutDir: false,
      outDir,
      rolldownOptions: {
        input: {
          foundation: resolve(repositoryRoot, 'src/index.css'),
          fonts: resolve(repositoryRoot, 'src/styles/fonts.css'),
          global: resolve(repositoryRoot, 'src/styles/global.css'),
          primitives: resolve(repositoryRoot, 'src/styles/primitives.css'),
          tokens: resolve(repositoryRoot, 'src/styles/tokens.css'),
        },
        output: {
          assetFileNames: '[name][extname]',
        },
      },
    },
  })
}

function buildDeclarations() {
  const declarationResult = spawnSync(
    process.execPath,
    [resolve(repositoryRoot, 'node_modules/typescript/bin/tsc'), '-p', 'tsconfig.build.json'],
    {
      cwd: repositoryRoot,
      encoding: 'utf8',
      stdio: 'inherit',
    },
  )

  if (declarationResult.error) {
    throw new Error('Type declaration build could not start', {
      cause: declarationResult.error,
    })
  }

  if (declarationResult.status !== 0) {
    throw new Error(`Type declaration build failed with exit code ${declarationResult.status}`)
  }
}

await rm(outDir, { force: true, recursive: true })
await buildJavaScript()
await buildStyles()
buildDeclarations()
