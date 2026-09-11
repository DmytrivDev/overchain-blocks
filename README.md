# Overchain Blocks

WordPress plugin providing the native Gutenberg blocks the Overchain site is built from. No ACF, no Laravel.

Editor UI is React (`@wordpress/*` packages); frontend rendering is a plain PHP dynamic block whose HTML is produced by [BladeOne](https://github.com/EFTEC/BladeOne) — a standalone Composer package, no Laravel involved.

The plugin is **tightly coupled to the Overchain theme**: blocks use theme CSS classes and theme icon paths. It is not intended to run with any other theme.

## Installation

### 1. PHP dependencies

```bash
composer install
```

### 2. JS dependencies

```bash
npm install
```

### 3. Dev mode (watch)

```bash
npm run start
```

### 4. Production build

```bash
npm run build
```

The build generates:

- `build/<block-name>/index.js` + `index.asset.php` — compiled editor script per block (including child blocks at `build/<parent>/<child>/`);
- `build/blocks.css` — shared styles (frontend + editor), compiled from `resources/scss/blocks.scss`;
- `build/editor.css` — editor-only styles, compiled from `resources/scss/editor.scss`;
- `build/blocks-scripts.js` — frontend block behaviour, compiled from `resources/js/blocks.js`.

### 5. Activate the plugin

1. Copy `overchain-blocks/` into `wp-content/plugins/`.
2. In WP admin open **Plugins** → activate **Overchain Blocks**.

The plugin activates without a fatal error even if `composer install` or `npm run build` have not been run yet — it simply will not hook up the BladeOne renderer or load any CSS until those files exist.

> **A block only appears in the inserter once `build/<block-name>/index.js` and `index.asset.php` both exist.** An empty Overchain category almost always means a forgotten `npm run build`.

## Verifying the install

1. Open the Gutenberg editor on a page.
2. Open the inserter and find the **Overchain** category — it should list 19 blocks, starting with **White Section** and **Hero**.
3. Add **Hero**, fill in title, subtitle and button, pick a background image.
4. Save and open the page on the frontend; the block should render through its Blade template.

## Architecture

- **Editor UI** — React / `@wordpress/block-editor`, `@wordpress/components`, `@wordpress/blocks`. Every block has its own `edit.js` with full canvas editing, not just a sidebar.
- **Frontend render** — PHP dynamic block (`render.php` per block) delegating HTML construction to `\OverchainBlocks\View`.
- **Frontend HTML templates** — [BladeOne](https://github.com/EFTEC/BladeOne); templates in `resources/views/blocks/*.blade.php`, compiled cache in `cache/views/`.
- **blocks.css** — one shared stylesheet for all blocks, loaded on the frontend (`wp_enqueue_scripts`) and in the editor (`enqueue_block_editor_assets`).
- **editor.css** — editor-only styles (scoped via `.editor-styles-wrapper`), loaded only in the editor.
- **New blocks** are a new folder under `blocks/<block-name>/` with its own `block.json`, `index.js`, `edit.js`, `render.php` and `translate.json`, plus an entry in the `$order` array in `overchain-blocks.php`.
- **Styles for new blocks** go into `resources/scss/blocks.scss`; editor-only styles into `resources/scss/editor.scss`.
- **`translate.json`** per block declares which attributes the separate `deepl-translator` plugin should translate.

Full developer documentation, including the [Technical Debt](./PLUGIN.md#technical-debt) register: **[PLUGIN.md](./PLUGIN.md)**.

## Project structure

```
overchain-blocks/
├── overchain-blocks.php       # Plugin header, constants, hooks, block registration
├── ob-updater.php             # GitHub Releases auto-updater
├── composer.json              # PSR-4 autoload + BladeOne
├── package.json               # wp-scripts build/start
├── webpack.config.js          # Auto-discovered block entries + CSS/JS entries
├── fix-asset.js               # Writes correct index.asset.php after each build
├── src/
│   ├── Plugin.php             # Plugin bootstrap class
│   ├── View.php               # BladeOne wrapper / singleton
│   ├── Assets/AssetsService.php   # Enqueues blocks.css / editor.css / blocks-scripts.js
│   └── Blocks/BlocksService.php   # Category + block registration (duplicates the main file)
├── blocks/                    # 19 parent blocks + 6 child blocks
├── components/                # 11 shared React editor components
├── resources/
│   ├── scss/                  # styles.scss (generated) → blocks.scss → editor.scss
│   ├── js/blocks.js           # Frontend block behaviour
│   ├── placeholders/          # Editor placeholder images
│   └── views/                 # Blade templates + partials
├── cache/views/               # Compiled Blade cache
└── build/                     # Compiled JS/CSS (generated, gitignored)
```
