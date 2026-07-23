# Library Adoption

UI Foundations is consumed as a versioned React package. Applications should import its defaults behind app-owned wrappers, then customize only through documented semantic tokens, root styling props, stable named slots, and composition.

The package does not own application data, routing, authorization, persistence, editor engines, domain state, or responsive navigation decisions.

## Install And Import

Registry publication is not active yet. Until an authorized release exists, validate consumers against an exact local archive produced by `npm pack`; do not link or import repository source.

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
