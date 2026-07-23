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

function collectVersions(node, packageName, versions = new Set()) {
  const dependency = node?.dependencies?.[packageName]
  if (dependency?.version) versions.add(dependency.version)

  for (const child of Object.values(node?.dependencies ?? {})) {
    collectVersions(child, packageName, versions)
  }

  return versions
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

const dependencyTree = JSON.parse(run('npm', ['ls', '--all', '--json', 'react', 'react-dom'], {
  cwd: consumerRoot,
}))
const reactVersions = collectVersions(dependencyTree, 'react')
const reactDomVersions = collectVersions(dependencyTree, 'react-dom')

if (reactVersions.size !== 1 || reactDomVersions.size !== 1) {
  throw new Error(
    `Expected one React runtime, found react=${[...reactVersions].join(',')} react-dom=${[...reactDomVersions].join(',')}`,
  )
}

const installedManifestPath = join(
  await realpath(join(consumerRoot, 'node_modules/@taylorhuston/ui-foundations')),
  'package.json',
)
const installedManifest = JSON.parse(await readFile(installedManifestPath, 'utf8'))

process.stdout.write(`${JSON.stringify({
  archive: packageRecord.filename,
  files: packageRecord.files.length,
  package: `${installedManifest.name}@${installedManifest.version}`,
  privateImportRejected: true,
  react: [...reactVersions][0],
  reactDom: [...reactDomVersions][0],
  temporaryRoot,
}, null, 2)}\n`)
