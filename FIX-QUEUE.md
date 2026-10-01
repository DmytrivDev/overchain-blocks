# Черга уніфікації блоків — звіт і план

Робочий файл для поточного етапу: **уніфікувати блоки, виправити недоліки,
звірити з HTML-версткою дизайну** (`wp-content/themes/overchain/_desigh/dist/*.html`
+ `dist/css/blocks.*.css`, що дорівнює `resources/scss/styles.scss`).

**Єдина правда — верстка дизайну.** Кожне рішення нижче звірене з реальними
сторінками дизайну, а не з інтуїцією.

Файл живий: завдання додаються в кінець відповідних розділів, статус
оновлюється в таблиці.

---

## Стан

| # | Блок | Завдання | Тип | Статус |
|---|---|---|---|---|
| 1.1 | Lead | Селектор «Backgrounds» — доцільність, назви | звіт + правка | ✅ |
| 1.2 | Lead | Селектор «Bottom spacing» | звіт + правка | ✅ |
| 1.3 | Lead | Світчер «Taller section» | звіт | ✅ |
| 1.4 | Lead | Селектор «Lead text weight» | звіт | ✅ |
| 2.1 | Intro | Випадашка «Content» — доцільність, назви | звіт + правка | ✅ |
| 2.2 | Intro | Світчер «Crop background to fill» | звіт | ✅ |
| 3.1 | Hero | Прибрати стартовий текст → плейсхолдери | правка | ✅ |
| 4.1 | Features | Світчер «Show blur» | звіт | ✅ |
| 5.1 | Split | Селектор «Subtitle style» | звіт | ✅ |
| 5.2 | Split | Перенести «Use less top padding» вгору | правка | ✅ |
| 5.3 | Split | Світчер «Show glow» | звіт | ✅ |
| 6.1 | Showcase | Мобайл в адмінці — 1 айтем у ряд | правка | ✅ |
| 7.1 | Everything Grid | Кількість колонок в адмінці з верстки | правка | ✅ |
| 8.1 | Steps | Прибрати текст → плейсхолдери | правка | ✅ |
| 9.1 | Integration Steps | 3 айтеми за замовчуванням | правка | ✅ |
| 10.1 | Tab | Плейсхолдери | правка | ✅ |
| 11.1 | Badges | Плейсхолдери | правка | ✅ |
| 12.1 | Tag List | 3 теги за замовчуванням | правка | ✅ |
| 13.1 | Accordion | `.paid__tabs` на всю ширину не-десктоп | правка | ✅ |
| 14.1 | FAQ | 3 айтеми за замовчуванням | правка | ✅ |
| 15.1 | Mosaic | Адаптація айтемів | правка | ✅ |
| 16.1 | Moves Mosaic | Адаптація айтемів (обидва варіанти) | правка | ✅ |
| 16.2 | Moves Mosaic | Приховати `.card-moves__bg` у `wide` (редактор) | правка | ✅ |
| 17.1 | Manage Cards | Адаптація айтемів | правка | ✅ |
| 18.1 | Locations | Плейсхолдер зображення як у Promo Slider | правка | ✅ |
| 18.2 | Locations | Світчер «Show decor» | звіт | ✅ |
| 19.1 | Spotlight | Плейсхолдери | правка | ✅ |
| 20.1 | Connect | Адаптація айтемів | правка | ✅ |
| 21.1 | Duo | Плейсхолдери | правка | ✅ |
| 21.2 | Duo | Винести стан «Logos» в окремий блок | рефактор | ✅ |
| 22.1 | Promo + наскрізне | «Use less top padding» першим у сайдбарі | правка | ✅ |
| 23.1 | Process Slider | Адаптація айтемів | правка | ✅ |
| 24.1 | Testimonials | `.testimonials__window` на всю ширину не-десктоп | правка | ✅ |
| 25.1 | Slider Cards | Плейсхолдери | правка | ✅ |
| 26.1 | Past Events (**тема**) | Заголовок у канві + плейсхолдер | правка | ✅ |
| 27.1 | Quote | Перейменувати на «Designed Quote» | правка | ✅ |
| 27.2 | Quote | Дефолтні тексти → плейсхолдери | правка | ✅ |
| 28.1 | Accordion | Дефолтні тексти → плейсхолдери | правка | ✅ |
| 29.1 | Form, Subscribe, Related Posts | Решта дефолтних текстів у плейсхолдери | правка | ⛔ вирішено не робити |
| 30.1 | Tabs / Tab | Текст хідінга в прев'ю (плейсхолдер у канві) | правка | ✅ |
| 30.2 | Spotlight | Текст карток у прев'ю | правка | ✅ |
| 30.3 | Duo | Текст карток у прев'ю | правка | ✅ |
| 30.4 | Slider Cards | Текст карток у прев'ю | правка | ✅ |
| 30.5 | Features | Картки: дефолти у плейсхолдери, прев'ю без змін | правка | ✅ |
| 30.6 | Badges, Tag List | Повернути текст у стартові айтеми репітера | правка | ✅ |
| 30.7 | Cards | Хідінг і картки: дефолти у плейсхолдери, прев'ю лишити | правка | ✅ |
| 30.8 | Split | Тексти і кнопка у плейсхолдери | правка | ✅ |
| 30.9 | Promo | Тексти у плейсхолдери | правка | ✅ |
| 31.1 | Тема | Видалити мертвий `template-parts/blocks/past-events.php` | чистка | ✅ |

Легенда: ⏳ не почато · 🟡 частково · ⛔ вирішено не робити · ✅ готово

> ⚠️ Завдання 26.1 — єдине **у темі**, а не в плагіні
> (`wp-content/themes/overchain/blocks/past-events`). Інша збірка
> (`npm run blocks:build`), інший вихід (`blocks/<name>/build/`, комітиться).

---

# Частина A. Звіти по перевірках

## 1.1 Lead → селектор «Backgrounds»

Контрол: `blocks/lead/edit.js`, панель `Background`, атрибут `backgroundType`.
**У SelectControl немає `label`** — у сайдбарі це безіменна випадашка. Це вже
дефект сам по собі.

Що робить кожна опція (CSS зі `styles.scss`):

| Значення | Мітка зараз | Що реально робить | Є в дизайні |
|---|---|---|---|
| `blur` | No image — blur only | Замість картинки два `.page-blur` (`blur1` + `blur2`) — радіальні світіння `rgba(180,255,228,.1)`, 71.75rem × 132.375rem, ≤992 → 23rem × 37.625rem | ✅ `blogs.html`, `careers.html` |
| `bg1` | Image — sits at the bottom | `.lead__bg.bg1` — `inset-block-end:-2.5rem`, ширина 90rem, центр.<br>≤992 → `inset-block-end:0; width:100%; min-width:50rem` | ✅ `events.html`, `integrations.html` |
| `bg2` | Image — sits at the top, crops on mobile | `.lead__bg.bg2` — `inset-block-start:0`, ширина 90rem, центр.<br>≤992 → `inset-block-start:-3.5rem`, **ширина лишається 90rem** → обрізається | ✅ `about.html`, `case.html`, `glossary.html` |
| `bg3` | Image — sits at the top, scales on mobile | На десктопі **правило спільне з `bg2`** (той самий селектор).<br>≤992 → `width:100%; min-width:50rem` → масштабується | ❌ **жодної сторінки** |

**Висновок.** Опції `blur` / `bg1` / `bg2` підтверджені версткою, мітки точні.
`bg3` у жодному макеті не використано, але це реальний стан у `blocks.css`
(окреме мобільне правило), тому він не «вигаданий» — просто не задіяний.

**Пропозиція правок:**

1. Додати `label={__('Background type')}` у SelectControl.
2. Скоротити мітки, бо зараз це речення:
   - `blur` → «Без зображення — лише світіння»
   - `bg1` → «Зображення знизу»
   - `bg2` → «Зображення зверху (обрізається на мобайлі)»
   - `bg3` → «Зображення зверху (масштабується на мобайлі)»
3. `bg3` — **лишити** (нульова вартість, CSS існує). Якщо хочеш чистоти —
   видаляємо опцію, а в Blade лишаємо підтримку класу для вже збереженого
   контенту. **Потрібне твоє рішення.**

---

## 1.2 Lead → селектор «Bottom spacing»

Атрибут `bottomSpacing`, клас додається до `.lead__body` (який завжди має `pbs1`).

| Значення | Мітка зараз | Реальний `padding-block-end` | ≤992 | Є в дизайні |
|---|---|---|---|---|
| `none` | No bottom spacing | **5.5rem** (базове правило `.lead__body`) | 5.5rem | ✅ `events.html` |
| `pbe2` | Normal bottom spacing | 3.5rem | 4rem | ✅ `glossary.html` |
| `pbe1` | Larger bottom spacing | 5.5rem | 4rem | ✅ about, blogs, careers, case, integrations |

**Головна проблема: мітки брешуть.**

- `none` — це **не** «без відступу»: базове правило `.lead__body` уже дає 5.5rem,
  і воно єдине, що **не зменшується** на мобайлі.
- `pbe1` («Larger») на десктопі **дорівнює** `none` — різниця тільки ≤992
  (4rem проти 5.5rem).
- `pbe2` («Normal») насправді **найменший** на десктопі (3.5rem).

**Пропозиція правок:** перейменувати за фактичними значеннями, за зразком
`SectionSettingsControls` (там уже формат «Small — 3rem»):

- `none` → «Базовий — 5.5rem (без мобільного зменшення)»
- `pbe2` → «Малий — 3.5rem / 4rem на мобайлі»
- `pbe1` → «Стандартний — 5.5rem / 4rem на мобайлі»

Плюс `help` під контролом: «Різниця між базовим і стандартним видима лише
до 992px». Порядок опцій лишити або перевпорядкувати за розміром — на твій вибір.

---

## 1.3 Lead → світчер «Taller section»

Атрибут `minHeight` → клас `mh1` на `.lead__body`.

```
.lead__body.mh1 { min-height: 41.875rem }
@media (max-width:992px) { .lead__body.mh1 { min-height: 35.625rem } }
```

`.lead__body` — `flex-column; justify-content:center`, тож `mh1` робить секцію
вищою і центрує контент по вертикалі.

**Є в дизайні:** ✅ `about.html`, `careers.html`, `integrations.html` (3 із 7).

**Висновок: доцільний, мітка коректна.** Пропозиція-мінімум — додати `help`
з фактичним значенням (min 41.875rem / 35.625rem).

---

## 1.4 Lead → селектор «Lead text weight»

Атрибут `textStyle`: `plain` → `txt1`, `medium` → `txt1 medium`.

```
.txt1.medium { font-weight: 500 }
@media (max-width:992px) { .txt1.medium { font-weight: 400 } }
```

**Де застосовується:** тільки до **основного** абзацу (`text`). Другий абзац
(`textAlt`) жорстко `txt1 col-alt1` і на цей селектор не реагує.

**Є в дизайні:** ✅ рівно один раз — `careers.html` (`<div class="txt1 medium">`).
Там же єдиний випадок `txt1 col-alt1`, тобто це «сторінка кар'єр» цілком.

**Висновок: застосовується, але мінімально.** Два уточнення до мітки:

1. На мобайлі (≤992) опція **не робить нічого** — вага повертається до 400.
2. Мітка «Lead text weight» не каже, що це лише перший абзац.

Пропозиція: лишити, перейменувати на «Вага основного тексту» + `help`
«Medium діє лише від 992px; на другий абзац не впливає».

---

## 2.1 Intro → випадашка «Content»

Атрибут `layout` → модифікатор секції.

| Значення | Мітка зараз | Що дає | Є в дизайні |
|---|---|---|---|
| `default` | Text left | Без модифікатора. `.intro__content { padding-inline-end: 30rem }` — місце під фонову графіку праворуч; `.intro__body { min-height: 46.875rem }` | ✅ `platform-overview.html` |
| `content-center` | Text centred | `.sec-content-center` — центрування, `padding-inline-end: 0`, `txt1 max-width: 50rem` замість 35.375rem | ✅ `control-treasury.html`, `move-money.html` |
| `with-img` | Text left with image | `.sec-with-img` — на десктопі падінги ті самі; ≤992 нижній падінг `12.25rem` замість `7rem`, щоб звільнити місце під `.intro__img.img1`. Плюс вмикає поле «Side image» | ✅ `aviation.html`, `igaming.html` |

**Висновок: усі три стани підтверджені версткою, жоден не зайвий.**

Зауваження до назв і поведінки:

1. Мітка самої випадашки «Content» надто загальна → «Макет» / «Content layout».
2. `default` насправді не просто «текст ліворуч», а «текст ліворуч + 30rem
   зарезервовано під фон праворуч» — варто відобразити в `help`.
3. `with-img` **без завантаженого зображення** лишає зайвий мобільний падінг
   12.25rem — порожня діра. Варіант: віддавати `sec-with-img` лише коли
   `imageUrl` не порожній (однаково в Blade і в `edit.js`).

---

## 2.2 Intro → світчер «Crop background to fill»

Атрибут `coverBackground` → додає `ibg` до `.intro__bg`.

- **З `ibg`:** `[class*=ibg] > img { position:absolute; inset:0; width:100%;
  height:100%; object-fit:cover }` — зображення накриває всю секцію з обрізанням.
- **Без `ibg`:** `<img>` лишається звичайним потоковим зображенням усередині
  `.intro__bg` (`position:absolute; inset:0; min-width:90rem`) — тобто тримає
  власний розмір у 90rem-контейнері.

**Є в дизайні:** ✅ `control-treasury.html`, `move-money.html`
(обидві — `intro sec-content-center`). Немає на `aviation`, `igaming`,
`platform-overview`.

**Висновок: світчер доцільний — це реальний стан верстки, не вигадка.**

Зауваження: у дизайні `ibg` збігається з `sec-content-center` 2/2, а «без ibg» —
з рештою 3/3. Але це два незалежні рішення дизайнера, жорстко зв'язувати їх не
варто. Правки косметичні:

1. Мітку зробити конкретнішою: «Розтягнути фон на всю секцію (обрізати)».
2. `help` зараз каже «instead of letting it keep its own size» — по суті
   правильно, лишаємо, тільки приводимо до спільного стилю.

---

## 4.1 Features → світчер «Show blur»

Атрибут `enableBlur` (default `true`) → `.feature__blur` — радіальне світіння
`rgba(180,255,228,.05)`, 46.125rem, `scale(2.4)`, прибите у правий верхній кут
секції (`top:-23.4375rem; right:-14.5rem`); ≤992 → 23.125rem, `scale(3.8)`.

**Розклад по дизайну (8 секцій `.feature`):**

| Сторінка | Клас секції | Є `.feature__blur` |
|---|---|---|
| `index.html` | `feature pbs4` | ✅ |
| `aviation.html` (1-ша) | `feature` | ✅ |
| `igaming.html` (1-ша) | `feature` | ✅ |
| `integrations.html` | `feature` | ✅ |
| `platform-overview.html` | `feature` | ✅ |
| `aviation.html` (2-га) | `feature pbs2` | ❌ |
| `igaming.html` (2-га) | `feature pbs2` | ❌ |
| `about.html` | `feature pbs2` | ❌ |

**Висновок: доцільний, 5 із 8.** Видно закономірність: світіння є на **першій**
секції сторінки (тій, що без `heading`, одразу під Intro), і немає на другій
(`pbs2` + `heading`). Default `true` виправданий.

Пропозиція: лишити як є, уточнити мітку → «Показати світіння» / «Show background
glow» (зараз «Show blur» плутається з `page-blur` у Lead).

---

## 5.1 Split → селектор «Subtitle style»

Атрибут `subtitleStyle` на другому абзаці `.actually__top`.

| Значення | Мітка зараз | Класи | Що дає |
|---|---|---|---|
| `medium` | Medium | `txt2 medium` | `font-weight:500`, ≤992 → 400 |
| `alt-min` | Small, muted | `txt2 col-alt1 min-size` | `color: var(--colored-txt)` (акцентний, **не** приглушений) + `@media ≤992 { .actually__top .txt2.min-size { font-size:.75rem; line-height:1.3334 } }` |

**Розклад по дизайну (7 секцій `.actually`):**

- `txt2 medium` — `index.html`, `about.html`
- `txt2 col-alt1 min-size` — `aviation`, `control-treasury`, `igaming`,
  `move-money`, `platform-overview`

**Висновок: доцільний, обидва стани реальні.**

Зауваження до мітки: «Small, muted» неточна двічі — `col-alt1` це акцентний
колір (`--colored-txt`), а «small» діє **лише ≤992** (на десктопі розмір той
самий). Пропозиція: «Акцентний, дрібніший на мобайлі».

Побічне спостереження: `alt-min` у дизайні збігається 5/5 зі «Show glow»
(див. 5.3) — це фактично «нові платформенні сторінки» проти «index/about».

---

## 5.3 Split → світчер «Show glow»

Атрибут `enableBlur` (default `false`) → `.actually__blur`:
радіальне світіння `rgba(61,255,185,.08)`, 68.5rem × 55.375rem,
`rotate(-156.24deg) scale(1.5)`, прибите ліворуч-угору
(`top:-18.4375rem; left:-45.375rem`); ≤992 → 33.375rem × 27rem, `scale(2.1)`.

**Розклад по дизайну:**

| Сторінка | `.actually__blur` |
|---|---|
| `aviation.html` | ✅ |
| `control-treasury.html` | ✅ |
| `igaming.html` | ✅ |
| `move-money.html` | ✅ |
| `platform-overview.html` | ✅ |
| `index.html` | ❌ |
| `about.html` | ❌ |

**Висновок: доцільний, 5 із 7.** Default `false` збережений навмисно, щоб
блоки, збережені до появи атрибута, не змінили вигляд — це коректно.

Додатково (не входило в завдання, але спливло): **усі 7 секцій `.actually`
у дизайні мають `pbs2`**, тобто стан `pbs4` («Use less top padding») у Split
версткою не підтверджений жодного разу. Лишаємо як редакторську зручність,
але варто знати.

---

## 18.2 Locations → світчер «Show decor»

Атрибут `enableDecor` (default `true`) → `.operations__decor`
(`assets/img/decor/operations_decor_1.jpg`).

**Є в дизайні:** секція `.operations` існує рівно **одна** — `about.html`, і
вона **з декором**. Стану «без декору» у верстці немає.

**Висновок: світчер спекулятивний** — він не має протилежного стану в дизайні.
Три варіанти:

1. **Лишити** (default `true`) — нульовий ризик, редактор може вимкнути декор
   там, де він заважає. Прецедент: `faq.enableDecor` (теж default `true`),
   `cards.enableDecor` (default `false`).
2. Видалити контрол, декор завжди увімкнений — найчистіше щодо «верстка = правда».
3. Лишити, але перенести в загальну панель налаштувань, щоб не плодити
   однокнопкову панель «Decor».

**Рекомендація: (1) лишити** — це та сама категорія, що `cards.enableDecor`
і `faq.enableDecor`; прибирати треба або всі три, або жоден. **Потрібне рішення.**

---

# Частина B. Правки по файлах

## Наскрізні передумови

### П1. Плейсхолдери в спільних контролах сайдбару

Завдання 3.1, 8.1, 10.1, 11.1, 19.1, 21.1 вимагають замінити дефолтні тексти на
плейсхолдери. У полотні це вже працює (`RichText placeholder`), але **в сайдбарі
— ні**: `TagListControls`, `IconListControls`, `TextSettingsControls` рендерять
`TextControl` **без** `placeholder`. Порожній дефолт → порожнє поле без підказки.

**Правка (робиться першою):** додати проп `placeholder` у:

- `components/TagListControls.js`
- `components/IconListControls.js`
- `components/TextSettingsControls.js`

і прокинути його в `TextControl`. Компоненти спільні → зачіпає всі блоки-репітери,
тому це окремий перший крок із перевіркою.

### П2. Fallback порожнього `tabLabel` у Blade

`resources/views/blocks/tabs.blade.php`:

```php
$tabLabel = $innerBlock->attributes['tabLabel'] ?? 'Tab ' . ( $index + 1 );
```

`??` не спрацює на **порожньому рядку** — після переходу на плейсхолдери
кнопка таба стане порожньою. Замінити на перевірку `'' !== trim( ... )`.
(У `edit.js` fallback уже правильний — через `||`.)

### П3. Адаптація айтемів у редакторі — єдиний підхід

Завдання 6.1, 7.1, 15.1, 16.1, 17.1, 20.1 — одна й та сама задача. `editor.scss`
зараз навмисно **без брейкпойнтів**, і коментарі у файлі це пояснюють: полотно —
iframe, який вужчий за реальний екран.

**Рішення:** дзеркалити брейкпойнти верстки (`@media max-width: 992px / 768px`)
у блоках «Tablet» / «Mobile» наприкінці `editor.scss` — там уже так зроблено для
`.operations__cards`, `.understand__splide`, `.related__splide`, `.grid-settings`.
Медіа-запити всередині iframe рахуються **від ширини полотна**, тому перемикачі
«Desktop / Tablet / Mobile» у редакторі почнуть працювати коректно.

Компроміс, який треба прийняти свідомо: при відкритому сайдбарі полотно вужче
за реальний екран, тож на вузькому ноуті десктопний вигляд може показати
«планшетну» сітку. Альтернатива без цієї вади — container queries
(`container-type: inline-size` на списку + `@container`), але пороги тоді треба
перерахувати з ширини вікна на ширину контейнера. **Потрібне рішення: media
(просто, як зараз у файлі) чи container (точніше, але перерахунок порогів).**
За замовчуванням беру media.

Цільові значення — точно зі `styles.scss`:

| Блок | Список | Десктоп | ≤992 | ≤768 |
|---|---|---|---|---|
| Showcase | `.powerful__cards` | 2 | 2 | **1** |
| Everything | `.everything__list` | 4 | **3** | **2** |
| Mosaic | `.layer__cards` | 71fr 143fr 80fr, 2 ряди | **1 колонка + `grid-template-rows: none`** | — |
| Moves | `.moves__list` | 1fr 1fr 1fr 20rem | **1 колонка** | — |
| Manage | `.manage__cards` | 2 | **1** | — |
| Connect | `.connect__cards` | 3 | **2** | **1** |
| Process Slider | `.accept__splide` | 4 | **2** | **1** |
| Locations | `.operations__cards` | 4 | 2 | 1 (уже зроблено — еталон) |

Для Process Slider значення взяті не з CSS, а з конфігу Splide у `js/main.js`:
`perPage: 4, gap: 1.5rem` → `mqTouch (992): perPage 2, gap 1rem` →
`mqTablet (768): perPage 1`. CSS це підтверджує:
`.card-accept { max-width: calc(50% - 3rem) }` ≤992, `calc(100% - 6rem)` ≤768.

Бонус для Everything: рамки комірок у `blocks.css` малюються через
`:nth-child(4n+1)/(4n+4)` з перемиканням на `3n` і `odd/2n` у медіа-запитах.
Зараз редактор фіксує 4 колонки, а `nth-child` під 992px уже рахує по 3 → рамки
опиняються посеред ряду. Після правки арифметика зійдеться сама.

### П4. Порядок панелей у сайдбарі

Завдання 5.2 і 22.1 — одне правило: `SectionSettingsControls` має бути **першою**
панеллю в `InspectorControls`. Перевірив усі 37 блоків, які його використовують —
порушників рівно **п'ять**:

| Блок | Позиція зараз | Що стоїть перед ним |
|---|---|---|
| `promo` | 2-га | `PanelBody` (Layout) |
| `split` | 2-га | `PanelBody` (Layout) |
| `accordion` | 2-га | `PanelBody` (Layout) |
| `duo` | 2-га | `PanelBody` (Content) |
| `subscribe` | 3-тя | `PanelBody` + `ImageListControls` |

Решта 32 блоки вже мають його першим — тобто це саме приведення до наявної
норми, а не зміна конвенції.

Примітка: у `duo` панель-порушник зникне сама після 21.2 (там прибирається
`SelectControl` «Content»), тож окремої правки не потрібно — але порядок
перевірити після рефактора.

---

## 3.1 Hero → плейсхолдери

`blocks/hero/block.json` — прибрати дефолтні тексти:

- `title: "Title of the page"` → `""`
- `subtitle: "Short description goes here"` → `""`
- `buttonText: "Book a Demo"` → `""`

`blocks/hero/edit.js` — плейсхолдери вже є (`Title of the page`,
`Short description goes here`); кнопка рендериться завжди → обгорнути
в `{buttonText && ...}`, як у Lead.

`blocks/hero/block.json` → `example.attributes` — додати демо-текст, щоб прев'ю
в інсертері не було порожнім (зараз `example` містить лише `viewportWidth`).

Звірка з версткою (побічне): у дизайні `.hero__btns` використовує `btn_1.svg`
(іконка «календар»), і дефолт `buttonIcon` у Hero — `calendar`. ✅ збігається.

---

## 5.2 Split → перенести «Use less top padding» вгору

`blocks/split/edit.js`: `<SectionSettingsControls>` зараз стоїть **після**
панелі `Layout`. Перенести вище — першою панеллю в `InspectorControls`.

Заодно звірка з рештою: у Cards / Steps / Duo `SectionSettingsControls` теж
іде першим — тобто це приведення до спільного порядку, а не разовий випадок.

---

## 6.1 Showcase → 1 айтем у ряд на мобайлі (адмінка)

`resources/scss/editor.scss`, блок `@media (max-width: 768px)`:

```scss
.powerful__cards .block-editor-block-list__layout {
	grid-template-columns: 1fr;
}
```

Коментар над правилом `.powerful__cards` (≈ рядки 158–172) зараз пояснює, чому
брейкпойнтів немає — переписати під нову логіку.

---

## 7.1 Everything Grid → колонки з верстки

`resources/scss/editor.scss`:

- `@media (max-width: 992px)` → `.everything__list .block-editor-block-list__layout { grid-template-columns: repeat(3, 1fr) }`
- `@media (max-width: 768px)` → `repeat(2, 1fr)`
- переписати коментар «Deliberately breakpoint-free at 4 columns…» — він тепер
  неактуальний, і саме він пояснював проблему з рамками.

Далі за завданням — «привести адаптацію айтемів у порядок»: після зміни колонок
перевірити падінги `.item-everything`, які в дизайні теж змінюються ≤768
(`padding-inline: 0`, `odd → padding-inline-end: .5rem`,
`2n → padding-inline-start: .5rem`). Вони приходять із `blocks.css` і мають
підхопитися автоматично — треба підтвердити візуально.

---

## 8.1 Steps → плейсхолдери

`blocks/steps/block.json`:

- `title: "Section title goes here"` → `""`
- `subtitle: "Short subtitle goes here."` → `""`
- `steps.default` — лишити 4 айтеми (у дизайні їх саме 4), але `label: "Step title"` → `""`

`blocks/steps/edit.js`:

- `IconListControls defaultItem.label: "Step title"` → `""`
- додати `placeholder` у `IconListControls` (див. П1)
- у полотні `RichText placeholder="Step title"` уже є ✅

---

## 9.1 Integration Steps → 3 айтеми за замовчуванням

У дизайні `.steps__list` має рівно **3** `.item-steps` (`aviation.html`,
`igaming.html`) — запит збігається з версткою.

`blocks/integration-steps/block.json`: `steps.default: []` →

```json
[
  { "iconId": 0, "iconUrl": "", "title": "", "text": "" },
  { "iconId": 0, "iconUrl": "", "title": "", "text": "" },
  { "iconId": 0, "iconUrl": "", "title": "", "text": "" }
]
```

(форма об'єкта — з `createStep()` у `edit.js`, щоб ключі збігалися)

Перевірити `translate.json` — репітер `steps` має бути описаний за правилами
DeepL-репітера.

---

## 10.1 Tab → плейсхолдери

`blocks/tabs/block.json`: `title: "Fast Settlements"` → `""`

`blocks/tabs/tab/block.json`:

- `tabLabel: "Tab title"` → `""`
- `heading: "Tab heading"` → `""`
- `buttonText: "Book a Demo"` → `""`

`blocks/tabs/tab/edit.js`: у `TextSettingsControls` для `tabLabel` додати
`placeholder` (див. П1).

`resources/views/blocks/tabs.blade.php`: fallback порожнього `tabLabel` (див. П2).

---

## 11.1 Badges → плейсхолдери

`blocks/badges/block.json`:

- `title: "Section title goes here"` → `""`
- `badges.default` — лишити 3 айтеми, `label: "Badge title"` → `""`

`blocks/badges/edit.js`: `defaultItem.label` → `""` + `placeholder` у контролі.

---

## 12.1 Tag List → 3 теги за замовчуванням

`blocks/tag-list/block.json`: `tags.default: []` →
`[ { "label": "" }, { "label": "" }, { "label": "" } ]`

`blocks/tag-list/edit.js`: `defaultItem: { label: "New tag" }` → `{ label: "" }`
плюс `placeholder` у `TagListControls` (див. П1).

Примітка: у дизайні (`control-treasury`, `move-money`) тегів по **7**, але
3 як стартова кількість — нормальний компроміс, щоб блок не був порожній.

Перевірити Blade: `<li class="modern__tag">{{ esc_html( $tag['label'] ) }}</li>` —
порожні теги дадуть порожні пігулки на фронті. Додати фільтр порожніх, як уже
зроблено в `duo` для логотипів.

---

## 13.1 Accordion → `.paid__tabs` на всю ширину (не-десктоп)

**Причина знайдена — це баг дизайн-CSS, який б'є і по фронту, і по редактору:**

```css
.paid__tabs { grid-area: 2/1/3/2; align-self: end }

@media (max-width: 992px) {
  .paid__layout { display: flex; flex-direction: column; align-items: stretch }
  .paid__heading, .paid__splide, .paid__tabs { grid-area: auto }
  /* align-self: end НЕ скинутий */
}
```

У флекс-колонці `align-self: end` перебиває `align-items: stretch` контейнера →
колонка табів стискається по контенту замість повної ширини.

**Правка:** `resources/scss/blocks.scss` (там, де живуть ручні оверрайди нижче
`@use 'styles'`; `main.css` / `styles.scss` правити не можна):

```scss
@media screen and (max-width: 992px) {
	.paid__tabs {
		align-self: stretch;
	}
}
```

Діє і на фронт, і на полотно редактора (`editor.scss` імпортує `blocks.scss`).

---

## 14.1 FAQ → 3 айтеми за замовчуванням

`blocks/faq/block.json`: `items.default: []` →
`[ { "question": "", "answer": "" }, { ... }, { ... } ]` (форма — з `createItem()`).

У дизайні (`integrations.html`) питань 6; 3 як старт — нормально.

---

## 15.1 Mosaic → адаптація

`resources/scss/editor.scss`, `@media (max-width: 992px)`:

```scss
.layer__cards .block-editor-block-list__layout {
	grid-template-columns: 1fr;
	grid-template-rows: none;
}
```

`.card-layer.big` / `.img-top` отримають `grid-area: auto` з `blocks.css`
автоматично (те саме медіа). Перевірити візуально — саме через цю зв'язку
раніше брейкпойнтів не робили.

---

## 16.1 Moves Mosaic → адаптація (обидва варіанти)

`resources/scss/editor.scss`, `@media (max-width: 992px)`:

```scss
.moves__list .block-editor-block-list__layout {
	grid-template-columns: 1fr;
}
```

Скидання `grid-column` / `grid-row` для `wide` / `tall-first` / `tall-last`
теж приходить із `blocks.css` у тому ж медіа. Додатково в дизайні на ≤992:
`tall-first { padding-block-end: 10.5rem }`, `tall-last { justify-content: start;
padding-block-start: 10.5rem }` — перевірити, що вони доїжджають у полотно.

## 16.2 Moves Mosaic → приховати `.card-moves__bg` у `wide` (редактор)

`resources/scss/editor.scss` (не в `blocks.scss` — має лишитися тільки в адмінці):

```scss
.card-moves.wide .card-moves__bg {
	display: none;
}
```

`editor.css` вантажиться і в полотно, і в прев'ю інсертера → покриває обидві
вимоги. Фронт не зачіпається.

Альтернатива — прибрати `<div className="card-moves__bg">` із
`moves-card/edit.js`, але тоді DOM редактора розійдеться з Blade; CSS чистіший.

---

## 17.1 Manage Cards → адаптація

`resources/scss/editor.scss`, `@media (max-width: 992px)`:

```scss
.manage__cards .block-editor-block-list__layout {
	grid-template-columns: 1fr;
}
```

(дизайн: `.card-manage { max-width: 100% }` на ≤992 — тобто одна колонка)

---

## 18.1 Locations → плейсхолдер зображення як у Promo Slider

`blocks/locations/location-card/edit.js`:

```js
const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/card-visual.png";
```

→ `resources/placeholders/slide-visual.webp` (6.5 KB — той, що доданий для
Promo Slider), замість `card-visual.png` (39 KB).

Прев'ю в інсертері використовує той самий `edit.js` → покривається однією зміною.

Побічно: `card-visual.png` лишиться у `showcase-card` і `mosaic-card`. Якщо ціль
— єдиний плейсхолдер усюди, це окреме завдання (скажи — додам).

---

## 19.1 Spotlight → плейсхолдери

`blocks/spotlight/block.json`:
`title: "<span>Full Control</span> Over<br />How Money Moves"` → `""`
(це прямий текст із дизайну — саме той випадок, який забороняє PLUGIN.md
§ «Placeholders, not dummy defaults»)

`blocks/spotlight/spotlight-card/block.json`:

- `title: "Feature title"` → `""`
- `text: "Short feature description goes here."` → `""`

`edit.js` — плейсхолдери вже є ✅. Додати `example.attributes` у
`spotlight/block.json`, щоб прев'ю не було порожнім.

---

## 20.1 Connect → адаптація

`resources/scss/editor.scss`:

- `@media (max-width: 992px)` → `.connect__cards .block-editor-block-list__layout { grid-template-columns: repeat(2, 1fr) }`
- `@media (max-width: 768px)` → `1fr`

---

## 21.1 Duo → плейсхолдери

`blocks/duo/block.json`:

- `title: "Move Funds Globally -<br />Without Friction"` → `""`
- `text: "Send individual or bulk crypto payments…"` → `""`

`blocks/duo/duo-card/block.json`:

- `title: "Card title"` → `""`
- `text: "Short card description goes here."` → `""`

---

## 21.2 Duo → винести стан «Logos» в окремий блок

**Обґрунтування версткою — підтверджено, лейаути справді різні:**

| | `cards` (index.html) | `platforms` (aviation, platform-overview) |
|---|---|---|
| список | `.funds__cards` — `flex-wrap; gap:1rem` | `.funds__platforms` — `flex-wrap; justify-content:center; gap:1.5rem` (≤992 `.5rem`) |
| айтем | `.card-funds` → `__inner` → `__icon` + `__box` (tl4 + txt4) | `.platforms-funds` → `__logo` (лише `<img>`) |
| ширина айтема | `calc((100% - 1rem)/2)`, ≤768 → 100% | `calc((100% - 3rem)/3)`, ≤992 → `calc((100% - .5rem)/2)`, ≤768 → 100% |
| джерело даних | InnerBlocks (`overchain/duo-card`) | репітер-атрибут `platforms` |

Спільне — тільки обгортка секції `.funds` + `.heading`.

**План:**

1. **Новий блок** за чеклистом PLUGIN.md § Creating a New Block:
   - `blocks/<slug>/block.json` — атрибути `noPaddingTop`, `title`, `text`,
     `platforms` (array)
   - `index.js`, `edit.js` (heading + `ImageListControls` + прев'ю логотипів —
     переносяться з `duo/edit.js` майже без змін)
   - `render.php` → `View::render('blocks.<slug>')`
   - `translate.json` (репітер `platforms`)
   - `resources/views/blocks/<slug>.blade.php` — переноситься гілка
     `'platforms' === $layout` із `duo.blade.php`, разом із фільтром порожніх
     `imageUrl`
   - додати slug у масив `$order` у `overchain-blocks.php` — **одразу після
     `'duo'`**, щоб блоки стояли поруч в інсертері
   - `npm run build`

   **Назва — потрібне твоє рішення.** `Logos` зайнято
   (`overchain/logos` = секція `.platform` з `item-platform`). Варіанти:
   - `overchain/logo-grid` — «Logo Grid» ← рекомендую
   - `overchain/partners` — «Partners»
   - `overchain/platforms` — «Platforms» (ближче до класів `platforms-funds`,
     але плутається з `.platform__list` існуючого Logos)

2. **Чистка Duo:** прибрати `layout` і `platforms` з `block.json`, прибрати
   `SelectControl` «Content» та `ImageListControls` з `edit.js`, прибрати гілку
   `platforms` з `duo.blade.php`, оновити `translate.json`.

3. **Міграція контенту (обов'язково перед кроком 2).** Якщо десь збережено
   `overchain/duo` з `layout:"platforms"`, після чистки логотипи зникнуть.
   Порядок: спершу знайти в БД
   (`SELECT ID, post_title FROM wp_posts WHERE post_content LIKE '%overchain/duo%'`),
   переконатися, що таких сторінок немає (або перенести вручну), і лише тоді
   видаляти атрибути. Якщо контент знайдеться — робимо `deprecated`-міграцію
   замість видалення.

---

## 22.1 Promo (+ наскрізне) → «Use less top padding» першим

Див. П4 — повний список порушників. Правка однотипна: підняти
`<SectionSettingsControls>` першим елементом усередині `<InspectorControls>`.

Файли: `blocks/promo/edit.js`, `blocks/split/edit.js` (= 5.2),
`blocks/accordion/edit.js`, `blocks/subscribe/edit.js`, плюс перевірка
`blocks/duo/edit.js` після 21.2.

Зміна суто декларативна — порядок JSX, без логіки. Ризик нульовий, але після
неї потрібен `npm run build`, бо це `edit.js`.

---

## 23.1 Process Slider → адаптація

`resources/scss/editor.scss`:

- `@media (max-width: 992px)` → `.accept__splide .block-editor-block-list__layout { grid-template-columns: repeat(2, 1fr); gap: 1rem }`
- `@media (max-width: 768px)` → `grid-template-columns: 1fr`

Джерело значень — конфіг Splide (`perPage: 4 / 2 / 1`, `gap: 1.5rem / 1rem`),
див. таблицю в П3. Коментар над правилом `.accept__splide` зараз пояснює, чому
брейкпойнтів немає — переписати.

`.card-accept { max-width: none }` в `editor.scss` лишається: у сітці редактора
ширину дає комірка, а не Splide.

---

## 24.1 Testimonials → `.testimonials__window` на всю ширину

**Причина знайдена — це наш власний оверрайд у редакторі; фронт у порядку.**

Верстка на ≤992:

```
.testimonials__main   { flex-direction: column }   /* align-items за замовчуванням stretch */
.testimonials__img    { width: 100%; padding-block-start: 50% }
.testimonials__window { min-width: auto; overflow: visible }
.testimonials__splide { width: 100% }
```

Тобто на фронті колонка тягне дочірні елементи на всю ширину автоматично.

А в `editor.scss` стоїть:

```scss
.testimonials__main { align-items: flex-start; }
```

(додано, щоб бічне фото не розтягувалося на висоту стопки слайдів). Саме воно
перебиває `stretch`, і при переході в колонку `.testimonials__window`
стискається по контенту.

**Правка:** обмежити оверрайд десктопом і повернути розтягування нижче 992:

```scss
@media screen and (max-width: 992px) {
	.testimonials__main   { align-items: stretch; }
	.testimonials__window { width: 100%; }
	.testimonials__splide { width: 100%; }
}
```

Якщо після перевірки виявиться, що щілина є і на фронті — той самий
`width: 100%` дублюємо в `blocks.scss`. За поточним CSS цього не потрібно.

---

## 25.1 Slider Cards → плейсхолдери

`blocks/slider-cards/block.json`:
`title: "Built for Businesses<br /><span>Operating Globally</span>"` → `""`
(прямий текст із дизайну)

`blocks/slider-cards/slider-card/block.json`: `title: "Card title"` → `""`

`edit.js` — плейсхолдери вже є (`Section title`, `Card title` ×2) ✅.

Заразом: `example.attributes` у дитини містить `"title": "Card title"` — це
коректно, прев'ю має власний текст і в контент він не потрапляє. Парентові
`example.attributes` бракує — додати.

Плейсхолдер зображення тут `card.png` (13 KB) — окремий від `card-visual.png`
і `slide-visual.webp`. Відкрите питання 6 стосується і його.

---

## 26.1 Past Events (**блок теми**) → заголовок у канві

Файли: `wp-content/themes/overchain/blocks/past-events/` —
`block.json`, `edit.js`, `render.php`, `translate.json`.

Зараз заголовок редагується **лише в сайдбарі** (`TextControl`), у канві це
статичний `<h2>{title}</h2>`, дефолт — `"Past Events"`.

**Правки:**

1. `block.json`: `title.default: "Past Events"` → `""`
2. `edit.js`:
   - замінити `<h2 className="tl2">{title}</h2>` на `RichText` з
     `tagName="h2"`, `className="tl2"`,
     `placeholder={__('Section title', 'overchain')}`
   - прибрати `TextControl` «Title» із `PanelBody` — заголовок тепер
     редагується в канві; у сайдбарі лишається тільки `postsPerPage`
   - зняти умову `{title && ...}`, інакше при порожньому заголовку в канві
     нема куди клікнути, щоб почати вводити
3. `render.php`: зараз `sanitize_text_field( $attributes['title'] )` з
   fallback `__( 'Past Events', 'overchain' )` і вивід через `esc_html()`.
   Для RichText це неправильно — перейти на `wp_kses_post()` (конвенція
   плагіна для RichText) і прибрати fallback-текст: порожній заголовок має
   ховати `.heading`, як у решті блоків.
4. `translate.json`: `"title": { "translate": "string" }` → `"rich"`
5. **Збірка теми**, не плагіна:
   `cd wp-content/themes/overchain && npm run blocks:build`.
   Вихід (`blocks/past-events/build/`) комітиться в репозиторій.

Міграція: сторінки з уже збереженим блоком мають `title: "Past Events"` у
власних атрибутах — вони не зміняться, новий дефолт діє лише на нові вставки.
Зворотної несумісності немає.

---

## 27.1 Quote → перейменувати

`blocks/quote/block.json`: `"title": "Quote"` → `"Designed Quote"`.

**Змінюємо тільки `title`.** `name` (`overchain/quote`), теку, Blade і клас
`.emb` не чіпаємо — перейменування slug зламало б увесь збережений контент.

⚠️ У завданні написано «Designed **Quete**» — схоже на одрук. Беру
«Designed Quote». **Підтверди, якщо навмисно.**

Побічно (не в завданні — скажи, чи робити): у Quote дефолти це прямий текст
із дизайну — `quote: "Traditional banking systems…"`, `author: "Tyler Betts"`,
`position: "Chief Compliance Officer"`. Той самий випадок, що 3.1 / 19.1 / 25.1.

---

# План виконання

Порядок продиктований **типом файлу і вартістю перевірки**, а не нумерацією
завдань. Логіка групування:

1. **Один тип файлу за раз.** SCSS, `block.json`, `edit.js` — різні режими
   мислення й різні способи перевірки. Перемикатися між ними на кожному блоці
   означає тричі проходити один і той самий шлях.
2. **Одна збірка на етап.** `npm run build` — єдина точка, після якої редактор
   бачить зміни. 27 завдань окремими збірками = 27 холостих циклів.
3. **Одна сесія перевірки на етап.** Відкрити редактор і пройти всі змінені
   блоки на трьох ширинах — дешевше одним заходом, ніж по одному блоку.
4. **Ризик зростає до кінця.** Спершу те, що не може зламати фронт; у кінці —
   рефактор із міграцією контенту та блок теми з іншою збіркою.

Етапи 1–3 **незалежні між собою** — можна міняти місцями. Етапи 4–5 залежать
від рішень із розділу «Відкриті питання».

---

### Етап 0 — передумови (без збірки)

| Крок | Що робимо |
|---|---|
| 0.1 | Відповіді на 8 відкритих питань — без них етапи 3–5 стоять |
| 0.2 | `git status` у плагіні: зараз там близько 30 незакомічених файлів — зафіксувати стан перед стартом |
| 0.3 | **Бекап теми**: тема не під git. Перед 26.1 копіюємо `blocks/past-events/` |
| 0.4 | ✅ **Виконано.** Перевірка БД: збережений `overchain/duo` з `layout:"platforms"` **є** — див. нижче |

**Результат кроку 0.4 (важливо для Етапу 4).** У БД `overchainnew` знайдено
**чотири опубліковані сторінки** з `overchain/duo` у стані `layout:"platforms"`:

| ID | Сторінка |
|---|---|
| 661 | Platform Overview |
| 726 | Aviation |
| 738 | Yachting |
| 742 | Real estate |

Ще три сторінки використовують `overchain/duo` у стані `cards` (Home, Pagrindinis
puslapis) — їх рефактор не зачіпає.

**Стоп-умова з розділу 21.2 спрацювала:** просто прибрати `layout` і `platforms`
не можна — на цих чотирьох сторінках логотипи зникнуть. Етап 4 виконується у
варіанті з міграцією: спершу новий блок, потім перенесення контенту на цих
сторінках (вручну або скриптом), і лише потім чистка Duo.

---

### Етап 1 — CSS редактора (2 файли, 1 збірка) — найшвидший видимий результат

**10 завдань, 2 файли, нульовий ризик для фронту** (крім 13.1, який фронт
чіпає свідомо).

| Завдання | Файл |
|---|---|
| 6.1 Showcase | `resources/scss/editor.scss` |
| 7.1 Everything | `editor.scss` |
| 15.1 Mosaic | `editor.scss` |
| 16.1 Moves | `editor.scss` |
| 16.2 Moves — фон у `wide` | `editor.scss` |
| 17.1 Manage | `editor.scss` |
| 20.1 Connect | `editor.scss` |
| 23.1 Process Slider | `editor.scss` |
| 24.1 Testimonials | `editor.scss` |
| 13.1 Accordion `.paid__tabs` | `resources/scss/blocks.scss` (фронт + редактор) |

Разом із правилами переписуються коментарі «Deliberately breakpoint-free…» —
після цього етапу вони перестають бути правдою.

**Збірка:** `npm run build`
**Перевірка:** один прохід по 9 блоках у редакторі на Desktop / Tablet / Mobile
плюс фронтова перевірка Accordion на ≤992 — єдине, що виходить за межі адмінки.

---

### Етап 2 — дефолти, плейсхолдери, стартові айтеми (1 збірка)

**12 завдань.** Спершу спільні компоненти, потім блоки — інакше половину
доведеться переробляти.

| Крок | Завдання |
|---|---|
| 2.0 | **П1** — `placeholder` у `TagListControls`, `IconListControls`, `TextSettingsControls` |
| 2.1 | Плейсхолдери: 3.1 Hero · 8.1 Steps · 10.1 Tab · 11.1 Badges · 19.1 Spotlight · 21.1 Duo · 25.1 Slider Cards |
| 2.2 | **П2** — fallback порожнього `tabLabel` у `tabs.blade.php` |
| 2.3 | Стартові айтеми: 9.1 Integration Steps · 12.1 Tag List · 14.1 FAQ |
| 2.4 | Фільтр порожніх айтемів у Blade там, де його ще немає (Tag List — точно) |
| 2.5 | 27.1 Quote — `title: "Designed Quote"`, одне поле в `block.json`, їде разом |

Для кожного блока: `block.json` → `edit.js` → звірка `translate.json` →
`example.attributes`, щоб прев'ю в інсертері не стало порожнім.

**Збірка:** `npm run build`
**Перевірка:** вставити кожен змінений блок наново — має з'явитися порожнім
з підказками; відкрити інсертер — прев'ю не порожні; відкрити сторінку зі
старим контентом — нічого не змінилося.

---

### Етап 3 — сайдбар: мітки, `help`, порядок панелей (1 збірка)

**13 завдань, усі в `edit.js`**, жодної зміни в розмітці чи Blade. Найбезпечніший
етап: помилка видима одразу і не псує контент.

| Крок | Завдання |
|---|---|
| 3.1 | Порядок панелей (**П4**): 22.1 Promo · 5.2 Split · Accordion · Subscribe |
| 3.2 | Lead: 1.1 (+ `label`) · 1.2 · 1.3 · 1.4 |
| 3.3 | Intro: 2.1 · 2.2 |
| 3.4 | Features 4.1 · Split 5.1, 5.3 · Locations 18.2 |
| 3.5 | 18.1 Locations — плейсхолдер зображення на `slide-visual.webp` |

**Збірка:** `npm run build`
**Перевірка:** пройти сайдбар кожного з 8 блоків — мітки читаються без здогадок,
панель відступів скрізь перша.

---

### Етап 4 — новий блок із Duo (окремо, 1 збірка)

**21.2** — єдине завдання етапу, бо єдине з міграцією контенту.

| Крок | Що |
|---|---|
| 4.1 | Створити блок за чеклистом PLUGIN.md (7 файлів + `$order` в `overchain-blocks.php`) |
| 4.2 | `npm run build` — **обов'язково повна**, не `start`: новому блоку потрібен `index.asset.php` |
| 4.3 | Перевірити, що блок з'явився в інсертері одразу після Duo |
| 4.4 | Тільки після 4.3 — чистка Duo (`layout`, `platforms`, `SelectControl`, гілка Blade, `translate.json`) |
| 4.5 | Перевірити порядок панелей у Duo після чистки (П4) |

Стоп-умова: якщо крок 0.4 знайшов збережений контент із `layout:"platforms"` —
чистка Duo відкладається, робимо `deprecated`-міграцію.

---

### Етап 5 — блок теми (інша збірка)

**26.1 Past Events.** Виноситься окремо: інший простір файлів, інша команда
збірки, інший спосіб доставки — вихід комітиться.

| Крок | Що |
|---|---|
| 5.1 | Бекап теки (тема не під git — див. 0.3) |
| 5.2 | `block.json` → `edit.js` → `render.php` → `translate.json` |
| 5.3 | `cd wp-content/themes/overchain && npm run blocks:build` |
| 5.4 | Відкрити сторінку з уже вставленим блоком — заголовок має лишитися |

---

### Етап 6 — документація і фінальна перевірка

| Крок | Що |
|---|---|
| 6.1 | `PLUGIN.md` § Existing Blocks — новий блок із Duo |
| 6.2 | `PLUGIN.md` § Known Conventions — правило про брейкпойнти в `editor.scss` (замінює «breakpoint-free») + правило «`SectionSettingsControls` завжди перша панель» |
| 6.3 | `PLUGIN.md` § Technical Debt — зняти пункт, якщо щось із нього закрите |
| 6.4 | `BLOCKS.md` — Lead / Split / Features / Locations: оновити опис опцій за Частиною A |
| 6.5 | Цей файл — проставити ✅ і винести підсумок |
| 6.6 | Фінальний `npm run build` + перевірка `build/<name>/index.asset.php` для нового блока |

---

## Критерії готовності завдання

За зразком BLOCK-QUEUE.md, щоб «зроблено» означало одне й те саме:

1. **Збірка проходить** — `npm run build` без помилок.
2. **Звірка з версткою** — зміна відповідає `_desigh/dist`, а не здогадці.
3. **Smoke-рендер усіх гілок** — якщо блок має варіанти (`layout`, `variant`,
   `enable*`), відкрити кожен.
4. **`translate.json`** оновлений, якщо чіпали атрибути.
5. **Документація** оновлена, якщо змінилася поведінка.
6. **Перевірка в редакторі людиною** — у чергу не входить, робиш коли зручно.

## Якщо потрібен результат за один захід

Бери **Етап 1**: 10 із 27 завдань, два файли, одна збірка — і саме те, що
найпомітніше в щоденній роботі редактора. Етапи 2 і 3 можна робити після нього
в будь-якому порядку.

---

# Відкриті питання

1. **Lead `bg3`** — лишаємо опцію (не використана в дизайні, але CSS існує)
   чи прибираємо з випадашки?
2. **Locations «Show decor»** — лишаємо (як `faq` / `cards`), прибираємо, чи
   прибираємо в усіх трьох блоках разом?
3. **Адаптація в редакторі** — media queries (як зараз у файлі) чи container
   queries (точніше при відкритому сайдбарі, але треба перерахувати пороги)?
4. **Назва нового блока** з Duo-логотипів: `Logo Grid` / `Partners` / `Platforms`?
5. **Мова міток у сайдбарі** — зараз усе англійською через `__()`. Перейменування
   з Частини A роблю англійською чи переходимо на українську?
6. **Єдиний плейсхолдер зображення** — міняти на `slide-visual.webp` лише в
   Locations (як у завданні), чи одразу всюди (`showcase-card`, `mosaic-card`,
   `slider-card`)?
7. **«Designed Quete»** — це одрук і мається на увазі «Designed Quote»?
8. **Дефолтні тексти з дизайну в Quote, Accordion, Tabs.** У завданнях їх немає,
   але це той самий випадок, що Hero / Spotlight / Slider Cards:
   `"Get Paid in Crypto"`, `"Widgets"` / `"Payment Links"` / `"Invoices"`,
   `"Fast Settlements"`, `"Tyler Betts"`. Чистимо заразом в Етапі 2 чи лишаємо?

---

# Рішення по відкритих питаннях (прийнято)

| # | Питання | Рішення |
|---|---|---|
| 1 | Lead `bg3` | **Прибрати** опцію з випадашки. Blade лишає підтримку класу для збереженого контенту |
| 2 | Locations «Show decor» | **Прибрати** — тільки з Locations. У `faq` і `cards` світчер лишається |
| 3 | Адаптація в редакторі | На мій розсуд → **media queries** (реалізовано в Етапі 1) |
| 4 | Назва нового блока з Duo | **Logo Grid** (`overchain/logo-grid`) |
| 5 | Мова міток | **Англійська**, як зараз — через `__()` |
| 6 | Плейсхолдер зображення | **Тільки Locations** |
| 7 | «Designed Quete» | Одрук → **«Designed Quote»** |
| 8 | Дефолти в Quote / Accordion / Tabs | **Чистимо теж** — додано як 27.2 і 28.1 |

---

# Аудит дефолтів перед Етапом 2 (виконано)

WordPress серіалізує лише ті атрибути, що **відрізняються** від дефолту. Якщо
редактор не чіпав поле, воно в контенті сторінки відсутнє, і блок бере його з
`block.json`. Отже очищення дефолту **стирає текст на живих сторінках**, які на
цей дефолт покладаються.

Перед правками весь контент БД (36 сторінок із блоками Overchain) розібрано на
блоки з перевіркою, які атрибути відсутні в збереженому JSON.

## Безпечно (0 сторінок покладаються на дефолт) — зроблено

`steps` · `badges` · `spotlight` + `spotlight-card` · `slider-cards` +
`slider-card` · `duo` (парент) · `feature-card` · `hero.title` /
`hero.subtitle` · `tab.tabLabel` / `tab.heading` · `accordion.title` /
`accordion.items[].heading`

## Потребує міграції контенту — **не чіпав**

| Атрибут | Поточний дефолт | Блоків | Сторінки |
|---|---|---|---|
| `accordion.subtitle` | «Unlock Seamless Crypto Transactions» | 6 | 12 Home, 629 Integrations, 661 Platform Overview, 696 MONEY MOVEMENT, 726 Aviation, 738 Yachting |
| `tabs.title` | «Fast Settlements» | 1 | 12 Home |
| `tab.buttonText` | «Book a Demo» | 4 | 12 Home |
| `hero.buttonText` | «Book a Demo» | 1 | 12 Home |
| `split.buttonText` | «See how it works» | 2 | 12 Home, 305 «Еуіе» |
| `cards.title` | «Built for Secure, Compliant Operations» | 1 | 12 Home |
| `quote.author` | «Tyler Betts» | 10 | 419, 606, 620–627 |
| `quote.quote` + `position` | текст із дизайну | 1 | 85 |
| `card.title` / `card.text` | «Card title» / «Short card description…» | 4 | 661 Platform Overview |
| `duo-card.title` / `text` | «Card title» / «Short card description…» | 8 | 661, 726, 738, 742 |

Дві різні категорії:

- **Осмислений текст**, який редактор прийняв як є (`accordion.subtitle`,
  `tabs.title`, кнопки, `cards.title`, `quote.author`) — зникне зі сторінок.
- **Явна заглушка**, яку редактор просто не заповнив (`card`, `duo-card`) —
  зараз вона **видима на живих сторінках** і має зникнути в будь-якому разі,
  але 12 карток спорожніють одночасно.

**Варіанти:**

1. **Міграція** — скриптом записати поточні дефолти в ті блоки, що на них
   покладаються, і тільки потім чистити `block.json`. Нічого не зникає;
   заглушки («Card title») лишаються на сторінках, доки редактор їх не замінить.
2. **Міграція вибірково** — зберегти осмислений текст, а заглушки лишити
   зникати (сторінки 661, 726, 738, 742 покажуть порожні картки).
3. **Без міграції** — чистимо все, редактор дозаповнює вручну.

У будь-якому разі це **запис у БД по живих сторінках**, тому чекає підтвердження.

---

# Зроблено в Етапі 2

### Спільні компоненти (П1)

- `components/TagListControls.js` — новий проп `placeholder` → `TextControl`
- `components/IconListControls.js` — те саме + `defaultItem.label` тепер `""`
- `components/TextSettingsControls.js` — **зміни не потрібні**: проп
  `placeholder` у ньому вже підтримувався per-control

### Дефолти → плейсхолдери

| Блок | Що очищено | Що додано |
|---|---|---|
| Steps | `title`, `subtitle`, 4 × `steps[].label` | `placeholder` у `IconListControls`, фільтр порожніх кроків у Blade |
| Badges | `title`, 3 × `badges[].label` | `placeholder` у контролі (Blade уже фільтрував порожні) |
| Spotlight | `title`, картка: `title` + `text` | `example.attributes` парента й дитини |
| Slider Cards | `title`, картка: `title` | `example.attributes` парента |
| Duo (парент) | `title`, `text` | `example.attributes` |
| Hero | `title`, `subtitle` | `example.attributes`, кнопка в канві тепер під умовою `buttonText` |
| Accordion | `title`, 3 × `items[].heading`, `createItem()` | `placeholder` у контролі Heading |
| Tab | `tabLabel`, `heading` | `placeholder` у `TextSettingsControls`, **П2** — fallback `Tab N` у `tabs.blade.php` |

### Стартові айтеми репітерів

- Integration Steps — 3 порожні кроки (у дизайні їх рівно 3) + фільтр порожніх у Blade
- Tag List — 3 порожні теги (Blade уже фільтрував) + `placeholder` у контролі
- FAQ — 3 порожні питання (Blade уже фільтрував)

### Інше

- Quote — `title` блока «Quote» → **«Designed Quote»** (27.1). `name`, тека й
  Blade не змінювались

### Збірка

`npm run build` — успішно. Усі `block.json` валідні, дефолти перевірені.

---

# Що лишилось

| Етап | Завдання | Стан |
|---|---|---|
| 2 (хвіст) | 27.2 Quote, 28.1 Accordion `subtitle`, `hero.buttonText`, `tabs.title`, `tab.buttonText`, `duo-card`, `cards.title`, `split.buttonText` | чекає рішення по міграції |
| 3 | Сайдбар: 1.1–1.4, 2.1, 2.2, 4.1, 5.1, 5.2, 5.3, 18.1, 18.2, 22.1 | готове до старту — усі рішення є |
| 4 | 21.2 Logo Grid + міграція 4 сторінок | назва є, міграція обов'язкова |
| 5 | 26.1 Past Events (тема) | готове до старту |
| 6 | Документація | після 3–5 |

---

# Міграція контенту (виконано)

Обрано **варіант 1** — записати поточні дефолти в збережений контент, і тільки
потім чистити `block.json`. Нічого не зникло.

### Як зроблено

- Бекап: `wp_posts` → `wp_posts-backup-20260915-164514.sql` (1.9 МБ, у скретчпаді)
- Скрипт: `migrate-defaults.php` (PHP + `wp-load.php`), значення читаються
  **з `block.json`**, а не задані в скрипті — тому не можуть розійтися з тим, що
  блоки реально рендерять
- JSON делімітерів перезбирається рідною `serialize_block_attributes()`, тож
  екранування (`<`, `"`) лишається тим самим, що й у решті контенту
- Межі JSON шукаються посимвольним сканером із урахуванням рядків і екранів —
  регулярка ламалася б на вкладених об'єктах (`items` в акордеоні)

### Запобіжник перед записом

`verify-all.php` прогнав патч по всіх зачеплених постах і перевірив:

| Перевірка | Результат |
|---|---|
| Пости зачеплені | 20 |
| Делімітерів пропатчено | 53 |
| Змін поза рядками-делімітерами | **0** |
| Зміна кількості рядків | **0** |
| Невалідний JSON у делімітерах | **0** |

→ `GATE: PASS`, після чого запуск із `--apply`.

### Що записано

| Атрибут | Блоків |
|---|---|
| `quote.author` | 11 |
| `duo-card.title` / `.text` | по 10 |
| `card.title` / `.text` | по 8 |
| `tab.buttonText` | 8 |
| `accordion.subtitle` | 7 |
| `split.buttonText` | 3 |
| `cards.title` · `hero.buttonText` · `tabs.title` | по 2 |
| `quote.quote` · `quote.position` | по 1 |

Повторний прогін: `posts touched: 0` — міграція ідемпотентна.

### Перевірка після чистки дефолтів

`verify-render.php` рендерить зачеплені сторінки й шукає рядки, які раніше
приходили з дефолтів: **усі на місці**. Три «пропуски» на Aviation / Yachting /
Real estate — хибні: там Duo у стані `platforms`, і картки не рендеряться взагалі
(перевірено окремо: атрибути в них записані коректно).

### Побічна знахідка → завдання 29.1

Аудит усіх «текстових» дефолтів плагіна показав ще вісім блоків із дизайнерським
текстом у `block.json`, яких немає в черзі:

| Блок | Атрибути | Блоків покладаються на дефолт |
|---|---|---|
| `promo` | title, text, buttonText | 1 / 1 / 7 |
| `form` | title, subtitle, buttonText | 3 / 3 / 3 |
| `feature-card` | title, text | 4 / 4 |
| `cards` | buttonText | 3 |
| `subscribe` | title, subtitle | 1 / 2 |
| `related-posts` | title | 1 |
| `split` | title, subtitle, text | 1 |
| `card` | title, text | 0 (уже змігровано) |

Скрипт міграції готовий і параметризований — додати ці блоки в `$MAP` і прогнати
ще раз. **Чекає рішення.**

---

# Зроблено в Етапі 3

### Порядок панелей (П4 · 22.1 · 5.2)

`SectionSettingsControls` піднято першою панеллю в `promo`, `split`, `accordion`,
`subscribe`, `duo`. Перевірено скриптом по всіх 37 блоках, що використовують
компонент: **порушників 0**.

### Lead

| Контрол | Було | Стало |
|---|---|---|
| Background | без `label` | `label: Background type` + `help` |
| — опції | 4 речення, серед них невикористаний `bg3` | `Glow only, no image` · `Image at the bottom` · `Image at the top`; **`bg3` прибрано з пікера**, Blade і далі рендерить клас для збереженого контенту |
| Bottom spacing | «No / Normal / Larger» — усі три назви неточні | `Small — 3.5rem (4rem on mobile)` · `Standard — 5.5rem (4rem on mobile)` · `Base — 5.5rem at every width` + `help` про різницю лише до 992px |
| Taller section | без пояснення | `help` із фактичними 41.875rem / 35.625rem |
| Lead text weight | назва не казала, що це лише перший абзац | `Main text weight` + `help` про перший абзац і поріг 992px |

### Intro

- `Content` → `Content layout` + `help`
- опції: `Text left, space reserved for the background` · `Text centred` ·
  `Text left, side image`
- `Crop background to fill` → `Stretch background to cover`, `help` уточнено

### Features · Split

- Features: `Show blur` → **`Show background glow`** (не плутати з `page-blur` у Lead)
- Split: `Show glow` → **`Show background glow`** — та сама назва для того самого ефекту
- Split: `Small, muted` → `Accent colour, smaller on mobile` (було неточно двічі:
  `col-alt1` — акцентний колір, а зменшення діє лише ≤992)

### Locations

- **18.2** — світчер `Show decor` прибрано разом з атрибутом `enableDecor`
  (`block.json`, `translate.json`, `edit.js`, Blade). Декор тепер безумовний.
  Перевірено: в БД немає жодного блока з `"enableDecor":false`, тож фронт не
  змінився. У `faq` і `cards` світчер лишився — за рішенням
- **18.1** — плейсхолдер картки: `card-visual.png` (39 КБ) →
  `slide-visual.webp` (6.5 КБ), той самий, що в Promo Slider

### Перевірка

- `npm run build` — успішно
- Зібрані бандли: `Background type` присутній, `bg3` відсутній, `Show decor` і
  `enableDecor` зникли з `locations`, нові назви на місці
- `verify-front.php` — рендер Locations (декор + картки), Intro, Duo-platforms,
  Accordion: чисто, без Blade-помилок

---

# 21.2 Duo → Logo Grid (виконано)

### Новий блок `overchain/logo-grid` — «Logo Grid»

| Файл | Що в ньому |
|---|---|
| `blocks/logo-grid/block.json` | `noPaddingTop`, `title`, `text`, `platforms` (3 порожні рядки за замовчуванням) |
| `blocks/logo-grid/index.js` · `edit.js` | heading у канві + `ImageListControls` у сайдбарі; порожні рядки показують плейсхолдер логотипа |
| `blocks/logo-grid/render.php` | `View::render('blocks.logo-grid')` |
| `blocks/logo-grid/translate.json` | `platforms` як `repeater` |
| `resources/views/blocks/logo-grid.blade.php` | гілка `platforms` з `duo.blade.php` + фільтр порожніх `imageUrl` |
| `overchain-blocks.php` | `'logo-grid'` у `$order` одразу після `'duo'` |

Перевірено після збірки:

- блок зареєстровано, в інсертері стоїть між Duo і Promo
- `build/logo-grid/index.js` + `index.asset.php` створені
- **розмітка ідентична** старій гілці Duo при тих самих даних (порівняння рендерів
  `blocks.logo-grid` і `blocks.duo` з `layout: platforms`)

### Міграція контенту

Бекап: `wp_posts-backup-before-logogrid.sql`.

`migrate-logo-grid.php` знаходить кожен `overchain/duo` з `layout:"platforms"`,
замінює весь блок (разом із дочірніми `duo-card`, які в цьому стані все одно не
рендерились) на самозакритий `<!-- wp:overchain/logo-grid {...} /-->`, переносячи
`noPaddingTop`, `title`, `text`, `platforms`.

**Запобіжник:** перед записом кожна сторінка рендериться до і після заміни, і запис
відбувається лише якщо HTML збігається. Єдина дозволена різниця — порожній
`<div class="heading">`, який Duo друкував завжди, а новий блок не друкує.

| Сторінка | Результат |
|---|---|
| 661 Platform Overview | render IDENTICAL → written |
| 726 Aviation | render IDENTICAL → written |
| 738 Yachting | render IDENTICAL → written |
| 742 Real estate | render IDENTICAL → written |
| 779 Test | render IDENTICAL → written |

Повторний прогін: `blocks converted: 0` — ідемпотентно.

### Чистка Duo

- `block.json` — прибрано `layout` і `platforms`; лишилось `noPaddingTop`, `title`, `text`
- `translate.json` — синхронізовано
- `edit.js` — прибрано `SelectControl`, `ImageListControls`, гілку канви та
  невикористані імпорти; лишився один макет із `InnerBlocks`
- `duo.blade.php` — прибрано гілку `platforms`

Після чистки: 4 змігровані сторінки показують по 3 логотипи, дві сторінки з
картками (Home, Pagrindinis puslapis) — по 2 картки, `layout:"platforms"` у БД
не лишилось.

### Документація

- `PLUGIN.md` § Existing Blocks — рядок Duo уточнено, додано Logo Grid
- `PLUGIN.md` § Block Registration Order — `'logo-grid'` у списку
- `PLUGIN.md` § One block, two design layouts — Duo переписано з прикладу на
  **контрприклад**, із правилом, коли варіант має ставати окремим блоком
- `BLOCK-QUEUE.md` § 1.4 — позначено як перенесене в 21.2

---

# Друга хвиля дефолтів і прев'ю (виконано)

Зауваження: після чистки дефолтів текст зник **і з прев'ю в інсертері**, бо
`example` брав його з тих самих дефолтів. Правило тепер таке:

> **Дефолт — порожній, плейсхолдер — у канві, текст — в `example`.**
> Для блоків з `InnerBlocks` текст має бути і в `example.innerBlocks[].attributes`
> батька: порожній об'єкт там перекриває дефолти дитини й дає порожню картку.

### Прев'ю відновлено

| Блок | Що додано в `example` |
|---|---|
| Tabs / Tab | `heading` у кожному з 4 табів батька + власний `example` дитини |
| Spotlight | атрибути в 4 дочірні картки прев'ю |
| Duo | атрибути в 2 дочірні картки прев'ю |
| Slider Cards | атрибути в 4 дочірні картки прев'ю |
| Features | атрибути в 4 картки прев'ю (сам вигляд прев'ю не змінився) |
| Cards | атрибути батька + 4 дочірні картки |

### Дефолти очищено (з міграцією контенту)

Друга хвиля `migrate-defaults.php`: 9 сторінок, 26 делімітерів, `GATE: PASS`,
бекап `wp_posts-backup-pass2.sql`.

| Блок | Атрибути | Блоків змігровано |
|---|---|---|
| `feature-card` | title, text | 8 + 8 |
| `promo` | title, text, buttonText | 2 / 2 / 8 |
| `split` | title, subtitle, text, buttonText | 2 / 2 / 2 / 1 |
| `cards` | title, buttonText | 1 / 4 |
| `card` | title | 4 |

Після цього дефолти в `feature-card`, `cards`, `card`, `split`, `promo` очищені;
фронт перевірено — усі рядки на місці.

### Репітери Badges і Tag List — відкат

Порожні рядки за замовчуванням виявилися гіршими за дизайнерський текст: Blade
фільтрує порожні мітки, а канва Tag List пропускає їх узагалі — свіжовставлений
блок виглядав порожнім. Повернуто видимий текст:

- `badges.badges` → три рядки «Badge title», `defaultItem` теж
- `tag-list.tags` → «Tag 1 / Tag 2 / Tag 3», `defaultItem` → «New tag»

Плейсхолдери в сайдбарі лишилися — вони діють, коли редактор очистить поле.

---

# 26.1 Past Events — заголовок у канві (виконано)

Єдине завдання черги **в темі**, не в плагіні.

### Міграція контенту (спершу)

Блок є на 4 сторінках, і три з них не мали власного `title` — рендерили дефолт
`"Past Events"`. Той самий підхід, що й у плагіні: бекап теки блока
(`past-events-backup/`) і `wp_posts` (`wp_posts-backup-past-events.sql`), потім
`migrate-past-events.php` — він перевикористовує `ovch_patch()` із
`migrate-defaults.php` і читає значення з `block.json` теми.

| Сторінка | Дія |
|---|---|
| 51 Events | записано `"title":"Past Events"` |
| 439 Renginiai | має власний «Ankstesni renginiai» — не чіпали |
| 779 Test · 781 Test | записано `"title":"Past Events"` |

Змін поза рядками-делімітерами: 0.

### Правки

| Файл | Зміна |
|---|---|
| `block.json` | `title.default` → `""`; додано `example.attributes.title = "Past Events"` для прев'ю в інсертері |
| `edit.js` | `<h2>{title}</h2>` → `RichText` з `placeholder="Section title"`; `TextControl` «Title» прибрано з сайдбару (лишився тільки `postsPerPage`); умову `{title && …}` знято — інакше в порожній заголовок нема куди клікнути |
| `render.php` | `sanitize_text_field()` + `esc_html()` → `wp_kses_post()` (конвенція для RichText); fallback-текст «Past Events» прибрано; умова показу тепер по `wp_strip_all_tags()`, щоб `<br>` не вважався контентом |
| `translate.json` | `title`: `string` → `rich` |

### Збірка і перевірка

`npm run blocks:build` у темі (не плагіні) — успішно, `blocks/past-events/build/`
перезібрано, `index.asset.php` оновлено `fix-asset.js`. Вихід комітиться.

| Перевірка | Результат |
|---|---|
| Заголовки на 4 сторінках | усі рендеряться як раніше |
| Блок зареєстровано | так, `title.default` = `''` |
| Бандл: `RichText` | є |
| Бандл: `TextControl` | прибрано |
| Бандл: плейсхолдер | є |
| `example.attributes.title` | `Past Events` |
| `translate.json` | `rich` |

### Побічна знахідка → завдання 31.1

`template-parts/blocks/past-events.php` — **мертвий файл**. Це стара копія секції;
жоден `get_template_part()` у темі не вказує на `template-parts/blocks/`, блок
рендериться інлайном у власному `render.php`. При цьому `THEME.md` описував його як
живий шаблон рендера, тобто наступний, хто прийшов би правити заголовок, правив би
не той файл — і не побачив би ефекту.

Файл не видаляв (поза межами завдання), але `THEME.md` виправлено: рядок про
`render.php` більше не каже про делегування, а розділ про сам файл позначено як
**unused** з поясненням, що редагувати треба `blocks/past-events/render.php`.
Видалення — окремим рішенням, завдання 31.1.

---

# 31.1 Мертвий шаблон у темі (виконано)

`template-parts/blocks/past-events.php` видалено (копія збережена в скретчпаді як
`past-events-templatepart-deleted.php`). Тека `template-parts/blocks/` лишилась
порожньою і теж прибрана — жоден `get_template_part()` у темі на неї не вказував.

`THEME.md` приведено у відповідність:

- дерево файлів — теки `template-parts/blocks/` більше немає
- рядок про `render.php` у таблиці файлів блока — прибрано твердження, що
  `past-events` делегує рендер у партіал
- розділ `### blocks/past-events.php` видалено разом із файлом
- рецепт «як додати блок у тему» переписано: крок 3 більше не пропонує створювати
  партіал на один блок, а пояснює, коли партіал справді потрібен (як
  `content-cases-slider.php`, який ділиться між блоком і шаблоном), кроки
  перенумеровано

---

# Етап 6. Документація (виконано)

## `PLUGIN.md`

**§ Existing Blocks**

- рядок Duo уточнено (лишився один макет), додано Logo Grid
- Quote перейменовано на **Designed Quote** із приміткою, що слаг лишається `quote`

**§ Block Registration Order** — `'logo-grid'` у задокументованому масиві `$order`.

**§ Known Conventions** — чотири нові правила, кожне з причиною, а не лише з рецептом:

| Правило | Суть |
|---|---|
| *Mirror the design's breakpoints* | `editor.scss` більше не breakpoint-free; таблиця цільових колонок для семи списків, джерела значень (`blocks.css` і `perPage` зі `js/main.js`), і чесно названий компроміс із вузьким полотном |
| *Placeholders, not dummy defaults* (розширено) | таблиця «дефолт / плейсхолдер / example», проп `placeholder` у трьох спільних контролах |
| *Clearing a default changes live pages* | чому очищення дефолту стирає текст зі збережених сторінок і що міграція йде **перед** правкою |
| *Two exceptions to the empty default* | стартові рядки репітера лишають текст; `example.innerBlocks[].attributes` треба заповнювати явно |
| *Section classes* (доповнено) | `SectionSettingsControls` — завжди перша панель |
| *Control labels say what the CSS does* | три реальні приклади брехливих міток (Lead ×2, Split) і вимога `label` для кожного `SelectControl` |
| *Do not ship an option the design never uses* | `bg3` і `enableDecor` як два боки однієї помилки |

**§ One block, two design layouts** — Duo переписано з прикладу на контрприклад із
правилом, де проходить межа між атрибутом і окремим блоком.

## `BLOCKS.md`

| Розділ | Що оновлено |
|---|---|
| Lead | таблиця фонів із колонкою «Design» і поміткою, що `bg3` прибрано з пікера; нова таблиця нижніх відступів із фактичними значеннями і поясненням, чому `none` ≠ «без відступу»; поведінка `textStyle` |
| Split | мітки `subtitleStyle` з поясненням, що `min-size` діє лише ≤992; `enableBlur` як **Show background glow** із розкладом по дизайну; примітка, що `pbs4` у дизайні не зустрічається |
| Features | `enableBlur` перейменовано і описано; додано, що дефолти карток порожні, а копія живе в `example.innerBlocks` |
| Locations | `enableDecor` прибрано з опису атрибутів із поясненням чому; новий плейсхолдер; посилання на правило про брейкпойнти |
| § Placeholders | таблиця файлів оновлена (Location Card → `slide-visual.webp`), названо, де ще лишився старий `card-visual.png` |

## `README.md`

Кількість блоків у інсертері: 40 → **41**.

## `BLOCK-QUEUE.md`

Пункт 1.4 (Duo → макет із логотипами) позначено як перенесений у 21.2 з
посиланням на цей файл.

---

# Підсумок черги

**Закрито: 59 пунктів.** Не робимо за рішенням: **29.1** (дефолтні тексти у Form,
Subscribe, Related Posts — лишаються як є).

| Етап | Що зроблено |
|---|---|
| 1 | 10 правок CSS редактора: брейкпойнти з верстки для семи списків, фон `wide`-картки Moves, ширина табів Accordion, `.testimonials__window` |
| 2 | Плейсхолдери й стартові айтеми у 12 блоках + `placeholder` у двох спільних контролах |
| 3 | Сайдбар: порядок панелей у 5 блоках, мітки й `help` у Lead / Intro / Features / Split, прибрані `bg3` і `enableDecor` |
| 4 | Duo → Logo Grid: новий блок, конвертація 5 збережених блоків, чистка Duo |
| 5 | Past Events: заголовок у канві, RichText у темі, інша збірка |
| 6 | Документація: PLUGIN.md, BLOCKS.md, THEME.md, README.md, BLOCK-QUEUE.md |
| — | Три хвилі міграції контенту, кожна з бекапом і запобіжником «нічого поза делімітерами» |

### Що лишилось на майбутнє

- **29.1** — свідомо не робимо
- Showcase Card і Mosaic Card досі на `card-visual.png` — уніфікувати, коли їх
  торкатимемось
- `CLAUDE.md` у корені сайту каже «40 parent blocks» — тепер 41; файл поза межами
  плагіна й теми, тому не чіпав
