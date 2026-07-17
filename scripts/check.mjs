import { readFile } from 'node:fs/promises'

const requiredFiles = [
  'src/styles/fonts.css',
  'src/styles/tokens.css',
  'src/styles/global.css',
  'src/styles/primitives.css',
]

const index = await readFile('src/index.css', 'utf8')
const sources = await Promise.all(
  requiredFiles.map(async (path) => [path, await readFile(path, 'utf8')]),
)

for (const path of requiredFiles) {
  const importPath = path.replace('src/', './')
  if (!index.includes(`@import "${importPath}";`)) {
    throw new Error(`src/index.css does not import ${path}`)
  }
}

const combined = sources.map(([, source]) => source).join('\n')
if (/--[\w-]+:\s*;/.test(combined)) {
  throw new Error('A CSS custom property has an unresolved empty value')
}

for (const projectToken of ['--primary:', '--secondary:', '--accent:']) {
  if (combined.includes(projectToken)) {
    throw new Error(`${projectToken.slice(0, -1)} must remain project-owned`)
  }
}

const requiredTokens = [
  '--canvas:',
  '--surface:',
  '--surface-raised:',
  '--text:',
  '--text-secondary:',
  '--text-muted:',
  '--border:',
  '--control-boundary:',
  '--action:',
  '--action-hover:',
  '--action-active:',
  '--action-foreground:',
  '--identity:',
  '--identity-foreground:',
  '--info:',
  '--success:',
  '--warning:',
  '--danger:',
  '--danger-hover:',
  '--danger-active:',
  '--danger-foreground:',
  '--danger-text:',
  '--focus-ring:',
  '--selection:',
  '--selection-foreground:',
  '--space-1:',
  '--space-2:',
  '--space-3:',
  '--space-4:',
  '--space-6:',
  '--space-8:',
  '--space-10:',
  '--space-12:',
  '--radius-row:',
  '--radius-control:',
  '--radius-panel:',
  '--control-dense:',
  '--control-toolbar:',
  '--control-standard:',
  '--control-touch:',
  '--motion-fast:',
  '--motion-standard:',
  '--font-sans:',
  '--font-mono:',
  '--font-size-label:',
  '--font-size-mono:',
  '--font-size-ui:',
  '--font-size-content:',
  '--font-size-section:',
  '--font-size-title:',
]

for (const requiredToken of requiredTokens) {
  if (!combined.includes(requiredToken)) {
    throw new Error(`Missing required starter token ${requiredToken.slice(0, -1)}`)
  }
}

console.log('UI Foundations checks passed')
