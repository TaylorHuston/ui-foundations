# Library Adoption

UI Foundations is consumed as a versioned React package. Applications should import its defaults behind app-owned wrappers, then customize only through documented semantic tokens, root styling props, stable named slots, and composition.

The package does not own application data, routing, authorization, persistence, editor engines, domain state, or responsive navigation decisions.

## Install And Import

Registry publication is not active. A local `npm pack` archive is only a maintainer verification input; it is not a portable consumer dependency. Do not link or import repository source.

## Pre-Registry Release Archives

After a separately authorized GitHub Release attaches the exact verified archive, consumers install the immutable versioned asset URL and commit their lockfile. No release asset exists until that authorization and upload complete.

```sh
npm install "https://github.com/TaylorHuston/ui-foundations/releases/download/v0.3.0/taylorhuston-ui-foundations-0.3.0.tgz"
# Commit the resulting package-lock.json (or equivalent lockfile) with its recorded integrity.
```

Never substitute a branch URL, workspace link, local path, or source-build fallback for the release asset. If the asset is missing or its bytes do not match the candidate checksum, stop the adoption rather than selecting another source.

Maintainers retain one candidate while running the existing package gate, then verify a later asset without rebuilding it:

```sh
UI_FOUNDATIONS_PACKAGE_OUTPUT_DIRECTORY=/private/tmp/ui-foundations-candidate \
  npm run check:package

UI_FOUNDATIONS_CANDIDATE_ARCHIVE=/private/tmp/ui-foundations-candidate/taylorhuston-ui-foundations-0.3.0.tgz \
UI_FOUNDATIONS_RELEASE_ASSET_URL="https://github.com/TaylorHuston/ui-foundations/releases/download/v0.3.0/taylorhuston-ui-foundations-0.3.0.tgz" \
  node scripts/verify-release-asset.mjs
```

The second command downloads the asset, requires byte-identical SHA-256 values, installs the URL into a clean consumer, runs its typecheck and production build, and requires the generated `package-lock.json` to retain the URL plus SHA-512 integrity. It is release-scoped proof, not a normal local aggregate check.

```tsx
import '@taylorhuston/ui-foundations/styles.css'
import '@taylorhuston/ui-foundations/components.css'

import { Button, InlineNotice } from '@taylorhuston/ui-foundations'
import { WorkbenchShell } from '@taylorhuston/ui-foundations/patterns'
```

`styles.css` is the complete CSS foundation. Consumers that need deliberate layering may instead import `fonts.css`, `tokens.css`, `global.css`, and `primitives.css` individually. React component CSS is exposed separately as `components.css`.

## Override Product Identity

Load consumer CSS after Foundation CSS and replace semantic values on the narrowest useful application root.

```css
.productIdentity {
  --identity: #173b2c;
  --identity-foreground: #f1fff8;
  --action: #207a4d;
  --action-hover: #1b6b43;
  --action-active: #165839;
  --action-text: #78d8a5;
  --focus-ring: #69d39a;
}
```

Do not target generated CSS Module names. Status colors and readable text roles should retain their semantic meaning across product identities.

## Root Hooks And Named Slots

Material component and pattern roots accept `className` and `style`. `FoundationStyle` allows typed `--*` custom properties. `TextField` and `Textarea` preserve `className` and `style` for their native controls, so their wrappers use `rootClassName` and `rootStyle`.

Stable `data-slot` values identify documented regions:

```tsx
<TextField
  className="productInput"
  label="Workspace"
  rootClassName="productField"
  rootStyle={{ '--field-gap': '0.75rem' }}
/>
```

```css
.productField [data-slot='text-field-control'] {
  border-color: var(--action);
}
```

Slots are styling and inspection hooks, not permission to depend on undocumented descendant order. Generated classes and private source paths are not public API.

## Portaled Surfaces

Dialog, Sheet, Menu, and Tooltip expose `portalClassName`, `portalStyle`, `surfaceClassName`, and `surfaceStyle`. Use the portal hook for inherited semantic values and the surface hook for the rendered popup itself.

```tsx
<Dialog
  portalClassName="productPortal"
  surfaceClassName="productDialog"
  title="Review changes"
  trigger={<AppButton variant="secondary">Review dialog</AppButton>}
>
  Application-owned content.
</Dialog>
```

This avoids global selectors and reaches content rendered outside the application root.

## App-Owned Wrappers

Feature code should import a local wrapper when the application needs defaults or deliberate divergence.

```tsx
import {
  Button,
  type ButtonProps,
} from '@taylorhuston/ui-foundations'

export function AppButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={['productButton', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
```

The wrapper may set presentation defaults, visible copy, and callbacks. Domain behavior stays outside the package. If a shared component stops fitting the product, replace the wrapper implementation locally so feature imports do not change.

## Compatibility

UI Foundations is pre-1.0:

- Patch releases may fix behavior and styling without changing documented public contracts.
- Minor releases may add APIs and may change a documented public contract when the changelog calls out the migration.
- Consumers remain on their installed version until they deliberately upgrade.
- Public exports, semantic tokens, named slots, peer ranges, and documented override props are compatibility surfaces.

Before upgrading, inspect the changelog and run the consumer's focused behavior, accessibility, responsive, and production-build checks.
