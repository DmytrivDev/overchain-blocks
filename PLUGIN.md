# Overchain Blocks — Developer Documentation

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [File Structure](#file-structure)
4. [Plugin Bootstrap](#plugin-bootstrap)
5. [PHP Architecture](#php-architecture)
6. [Blade Rendering](#blade-rendering)
7. [Partials](#partials)
8. [JS Components](#js-components)
9. [Build System](#build-system)
10. [Existing Blocks](#existing-blocks)
11. [Creating a New Block](#creating-a-new-block)
    - [Simple Block](#simple-block-pattern)
    - [Block with Repeater](#block-with-repeater-pattern)
    - [Block with InnerBlocks](#block-with-innerblocks-pattern)
    - [Child Block](#child-block-pattern)
12. [Block Registration Order](#block-registration-order)
13. [Assets](#assets)
14. [Frontend JS](#frontend-js)
15. [Known Conventions](#known-conventions)

---

## Overview

**Overchain Blocks** is a WordPress plugin that provides custom Gutenberg blocks for the Overchain theme. It is tightly coupled to the theme — blocks use theme CSS classes, theme asset paths, and theme template parts for rendering posts.

Key characteristics:
- Editor UI — React via `@wordpress/` packages
- Frontend render — PHP dynamic blocks (no static `save()` output)
- Frontend HTML templates — [BladeOne](https://github.com/EFTEC/BladeOne) (standalone, no Laravel)
- Shared reusable JS components for editor controls and previews
- Blade partials for reusable frontend HTML fragments
- PSR-4 autoloaded PHP classes via Composer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Editor UI | React, `@wordpress/block-editor`, `@wordpress/components` |
| Frontend templates | BladeOne (eftec/bladeone ^4.0) |
| PHP autoload | Composer PSR-4 (`OverchainBlocks\` → `src/`) |
| JS/CSS build | `@wordpress/scripts` (webpack) |
| Block styles | SCSS compiled to `build/blocks.css` and `build/editor.css` |
| Frontend JS | `resources/js/blocks.js` compiled to `build/blocks-scripts.js` |

---

## File Structure

```
overchain-blocks/
├── blocks/                        # Block source files
│   ├── hero/
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   └── render.php
│   ├── cards/                     # Parent block (InnerBlocks)
│   │   ├── block.json
│   │   ├── index.js
│   │   ├── edit.js
│   │   ├── render.php
│   │   └── card/                  # Child block
│   │       ├── block.json
│   │       ├── index.js
│   │       ├── edit.js
│   │       └── render.php
│   └── ...
├── build/                         # Compiled output (gitignored)
│   ├── hero/
│   │   ├── index.js
│   │   └── index.asset.php
│   ├── blocks.css
│   ├── editor.css
│   └── blocks-scripts.js
├── components/                    # Reusable editor JS components
│   ├── ButtonControls.js
│   ├── ButtonPreview.js
│   ├── FormCheckboxPreview.js
│   ├── IconListControls.js
│   ├── ImageControls.js
│   ├── ImageField.js
│   ├── LinkControlPanel.js
│   ├── LinkFields.js
│   ├── SectionSettingsControls.js
│   ├── TextSettingsControls.js
│   └── VideoControls.js
├── resources/
│   ├── js/
│   │   └── blocks.js              # Frontend JS entry point
│   ├── placeholders/              # Editor placeholder images
│   │   ├── icon.svg
│   │   ├── card.png
│   │   ├── coins.png
│   │   ├── video.jpg
│   │   └── ...
│   ├── scss/
│   │   ├── blocks.scss            # Shared frontend + editor styles
│   │   └── editor.scss            # Editor-only styles (imports blocks.scss)
│   └── views/
│       ├── blocks/                # Block Blade templates
│       │   ├── hero.blade.php
│       │   ├── cards.blade.php
│       │   ├── card.blade.php
│       │   └── ...
│       └── partials/              # Reusable Blade partials
│           ├── btn-icon.blade.php
│           └── checkbox.blade.php
├── src/                           # PHP classes (PSR-4)
│   ├── Assets/
│   │   └── AssetsService.php
│   ├── Blocks/
│   │   └── BlocksService.php
│   ├── Plugin.php
│   └── View.php
├── cache/views/                   # BladeOne compiled cache (gitignored content)
├── vendor/                        # Composer dependencies (gitignored)
├── composer.json
├── package.json
├── webpack.config.js
├── fix-asset.js
└── overchain-blocks.php           # Plugin entry point
```

---

## Plugin Bootstrap

`overchain-blocks.php` is the main entry point. It:

1. Defines constants: `OVERCHAIN_BLOCKS_VERSION`, `OVERCHAIN_BLOCKS_FILE`, `OVERCHAIN_BLOCKS_PATH`, `OVERCHAIN_BLOCKS_URL`
2. Loads `vendor/autoload.php` if it exists (required for Blade)
3. Registers all WordPress hooks directly (works without Composer)
4. Boots the OOP layer (`\OverchainBlocks\Plugin::init()`) only if Composer classes are available

**Important:** Block registration, CSS enqueuing, and editor localization all work **without** Composer. Blade rendering requires `composer install`.

### Global helper function

`overchain_resolve_button_data( array $data ): array` — resolves button href and HTML attributes from block attributes. Used in `btn-icon.blade.php`:

```php
$data = overchain_resolve_button_data([
    'buttonType'       => 'link',
    'buttonLink'       => 'https://example.com',
    'buttonLinkNewTab' => true,
    'buttonAnchor'     => '',
    'buttonPopupId'    => '',
]);
// Returns: ['href' => 'https://example.com', 'attrs' => ' target="_blank" rel="noopener noreferrer"']
```

Supported button types: `link`, `anchor`, `popup`.

---

## PHP Architecture

### `src/Plugin.php`

Bootstrap class. Called via `Plugin::init()` from `overchain-blocks.php`. Initializes `AssetsService` and defers `BlocksService` to the `init` hook.

### `src/Assets/AssetsService.php`

Handles all asset enqueuing:

| Method | Hook | What it does |
|---|---|---|
| `enqueue_frontend_style()` | `wp_enqueue_scripts` | Enqueues `build/blocks.css` on frontend |
| `enqueue_frontend_scripts()` | `wp_enqueue_scripts` | Enqueues `build/blocks-scripts.js` on frontend |
| `enqueue_editor_assets()` | `enqueue_block_editor_assets` | Enqueues `build/blocks.css` + `build/editor.css` in editor |

`build/editor.css` depends on `overchain-blocks` handle (blocks.css loads first).

`add_editor_style()` is called via `init` hook in `overchain-blocks.php` to inject `blocks.css` inside the Gutenberg iframe canvas.

### `src/Blocks/BlocksService.php`

Registers the `overchain` block category. Block registration itself is handled directly in `overchain-blocks.php` (see [Block Registration Order](#block-registration-order)).

### `src/View.php`

Thin singleton wrapper around BladeOne:

```php
// Render a block template
echo \OverchainBlocks\View::render('blocks.hero', [
    'attributes' => $attributes,
    'content'    => $content,
    'block'      => $block,
]);

// Dot notation maps to: resources/views/blocks/hero.blade.php
// Cache stored in: cache/views/
```

- Views root: `resources/views/`
- Cache: `cache/views/`
- Mode: `BladeOne::MODE_DEBUG` when `WP_DEBUG` is true, otherwise `MODE_AUTO`
- On error: returns HTML comment in debug mode, empty string in production

---

## Blade Rendering

Every block's `render.php` follows the same pattern:

```php
<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( class_exists( '\OverchainBlocks\View' ) ) {
    echo \OverchainBlocks\View::render(
        'blocks.my-block',
        array(
            'attributes' => $attributes,
            'content'    => $content,
            'block'      => $block,
        )
    );
}
```

Inside the Blade template, three variables are always available:

| Variable | Type | Description |
|---|---|---|
| `$attributes` | `array` | Block attributes from `block.json` |
| `$content` | `string` | Rendered InnerBlocks HTML (for parent blocks) |
| `$block` | `WP_Block` | Block instance (access `$block->inner_blocks`) |

### Escaping conventions in Blade

```blade
{{ esc_html($text) }}           {{-- Plain text --}}
{{ esc_url($url) }}             {{-- URLs --}}
{!! wp_kses_post($html) !!}     {{-- Rich text from RichText fields --}}
{!! esc_attr($attr) !!}         {{-- HTML attributes --}}
{!! $attrs !!}                  {{-- Pre-escaped attribute strings --}}
```

### Including partials

```blade
@include('partials.btn-icon', [
    'text'    => $attributes['buttonText'] ?? '',
    'type'    => $attributes['buttonType'] ?? 'link',
    'link'    => $attributes['buttonLink'] ?? '',
    'newTab'  => $attributes['buttonLinkNewTab'] ?? false,
    'anchor'  => $attributes['buttonAnchor'] ?? '',
    'popupId' => $attributes['buttonPopupId'] ?? '',
    'icon'    => $attributes['buttonIcon'] ?? 'calendar',
    'class'   => 'my-block__btn',
])
```

---

## Partials

Reusable Blade fragments in `resources/views/partials/`.

### `partials/btn-icon`

Renders a theme button with icon. Calls `overchain_resolve_button_data()` internally.

**Variables:**

| Variable | Default | Description |
|---|---|---|
| `$text` | — | Button label (required, renders nothing if empty) |
| `$type` | `'link'` | `'link'`, `'anchor'`, or `'popup'` |
| `$link` | `''` | URL for type `link` |
| `$newTab` | `false` | Open in new tab (type `link` only) |
| `$anchor` | `''` | Anchor with `#` for type `anchor` |
| `$popupId` | `''` | Popup trigger ID for type `popup` |
| `$icon` | `'calendar'` | `'calendar'` or `'arrow'` |
| `$class` | `''` | Extra CSS class on the `<a>` element |

Output: `<a class="btn-icon [class]" href="..." ...>...</a>`

### `partials/checkbox`

Renders an accessible HubSpot-compatible checkbox field.

**Variables:** `$id`, `$name`, `$text` (supports HTML), `$required` (bool).

---

## JS Components

All components live in `components/` and are imported directly by path in `edit.js` files:

```js
import SectionSettingsControls from '../../components/SectionSettingsControls';
import ImageControls from '../../components/ImageControls';
import ButtonControls from '../../components/ButtonControls';
import ButtonPreview from '../../components/ButtonPreview';
```

### `SectionSettingsControls`

Renders the standard "Settings" panel with the `noPaddingTop` toggle.

```jsx
<SectionSettingsControls
    attributes={attributes}
    setAttributes={setAttributes}
/>
```

Props: `attributes`, `setAttributes`, `showNoPaddingTop` (bool, default `true`), `noPaddingTopAttribute` (string, default `'noPaddingTop'`), `title`, `noPaddingTopLabel`, `initialOpen`.

### `ImageControls`

Renders a `PanelBody` with MediaUpload for image or icon.

```jsx
<ImageControls
    type="image"           // or "icon"
    imageId={imageId}
    imageUrl={imageUrl}
    imageIdAttribute="imageId"
    imageUrlAttribute="imageUrl"
    setAttributes={setAttributes}
/>
```

`type="icon"` changes labels and preview size automatically.

### `ImageField`

Inline image picker without `PanelBody` wrapper. Useful inside other panels.

```jsx
<ImageField
    label="Left image"
    imageId={decoLeftId}
    imageUrl={decoLeftUrl}
    onSelect={(media) => setAttributes({ decoLeftId: media.id, decoLeftUrl: media.url })}
    onRemove={() => setAttributes({ decoLeftId: 0, decoLeftUrl: '' })}
/>
```

### `VideoControls`

Renders a `PanelBody` with MediaUpload restricted to `video/mp4` and `video/webm`.

```jsx
<VideoControls
    videoId={videoId}
    videoUrl={videoUrl}
    videoType={videoType}
    videoIdAttribute="videoId"
    videoUrlAttribute="videoUrl"
    videoTypeAttribute="videoType"
    setAttributes={setAttributes}
/>
```

### `ButtonControls`

Full button settings panel: text, type (link/anchor/popup), `LinkControl` for links, anchor field, popup ID field, icon selector (calendar/arrow).

```jsx
<ButtonControls
    attributes={attributes}
    setAttributes={setAttributes}
/>
```

Reads and writes these attributes directly: `buttonText`, `buttonType`, `buttonLink`, `buttonLinkId`, `buttonLinkTitle`, `buttonLinkNewTab`, `buttonAnchor`, `buttonPopupId`, `buttonIcon`.

### `ButtonPreview`

Renders a visual preview of the button in the editor canvas. Uses theme SVG icons from `window.ovchBlocks.themeUrl`.

```jsx
<ButtonPreview
    text={buttonText}
    icon={buttonIcon}       // 'calendar' or 'arrow'
    className="my-block__btn"
/>
```

Returns `null` if `text` is empty.

### `LinkControlPanel`

`PanelBody` wrapping WordPress `LinkControl` for a single URL field with new-tab toggle.

```jsx
<LinkControlPanel
    title="Link"
    linkUrl={linkUrl}
    linkId={linkId}
    linkTitle={linkTitle}
    linkNewTab={linkNewTab}
    linkUrlAttribute="linkUrl"
    linkIdAttribute="linkId"
    linkTitleAttribute="linkTitle"
    linkNewTabAttribute="linkNewTab"
    setAttributes={setAttributes}
/>
```

### `LinkFields`

Inline link fields (no `PanelBody`) with type selector. Used inside other panels.

```jsx
<LinkFields
    type={buttonType}
    link={buttonLink}
    newTab={buttonLinkNewTab}
    anchor={buttonAnchor}
    popupId={buttonPopupId}
    onChange={(values) => setAttributes(values)}
/>
```

### `IconListControls`

Renders a dynamic repeater of icon+label items. Each item gets its own `PanelBody`.

```jsx
<IconListControls
    items={steps}
    itemsAttribute="steps"
    itemTitle={__('Step', 'overchain-blocks')}
    addItemText={__('+ Add step', 'overchain-blocks')}
    removeItemText={__('Remove step', 'overchain-blocks')}
    maxItems={4}             // 0 = unlimited
    minItems={1}
    defaultItem={{ iconUrl: '', iconId: 0, label: 'Step title' }}
    setAttributes={setAttributes}
/>
```

### `TextSettingsControls`

Renders multiple `TextControl` fields inside a single `PanelBody`.

```jsx
<TextSettingsControls
    title="Privacy settings"
    controls={[
        {
            attribute: 'privacyText',
            label: 'Text before link',
            value: privacyText,
            onChange: (v) => setAttributes({ privacyText: v }),
        },
        {
            attribute: 'privacyLinkUrl',
            label: 'Link URL',
            value: privacyLinkUrl,
            placeholder: 'https://',
            onChange: (v) => setAttributes({ privacyLinkUrl: v }),
        },
    ]}
/>
```

### `FormCheckboxPreview`

Renders an editable checkbox with `RichText` label in the editor canvas. Used for HubSpot form blocks.

```jsx
<FormCheckboxPreview
    value={checkboxText}
    onChange={(v) => setAttributes({ checkboxText: v })}
    placeholder="Checkbox label..."
    required={true}
/>
```

---

## Build System

### Commands

```bash
npm run start    # Development watch mode (no fix-asset.js)
npm run build    # Production build + fix-asset.js
```

### `webpack.config.js`

- Extends `@wordpress/scripts` default config
- `CleanWebpackPlugin` is removed to prevent deleting source files
- Auto-discovers all `blocks/**/index.js` entries via `glob`
- Additional entries: `blocks.scss`, `editor.scss`, `blocks.js`
- All output goes to `build/`
- `snapshot: { managedPaths: [] }` forces webpack to always re-check file changes (fixes JSON import caching)
- `RemoveEmptyScriptsPlugin` removes empty JS files generated from SCSS entries (only for `.scss/.css` extensions)

### `fix-asset.js`

Runs after every build. Recursively finds all `build/*/index.js` files and writes correct `index.asset.php` with WordPress dependencies:

```
react-jsx-runtime, wp-block-editor, wp-blocks, wp-components, wp-i18n
```

This is necessary because `DependencyExtractionWebpackPlugin` does not correctly detect WP externals when `output.path` differs from the default.

### SCSS architecture

- `resources/scss/blocks.scss` — all block styles, compiled to `build/blocks.css`. Loaded on **frontend and in editor** via `add_editor_style()`.
- `resources/scss/editor.scss` — starts with `@use 'blocks'` to include all block styles, then adds editor-only overrides. Compiled to `build/editor.css`. Loaded only in editor.

### `window.ovchBlocks`

Injected via `wp_add_inline_script` on `enqueue_block_editor_assets`:

```js
window.ovchBlocks = {
    url: 'https://site.com/wp-content/plugins/overchain-blocks/',
    // themeUrl is set by the theme separately
};
```

Use in `edit.js` files:

```js
const placeholderIcon = window.ovchBlocks?.url + 'resources/placeholders/icon.svg';
const themeUrl = window.ovchBlocks?.themeUrl || '/wp-content/themes/overchain/';
```

---

## Existing Blocks

| Block name | Slug | Type | Notes |
|---|---|---|---|
| White Section | `overchain/white-section` | InnerBlocks container | Accepts any block |
| Hero | `overchain/hero` | Simple | Background image, title, subtitle, button |
| Video | `overchain/video` | Simple | MP4/WebM, poster, no-padding toggle |
| Features | `overchain/features` | InnerBlocks | Grid of `overchain/feature-card` |
| Split | `overchain/split` | Simple | Two-column with image, button |
| Steps | `overchain/steps` | Repeater | Up to 4 steps with icon+label |
| Tabs | `overchain/tabs` | InnerBlocks | Switchable `overchain/tab` children |
| Badges | `overchain/badges` | Repeater | Icon+text badge list, deco images |
| Accordion | `overchain/accordion` | Repeater | Image right, accordion items left |
| Cards | `overchain/cards` | InnerBlocks | Grid of `overchain/card` |
| Logos | `overchain/logos` | Repeater | Logo images with optional links |
| Spotlight | `overchain/spotlight` | InnerBlocks | Background image, `overchain/spotlight-card` |
| Duo | `overchain/duo` | InnerBlocks | Two-column header + `overchain/duo-card` grid |
| Promo | `overchain/promo` | Simple | Image, title, text, button |
| Slider Cards | `overchain/slider-cards` | InnerBlocks | Grid/future-slider of `overchain/slider-card` |
| Form | `overchain/form` | Simple | Hardcoded HTML form, editable title/subtitle |
| Subscribe | `overchain/subscribe` | Simple | Email subscribe form, image, privacy RichText |
| Related Posts | `overchain/related-posts` | Simple | Latest/random/manual WP posts |

**Child blocks** (not shown in inserter):

| Child block | Parent |
|---|---|
| `overchain/feature-card` | `overchain/features` |
| `overchain/tab` | `overchain/tabs` |
| `overchain/card` | `overchain/cards` |
| `overchain/spotlight-card` | `overchain/spotlight` |
| `overchain/duo-card` | `overchain/duo` |
| `overchain/slider-card` | `overchain/slider-cards` |

---

## Creating a New Block

### Simple Block Pattern

A block with sidebar controls and Blade frontend render.

**1. Create `blocks/my-block/block.json`**

```json
{
  "apiVersion": 3,
  "name": "overchain/my-block",
  "title": "My Block",
  "category": "overchain",
  "icon": "admin-site",
  "description": "Block description.",
  "textdomain": "overchain-blocks",
  "supports": { "html": false, "align": false },
  "example": { "viewportWidth": 1400 },
  "attributes": {
    "noPaddingTop": { "type": "boolean", "default": false },
    "title":        { "type": "string",  "default": "Section title" },
    "imageId":      { "type": "number",  "default": 0 },
    "imageUrl":     { "type": "string",  "default": "" },
    "buttonText":   { "type": "string",  "default": "Book a Demo" },
    "buttonType":   { "type": "string",  "default": "link" },
    "buttonLink":   { "type": "string",  "default": "" },
    "buttonLinkId": { "type": "number",  "default": 0 },
    "buttonLinkTitle":  { "type": "string",  "default": "" },
    "buttonLinkNewTab": { "type": "boolean", "default": false },
    "buttonAnchor": { "type": "string",  "default": "" },
    "buttonPopupId":{ "type": "string",  "default": "" },
    "buttonIcon":   { "type": "string",  "default": "calendar" }
  },
  "editorScript": "file:../../build/my-block/index.js",
  "render": "file:./render.php"
}
```

**2. Create `blocks/my-block/index.js`**

```js
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata.name, {
    ...metadata,
    edit: Edit,
    save: () => null,
} );
```

**3. Create `blocks/my-block/edit.js`**

```jsx
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

import SectionSettingsControls from '../../components/SectionSettingsControls';
import ImageControls from '../../components/ImageControls';
import ButtonControls from '../../components/ButtonControls';
import ButtonPreview from '../../components/ButtonPreview';

export default function Edit( { attributes, setAttributes } ) {
    const { noPaddingTop, title, imageId, imageUrl, buttonText, buttonIcon } = attributes;

    const blockProps = useBlockProps( { style: { padding: 0, margin: 0 } } );

    const sectionClass = `overchain-my-block ${ noPaddingTop ? 'no-padding-top' : '' }`;

    return (
        <>
            <InspectorControls>
                <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />
                <ImageControls
                    type="image"
                    imageId={imageId}
                    imageUrl={imageUrl}
                    imageIdAttribute="imageId"
                    imageUrlAttribute="imageUrl"
                    setAttributes={setAttributes}
                />
                <ButtonControls attributes={attributes} setAttributes={setAttributes} />
            </InspectorControls>

            <div { ...blockProps }>
                <section className={sectionClass}>
                    <div className="container">
                        <RichText
                            tagName="h2"
                            className="overchain-my-block__title"
                            placeholder={__( 'Section title', 'overchain-blocks' )}
                            value={title}
                            onChange={( v ) => setAttributes( { title: v } )}
                        />
                        { imageUrl && <img src={imageUrl} alt="" /> }
                        <ButtonPreview text={buttonText} icon={buttonIcon} />
                    </div>
                </section>
            </div>
        </>
    );
}
```

**4. Create `blocks/my-block/render.php`**

```php
<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

if ( class_exists( '\OverchainBlocks\View' ) ) {
    echo \OverchainBlocks\View::render( 'blocks.my-block', array(
        'attributes' => $attributes,
        'content'    => $content,
        'block'      => $block,
    ) );
}
```

**5. Create `resources/views/blocks/my-block.blade.php`**

```blade
@php
    $noPaddingTop = $attributes['noPaddingTop'] ?? false;
    $title        = $attributes['title'] ?? '';
    $imageUrl     = $attributes['imageUrl'] ?? '';
    $sectionClass = 'overchain-my-block ' . ( $noPaddingTop ? 'no-padding-top' : '' );
@endphp

<section class="{{ esc_attr($sectionClass) }}">
    <div class="container">
        @if (!empty($title))
            <h2 class="overchain-my-block__title">{!! wp_kses_post($title) !!}</h2>
        @endif

        @if (!empty($imageUrl))
            <img src="{{ esc_url($imageUrl) }}" alt="">
        @endif

        @include('partials.btn-icon', [
            'text'    => $attributes['buttonText'] ?? '',
            'type'    => $attributes['buttonType'] ?? 'link',
            'link'    => $attributes['buttonLink'] ?? '',
            'newTab'  => $attributes['buttonLinkNewTab'] ?? false,
            'anchor'  => $attributes['buttonAnchor'] ?? '',
            'popupId' => $attributes['buttonPopupId'] ?? '',
            'icon'    => $attributes['buttonIcon'] ?? 'calendar',
        ])
    </div>
</section>
```

**6. Add styles to `resources/scss/blocks.scss`**

```scss
// ─── My Block ────────────────────────────────────────────────────────────────

.overchain-my-block {
    padding-top: 80px;

    &.no-padding-top {
        padding-top: 0;
    }

    &__title {
        margin: 0 0 24px;
    }
}
```

**7. Register block in `overchain-blocks.php`** — add `'my-block'` to the `$order` array in `overchain_blocks_register_blocks()` at the desired position.

**8. Run the build**

```bash
npm run build
```

---

### Block with Repeater Pattern

For blocks where items are managed as an array attribute (no InnerBlocks). Example: `steps`, `badges`, `logos`.

**Key difference in `block.json`** — items stored as array attribute:

```json
"attributes": {
    "steps": {
        "type": "array",
        "default": [
            { "iconUrl": "", "iconId": 0, "label": "Step title" },
            { "iconUrl": "", "iconId": 0, "label": "Step title" }
        ]
    }
}
```

**In `edit.js`** — use `IconListControls` for icon+label repeaters:

```jsx
import SectionSettingsControls from '../../components/SectionSettingsControls';
import IconListControls from '../../components/IconListControls';

// In JSX:
<InspectorControls>
    <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />
    <IconListControls
        items={steps}
        itemsAttribute="steps"
        itemTitle={__( 'Step', 'overchain-blocks' )}
        addItemText={__( '+ Add step', 'overchain-blocks' )}
        removeItemText={__( 'Remove step', 'overchain-blocks' )}
        maxItems={4}
        defaultItem={{ iconUrl: '', iconId: 0, label: 'Step title' }}
        setAttributes={setAttributes}
    />
</InspectorControls>
```

For items that need a batch update (e.g. updating icon and iconId simultaneously), update the whole array at once:

```js
const updated = items.map( ( item, i ) =>
    i === index ? { ...item, iconUrl: media.url, iconId: media.id } : item
);
setAttributes( { items: updated } );
```

**In the Blade template** — iterate `$attributes['steps']`:

```blade
@foreach ($steps as $index => $step)
    @php
        $iconUrl = $step['iconUrl'] ?? '';
        $label   = $step['label'] ?? '';
        $number  = str_pad( (string)($index + 1), 2, '0', STR_PAD_LEFT );
    @endphp
    <li>
        @if (!empty($iconUrl))
            <img src="{{ esc_url($iconUrl) }}" alt="">
        @endif
        <h3>{!! wp_kses_post($label) !!}</h3>
        <span>{{ esc_html($number) }}</span>
    </li>
@endforeach
```

---

### Block with InnerBlocks Pattern

For blocks that contain child blocks. Example: `cards`, `features`, `tabs`.

**Key differences:**

**`index.js`** — `save` must return `<InnerBlocks.Content />`:

```js
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';

registerBlockType( metadata.name, {
    ...metadata,
    edit: Edit,
    save: () => <InnerBlocks.Content />,
} );
```

**`edit.js`** — use `InnerBlocks` in canvas:

```jsx
const ALLOWED_BLOCKS = ['overchain/my-card'];
const TEMPLATE = [
    ['overchain/my-card', {}],
    ['overchain/my-card', {}],
];

// In JSX:
<InnerBlocks
    allowedBlocks={ALLOWED_BLOCKS}
    template={TEMPLATE}
    renderAppender={InnerBlocks.ButtonBlockAppender}
/>
```

**Blade template** — output `$content` directly:

```blade
<ul class="my-block__grid">
    {!! $content !!}
</ul>
```

`$content` contains the fully rendered HTML of all child blocks.

---

### Child Block Pattern

Child blocks are not shown in the inserter (hidden from users). They can only be added inside their parent.

**Key `block.json` fields:**

```json
{
  "name": "overchain/my-card",
  "parent": ["overchain/my-block"],
  "supports": {
    "html": false,
    "align": false,
    "reusable": false
  },
  "editorScript": "file:../../../build/my-block/my-card/index.js"
}
```

Note the `editorScript` path: three levels up (`../../../`) to reach `build/`.

**`index.js`** — `save` returns `null` (dynamic render):

```js
registerBlockType( metadata.name, {
    ...metadata,
    edit: Edit,
    save: () => null,
} );
```

**`edit.js`** — use `useBlockProps` with a BEM class:

```jsx
const blockProps = useBlockProps( { className: 'overchain-my-card' } );

return (
    <>
        <InspectorControls>
            <ImageControls
                type="icon"
                imageId={iconId}
                imageUrl={iconUrl}
                imageIdAttribute="iconId"
                imageUrlAttribute="iconUrl"
                setAttributes={setAttributes}
            />
        </InspectorControls>

        <li { ...blockProps }>
            <img src={iconUrl || placeholderIcon} alt="" />
            <RichText tagName="h3" value={title} onChange={(v) => setAttributes({title: v})} />
        </li>
    </>
);
```

**Folder structure for child blocks:**

```
blocks/
└── my-block/
    ├── block.json
    ├── index.js
    ├── edit.js
    ├── render.php
    └── my-card/              ← child block folder inside parent
        ├── block.json
        ├── index.js
        ├── edit.js
        └── render.php
```

The child block's Blade template is a standalone file at `resources/views/blocks/my-card.blade.php`.

---

## Block Registration Order

Blocks are registered in `overchain_blocks_register_blocks()` in `overchain-blocks.php`. The `$order` array controls the display order in the Gutenberg inserter:

```php
$order = array(
    'white-section',
    'hero',
    'video',
    'features',
    'split',
    'steps',
    'tabs',
    'badges',
    'accordion',
    'cards',
    'logos',
    'spotlight',
    'duo',
    'promo',
    'slider-cards',
    'form',
    'subscribe',
    'related-posts',
);
```

To add a new block, insert its folder name at the desired position in this array.

Child blocks (those with `"parent"` in `block.json`) are registered automatically after parent blocks via `glob( 'blocks/*/*/block.json' )`.

---

## Assets

### CSS loading matrix

| File | Frontend | Editor canvas | Editor UI |
|---|---|---|---|
| `build/blocks.css` | ✅ | ✅ via `add_editor_style()` | ✅ |
| `build/editor.css` | ❌ | ✅ | ✅ |

### Placeholder images

Editor placeholders live in `resources/placeholders/`. Reference them in `edit.js`:

```js
const placeholderIcon  = window.ovchBlocks?.url + 'resources/placeholders/icon.svg';
const placeholderImage = window.ovchBlocks?.url + 'resources/placeholders/image.png';
const placeholderCard  = window.ovchBlocks?.url + 'resources/placeholders/card.png';
const placeholderCoins = window.ovchBlocks?.url + 'resources/placeholders/coins.png';
const placeholderVideo = window.ovchBlocks?.url + 'resources/placeholders/video.jpg';
const placeholderLogo  = window.ovchBlocks?.url + 'resources/placeholders/logo.png';
```

Convention: show placeholder when no real image is selected. Apply `opacity: 0.3` to indicate it's a placeholder:

```jsx
<img
    src={imageUrl || placeholderImage}
    alt=""
    style={!imageUrl ? { opacity: 0.3 } : {}}
/>
```

---

## Frontend JS

`resources/js/blocks.js` is compiled to `build/blocks-scripts.js` and loaded on every frontend page.

Use it for lightweight DOM interactions that blocks need on the frontend (accordion toggles, tab switching, etc.). Currently contains accordion logic. Tab switching is handled via an inline script in `wp_footer`.

To add new frontend JS for a block, append it to `resources/js/blocks.js`.

---

## Known Conventions

### Section classes

Blocks use theme utility classes for spacing. The `noPaddingTop` toggle switches between two padding classes:

```js
// In edit.js
const sectionClass = `my-section ${ noPaddingTop ? 'pbs4' : 'pbs2' }`;
```

```blade
{{-- In blade --}}
@php $sectionClass = 'my-section ' . ($noPaddingTop ? 'pbs4' : 'pbs2'); @endphp
```

### Button attributes

Every block with a button uses the same set of attributes for consistency:

```
buttonText, buttonType, buttonLink, buttonLinkId, buttonLinkTitle,
buttonLinkNewTab, buttonAnchor, buttonPopupId, buttonIcon
```

Always use `ButtonControls` in the editor and `partials/btn-icon` in the Blade template.

### `useBlockProps` wrapper

All blocks wrap their canvas output with a plain `<div>` carrying `useBlockProps` to avoid Gutenberg injecting its classes into the block's own root element:

```jsx
const blockProps = useBlockProps( { style: { padding: 0, margin: 0 } } );

return (
    <>
        <InspectorControls>...</InspectorControls>
        <div { ...blockProps }>
            <section className="overchain-my-block">
                ...
            </section>
        </div>
    </>
);
```

Exception: child blocks pass a BEM class directly to `useBlockProps` since their root element is the block element itself.

### Editor preview (`example`)

Every block should have `"example": { "viewportWidth": 1400 }` in `block.json` so Gutenberg shows a scaled preview in the inserter. Blocks with default text attributes will show those defaults in the preview automatically.

### Blade cache

After modifying a `.blade.php` template, delete the compiled cache in `cache/views/` or enable `WP_DEBUG` (which uses `BladeOne::MODE_DEBUG` and recompiles on every request).