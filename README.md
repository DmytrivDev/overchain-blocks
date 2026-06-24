# Overchain Blocks

Стартовий WordPress-плагін з нативними Gutenberg-блоками. Без ACF, без Laravel.

Editor UI написаний на React (`@wordpress/*` пакети), frontend-рендер блоків — звичайний PHP dynamic block, а HTML frontend-шаблонів генерується через [BladeOne](https://github.com/EFTEC/BladeOne) (standalone Composer-пакет, без Laravel).

## Встановлення

### 1. PHP-залежності

```bash
composer install
```

### 2. JS-залежності

```bash
npm install
```

### 3. Dev-режим (watch)

```bash
npm run start
```

### 4. Production build

```bash
npm run build
```

Білд генерує:

- `build/blocks/test-block/index.js` — скомпільований editor script блоку;
- `build/blocks.css` — спільні стилі (frontend + editor), скомпільовані з `resources/scss/blocks.scss`;
- `build/editor.css` — стилі тільки для Gutenberg editor, скомпільовані з `resources/scss/editor.scss`.

### 5. Активація плагіна

1. Скопіюйте папку `overchain-blocks/` у `wp-content/plugins/`.
2. У WordPress admin відкрийте **Плагіни** → активуйте **Overchain Blocks**.

Плагін активується без fatal error навіть якщо `composer install` або `npm run build` ще не виконані — у цьому випадку просто не підʼєднається BladeOne-рендер і не завантажаться CSS-файли, доки відповідні файли не зʼявляться.

## Перевірка тестового блоку

1. Відкрийте Gutenberg editor (сторінка або пост).
2. Додайте блок **Test Block**.
3. Перевірте, що блок знаходиться в категорії **Overchain**.
4. Заповніть title, text, button text/URL, виберіть зображення.
5. Збережіть сторінку.
6. Відкрийте сторінку на frontend і перевірте, що блок рендериться через Blade-шаблон.

## Архітектура

- **Editor UI** — React / `@wordpress/block-editor`, `@wordpress/components`, `@wordpress/blocks` тощо. Кожен блок має власний `edit.js` з повноцінним canvas-редагуванням (не тільки sidebar).
- **Frontend render** — PHP dynamic block (`render.php` кожного блоку), який делегує побудову HTML класу `\OverchainBlocks\View`.
- **Frontend HTML templates** — [BladeOne](https://github.com/EFTEC/BladeOne), шаблони лежать у `resources/views/blocks/*.blade.php`, скомпільований кеш — у `cache/views/`.
- **blocks.css** — один спільний CSS-файл для всіх блоків. Вантажиться і на frontend (`wp_enqueue_scripts`), і в Gutenberg editor (`enqueue_block_editor_assets`).
- **editor.css** — стилі тільки для Gutenberg editor (scoped через `.editor-styles-wrapper`). Вантажиться лише в editor.
- **Нові блоки** додаються як нова папка в `blocks/<block-name>/` з власним `block.json`, `index.js`, `edit.js`, `render.php`. `BlocksService` автоматично знаходить і реєструє всі `blocks/*/block.json` — додаткового коду не потрібно.
- **Стилі нових блоків** додаються прямо в `resources/scss/blocks.scss` (спільні стилі для всіх блоків в одному файлі).
- **Editor-only стилі** нових блоків додаються в `resources/scss/editor.scss`.

## Структура проєкту

```
overchain-blocks/
├── overchain-blocks.php       # Plugin header, константи, bootstrap
├── composer.json              # PSR-4 autoload + BladeOne
├── package.json                # wp-scripts build/start
├── webpack.config.js          # Кастомні entry points для CSS/JS
├── src/
│   ├── Plugin.php              # Bootstrap класу плагіна
│   ├── View.php                # BladeOne wrapper / singleton
│   ├── Assets/AssetsService.php   # Enqueue blocks.css / editor.css
│   └── Blocks/BlocksService.php   # Реєстрація категорії + блоків
├── blocks/
│   └── test-block/             # Тестовий блок overchain/test-block
├── resources/
│   ├── scss/blocks.scss        # Спільні стилі всіх блоків
│   ├── scss/editor.scss        # Editor-only стилі
│   └── views/blocks/           # Blade-шаблони
├── cache/views/                # Кеш скомпільованих Blade-шаблонів
└── build/                      # Скомпільовані JS/CSS (генерується build)
```
