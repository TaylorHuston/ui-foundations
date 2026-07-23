import { cp, mkdir, mkdtemp, readFile, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fixtureRoot = resolve(repositoryRoot, 'test/fixtures/package-consumer')
const temporaryRoot = await mkdtemp(join(tmpdir(), 'ui-foundations-package-'))
const packRoot = join(temporaryRoot, 'pack')
const consumerRoot = join(temporaryRoot, 'consumer')
await mkdir(packRoot)

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
    env: process.env,
    ...options,
  })

  if (result.status !== 0) {
    process.stderr.write(result.stdout ?? '')
    process.stderr.write(result.stderr ?? '')
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)
  }

  return result.stdout ?? ''
}

function packageRecordFrom(output) {
  const parsed = JSON.parse(output)
  if (Array.isArray(parsed)) return parsed[0]
  return Object.values(parsed)[0]
}

function collectPhysicalPackagePaths(output, packageName) {
  return output
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((path) => path.replaceAll('\\', '/').endsWith(`/node_modules/${packageName}`))
}

const packOutput = run('npm', [
  'pack',
  '--ignore-scripts',
  '--json',
  '--pack-destination',
  packRoot,
])
const packageRecord = packageRecordFrom(packOutput)
const archiveFiles = new Set(packageRecord.files.map(({ path }) => path))
const requiredFiles = [
  'CHANGELOG.md',
  'README.md',
  'dist/components.css',
  'dist/components.js',
  'dist/foundation.css',
  'dist/global.css',
  'dist/index.js',
  'dist/patterns.js',
  'dist/primitives.css',
  'dist/theme-profiles.js',
  'dist/tokens.css',
  'dist/types/components/index.d.ts',
  'dist/types/index.d.ts',
  'dist/types/patterns/index.d.ts',
  'dist/types/theme-profiles.d.ts',
  'package.json',
]

for (const requiredFile of requiredFiles) {
  if (!archiveFiles.has(requiredFile)) {
    throw new Error(`Packed artifact is missing ${requiredFile}`)
  }
}

for (const { path } of packageRecord.files) {
  if (/^(?:\.storybook|docs|scripts|src|stories|test)\//.test(path)) {
    throw new Error(`Packed artifact exposes private repository path ${path}`)
  }
}

const packedReadme = await readFile(join(repositoryRoot, 'README.md'), 'utf8')
if (packedReadme.includes('](./docs/')) {
  throw new Error('Packed README contains a relative link to documentation that is not shipped')
}

await cp(fixtureRoot, consumerRoot, { recursive: true })
const archivePath = join(packRoot, packageRecord.filename)
run('npm', [
  'install',
  '--ignore-scripts',
  '--no-audit',
  '--no-fund',
  '--no-package-lock',
  '--prefer-offline',
  archivePath,
], { cwd: consumerRoot, stdio: 'inherit' })
run('npm', ['run', 'typecheck'], { cwd: consumerRoot, stdio: 'inherit' })
run('npm', ['run', 'build'], { cwd: consumerRoot, stdio: 'inherit' })

const privateImportProbe = run(process.execPath, [
  '--input-type=module',
  '--eval',
  `
    try {
      await import('@taylorhuston/ui-foundations/src/components')
      process.exit(2)
    } catch (error) {
      if (error?.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') throw error
    }
  `,
], { cwd: consumerRoot })

if (privateImportProbe.trim()) {
  throw new Error('Private import probe produced unexpected output')
}

const publicImportProbe = run(process.execPath, [
  '--input-type=module',
  '--eval',
  `
    for (const specifier of [
      '@taylorhuston/ui-foundations',
      '@taylorhuston/ui-foundations/components',
      '@taylorhuston/ui-foundations/patterns',
      '@taylorhuston/ui-foundations/theme-profiles',
    ]) {
      const imported = await import(specifier)
      if (Object.keys(imported).length === 0) {
        throw new Error(\`Public JavaScript export resolved without exports: \${specifier}\`)
      }
    }

    for (const specifier of [
      '@taylorhuston/ui-foundations/styles.css',
      '@taylorhuston/ui-foundations/components.css',
      '@taylorhuston/ui-foundations/fonts.css',
      '@taylorhuston/ui-foundations/global.css',
      '@taylorhuston/ui-foundations/primitives.css',
      '@taylorhuston/ui-foundations/tokens.css',
      '@taylorhuston/ui-foundations/package.json',
    ]) {
      import.meta.resolve(specifier)
    }
  `,
], { cwd: consumerRoot })

if (publicImportProbe.trim()) {
  throw new Error('Public import probe produced unexpected output')
}

const physicalDependencyPaths = run('npm', ['ls', '--parseable', '--all', 'react', 'react-dom'], {
  cwd: consumerRoot,
})
const reactPaths = collectPhysicalPackagePaths(physicalDependencyPaths, 'react')
const reactDomPaths = collectPhysicalPackagePaths(physicalDependencyPaths, 'react-dom')

if (reactPaths.length !== 1 || reactDomPaths.length !== 1) {
  throw new Error(
    `Expected one physical React runtime, found react=${reactPaths.length} react-dom=${reactDomPaths.length}`,
  )
}

const installedManifestPath = join(
  await realpath(join(consumerRoot, 'node_modules/@taylorhuston/ui-foundations')),
  'package.json',
)
const installedManifest = JSON.parse(await readFile(installedManifestPath, 'utf8'))
const reactVersion = JSON.parse(await readFile(join(reactPaths[0], 'package.json'), 'utf8')).version
const reactDomVersion = JSON.parse(await readFile(join(reactDomPaths[0], 'package.json'), 'utf8')).version

const expectedExports = {
  '.': {
    types: './dist/types/index.d.ts',
    import: './dist/index.js',
  },
  './components': {
    types: './dist/types/components/index.d.ts',
    import: './dist/components.js',
  },
  './patterns': {
    types: './dist/types/patterns/index.d.ts',
    import: './dist/patterns.js',
  },
  './theme-profiles': {
    types: './dist/types/theme-profiles.d.ts',
    import: './dist/theme-profiles.js',
  },
  './styles.css': './dist/foundation.css',
  './components.css': './dist/components.css',
  './fonts.css': './dist/fonts.css',
  './global.css': './dist/global.css',
  './primitives.css': './dist/primitives.css',
  './tokens.css': './dist/tokens.css',
  './package.json': './package.json',
}

if (JSON.stringify(installedManifest.exports) !== JSON.stringify(expectedExports)) {
  throw new Error('Installed package export map does not match the supported public contract')
}

if (installedManifest.private !== true) {
  throw new Error('Registry publication guard is missing; package must remain private until an authorized release')
}

process.stdout.write(`${JSON.stringify({
  archive: packageRecord.filename,
  files: packageRecord.files.length,
  package: `${installedManifest.name}@${installedManifest.version}`,
  privateImportRejected: true,
  publicationGuarded: true,
  publicExportsResolved: Object.keys(expectedExports).length,
  react: reactVersion,
  reactDom: reactDomVersion,
  reactPhysicalInstallations: reactPaths.length,
  reactDomPhysicalInstallations: reactDomPaths.length,
  temporaryRoot,
}, null, 2)}\n`)
