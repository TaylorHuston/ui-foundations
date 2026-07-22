import { mkdir, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const applications = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    url: process.env.DASHBOARD_STORYBOOK_URL ?? 'http://127.0.0.1:6006',
  },
  {
    id: 'coordinator',
    name: 'Coordinator-Local',
    url: process.env.COORDINATOR_STORYBOOK_URL ?? 'http://127.0.0.1:6007',
  },
  {
    id: '49th-floor',
    name: '49th Floor',
    url: process.env.FORTY_NINTH_FLOOR_STORYBOOK_URL ?? 'http://127.0.0.1:6009',
  },
]

const comparisons = [
  { id: 'desktop', name: 'Desktop workbench', viewport: { width: 1440, height: 900 } },
  { id: 'mobile', name: 'Mobile workbench', viewport: { width: 390, height: 844 } },
  { id: 'file-browser', name: 'Navigation detail', viewport: { width: 1000, height: 800 } },
  { id: 'empty', name: 'Empty state', viewport: { width: 1000, height: 700 } },
  { id: 'error', name: 'Error state', viewport: { width: 1000, height: 700 } },
]

const outputDirectory = resolve(process.env.COMPARISON_OUTPUT_DIR ?? 'comparison-report')
await rm(outputDirectory, { recursive: true, force: true })
await mkdir(outputDirectory, { recursive: true })

const browser = await chromium.launch()
const captures = []

try {
  for (const comparison of comparisons) {
    for (const application of applications) {
      const context = await browser.newContext({ viewport: comparison.viewport })
      const page = await context.newPage()
      const storyId = `comparison-workbench--${comparison.id}`
      const storyUrl = `${application.url}/iframe.html?id=${storyId}&viewMode=story`
      const filename = `${comparison.id}-${application.id}.png`

      await page.goto(storyUrl, { waitUntil: 'networkidle', timeout: 30_000 })
      await page.waitForFunction(() => {
        const root = document.querySelector('#storybook-root')
        return root instanceof HTMLElement && root.childElementCount > 0
      })
      await page.waitForTimeout(500)
      await page.screenshot({ path: resolve(outputDirectory, filename), fullPage: true })
      captures.push({ application, comparison, filename, storyUrl })
      await context.close()
    }
  }
} finally {
  await browser.close()
}

const cells = comparisons
  .map((comparison) => {
    const images = applications
      .map((application) => {
        const capture = captures.find(
          (item) => item.application.id === application.id && item.comparison.id === comparison.id,
        )
        return `<td><a href="${capture.storyUrl}"><img src="${capture.filename}" alt="${application.name}: ${comparison.name}"></a></td>`
      })
      .join('')
    return `<tr><th scope="row">${comparison.name}<small>${comparison.viewport.width} x ${comparison.viewport.height}</small></th>${images}</tr>`
  })
  .join('\n')

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cross-app UI comparison</title>
  <style>
    :root { color-scheme: dark; font-family: system-ui, sans-serif; background: #09090b; color: #f4f4f5; }
    body { margin: 0; padding: 24px; }
    h1 { margin: 0 0 8px; font-size: 24px; }
    p { margin: 0 0 24px; color: #a1a1aa; }
    table { width: 100%; border-collapse: separate; border-spacing: 12px; table-layout: fixed; }
    th { width: 160px; text-align: left; vertical-align: top; }
    th small { display: block; margin-top: 4px; color: #a1a1aa; font-weight: 400; }
    td { vertical-align: top; background: #18181b; }
    img { display: block; width: 100%; height: auto; }
    a:focus-visible { outline: 2px solid #5d8db8; outline-offset: 2px; }
  </style>
</head>
<body>
  <h1>Cross-app UI comparison</h1>
  <p>Captured from matched production-component stories. Select an image to open its live Storybook story.</p>
  <table>
    <thead><tr><th>Surface</th>${applications.map((application) => `<th>${application.name}</th>`).join('')}</tr></thead>
    <tbody>${cells}</tbody>
  </table>
</body>
</html>`

await writeFile(resolve(outputDirectory, 'index.html'), html)
console.log(`Comparison report: ${resolve(outputDirectory, 'index.html')}`)
