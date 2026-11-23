# Block Queue — порт сторінок платформи

Робочий чекліст на блоки, потрібні для чотирьох сторінок дизайн-дропу:
`integrations`, `platform-overview`, `move-money`, `control-treasury`.

Це **не** довідник. Довідники — [`PLUGIN.md`](PLUGIN.md) (збірка, ланцюг рендера,
технічний борг) і [`BLOCKS.md`](BLOCKS.md) (патерни секційних блоків, обхідні
рішення для канви редактора). Цей файл існує, щоб відстежувати, що вже зроблено.

---

## Як користуватися файлом

**Відмічай кожен пункт одразу після того, як він готовий і перевірений.**
Не пакетом у кінці блоку — інакше після перерви незрозуміло, де саме ти зупинився.

- `- [ ]` → `- [x]` для виконаного пункту
- коли всі пункти блоку відмічені, заміни `⬜` на `✅` у заголовку блоку
  **і** в таблиці [Стан](#стан)
- якщо пункт свідомо пропущено — `- [~]` і рядок причини під ним

Пункт вважається виконаним, тільки коли він відповідає
[Критеріям готовності](#критерії-готовності-блоку). Зібраний, але неперевірений
блок — це `- [ ]`.

Якщо реалізація розійшлася з планом (інший набір атрибутів, інше рішення для
канви) — **правь цей файл у тому ж коміті**. Розбіжність між планом і кодом
дорожча за відсутність плану.

---

## Стан

| Етап | Блок | Статус |
|---|---|---|
| 1.1 | Accordion → `wide-tabs` | ✅ |
| 1.2 | Features → три стани відступу | ✅ |
| 1.3 | Split → світіння, стиль підзаголовка, кроки | ✅ |
| 1.4 | Duo → макет із логотипами | ✅ |
| 2.1 | Партіал стрілок слайдера | ✅ |
| 2.2 | Intro | ✅ |
| 2.3 | Testimonials | ✅ |
| 3.1 | Tag List | ✅ |
| 3.2 | Everything Grid | ✅ |
| 3.3 | Process Slider | ✅ |
| 3.4 | FAQ | ✅ |
| 3.5 | Manage Cards | ✅ |
| 3.6 | Connect | ✅ |
| 3.7 | Moves Mosaic | ✅ |
| 4.1 | Cards → абзац `.compliant__desc` | ✅ |
| 4.2 | Features → заголовок секції | ✅ |
| 4.3 | Promo → геометрія `img2` + `pis1` | ✅ |
| 4.4 | Split → список `.actually__list` | ✅ |
| 5.1 | Integration Steps | ✅ |
| 5.2 | Control List | ✅ |
| 5.3 | Flow Promo | ✅ |
| 5.4 | Highlight | ✅ |
| 6.1 | `fix-asset.js` у темі → `wp-data` | ✅ |
| 6.2 | Cases Slider (тема) | ✅ |
| 7 | Документація | ✅ |

Перевірка в редакторі (критерій 5) **не входить у чергу** — її робить людина
вручну, коли їй зручно. Чеклисти на кожен блок лишені в кінці файлу як довідка.
`✅` тут означає, що закриті решта пʼяти критеріїв: збірка, diff інвентарю класів,
smoke-рендер усіх гілок, `translate.json`, документація.

---

## Стартові умови

Перевірено перед стартом — **дизайн-синк робити не треба**:

- [`resources/scss/styles.scss`](resources/scss/styles.scss) уже містить правила всіх
  нових секцій. Кількість правил збігається з
  `OverchainMain2.0/dist/css/blocks.CNAH7hS8.css`.
- `../../themes/overchain/js/main.js` уже ініціалізує `.accept__splide`
  (perPage 4 → 2 → 1) і `.testimonials__splide` (perPage 1). `base-accord`,
  `data-lock` і `.arrows` — загальні механізми, теж уже є.
- `.drag-arrow` глобально схований у
  [`resources/scss/editor.scss`](resources/scss/editor.scss).

Тобто робота в кожному пункті — це `block.json` + `edit.js` + `render.php` +
Blade + `translate.json` + правило для канви.

> Шляхи `OverchainMain2.0/dist/...` у цьому файлі — це зовнішній дизайнерський
> проєкт `D:\Work\Sites\Building\OverchainMain2.0\` (папку `_desigh/` в темі
> видалено 07.10.2026; читаємо `dist/` і `public/` прямо звідти). Решта шляхів —
> від кореня плагіна.
> Номери рядків верстки звірені; якщо приїде новий дизайн-дроп, вони поїдуть —
> шукай за класом секції.

---

## Критерії готовності блоку

Блок відмічається `✅` тільки коли виконано **все**:

1. **Збірка.** `npm run build` (повна, не `start` — `fix-asset.js` у watch-режимі
   не запускається) без помилок; `build/<name>/index.asset.php` існує і містить
   кожен `wp-*` пакет, який реально використовує скрипт (насамперед `wp-i18n` —
   забутий `import { __ }` не є помилкою збірки, а падає в рантаймі).
2. **Diff інвентарю класів** проти секції у верстці: 0 missing / 0 extra.
   Парсер збирає `class="…"` з Blade і `className=` з `edit.js` і віднімає
   в обидва боки.
3. **Smoke-рендер Blade** з заглушками — кожна умовна гілка **плюс** випадок
   «атрибута немає», який дають уже збережені блоки.
4. **`translate.json`** має запис на **кожен** атрибут із `block.json`,
   включно з `ignore`.
5. **Канва редактора** відкривається без «This block has encountered an error»,
   картки стоять сіткою, appender доступний.

   > **Цей критерій поза чергою.** `wp-admin` вимагає логіну, якого в агента
   > немає, тож перевірку в редакторі робить людина вручну й окремо. Блок
   > отримує `✅` за рештою пʼяти критеріїв; чеклисти для ручного проходу —
   > у кінці файлу, § *Ручна перевірка в редакторі*.

6. **Документація** оновлена: рядок у таблиці блоків `PLUGIN.md`; нові патерни —
   у `BLOCKS.md`.

---

## Наскрізні правила

Стосуються кожного блока, не повторюються в пунктах нижче.

**Реєстрація.** Новий блок — у масив `$order` у
[`overchain-blocks.php`](overchain-blocks.php). Це авторитетний шлях реєстрації.

**Оболонка секції** — три рівні, однакові в Blade і в `edit.js`:
`section` → `__container` → `__wrap.section-wrap` → `__body.section-body`.
`section-wrap` несе `position: relative`, до якого прив'язаний увесь абсолютний
декор. Дочірні блоки оболонки не мають.

**Модифікатори геометрії.** `img1`/`img2` завжди разом із базовим класом: база дає
лише `position: absolute`, координати живуть на модифікаторі.

**Дефолти.** Текстові атрибути — `""`, підказка через `placeholder` у RichText.
Приклад для інсертора — в `example.attributes`; для InnerBlocks-батька обов'язковий
ще й `example.innerBlocks`, інакше прев'ю порожнє.

> **Дефолт, рівний значенню, ніколи не потрапляє в коментар блоку.**
> Серіалізатор ядра (`getCommentAttributes` у `wp-includes/js/dist/blocks.js`)
> пропускає атрибут, чиє значення дорівнює дефолту з `block.json`, а PHP домішує
> дефолти назад перед рендером. Наслідки, про які треба пам'ятати завжди:
> — зміна непорожнього дефолту **стирає текст** на всіх блоках, де його не редагували;
> — атрибут, що має підхоплювати старе значення, мусить мати дефолт `""`, інакше
>   фолбек ніколи не спрацює (див. `topSpacing` у Features).

**`enable*` тумблери.** Правило не «дефолт `true`», а «збережений блок має
рендеритися так само, як досі». Перевір, чи є шар у тих секціях верстки, з яких
блок збирали: якщо є — `true`, якщо шар новий — `false` (як `enableBlur` у Split).

**Кеш Blade.** Після правки `.blade.php` — увімкнути `WP_DEBUG` або очистити
`cache/views/`. Ці файли під git, тож у diff буде шум.

---

# Етап 1 — доопрацювання ✅

Виконано. Записано для історії; деталі — у `BLOCKS.md`.

### ✅ 1.1 Accordion → `wide-tabs`

- [x] `tabsLayout` (`default` | `wide`) у [`blocks/accordion/block.json`](blocks/accordion/block.json)
- [x] запис у [`blocks/accordion/translate.json`](blocks/accordion/translate.json)
- [x] панель **Layout → Tabs width** у [`blocks/accordion/edit.js`](blocks/accordion/edit.js)
- [x] `paid__layout wide-tabs` у [`resources/views/blocks/accordion.blade.php`](resources/views/blocks/accordion.blade.php)

Селектор у CSS — `.paid__layout.wide-tabs`, перевірено.

**Свідомо не зроблено:** перенесення непорожніх дефолтів `title`/`subtitle`
(«Get Paid in Crypto») у `example.attributes`. Це був би регрес контенту — див.
врізку про серіалізатор вище.

### ✅ 1.2 Features → три стани відступу

- [x] `showTopSpacing` у [`components/SectionSettingsControls.js`](components/SectionSettingsControls.js)
- [x] `topSpacing` з дефолтом `""` у [`blocks/features/block.json`](blocks/features/block.json)
- [x] запис у [`blocks/features/translate.json`](blocks/features/translate.json)
- [x] [`blocks/features/edit.js`](blocks/features/edit.js)
- [x] [`resources/views/blocks/features.blade.php`](resources/views/blocks/features.blade.php)

`none` — третій стан, якого не було: секція без жодного `pbs`. Трапляється на
чотирьох сторінках дропу.

### ✅ 1.3 Split → світіння, стиль підзаголовка, кроки

- [x] `enableBlur` (дефолт `false`), `subtitleStyle`, `steps` у [`blocks/split/block.json`](blocks/split/block.json)
- [x] записи у [`blocks/split/translate.json`](blocks/split/translate.json), `steps` як `repeater`
- [x] контроли + список кроків у канві, [`blocks/split/edit.js`](blocks/split/edit.js)
- [x] [`resources/views/blocks/split.blade.php`](resources/views/blocks/split.blade.php)
- [x] шар `actually__blur` **не** рендериться в канві (прецедент Locations)

### ✅ 1.4 Duo → макет із логотипами

> ⚠️ **Перенесено.** Стан `platforms` більше не живе в Duo — він став окремим
> блоком `overchain/logo-grid` (завдання 21.2 у [FIX-QUEUE.md](FIX-QUEUE.md)).
> Збережений контент конвертовано, атрибути `layout` і `platforms` з Duo прибрані.
> Пункти нижче лишені як історія етапу.

- [x] ~~`layout` (`cards` | `platforms`) + `platforms` у `blocks/duo/block.json`~~
- [x] ~~записи у `blocks/duo/translate.json`~~
- [x] ~~`ImageListControls` + гілка канви у `blocks/duo/edit.js`~~
- [x] фільтр порожніх рядків — тепер у [`resources/views/blocks/logo-grid.blade.php`](resources/views/blocks/logo-grid.blade.php)

---

# Етап 2 — спільна база

Порядок обов'язковий: 2.1 потрібен для 2.3 і 3.4.

### ✅ 2.1 Партіал стрілок слайдера

Жоден блок наразі не емітить `.arrows` — наявні слайдери обходяться самим
`.drag-arrow`. Секціям `.accept` і `.testimonials` потрібні справжні prev/next,
тож розмітка виноситься в партіал одразу, а не дублюється у двох Blade.

Розмітка: `.arrows > .arrows__body > button.arrows__prev` / `button.arrows__next`,
у кожної кнопки вкладений `<span>` і `aria-label`.

- [x] `resources/views/partials/splide-arrows.blade.php`
- [x] підписи через `pll__()` з фолбеком на `__()`
- [x] рядки зареєстровані в `../../themes/overchain/inc/integrations/polylang-strings.php`
- [x] запис у `PLUGIN.md` § Partials

**Джерело розмітки:** `OverchainMain2.0/dist/move-money.html:647` (у `.accept`),
`platform-overview.html:1422` (у `.testimonials`) — розмітка ідентична, що й
робить партіал виправданим.

---

### ✅ 2.2 Intro — `overchain/intro`

Секція `.intro`. Другий тип героя сторінки поряд із наявним Lead: власний клас
секції, фон **поза** контейнером, дві кнопки.

**Сторінки:** platform-overview, move-money, control-treasury, aviation, igaming
— п'ять із дропу.

**Атрибути**

- [x] `layout` — `default` | `content-center` (`sec-content-center`) | `with-img` (`sec-with-img`)
- [x] `coverBackground` — bool, додає `ibg` до `intro__bg`
- [x] `backgroundId` / `backgroundUrl`
- [x] `title` — RichText `h1.tl1`
- [x] `text` — RichText `.txt1`
- [x] `imageId` / `imageUrl` — `intro__img img1`, лише для `with-img`
- [x] `button*` — стандартний набір → `partials.btn-icon`
- [x] `secondary*` — другий набір → `partials.btn-def`, `style = 'stl-trn-clw'`

`coverBackground` окремий від `layout` навмисно: move-money має `intro__bg ibg`,
platform-overview — просто `intro__bg`, хоча layout у них різний.

**Файли**

- [x] `blocks/intro/block.json`
- [x] `blocks/intro/index.js`
- [x] `blocks/intro/edit.js`
- [x] `blocks/intro/render.php`
- [x] `blocks/intro/translate.json`
- [x] `resources/views/blocks/intro.blade.php`
- [x] правило в [`resources/scss/editor.scss`](resources/scss/editor.scss) (якщо знадобиться)
- [x] `'intro'` у `$order`, одразу після `'lead'`

**Джерела верстки**

| Варіант | Файл |
|---|---|
| `default` | `OverchainMain2.0/dist/platform-overview.html:392` |
| `content-center` | `OverchainMain2.0/dist/move-money.html:392`, `control-treasury.html:392` |
| `with-img` | `OverchainMain2.0/dist/aviation.html:392` |

**Пастки**

- **Дві кнопки — нове для проєкту.** Набір `secondary*` узгоджено й задокументовано
  в `PLUGIN.md` § *A second button on one block*. `ButtonControls` **не**
  параметризували префіксом — його використовує дюжина блоків; другу панель
  зібрано з `LinkFields` із ремапом ключів.
- `.intro{overflow:hidden}` — перевірено: ні фон, ні `intro__img` (106rem із
  від'ємними зсувами) не вилітають за секцію, тож обхідних рішень для канви
  не знадобилось.
- `intro__bg` лежить **поза** `intro__container`, на відміну від `lead__bg`.
  Перевір у канві, чи не перекриває він appender; якщо так — прецеденти в
  `BLOCKS.md` § *Absolutely positioned decor in the canvas*.
- Секція ніколи не має класу `pbs` — `noPaddingTop` не додавати, як у Lead.

---

### ✅ 2.3 Testimonials — `overchain/testimonials` + `overchain/testimonial-card`

Секція `.testimonials`. Слайдер відгуків із бічним фото.

**Сторінки:** platform-overview, move-money, control-treasury.

**Атрибути батька**

- [x] `noPaddingTop`
- [x] `title` — RichText `h2.tl2` у `.heading`
- [x] `imageId` / `imageUrl` — бічне фото `.testimonials__img.ibg`

**Атрибути `testimonial-card`**

- [x] `quote` — RichText `h3.tl4`
- [x] `avatarId` / `avatarUrl` — `.ava.ibg`
- [x] `name` — `.person > p`
- [x] `role` — `.person > span`

**Фіксовані ассети** (не поля завантаження)

- [x] `assets/img/decor/testimonials_bg_1.jpg` — фон кожної картки
- [x] `assets/img/decor/testimonials_decor_1.png` — декор картки

**Файли**

- [x] `blocks/testimonials/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `blocks/testimonials/testimonial-card/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/testimonials.blade.php`
- [x] `resources/views/blocks/testimonial-card.blade.php`
- [x] правило в `resources/scss/editor.scss`
- [x] `'testimonials'` у `$order`
- [x] партіал 2.1 підключено

**Джерело верстки:** `OverchainMain2.0/dist/platform-overview.html:1320`

**Канва — реалізовано інакше, ніж планувалось.** План передбачав «один слайд +
фейкові крапки» (як Promo Slider). Це **неможливо** для InnerBlocks-батька:
крапки вимагають, щоб `edit.js` сам рендерив кожен `<li>` і вішав на активний
`.is-editor-active`, а батько не має хука в те, як InnerBlocks рендерить дочірній
блок. Усі блоки з крапками керують слайдами через репітер-атрибут, не через
InnerBlocks.

Реалізовано «всі слайди одразу», як у Team і Related Posts: `.splide__list`
розкривається, а `.block-editor-block-list__layout` стає колонкою з `gap`.
Splide-стилів у канві немає взагалі (`vendor.css` більше не editor-style), тому
правило дає **повний layout**, не лише `visibility`. Обидва абсолютні шари картки
повернуто через `position: absolute !important` зі скоупом на секцію.

Правило записано в `BLOCKS.md` § *Splide previews*: вибір стратегії прев'ю
випливає з вибору «репітер чи InnerBlocks», а не навпаки.

**Дві правки після ревʼю канви.**

1. **Бічне фото більше не тягнеться по висоті в канві.** `.testimonials__main` —
   флекс-рядок, тож `.testimonials__img` розтягувалося до висоти найвищого сусіда.
   На фронті це один слайд, у канві — стопка всіх, тому з ростом кількості відгуків
   плашка ставала нескінченною. У `editor.scss` додано
   `.testimonials__main { align-items: flex-start }`; далі її тримає власний
   `min-height: 17.25rem` із `blocks.css` — рівно та висота, що й на фронті.
2. **Аватар без фото більше не редакторська заглушка.** Було
   `placeholders/image.png` на 30% прозорості, видиме лише в адмінці — на фронті
   картка з іменем стояла поруч із порожнім місцем. Тепер фолбек на
   `assets/img/icons/ava_def_1.svg` **і в канві, і на фронті**.

   Спершу переюзав наявний `ava_def_1.svg` від Team Card, але у ревʼю це виглядало
   неякісно, і причина структурна: у Team аватар інсетиться з CSS
   (`.card-understand__ava.empty img{width:3.5rem}` усередині кола 8rem), а тут
   `.ava` — це `ibg`, тобто `object-fit: cover` рівно по розміру кола, без жодного
   власного відступу. Додати відступ у `blocks.css` не можна — він генерується з
   дизайн-дропу.

   Тому намальовано **`assets/img/icons/ava_def_2.svg`**: запас закладено всередину
   артворку (фігура займає ~50% viewBox проти ~80% у `ava_def_1`), силует із
   вираженою шиєю та похилими плечима замість широкого купола. Колір і 32%
   прозорості ті самі, тож обидва читаються як одна мова. Team Card не чіпав.

   Наслідок для розмітки: `.ava` тепер завжди має картинку, тому рядок автора
   гейтиться на «чи є автор» (`avatarUrl` **у збережених атрибутах**, `name` або
   `role`), а не на наявність картинки. Порожня картка лишається порожньою.

---

# Етап 3 — блоки під сторінки

Порядок — за спорідненістю й обсягом.

**Порядок переглянуто перед стартом етапу.** Moves Mosaic був 3.3, став 3.7.
Everything, Manage і Connect — це тричі одна й та сама перебудова `flex-wrap` на
грід у вкладеному `.block-editor-block-list__layout` плюс скидання власного
`max-width` картки; зробивши їх поспіль, у Moves лишається дописати тільки явну
розстановку варіантів. Решта порядку — від найпростішого — без змін.

### ✅ 3.1 Tag List — `overchain/tag-list`

Секція `.modern`. Найпростіший блок у черзі: без дочірніх блоків, без слайдера,
без декору. `.modern__list` — звичайний flex-wrap, правил для канви не треба.

- [x] `noPaddingTop`
- [x] `title` — RichText `h2.tl2` у `.heading.aic`
- [x] `text` — RichText `.txt2`
- [x] `tags` — репітер `[{ label }]` через готовий
      [`components/TagListControls.js`](components/TagListControls.js) → `li.modern__tag`
- [x] `blocks/tag-list/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/tag-list.blade.php`
- [x] `'tag-list'` у `$order` (після `'badges'` — теж репітер-список)
- [x] рядок у таблиці блоків `PLUGIN.md`

**Джерело верстки:** `OverchainMain2.0/dist/move-money.html:944`
(`control-treasury.html:930` — байт у байт та сама секція).

**Слаг змінено з `overchain/modern` на `overchain/tag-list`.** У репозиторії
слаг називає функцію блока, а не клас секції: `locations` → `.operations`,
`team` → `.understand`, `accordion` → `.paid`, `showcase` → `.powerful`,
`statement` → `.exists`. «Modern» в інсерторі не означає нічого. Клас секції
лишається `.modern` — це верстка, її не чіпаємо.

**Пастка.** Теги зберігаються як **об'єкти** `{ label }`, не як плаский масив
рядків: хінт `repeater` у DeepL Translator обходить лише масиви об'єктів і мовчки
пропускає рядки. `TagListControls` уже робить правильно — не «спрощуй».

**Перевірено:** `npm run build` чистий, `build/tag-list/index.asset.php` містить
`wp-i18n`; diff класів проти `move-money.html:944` — 0 missing / 0 extra і для
Blade, і для `edit.js`; smoke-рендер 9 гілок (повна, `pbs4`, лише заголовок, лише
текст, лише теги, порожні рядки репітера, **блок без жодного атрибута**, `tags` не
масив, екранування розмітки в лейблі); `translate.json` — 4 записи на 4 атрибути.
Додатково прогнано `do_blocks()` на живому WP: блок зареєстрований, рендер-чейн
працює.

**Канву не перевірено** — див. врізку в [Критеріях готовності](#критерії-готовності-блоку).
Ризик тут найнижчий у черзі: ні InnerBlocks з appender'ом, ні абсолютного декору,
ні слайдера.

---

### ✅ 3.2 Everything Grid — `overchain/everything` + `overchain/everything-card`

Секція `.everything`. 8 пунктів у верстці. Форма картки один-в-один як у
`feature-card` / `card`, тому InnerBlocks, а не репітер.

**Батько**

- [x] `noPaddingTop`
- [x] `title` — RichText `h2.tl2` у `.heading.aic`
- [x] `text` — RichText `.txt2`

**`everything-card`**

- [x] `iconId` / `iconUrl` — `ImageControls type="icon"`
- [x] `title` — RichText `h3.tl5`
- [x] `text` — RichText `.item-everything__desc.txt4.light.col-alt1`

**Файли**

- [x] `blocks/everything/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `blocks/everything/everything-card/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/everything.blade.php`
- [x] `resources/views/blocks/everything-card.blade.php`
- [x] правило в `resources/scss/editor.scss`
- [x] `'everything'` у `$order` (після `'showcase'`)
- [x] рядки в обох таблицях `PLUGIN.md`, патерн у `BLOCKS.md`

**Джерело верстки:** `OverchainMain2.0/dist/move-money.html:671–814`
(`control-treasury.html` — байт у байт та сама секція, звірено `diff`).

**Картка називається `.item-everything`, не `.card-everything`.** Слаг блока —
`everything-card`, як у решті дочірніх блоків; клас лишається з верстки.

**Канва.** `.everything__list` уже `display: grid` (4 → 3 → 2 колонки), але
Gutenberg вставляє `.block-editor-block-list__layout` між списком і картками, тож
грід дістається обгортці. Стандартне переписування: `display: block !important` на
списку, грід — на вкладеному layout як **нащадку**, не прямому дочірньому.

**Дві правки проти плану — обидві через `nth-child`.** Розділювачі комірок у
`blocks.css` малюються через `.item-everything:nth-child(4n+1)` і `4n+4`; гепа
немає, бордери **і є** сіткою. Наслідки:

1. Колонок рівно **4, без брейкпоінтів**. Не лише через пастку ширини канви — при
   будь-якій іншій кількості `4n` перестає збігатися з тим, що бачить око, і
   бордери опиняються посеред ряду.
2. Appender винесено в `grid-column: 1 / -1` (як у `.layer__cards`). Інакше він
   займає комірку й зсуває `nth-child` кожної картки на одиницю.

Записано в `BLOCKS.md` § *Rebuilding a layout for the editor canvas* як загальне
правило: перед вибором кількості колонок для канви грепни `nth-child` у CSS секції.

**Перевірено:** `npm run build` чистий, `wp-i18n` в `index.asset.php` батька й
картки; diff класів проти верстки — 0 missing / 0 extra для Blade і для `edit.js`;
smoke-рендер 6 гілок батька і 6 гілок картки, включно з «атрибутів немає» і
«батько без дочірніх блоків»; `translate.json` — 3 і 4 записи на 3 і 4 атрибути.
`do_blocks()` на живому WP: обидва блоки зареєстровані, вкладений рендер працює,
інлайновий `<span style="color:…">` у заголовку переживає `wp_kses_post()`.

---

### ✅ 3.3 Process Slider — `overchain/process-slider` + `overchain/process-card`

Секція `.accept`. Слайдер із 7 слайдів. Заголовка секції в дизайні **немає** — не
додавати.

**Батько**

- [x] `noPaddingTop`

**`process-card`**

- [x] `iconId` / `iconUrl` — `.card-accept__icon`
- [x] `title` — RichText `h2.tl5` (саме `h2`, не `h3`)
- [x] `text` — RichText `.card-accept__desc.txt3.light`

**Фіксований ассет**

- [x] `assets/img/decor/accept_bg_1.jpg` — фон, однаковий на всіх слайдах

**Файли**

- [x] `blocks/process-slider/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `blocks/process-slider/process-card/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/process-slider.blade.php`
- [x] `resources/views/blocks/process-card.blade.php`
- [x] правило в `resources/scss/editor.scss`
- [x] `'process-slider'` у `$order` (після `'promo-slider'`)
- [x] партіал 2.1 підключено
- [x] рядки в обох таблицях `PLUGIN.md`, патерн у `BLOCKS.md`

**Джерело верстки:** `OverchainMain2.0/dist/move-money.html:466–669`
(`control-treasury.html` — байт у байт та сама секція, звірено `diff`).

Розмітка слайдера: `<div class="splide" data-lock>` — `data-lock` уже обробляється
в `js/main.js` теми (блокує драг, коли всі слайди влазять).

**Слайдів сім, не шість** — план помилявся. Це не косметика: `data-lock` ховає
стрілки й вимикає драг, коли слайдів **не більше** за `perPage`. При `perPage: 4`
і семи слайдах слайдер живий, тож партіал стрілок із 2.1 тут справді потрібен.
Заголовки: Accept, Route, Convert, Comply, Settle, Notify, Reconcile.

**Порядок усередині картки — `__bg` → `__content` → `__icon`.** Іконка **остання**
в DOM: `.card-accept__icon` має `margin-block-start: auto` у флекс-колонці картки,
тобто саме порядок притискає її до низу. У плані іконка стояла першою в переліку.

**`h2.tl5` лишено свідомо.** Секція не має власного заголовка, тож кожен крок —
елемент верхнього рівня, і `h2` тут семантично коректний, а не данина верстці.
Візуал дає `.card-accept__content .tl5`, не тег.

**Канва.** Фронт — `perPage 4 → 2 (≤992) → 1 (≤768)`. **Ширина iframe канви ≠
ширина пристрою**: медіазапит спрацює вже від відкритого сайдбара, і десктопний
користувач отримає мобільне правило. Тому грід **без брейкпоінтів**, як Showcase.

Колонок **4** — як десктопний `perPage` на фронті. Спершу було 3 (компроміс під
вужчу канву), але за ревʼю змінено на 4: збіг із фронтом важливіший, ніж запас
ширини на картку.

Ще два пункти, яких не було в плані:
`max-width: none` на `.card-accept` (нижче 992px верстка дає їй `calc(50% - 3rem)`,
і в комірці гріда картка стала б удвічі вужчою за комірку) і
`position: absolute !important` на `.card-accept__bg` (редактор скидає `position`
на обгортці блоку — та сама пастка, що в Locations і Testimonials).

**`.arrows` у канві не рендериться** — прецедент Testimonials: без змонтованого
Splide кнопки мертві. Наслідок для критерію 2: Blade дає 0/0, а `edit.js` показує
`arrows`, `arrows__body`, `arrows__prev`, `arrows__next` як missing. Це очікувана
редакторська дельта, а не загублені класи; записано в `BLOCKS.md` § *Splide previews*.

**Перевірено:** `npm run build` чистий, `wp-i18n` в обох `index.asset.php`;
diff класів — Blade 0/0, `edit.js` 0/0 з урахуванням чотирьох frontend-only класів
вище; smoke-рендер 3 гілок батька (+ порожній батько) і 7 гілок картки, включно з
«атрибутів немає» та «іконка без контенту»; `translate.json` — 1 і 4 записи.
`do_blocks()` на живому WP: обидва блоки зареєстровані, партіал стрілок рендериться
з фолбеком `__()` замість `pll__()`.

---

### ✅ 3.4 FAQ — `overchain/faq`

Секція `.faq`. Репітер, а не InnerBlocks: два текстові поля — та сама форма, що в
`accordion`.

- [x] `noPaddingTop`
- [x] `enableDecor` — bool, дефолт `true`, фіксований `assets/img/decor/faq_decor_1.png`
- [x] `title` — RichText `h2.tl2` у `.heading.aic`
- [x] `items` — репітер `[{ question, answer }]` → `li.ac > .ac-trigger > .ac-head` / `.ac-panel`
- [x] `blocks/faq/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/faq.blade.php`
- [x] правило для канви — у темі, `css/editor.css` § Accordion (.ac)
- [x] `'faq'` у `$order` (після `'accordion'`)
- [x] рядок у таблиці блоків `PLUGIN.md`, три записи в `BLOCKS.md`

**Джерело верстки:** `OverchainMain2.0/dist/integrations.html:687–874` (6 питань).

Список несе `faq__list base-accord accord` — поведінка вже є в `js/main.js` теми,
власного JS не треба.

**Назва.** Блок називається саме **FAQ** — у нього конкретна функція. Не «Accordion»:
наявний `overchain/accordion` — це слайдер `.paid`, і два блоки з такою назвою в
інсерторі неможливо розрізнити.

**`.ac-panel` лежить усередині `.ac-trigger`, а не поруч.** Виглядає як помилка
верстки, але це навмисно: `js/main.js` вішає на `.ac-panel` обробник, що глушить
спливання кліку, інакше виділення тексту відповіді згортало б пункт. Плюс у плані
не було ще трьох класів: `h3.tl5.regular`, `button.ac-toggle > span`,
`.faq__content.txt2.light`.

**Нумерація `01`/`02` — CSS-лічильник** на `.faq__list .ac`, ніде не зберігається.
Контент-менеджер може переставляти питання без перенумерації.

**`aria-label`.** У верстці `"Toggle accordion"`. Замінено на `"Toggle answer"` і
зареєстровано в `polylang-strings.php` — прецедент 2.1: скрінрідер озвучує лейбл,
а не клас.

**Канва — план мав рацію наполовину.** Правило для `.ac-panel` **не потрібне**:
згортання дає `.ac.js-enabled .ac-panel{visibility:hidden}` з `vendor.css` (не
editor-style) плюс інлайновий `height` від accordion-js (у канві JS немає). Тобто
панель і так відкрита. Порівняння з `.tab-paid__dropdown` було хибним: його
`max-height: 0` живе у **власному** `blocks.css` плагіна і тому в канву потрапляє.

Але потрібне інше, чого в плані не було взагалі: **усі `.ac`-правила в `main.css`
заскоуплені `.wrapper .ac …`**, а `.wrapper` — це обгортка з `header.php`, якої в
канві немає. Без них питання й тумблер стають у стовпчик, а гліф тумблера не
малюється. CSS-змінні лежать на `:root`, тому вони переносяться, а правила — ні.

**Правила скопійовано в тему, у `css/editor.css` § Accordion (.ac)** — увесь блок
`.wrapper .ac …` дослівно, зі знятим префіксом, плюс коротке відхилення, що
форсує розгорнутий стан (у канві ніщо не може додати `.is-active`). Саме в тему,
бо `.ac` — узагальнена тематична розмітка: правила отримає будь-який блок, що її
емітить, не лише FAQ. `css/editor.css` іде **тільки** в `add_editor_style()`, на
фронт не потрапляє, тож копія не може там спливти. Правило в `editor.scss` плагіна
залишено як коментар-покажчик.

Наслідок: `edit.js` більше не ставить `.is-active`, і редакторська розмітка
збігається з тим, що емітить Blade, — на один класовий дельта менше.

Це не локальна дрібниця — у `main.css` **65** таких `.wrapper`-правил (Splide,
Tom Select, AddToAny, FacetWP). Записано окремим розділом у `BLOCKS.md`.

**`.faq__decor` у канві не рендериться** — 86.5 rem завширшки, звисає на 41.6 rem
нижче і на 61.4 rem лівіше власного `section-wrap`, тобто замальовує наступний блок.
Прецедент Locations; тумблер далі керує фронтом. У плані цього пункту не було.

**Перевірено:** `npm run build` чистий, `wp-i18n` в `index.asset.php`; diff класів —
Blade 0/0, `edit.js` 0/0 з урахуванням `faq__decor`/`no-select` (frontend-only); smoke-рендер 11 гілок, включно з «питання без відповіді»,
«відповідь без питання», порожніми рядками, «атрибутів немає» і `items` не масивом;
`translate.json` — 4 записи, `items` як `repeater`. `do_blocks()` на живому WP:
блок зареєстрований, `wp_kses_post()` вирізає `<script>` із відповіді.

---

### ✅ 3.5 Manage Cards — `overchain/manage` + `overchain/manage-card`

Секція `.manage`. Дві картки з кнопками.

**Батько**

- [x] `noPaddingTop`
- [x] `enableBackground` — bool, дефолт `true`, фіксований `assets/img/decor/introflow_bg_1.jpg`
- [x] `title` — RichText `h2.tl2` у `.heading.aic.mbe2`

**`manage-card`**

- [x] `iconId` / `iconUrl` — `.card-manage__icon`
- [x] `title` — RichText `h3.tl5`
- [x] `text` — RichText `.card-manage__desc.txt3.light`
- [x] `button*` — повний стандартний набір

**Файли**

- [x] `blocks/manage/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `blocks/manage/manage-card/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/manage.blade.php`
- [x] `resources/views/blocks/manage-card.blade.php`
- [x] правило в `resources/scss/editor.scss`
- [x] `'manage'` у `$order` (після `'cards'`)
- [x] рядки в обох таблицях `PLUGIN.md`, чотири записи в `BLOCKS.md`

**Джерело верстки:** `OverchainMain2.0/dist/platform-overview.html:728–802`

Кнопка картки в дизайні має іконку `btn_2.svg` — це значення
`buttonIcon = 'arrow'` у наявному `partials/btn-icon`, окремої логіки не треба.
Партіал уже приймає `$class`, тож `card-manage__btn` передається туди, без окремої
розмітки. (У верстці порядок класів `card-manage__btn btn-icon`, партіал дає
`btn-icon card-manage__btn` — на CSS не впливає.)

**У плані бракувало `.card-manage__head`** — обгортки навколо іконки та `h3`. Без
неї diff класів не зійшовся б, та й `.card-manage__head` несе власний флекс-рядок
(на ≤992 перемикається в колонку).

**Канва — план пропонував `grid-settings grid-2`, і це хибно.** Дві причини:

1. `.grid-settings` має `grid-template-columns: 1fr !important` під 768px, а iframe
   канви падає нижче 768 щойно відкривається сайдбар — картки б стали в стовпчик.
   Це та сама причина, через яку Showcase свідомо не бере цей хелпер; `&.grid-2`
   без `!important` той рядок не переб'є.
2. Хелпер не чіпає власний `max-width: calc((100% - 1rem)/2)` у `.card-manage`,
   тож кожна картка сиділа б у половині своєї ж комірки гріда.

Замість нього — форма `.powerful__cards`: `display:block !important` на `<ul>`,
безбрейкпоінтний 2-колонковий грід на вкладеному layout, `max-width:none` на картці,
appender у `grid-column: 1 / -1`. Коли `grid-settings` доречний, а коли ні —
записано в `BLOCKS.md`.

**`.manage__bg` у канві не рендериться** — 1202×674, прив'язаний на 3 rem **вище**
власного `section-wrap`, тобто більша частина вивалюється за низ секції й замальовує
наступний блок. Прецедент Locations/FAQ; тумблер далі керує фронтом. У плані цього
пункту не було.

**Перевірено:** `npm run build` чистий, `wp-i18n` в обох `index.asset.php`;
diff класів — Blade 0/0, `edit.js` 0/0 з урахуванням `manage__bg`/`no-select`
(frontend-only) і класів, які будує спільний `ButtonPreview`; smoke-рендер 5 гілок
батька і 8 гілок картки, включно з трьома варіантами іконки кнопки
(`arrow` / `calendar` / `transparent`), «без кнопки» і «атрибутів немає»;
`translate.json` — 3 і 13 записів. `do_blocks()` на живому WP: обидва блоки
зареєстровані, кнопка резолвиться через `overchain_resolve_button_data()`.

---

### ✅ 3.6 Connect — `overchain/connect` + `overchain/connect-card`

Секція `.connect`. Шість карток.

**Батько**

- [x] `noPaddingTop`
- [x] `title` — RichText `h2.tl2` у `.heading`
- [x] `text` — RichText `.txt2`

**`connect-card`**

- [x] `iconId` / `iconUrl` — `.card-connect__icon`
- [x] `title` — RichText `h3.tl5`
- [x] `text` — RichText `.card-connect__desc.txt3.light.col-alt1`
- [x] `decor` — select `none` (дефолт) | `img1` | `img2`

**Фіксовані ассети**

- [x] `assets/img/decor/connect_bg_1.png` — фон, однаковий на всіх шести картках
- [x] `assets/img/content/connect_img_1.png` (`img1`), `connect_img_2.png` (`img2`)

**Файли**

- [x] `blocks/connect/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `blocks/connect/connect-card/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/connect.blade.php`
- [x] `resources/views/blocks/connect-card.blade.php`
- [x] правило в `resources/scss/editor.scss`
- [x] `'connect'` у `$order` (після `'spotlight'`)
- [x] рядки в обох таблицях `PLUGIN.md`, три записи в `BLOCKS.md`

**Джерело верстки:** `OverchainMain2.0/dist/platform-overview.html:812–992`

**`.heading` тут без `aic`** — секція вирівняна ліворуч, на відміну від Everything
і Tag List. У плані було правильно, фіксую, бо легко скопіювати не той варіант.

**У плані бракувало `.card-connect__content`** — обгортки навколо `h3` і `.desc`.

**Пастка — декор це поле, а не позиція.** У дизайні `connect_img_1.png` стоїть на
3-й картці, `connect_img_2.png` — на 5-й. Спокуса вивести це з індексу, як
`paid_bg_*` в Accordion, але тут це **не цикл**: контент-менеджер переставить
картки — і декор поїде. Явний select на картці надійніший; дефолтну розстановку
задай через `example.innerBlocks`.

**Канва.** `.connect__cards` — `flex-wrap`, переписано на вкладений
`.block-editor-block-list__layout`: 3 колонки без брейкпоінтів, `max-width: none`
на `.card-connect` (інакше її власний `calc((100% - 3rem)/3)` лишив би картку в
третині своєї ж комірки), appender у `grid-column: 1 / -1`.

Плюс те, чого в плані не було: `.card-connect__bg` має `z-index:-2`,
`.card-connect__img` — `-1`, а сама картка `position:relative; z-index:5;
overflow:hidden`. Редактор і сплощує стекінг-контекст, і скидає `position` на
обгортці блоку, тож обидва шари або зникають за фоном картки, або падають у потік.
Перевикладено явно, у порядку фарбування фронту: `isolation: isolate` на картці,
`position:absolute; z-index:0/1` на шарах, `z-index:2` на іконці й контенті.
Прецедент `.card-layer` з Mosaic; узагальнено в `BLOCKS.md`.

**Перевірено:** `npm run build` чистий, `wp-i18n` в обох `index.asset.php`;
diff класів — Blade 0/0, `edit.js` 0/0 (`img1`/`img2` будуються в рантаймі зі
значення атрибута); smoke-рендер 5 гілок батька і 8 картки, включно з невідомим
значенням `decor` (декор не рендериться, зайвого класу немає) і «атрибутів немає»;
`translate.json` — 3 і 5 записів. `do_blocks()` на живому WP: обидва зареєстровані.

---

### ✅ 3.7 Moves Mosaic — `overchain/moves` + `overchain/moves-card`

Секція `.moves`. Найскладніша канва в черзі.

**Батько**

- [x] `noPaddingTop`
- [x] `title` — RichText `h2.tl2` у `.moves__heading`
- [x] `text` — RichText `.txt2`

**`moves-card`**

- [x] `variant` — `default` | `wide` | `tall-first` | `tall-last`
- [x] `iconId` / `iconUrl` — опційна
- [x] `imageId` / `imageUrl` — `.card-moves__img`, для `tall-*`
- [x] `title` — RichText `h3.tl5`
- [x] `text` — RichText `.card-moves__desc.txt3.light`

`wide` додає фіксований фон `assets/img/decor/moves_bg_1.jpg`
(`.card-moves__bg.ibg`) і **може** мати іконку: на move-money її немає, на
control-treasury є. Тому іконка — незалежне поле, а не наслідок варіанта.
Зображення для `tall-*` різняться між сторінками (`moves_img_1.png`,
`moves_img_2.png`), тож це атрибут, а не фіксований ассет.

**Файли**

- [x] `blocks/moves/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `blocks/moves/moves-card/{block.json, index.js, edit.js, render.php, translate.json}`
- [x] `resources/views/blocks/moves.blade.php`
- [x] `resources/views/blocks/moves-card.blade.php`
- [x] правило в `resources/scss/editor.scss`
- [x] `'moves'` у `$order` (після `'mosaic'`)
- [x] рядки в обох таблицях `PLUGIN.md`, три записи в `BLOCKS.md`

**Джерела верстки:** `OverchainMain2.0/dist/move-money.html:820` (6 карток),
`control-treasury.html:820` (5 карток, є `tall-first`)

**Канва.** Фронтовий грід — `1fr 1fr 1fr 20rem`, а варіанти розставлені явно:

```css
.card-moves.wide       { grid-column: span 2 }
.card-moves.tall-first { grid-column: 1; grid-row: 1 / span 2 }
.card-moves.tall-last  { grid-column: 4; grid-row: 1 / span 2 }
```

Розстановка варіантів **уже доходить** у канву — вона в нашому ж `blocks.css`.
Бракує тільки шаблону колонок, без якого вона нічого не означає: його перевикладено
дослівно, `1fr 1fr 1fr 20rem`. Цей грід, на відміну від решти в `editor.scss`, не
можна переколонкувати під ширину канви — `tall-last` жорстко тримається колонки 4.
Appender — `grid-column: 1 / -1`, як у `.layer__cards`; тут це не косметика, бо
інакше він займе комірку, у яку явно поставлений варіант.

**Ще дві речі поза планом.**

1. `.card-moves__content` — обгортка навколо `h3` і `.desc`, у переліку атрибутів
   її не було.
2. Ті самі від'ємні z-index, що в Connect: `__bg` = `-2`, `__img` = `-1`, картка
   `position:relative; z-index:5; overflow:hidden`. `isolation: isolate` + явні
   невід'ємні значення + `position: absolute` назад.

**`variant` заведено в whitelist** — у Blade і в `edit.js`. Значення потрапляє
просто в `className`, тож без білого списку відредагований руками коментар блоку
клав би в атрибут класу довільний рядок. Перевірено: невідомий варіант дає чистий
`card-moves`.

**Перевірено:** `npm run build` чистий, `wp-i18n` в обох `index.asset.php`;
diff класів проти **обох** сторінок разом (move-money + control-treasury) —
Blade 0/0, `edit.js` 0/0; smoke-рендер 5 гілок батька і 10 картки, включно з
«wide без іконки» (move-money) і «wide з іконкою» (control-treasury), «tall без
зображення», «зображення задане, але варіант default — не рендериться», невідомим
варіантом і «атрибутів немає»; `translate.json` — 3 і 7 записів. `do_blocks()` на
живому WP: обидва зареєстровані, `wide` і `tall-last` рендеряться правильно.

---

# Етапи 4–7 — сторінки `aviation` та `igaming`

Порт двох сторінок дизайн-дропу: `aviation.html`, `igaming.html`. Розбито на
чотири етапи за типом роботи: доопрацювання наявних блоків (4), нові блоки
плагіна (5), тематичний блок із запитом до CPT (6), прохід канви й документація
(7). Порядок усередині кожного етапу — від найдешевшого до найризикованішого,
щоб кожен наступний пункт спирався на патерн, відпрацьований у попередньому.

**Дизайн-синк не потрібен** — перевірено перед стартом:

- `resources/scss/styles.scss` і скомпільований `build/blocks.css` уже містять
  правила всіх нових секцій: `way__`, `item-way`, `never__`, `introflow__`,
  `steps__list`, `item-steps`, `cases__splide`, `card-cases`, `compliant__desc`,
  `actually__list`, `item-actually`.
- `../../themes/overchain/js/main.js` уже ініціалізує `.cases__splide`
  (perPage 4 → 2 при `mqTouch` → 1 при `mqTablet`, `focus: center`).
- `.drag-arrow` глобально схований у `resources/scss/editor.scss`.

Тобто робота в кожному пункті — це `block.json` + `edit.js` + `render.php` +
Blade + `translate.json` + правило для канви.

**Критерії готовності — ті самі**, що для етапу 3, включно із застереженням про
критерій 5: канва проходиться людиною, до того блок не отримує `✅`. Тут цей
критерій винесений в окремий етап 7.

## Порядок блоків на сторінках

`aviation` — 10 секцій, 12 вставок:
Intro → Features → Split → **White Section** [Accordion, Cards] → Control List →
Features → **White Section** [Duo, Promo] → Cases Slider.

`igaming` — 11 секцій, 13 вставок:
Intro → Features → Split → **White Section** [Accordion, Cards] → Features →
Control List → Integration Steps → **White Section** [Flow Promo] → Highlight →
Cases Slider.

Обидва `White Section` — уже готовий `overchain/white-section`; у першому
`showDecor: true`, у другому `false` (у верстці `frame-colored__blur` є лише
один раз, на р. 819).

Секція `.steps` у `aviation.html` **закоментована** (р. 1000) — 5.1 потрібен
тільки для `igaming`. Секція `.infrastruct` є лише в `aviation` — 4.3 потрібен
тільки їй.

> Копірайт на `igaming.html` місцями скопійований з `aviation.html`
> («Built for Aviation Businesses», «Aviation Cases»). Це плейсхолдери
> дизайнера, не вимога до блоків.

## Геометрія декору — звірено з `build/blocks.css`

Три нових блоки несуть абсолютний шар, і всі три різні. Від цього залежить
порядок етапу 5.

| Шар | Правило | Що це означає для канви |
|---|---|---|
| `.steps__layout` | `position: relative; z-index: 5` | нічого — абсолютних шарів немає |
| `.way__img` | `position: absolute; z-index: -1; width: 35rem`, центрований | негативний z-index: відновити стек-контекст **і** позицію |
| `.introflow__bg` | `position: absolute; z-index: 1; width: 75.125rem; inset-block-start: -3rem` | якір **вище** свого `section-wrap` — не рендерити в канві |
| `.never__decor` | `position: absolute; z-index: 1; width: 90rem`, `translate(-50%, -50%)` | 90rem на короткій секції — вилазить угору й униз, не рендерити |

---

# Етап 4 — доопрацювання наявних блоків

Чотири дрібні зміни в блоках, які **вже стоять на сайті**. Усі в плагіні, один
`npm run build` на весь етап. Ідуть першими: додають найменше нової поверхні, а
закривають 4 з 10 секцій `aviation` і 3 з 11 `igaming`.

## 4.1 ✅ Cards → абзац `.compliant__desc`

`blocks/cards/`, `resources/views/blocks/cards.blade.php`

Між `<ul class="compliant__cards">` і кнопкою у верстці стоїть
`<div class="compliant__desc txt3 light"><p>…</p></div>`. Блок такого не емітить:
його `text` іде всередині `.heading.aic`, вище карток.

- [x] `descText` у `block.json`, дефолт `""`
- [x] Blade: вивід після `{!! $content !!}`, перед `@include('partials.btn-icon')`
- [x] `edit.js`: `RichText` у тій самій позиції
- [x] `translate.json`: `descText` → `rich`
- [x] diff інвентарю класів 0/0
- [x] smoke-рендер, включно з випадком «атрибута немає»

Не плутати з наявним `text` — він лишається заголовковим абзацом.

## 4.2 ✅ Features → заголовок секції

`blocks/features/`, `resources/views/blocks/features.blade.php`

Другий `.feature` на обох сторінках має `.heading > h2.tl2 + .txt2.col-alt1`.
У блока немає жодного текстового атрибута.

- [x] `title`, `text` у `block.json`, обидва дефолт `""`
- [x] Blade: `.heading` **цілком зникає**, коли обидва порожні — перша секція
      сторінки йде без нього
- [x] `edit.js`: два `RichText` із `placeholder`, та сама умова
- [x] `translate.json`: обидва → `rich`
- [x] diff / smoke

`enableBlur: false` для цієї секції вже підтримується — у другому `.feature`
шару `feature__blur` у верстці немає.

## 4.3 ✅ Promo → геометрія `img2` + `pis1`

`blocks/promo/`, `resources/views/blocks/promo.blade.php`. Потрібен лише для `aviation`.

Блок жорстко пише `infrastruct__body section-body` + `infrastruct__img img1
mouse-prllx`. `aviation` потребує `section-body pis1` + `infrastruct__img img2`
**без** паралаксу. Це рівно випадок із `PLUGIN.md` § *Geometry modifier classes*:
база дає лише `position: absolute`, координати живуть на модифікаторі.

- [x] `mediaLayout`: `"img1"` (дефолт) або `"img2"`
- [x] один атрибут керує трьома речами разом: модифікатор `img1`/`img2`,
      наявність `mouse-prllx`, наявність `pis1` на `__body`
- [x] `translate.json`: `ignore`
- [x] diff / smoke

## 4.4 ✅ Split → список `.actually__list`

`blocks/split/`, `resources/views/blocks/split.blade.php`

**Останній в етапі свідомо.** Це єдина зміна, яка чіпає блок із уже збереженим
контентом у двох різних формах, тож її робимо тоді, коли робочий цикл етапу вже
перевірений на трьох простіших пунктах.

Обидві сторінки використовують у `.actually__bottom` другий вигляд списку:
`.actually__list > .item-actually > (.item-actually__icon + .item-actually__content > p)`.
Блок уміє лише `.actually__steps` / `.steps-actually` (номер + `tl5 regular` +
`.steps-actually__desc`). Це два різні списки, не варіант одного.

- [x] `listStyle` у `block.json`: `"steps"` (дефолт) або `"items"`
- [x] **дефолт мусить лишитися `"steps"`** — інакше кожен уже збережений Split
      перемкнеться на порожній список
- [x] репітер `items`: `{ text }` — у верстці 4 позиції, текст простий (`<p>`),
      без заголовка й без номера.
      **Розійшлося з планом:** іконки не стали атрибутом. У верстці всі чотири
      позиції на **обох** сторінках використовують той самий значок,
      тож за правилом «що не змінюється між сторінками — фіксований асет» вона
      хардкодиться, як декор у `layered`
- [x] Blade: гілка на `listStyle`; `steps` рендериться як зараз
- [x] `edit.js`: `IconListControls`-подібна панель
- [x] `translate.json`: `listStyle` → `ignore`; `items` → `repeater`
      з єдиним `text` → `rich` — ключ вкладеної схеми саме `items`, не `attributes`
- [x] diff / smoke: **обидві** гілки плюс випадок «атрибута немає»

Кнопки в цьому варіанті у верстці немає — окремої роботи не потребує, `btn-icon`
і так рендериться лише за непорожнього `buttonText`.

## Вихід етапу 4

- [x] `npm run build` без помилок
- [x] `aviation` збирається повністю, крім Control List (5.2) і Cases Slider (6.2)
- [x] жоден уже збережений Split, Cards, Features чи Promo не змінив рендер

---

# Етап 5 — нові блоки плагіна

Чотири нових блоки. Порядок — за ризиком канви, від нульового до найгіршого;
кожен щабель має готовий прецедент у кодовій базі.

**Наскрізне для всіх чотирьох:** оболонка `section` → `__container` →
`__wrap.section-wrap` → `__body.section-body`, однакова в Blade і `edit.js`;
текстові дефолти `""` з підказкою через `placeholder`; `example.attributes` для
інсертора; запис у масив `$order` в `overchain-blocks.php`; `translate.json` на
**кожен** атрибут; `npm run build` і перевірка, що `wp-i18n` є в
`build/<name>/index.asset.php`.

## 5.1 ✅ Integration Steps — `overchain/integration-steps`

Секція `.steps`, `igaming.html:1000`. Тільки `igaming`.
**Абсолютних шарів немає взагалі** — найдешевший блок етапу, ним зручно
перевірити збірку, `$order`, `translate.json` і diff, не відволікаючись на канву.

> **Не плутати з наявним `overchain/steps`** — той рендерить `.oneflow` з
> `.item-oneflow`, зовсім іншу секцію з `index.html`. Спільного лише слово
> «steps» у назві.

```
section.steps.{pbs2|pbs4}
  … .steps__body.section-body
    .heading > h2.tl2
    .steps__layout
      ul.steps__list > li.item-steps
        .item-steps__icon
        .item-steps__content
          span.item-steps__num          ← з індексу, не зберігається
          .item-steps__box > h3.tl5.regular + .txt2.col-alt1 > p
      a.steps__btn.btn-icon
```

- [x] `block.json`: `noPaddingTop`, `title`, `text`, `steps`, набір кнопки
      (`text` додано після етапу на прохання замовника — підзаголовок
      `.txt2.col-alt1` у `.heading`, як у Features)
      (`buttonIcon` дефолт `"calendar"` — у верстці `btn_1.svg`)
- [x] `steps` — репітер `{ iconId, iconUrl, title, text }`.
      **Уточнено проти плану:** іконок у темі рівно три й дизайн бере їх
      по порядку, тож це патерн «numbered assets cycle by index» із `PLUGIN.md`.
      Реалізовано як у accordion — цикл `(index % 3) + 1` є **фолбеком**, а
      `iconUrl` його перекриває. Модуло обовʼязкове: без нього четвертий крок
      дав би 404
- [x] номер `01`/`02` — `str_pad` від індексу в Blade і те саме в `edit.js`;
      ніколи не зберігати, інакше перестановка кроків вимагатиме перенумерації
- [x] `.steps__layout` — без `data-threshold-*`, на відміну від `.oneflow`
- [x] diff / smoke

## 5.2 ✅ Control List — `overchain/control-list`

Секція `.way`, `aviation.html:825`, `igaming.html:932`. Обидві сторінки.

```
section.way.{pbs2|pbs4}
  … .way__body.section-body
    .heading.aic.mbe2 > h2.tl2 + .txt2.col-alt1
    .way__content
      .way__img.no-select            (фіксований асет, z-index: -1)
      ul.way__items > li.item-way > .item-way__box > h3.tl5
      a.way__btn.btn-icon
```

- [x] `block.json`: `noPaddingTop`, `title`, `text`, `items`, `enableImage`,
      набір кнопки з `buttonIcon` дефолт `"arrow"` (у верстці `btn_2.svg`)
- [x] `items` — репітер із **одним** ключем `{ label }`; об'єкти, не голі рядки,
      інакше DeepL-хінт `repeater` їх мовчки пропустить (`TagListControls`)
- [x] `way_img_1.png` однаковий на обох сторінках, тож спершу зроблено
      **фіксованим асетом**; тумблер `enableImage` за правилом `enable*`,
      дефолт `true`.
      **Змінено після етапу на прохання замовника:** додано `imageId`/`imageUrl`,
      дизайнерське зображення лишилося **фолбеком**. Дефолт не змінився, тож уже
      збережені блоки рендеряться так само
- [x] **канва: правило НЕ додано, і це свідомо.** Планувалося застосувати фікс
      `.card-moves` (isolation + невідʼємні z-index), але перевірка `blocks.css`
      показала, що випадок інший: стек-контекст створює сам `.way__content`
      (`position: relative; z-index: 5`), а він — наша власна розмітка всередині
      секції, а не елемент, яким керує Gutenberg. Редактор скидає `position`
      лише на обгортці блоку, до якої цей шар не має стосунку, і `blocks.css`
      доїжджає в канву без змін. Спекулятивне правило тут створило б розбіжність
      канви з фронтом, а не прибрало її. Перевірка лишається за ручним проходом у редакторі: якщо
      зображення не видно — додати фікс тоді
- [x] `heading aic mbe2` — усі три класи дослівно
- [x] diff / smoke

## 5.3 ✅ Flow Promo — `overchain/flow-promo`

Секція `.introflow`, `igaming.html:1087`, всередині `White Section`. Тільки `igaming`.

```
section.introflow.{pbs2|pbs4}
  … .introflow__wrap.section-wrap
    .introflow__bg.no-select          (фіксований асет, тумблер)
    .introflow__body.section-body
      .introflow__content
        h2.tl2
        .introflow__subtitle.txt2.medium > p
        .introflow__desc.txt4 > p
        a.introflow__btn.btn-icon
      .introflow__img.no-select
```

- [x] `block.json`: `noPaddingTop`, `enableBackground`, `title`, `subtitle`,
      `desc`, `imageId`/`imageUrl`, набір кнопки (`calendar`)
- [x] фон — `decor/introflow_bg_1.jpg`, фіксований асет; той самий файл уже
      використовує Manage Cards, у темі він є
- [x] `enableBackground` дефолт `true` — шар є в тій єдиній секції, з якої блок
      збирається
- [x] `introflow_img_1.png` із `content/` → атрибут-аплоадер **із дизайнерським
      зображенням як фолбеком** (патерн Team Card intro): секція є лише на одній
      сторінці, тож «фіксований чи атрибут» не розвʼязується правилом «однакове
      на всіх сторінках». Фолбек дає і те, і те — свіжий блок виглядає як дизайн,
      редактор може підмінити, і канва показує рівно те, що піде на фронт
- [x] **канва: фон не рендерити взагалі.** 75.125rem завширшки з якорем
      `inset-block-start: -3rem`, тобто вище власного `section-wrap` — точний
      аналог `.manage__bg`. Тумблер і далі керує фронтом
- [x] diff / smoke

## 5.4 ✅ Highlight — `overchain/highlight`

Секція `.never`, `igaming.html:1145`. Тільки `igaming`. Найризикованіший
у черзі — найбільший абсолютний шар на найкоротшій секції.

```
section.never.{pbs2|pbs4}
  … .never__wrap.section-wrap
    .never__decor.no-select           (foundation_decor_1.svg, 90rem)
    .never__body.section-body
      .never__content
        h2.tl2
        .never__img.no-select         ← усередині __content, не поруч
        .never__desc.txt2 > p
        a.never__btn.btn-icon         (btn_2.svg → icon "arrow")
```

- [x] `block.json`: `noPaddingTop`, `enableDecor`, `title`, `desc`,
      `imageId`/`imageUrl`, набір кнопки (`arrow`)
- [x] декор — `decor/foundation_decor_1.svg`, той самий фіксований асет, що в
      `Split (layered)`; у тему нічого доливати не треба
- [x] `.never__img` рендериться **всередині** `.never__content`, між заголовком
      і описом — легко поставити не туди
- [x] **канва: декор не рендерити взагалі.** 90rem завширшки, центрований через
      `translate(-50%, -50%)` на секції, яка сама коротка, — вилазить і вгору, і
      вниз. Той самий випадок, що `.actually__blur` у Split: він не просто
      накриває appender, а перехоплює кліки по блоку **вище**
- [x] diff / smoke

## Вихід етапу 5

- [x] `npm run build` без помилок; кожен новий `index.asset.php` містить `wp-i18n`
- [x] `aviation` і `igaming` збираються повністю, крім Cases Slider (6.2)
- [x] усі чотири блоки є в масиві `$order`

---

# Етап 6 — Cases Slider у темі

Окремий етап, бо це інша кодова база (тема, не плагін), інша збірка
(`npm run blocks:build`, вихід **комітиться**) і інша документація (`THEME.md`).

Іде в тему за правилом із `CLAUDE.md`: блок робить запит до CPT, отже потребує
тематичного PHP. Категорія `overchain-theme-blocks`, поруч із `past-events`.
Реєстрація не потрібна — `Overchain_Blocks::register_blocks()` глобить
`blocks/*/block.json` сама.

## 6.1 ✅ `fix-asset.js` у темі → `wp-data`

**Робиться до 6.2, окремим кроком.** План казав «окремим комітом» — так не вийде:
тема **не є git-репозиторієм** (під git лише плагін), тож ізолювати цю зміну
комітом ніде. Натомість вона зроблена й перевірена до того, як зʼявився новий
блок: `past-events` перезібрано, його хеш версії не змінився (код той самий),
бандл лишився валідним.

`wp-content/themes/overchain/fix-asset.js` має **захардкоджений** список
залежностей — `react, wp-block-editor, wp-blocks, wp-components, wp-element,
wp-i18n` — і пише його **однаковим у кожен** `index.asset.php`. У ньому немає
ні `wp-data`, ні `wp-server-side-render`, хоч обидва є в `externals` у
`webpack.config.js`. Селект категорій у 6.2 потребує `wp-data`.

Це той самий клас помилки, що описаний у `BLOCKS.md` для `wp-i18n`: збірка
проходить чисто, а редактор показує «This block has encountered an error».

- [x] додати `wp-data` у масив `deps`
- [x] `npm run blocks:build`, перевірити, що `blocks/past-events/build/index.asset.php`
      перезаписався з новим списком
- [x] переконатися, що `past-events` і далі відкривається в редакторі —
      зміна зачіпає **всі** тематичні блоки, тож регресія має бути видна окремо
      від нового блоку

## 6.2 ✅ Cases Slider — `overchain/cases-slider`

Секція `.cases`, `aviation.html:1163`, `igaming.html:1190`. Обидві сторінки.

**Майже все вже написано.** Класи `template-parts/content-cases.php` звірені з
версткою — збіг повний; `content-cases-slider.php` додає `splide__slide`;
а оболонку секції разом із `.drag-arrow` дослівно містить `single-cases.php`
(р. 167–199). Робота — витягти цю оболонку й дати їй власний запит.

Обсяг за вимогою замовника: **лише заголовок і вибір за таксономією**.
Ручного добору кейсів немає.

- [x] `blocks/cases-slider/block.json` — `category: "overchain-theme-blocks"`,
      `editorScript: "file:./build/index.js"`, `render: "file:./render.php"`
- [x] атрибути рівно три: `title` (string), `termId` (number, `0` = усі кейси),
      `postsPerPage` (number, дефолт 8 — як `Overchain_Case_Related::LIMIT`)
- [x] таксономія — **`cases-cat`**, пост-тип `cases`. У проєкті навколо неї три
      різні імені: таксономія `cases-cat`, фасет FacetWP `cases_cats`, джерело
      фасета `tax/cases-cat`. Блок бере перше
- [x] `render.php`: `WP_Query` по `cases` + `tax_query` на `cases-cat` за
      `term_id`, коли `termId` не нульовий; далі оболонка `.cases` з
      `single-cases.php` і `get_template_part('template-parts/content','cases-slider')`
      у циклі з `setup_postdata()`; порожній результат — не рендерити секцію взагалі
- [x] `edit.js`: `SelectControl` з термінами через
      `useSelect( select => select('core').getEntityRecords('taxonomy','cases-cat',{ per_page: -1 }) )`
- [x] `translate.json`: `title` → `rich`, `postsPerPage` → `ignore`,
      `termId` → `ignore` **(не `postobject`: це term ID, а не post ID; DeepL
      резолвить `postobject` через `pll_get_post()`, що для терміна дасть сміття)**.
      Наслідок: дубльована сторінка несла б ID терміна чужої мови, бо режиму для
      термінів у DeepL немає взагалі. Розвʼязано в `render.php` — `pll_get_term()`
      під `function_exists`, як вимагає конвенція Polylang. Неперекладена
      таксономія повертає той самий ID
- [x] `npm run blocks:build` у **темі**; закомітити `blocks/cases-slider/build/`

**Прев'ю в канві — за зразком `past-events`.** Той блок теж керується запитом і
малює в канві не картки, а сірий плейсхолдер. Це дешевше й уже прийнято в
кодовій базі: Splide у канві не стартує, тож реальні слайди вимагали б ще й
правила в темовому `css/editor.css` (плагінний `editor.scss` тематичних блоків
не покриває). Показати заголовок, назву обраної категорії та кількість кейсів —
достатньо, щоб редактор переконався, що вибрав правильний термін.

`ServerSideRender` дав би справжнє прев'ю, але коштує двох додаткових речей:
`wp-server-side-render` у `fix-asset.js` **і** правило розкриття Splide у
`css/editor.css`. Брати тільки якщо плейсхолдера справді забракне.

---

# Етап 7 — документація

Перевірка в редакторі у черзі не значиться — її робить людина вручну й окремо
(чеклисти — у кінці файлу, § *Ручна перевірка в редакторі*). Тут лишається те,
що закриває критерій 6.

## Що оновлено

- [x] рядок на кожен новий блок у таблиці блоків `PLUGIN.md` (5.1–5.4)
- [x] `BLOCKS.md` — **негативний z-index на секційному шарі** (`.way__img`);
      досі в реєстрі були тільки картки (`.card-layer`, `.card-connect`,
      `.card-moves`)
- [x] `BLOCKS.md` — доповнити таблицю фіксованих асетів: `way_img_1.png`,
      `introflow_bg_1.jpg` (Flow Promo), `foundation_decor_1.svg` (Highlight)
- [x] `THEME.md` — блок `cases-slider` і виправлений `fix-asset.js`
- [x] синхронізовано лістинг `$order` у `PLUGIN.md` з кодом — був на 21 запис,
      фактично 40; число тепер генерується з масиву, а не переписується руками
- [x] виправлено кількість блоків у `CLAUDE.md` і додано туди `BLOCK-QUEUE.md`

### Якщо щось не так

Правила канви блоків плагіна — у `resources/scss/editor.scss`, після правки
`npm run build`. Тематичний блок 6.2 — `css/editor.css` у темі; `_S_VERSION`
фіксований `1.0.3`, тож потрібен hard reload. Після правки Blade — `WP_DEBUG`
або очистити `cache/views/`.

---

## Покриття по сторінках

Перевірка повноти: після всіх пунктів жодна секція з шести сторінок не
лишається без блоку.

| Сторінка | Секцій | Готових до етапу 2 | Розблоковують |
|---|---|---|---|
| `integrations` | 8 | 7 | 3.5 |
| `platform-overview` | 14 | 11 | 2.2, 2.3, 3.6, 3.7 |
| `move-money` | 11 | 5 | 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4 |
| `control-treasury` | 11 | 5 | 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4 |
| `aviation` | 10 | 4 | 2.2, 4.1, 4.2, 4.3, 4.4, 5.2, 6.2 |
| `igaming` | 11 | 3 | 2.2, 4.1, 4.2, 4.4, 5.1, 5.2, 5.3, 5.4, 6.2 |

`aviation` і `igaming` не входили в початковий аудит — їх додали етапи 4–6.
2.2 (Intro) закриває на них першу секцію. Колонка «Секцій» рахує елементи
`<section>` у верстці; двох обгорток `.frame-colored` (`overchain/white-section`,
уже готовий) у ній немає, тож вставок у редакторі на дві більше.

---

## Після завершення черги ✅

- [x] Виправити кількість блоків у [`README.md`](README.md) — там «21 blocks»
      і «21 parent + 8 child»; фактично **40 батьківських + 16 дочірніх** у
      плагіні плюс два тематичні. (`CLAUDE.md` уже виправлено в 7.2)
- [x] Полагодити команду перевірки `.wrapper`-правил у `THEME.md` і `BLOCKS.md`:
      `grep -c '^\.wrapper ' css/main.css` завжди повертає `0`, бо `main.css` —
      один мініфікований рядок, а `grep -c` рахує рядки. Робоче:
      `grep -o '[{;}]\.wrapper [^{,]*' css/main.css | wc -l` → 69
- [x] Прибрати дубльований розділ «Numbered decor assets cycle by index» у `PLUGIN.md`
- [x] Прибрати застарілий другий розділ про `.ibg` у `PLUGIN.md` — він стверджує,
      що клас без правил, і радить додавати власні `width/height/object-fit`, тоді
      як `[class*=ibg]` у темі це вже робить. Перший розділ правильний

---

# Ручна перевірка в редакторі

**Поза чергою.** Агент у `wp-admin` зайти не може, тож цей прохід робить людина,
коли їй зручно. Блоки вже мають `✅` за рештою критеріїв — це не «недороблено», а
остання перевірка очима.

**Як проходити.** Створи чернетку сторінки, вставляй блок за блоком із категорії
**Overchain** (і **Theme blocks** для Cases Slider), і на кожному дивись три речі:
блок відкривається без «This block has encountered an error»; вміст не з'їхав у
стовпчик; appender видно й він клікабельний. Далі — специфічне для блока.

## Етапи 4–6

- [ ] **4.1 Cards** — абзац стоїть **під** картками, над кнопкою
- [ ] **4.2 Features** — `.heading` зникає, коли обидва поля порожні
- [ ] **4.3 Promo** — `img2` зсуває зображення, паралаксу немає, `__body` має `pis1`
- [ ] **4.4 Split** — перемикач `listStyle` міняє список; `steps` рендериться як
      раніше; **уже збережений на сайті Split не змінився**
- [ ] **5.1 Integration Steps** — номери `01`, `02`, `03` підряд; після
      перестановки кроків перенумеровуються самі
- [ ] **5.2 Control List** — зображення видно, воно **під** списком і не в потоці
      (перевірка `isolation`/z-index); пункти редагуються в сайдбарі
- [ ] **5.3 Flow Promo** — фону в канві немає, він не накриває appender і
      наступний блок; тумблер і далі є в сайдбарі
- [ ] **5.4 Highlight** — декору в канві немає; зображення **між** заголовком і
      описом; клік по блоку **вище** працює
- [ ] **6.2 Cases Slider** — селект заповнений термінами `cases-cat`; вибір
      терміна змінює прев'ю; порожня категорія не ламає блок

## Етап 3

Зведений дубль відкритих пунктів «канва» з блоків 3.1–3.7. Критерій 5 не можна
закрити без редактора, тож він виконується однією пачкою (варіант 3).

**Як проходити.** Створи чернетку сторінки, вставляй блок за блоком із категорії
**Overchain**, і на кожному дивись три речі:

1. блок відкривається без «This block has encountered an error»;
2. картки стоять сіткою, а не в стовпчик;
3. appender (синій `+`) видно й він клікабельний.

Далі — те, що специфічне саме для цього блока. Відмічай тут; коли рядок закритий,
познач і `- [ ] канва` в самому блоці, а тоді `⬜` → `✅` у заголовку і в таблиці
[Стан](#стан).

### 3.1 Tag List — `overchain/tag-list`

- [ ] теги редагуються **тільки** в сайдбарі (панель **Tags**); у канві вони
      прев'ю, і це очікувано
- [ ] порожній блок (без тегів) не показує порожній `<ul>`

Найнижчий ризик у черзі: без InnerBlocks, без appender'а, без абсолютного декору.

### 3.2 Everything Grid — `overchain/everything`

- [ ] рівно **4 колонки**, і при відкритому сайдбарі теж
- [ ] розділові лінії між комірками йдуть по краях рядів, а не посеред ряду
      (це `nth-child(4n+…)` — головна причина, чому колонок саме 4)
- [ ] appender стоїть **окремим рядом на всю ширину**, не займає комірку картки

### 3.3 Process Slider — `overchain/process-slider`

- [ ] слайди видно (Splide у канві не стартує — їх показує наше правило)
- [ ] 4 колонки (як десктопний `perPage` фронту), картки не вужчі за свою комірку
- [ ] фон `accept_bg_1.jpg` заповнює картку, а не лежить смугою у потоці
- [ ] стрілок `.arrows` у канві **немає** — так і має бути

### 3.4 FAQ — `overchain/faq`

- [ ] відповіді розгорнуті й редагуються
- [ ] питання і тумблер стоять **в один рядок**, тумблер показує гліф «мінус»
      (це перевірка скопійованих у `css/editor.css` правил `.ac`)
- [ ] нумерація `01`, `02`, … іде підряд
- [ ] великий декор `faq_decor_1.png` у канві **не** рендериться і не замальовує
      наступний блок

### 3.5 Manage Cards — `overchain/manage`

- [ ] рівно **2 колонки**, і при відкритому сайдбарі теж (не в стовпчик)
- [ ] кожна картка займає **всю** свою комірку, а не половину
- [ ] фон `introflow_bg_1.jpg` у канві **не** рендериться
- [ ] прев'ю кнопки з'являється, щойно введено текст

### 3.6 Connect — `overchain/connect`

- [ ] 3 колонки, картки не вужчі за свою комірку
- [ ] фон `connect_bg_1.png` видно на кожній картці
- [ ] на 3-й і 5-й картці шаблону видно декор, і він **під** іконкою та текстом,
      а не поверх них (перевірка `isolation`/z-index)
- [ ] перемикання **Decor** у сайдбарі міняє картинку на потрібній картці

### 3.7 Moves Mosaic — `overchain/moves`

Найризикованіший у черзі — дивись уважно.

- [ ] сітка `1fr 1fr 1fr 20rem`: три рівні колонки плюс вужча четверта
- [ ] `wide` займає **дві** колонки
- [ ] `tall-last` стоїть у **четвертій** колонці на **два** ряди
- [ ] `tall-first` (обери варіант у сайдбарі) — перша колонка, два ряди
- [ ] жоден варіант не схлопнувся в одну комірку
- [ ] appender окремим рядом і **не** влазить у комірку, куди явно поставлений
      варіант
- [ ] фон `wide` і зображення `tall-*` видно, вони **під** контентом

### Якщо щось не так

Усі правила канви етапу 3 — у
[`resources/scss/editor.scss`](resources/scss/editor.scss), крім акордеона: його
скопійовано в тему, `css/editor.css` § *Accordion (.ac)*. Після правки SCSS —
`npm run build`. Після правки Blade — `WP_DEBUG` або очистити `cache/views/`.

---
