# Drop Queue — дизайн-дроп 01.10.2026

Чекліст перенесення дропу `_desigh/dist/` від 01.10.2026. Аналіз і обґрунтування —
[`../../themes/overchain/DESIGN-DROP-2026-10-01.md`](../../themes/overchain/DESIGN-DROP-2026-10-01.md)
(далі «звіт»). Формат і критерії — як у [`BLOCK-QUEUE.md`](BLOCK-QUEUE.md), з одним
винятком у критерії 2: анімаційні класи й атрибути (`anim-*`, `animated-block`,
`gap-*`, `data-threshold-*`, `data-swap-group`, `style="--i"`) живуть **лише в Blade/PHP**,
у `edit.js` їх немає, тож у diff інвентарю класів вони не рахуються.

Рішення, ухвалені перед роботою:
1. Team — прибрати все, чого немає у верстці й стилях (intro-картка, біо, старий аватар).
2. ~~`anim-scroll` — перемикач у блоках, де дизайн непослідовний~~ → замінено правилом після
   рев'ю: згасання автоматично перед White Section, у кожному блоці — відключення (розділ нижче).
3. `--i` — проставляється в PHP (`overchain_blocks_stagger()`), без CSS і без контролів у редакторі.
4. Lenis і `prefers-reduced-motion` — як у дизайні, не чіпаємо.

---

## Стан

| Етап | Що | Статус |
|---|---|---|
| 0 | Бекап (`themes/overchain/_backup-2026-10-01/`) | ✅ |
| 1 | Синк CSS / JS (парою) / ассетів | ✅ |
| 2.1 | Drag-arrow → дві кнопки, 7 місць (R2) | ✅ |
| 2.2 | Team — нова картка, без intro/bio, без `base-splide` (R3) | ✅ |
| 2.3 | Control List — threshold + `--i` (R1) | ✅ |
| 2.4 | Accordion, Showcase — threshold + `--i` (R5) | ✅ |
| 2.5 | Cards — `cards-column-5`, оверрайд прибрано (R6) | ✅ |
| 2.6 | Результати кейсу — `.tl2` (R4) | ✅ |
| 2.7 | Нейтралізатори канви (`css/editor.css`, `editor.scss`) | ✅ |
| 3.1 | Хелпер `overchain_blocks_stagger()` | ✅ |
| 3.2 | Перемикач `animScroll` | ✅ |
| 4 | Анімаційні хуки в усіх блоках плагіна | ✅ |
| 5 | Шаблони теми (лід-секції, кейси, картка каталогу, автор, попапи) | ✅ |
| 6.1 | Steps — `swapWords` + своп іконки | ✅ |
| 6.2 | Logo Grid — `enableBg` | ✅ |
| 7 | Збірка, кеш Blade, `_S_VERSION` 1.0.4 | ✅ |
| 8 | Документація | ✅ |
| R.1 | Video — preview `autoplay muted loop`, без кнопки | ✅ |
| R.2 | Slider Cards — підзаголовок, «Center heading» | ✅ |
| R.3 | Events — відео під заголовком (метабокс архівної сторінки) | ✅ |
| R.4 | Згасання перед White Section — автоматично + `disableWhiteFade` | ✅ |
| — | Ручна перевірка в редакторі | ✅ |
| — | Контент на сайті | ✅ |

---

## Перевірено автоматично

- [x] `npm run build` — без помилок; `build/blocks.css` містить `cards-column-5`, не містить `compliant__cards--5`
- [x] Рендер 15 сторінок локального сайту — 200, без PHP-помилок і `render error`
- [x] Skeleton-diff секцій сайт ↔ макет — структурних розбіжностей зі звіту §4/§6 не лишилось
      (`span.tl2` замість дизайнівського `h2.tl2` у результатах і `a` замість `div` у картці
      каталогу — свідомо)
- [x] Diff анімаційних хуків сайт ↔ макет — лишились тільки контентні розбіжності (нижче)
- [x] Браузер: консоль без помилок, `html.lenis`, `.anim-txt.is-ready`; Team — одна ініціалізація
      Splide, 4 слайди, стрілки сховані через `data-lock`; Cases — `drag-arrow__next` гортає,
      `__prev` знімає `is-disabled`; результати 64px; автор статті — один `<a>`
- [~] Сама поява елементів (IntersectionObserver) у вбудованому браузері не перевірялась:
      панель прихована (`visibilityState: hidden`), IO там не спрацьовує. Перевірити очима.
- [x] Каскад: `vendor → config → main → blocks → style`, `main.js?ver=1.0.4`

## Ручна перевірка в редакторі

- [x] Control List, Accordion, Showcase — усе видно одразу, нічого не зсунуто
- [x] Team — сітка 4 / 2 / 1, фото на всю картку, без фото — іконка по центру; ім'я над роллю
- [x] Steps — поле «Rotating words» у кожному кроці; у канві після заголовка видно перше слово
- [x] Cards з `columns: 5` — 5 у ряд
- [x] Logo Grid — «Decor → Show background» показує фон
- [x] Будь-який секційний блок — «Disable fade-out before White Section» у панелі Settings
      (Intro / Lead — у згорнутій панелі Settings; Past Events / Cases Slider — у своїх панелях)
- [x] Slider Cards — поле підзаголовка під заголовком, «Layout → Center heading»
- [x] Сторінка Events (архівна) — метабокс «Events Archive Content», вибір / заміна / видалення відео

## Контент на сайті

- [x] about — у першій картці Team у полі **Name** записано «Co-Founder & CEO»; вписати ім'я.
      Intro-картка (якщо збережена) на фронті вже не друкується — видалити її в редакторі
- [x] about — перевірити фото команди: тепер це фон на всю картку, а не коло
- [x] Events — завантажити відео в метабоксі «Events Archive Content»
- [x] Slider Cards на index і platform-overview — підзаголовок «Overchain supports regulated businesses…»
- [x] Logo Grid на platform-overview — «Show background»
- [x] Steps на головній — «USDT, BTC, ETH» у кроці 1, «GBP, EUR, USD» у кроці 3
      (і прибрати ці слова з самого заголовка кроку)
- [x] igaming — Cards у 5 колонок
- [ ] Решта розбіжностей сайт ↔ макет — звіт §9 (поза цією чергою)

## Правки після рев'ю (01.10.2026)

1. **Video** не крутився сам — це був код, не локалка: preview-варіант рендерився як
   click-to-play (`.media-box` + `.video-play`). Тепер `div.preview__video.ibg >
   video[autoplay muted loop playsinline]`, як у макеті. `.emb-video` у статтях — без змін.
2. **Slider Cards**: `text` (підзаголовок `div.txt2`) і `centerHeading` (дефолт `true` — `heading aic`).
3. **Events**: `Overchain_Events_Archive_Meta` (тема) — поле відео на архівній сторінці events;
   виводиться між lead і списком через `template-parts/ui/preview-video.php`.
4. **Згасання**: у макеті `anim-scroll` стоїть рівно на секціях перед `.frame-colored` (перевірено на
   всіх 17 сторінках; винятки — Hero і каталог блогу, лишені як у макеті). Реалізовано правилом:
   `overchain_blocks_mark_before_white()` на `the_content` (пріоритет 8) ставить блоку перед
   White Section внутрішній атрибут `overchainBeforeWhite`, Blade додає клас через
   `overchain_blocks_fade_class()`. У 39 блоках плагіна і 2 блоках теми — `disableWhiteFade`.
   `animScroll` і безумовний `anim-scroll` прибрано.

Перевірено: збірки теми й плагіна; 11 сторінок сайту — `anim-scroll` збігається з макетом
посекційно (ті самі два винятки); маркер — юніт-тест (вкладені списки, freeform-проміжки);
index — `video[autoplay][muted][loop][playsinline]`, Slider Cards — `heading aic`.

## Відкат

Тема: `themes/overchain/_backup-2026-10-01/` (`css/`, `js/`, `php/` — копії змінених
шаблонів, `THEME.md`, кореневий `CLAUDE.md`, `plugin-scss/styles.scss`). Плагін — git.
