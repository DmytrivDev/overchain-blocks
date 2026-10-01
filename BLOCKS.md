# Blocks — about.html pass

Working reference for the blocks built or reworked while porting `about.html`:
**Lead, Statement, Split, Features, Promo Slider, Locations, Team**.

`PLUGIN.md` stays the general plugin reference (build, render chain, full block
table, technical debt). This file started as the reference for those seven — their
attributes, the design sections they map to, and the editor-canvas workarounds each
one needs — and the *Recurring patterns* half has since grown to cover every section
block built after them (Everything, FAQ, Manage, Connect, Moves, Control List,
Integration Steps, Flow Promo, Highlight). Only the *Block reference* half below is
still limited to the original seven; everything above it applies to all of them.

---

## At a glance

| Block | Slug | Design section | Children | Source page |
|---|---|---|---|---|
| Lead | `overchain/lead` | `.lead` | — | about, events, integrations, glossary, case |
| Statement | `overchain/statement` | `.exists` | — | about |
| Split | `overchain/split` | `.actually` | — | index (single), about + 5 others (layered) |
| Features | `overchain/features` | `.feature` | `overchain/feature-card` | index |
| Promo Slider | `overchain/promo-slider` | `.infrastruct mailing` | — | events |
| Locations | `overchain/locations` | `.operations` | `overchain/location-card` | about |
| Team | `overchain/team` | `.understand` | `overchain/team-card` | about |

Design HTML lives in `wp-content/themes/overchain/_desigh/dist/`.

---

## Recurring patterns

These came up repeatedly. Follow them when extending these blocks or adding the
next one of the same shape.

### Fixed design assets are not attributes

If the design uses the **same** image on every page that has the section, it is a
theme asset, not content. Hardcode it — do not add an upload control.

| Block | Asset | Toggle |
|---|---|---|
| Split (`layered`) | `assets/img/decor/foundation_decor_1.svg` | — |
| Split (`items` list) | `assets/img/icons/actually_icon_2.svg` | — |
| Highlight | `assets/img/decor/foundation_decor_1.svg` (same shape as Split) | `enableDecor` |
| Flow Promo | `assets/img/decor/introflow_bg_1.jpg` (same file as Manage Cards) | `enableBackground` |
| Locations | `assets/img/decor/operations_decor_1.jpg` | `enableDecor` |
| Promo Slider | `assets/img/decor/infrastruct_bg_1.jpg` | `enableBackground` |
| Manage Cards | `assets/img/decor/introflow_bg_1.jpg` | `enableBackground` |
| Connect Card | `assets/img/decor/connect_bg_1.png` (background), `content/connect_img_{1,2}.png` (decor) | `decor` select |
| Moves Card (`wide`) | `assets/img/decor/moves_bg_1.jpg` | — |
| FAQ | `assets/img/decor/faq_decor_1.png` | `enableDecor` |
| Process Card | `assets/img/decor/accept_bg_1.jpg` | — |
| Integration Steps | `assets/img/icons/steps_icon_{1,2,3}.svg` | cycles by index, `iconUrl` overrides |
| Team Card | `assets/img/icons/ava_def_1.svg` | placeholder icon when there is no photo |
| Logo Grid | `assets/img/decor/introflow_bg_1.jpg` | behind `enableBg` |
| Control List | `assets/img/content/way_img_1.png` | fallback when empty, plus `enableImage` |
| Flow Promo | `assets/img/content/introflow_img_1.png` | fallback when empty |
| Highlight | `assets/img/content/never_img_1.png` | fallback when empty |
| Team Card (person) | `assets/img/icons/ava_def_1.svg` | fallback → `.empty` modifier |
| Testimonial Card | `assets/img/icons/ava_def_2.svg` | fallback when `avatarUrl` is empty |

Blade reads them through `get_template_directory_uri()`; `edit.js` through
`window.ovchBlocks?.themeUrl` with a hard-coded fallback (`themeUrl` is never
actually set — see the trap in `CLAUDE.md`).

### `enable*` toggles

A decorative layer that a content manager may want gone becomes a boolean
attribute defaulting to `true`, so already-saved blocks keep rendering it:

```php
$enableDecor = $attributes['enableDecor'] ?? true;
```

Current toggles: `enableBlur` (Features), `enableDecor` (Locations, FAQ,
Highlight), `enableBackground` (Promo Slider, Manage Cards, Flow Promo),
`enableImage` (Control List).

**`enableBlur` on Split is the exception and defaults to `false`.** The rule is not
"default to `true`" but "keep already-saved blocks rendering exactly what they
render". Features/Locations/Promo Slider layers exist in every design section those
blocks were built from, so `true` preserves them. Split's `.actually__blur` arrived
later — `index.html` and `about.html` have no glow — so `true` would have added a
layer to every Split already on the site. Check the source sections before picking
the default.

Always add the matching `{ "translate": "ignore" }` entry to `translate.json`.

### Rebuilding a layout for the editor canvas

The frontend lays cards out with flex + `max-width` percentages. That cannot
survive in the editor, because Gutenberg injects
`.block-editor-inner-blocks > .block-editor-block-list__layout` between the list
and the cards. The fix is always the same shape:

**`grid-settings` is not a shortcut past this.** The helper at the top of
`editor.scss` forces `grid-template-columns: 1fr !important` below 768px, which the
canvas hits as soon as the sidebar opens, and it does nothing about the card's own
`max-width` percentage — inside a grid cell that cap makes each card half the width
of its own cell. Features uses it and is fine at four columns; Showcase and Manage
Cards write the rule out instead. Reach for the helper only when neither of those
two things bites.

```scss
.operations__cards {
	display: block !important;              // neutralise the frontend flex row

	.block-editor-block-list__layout {      // descendant, NOT a direct child
		width: 100%;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.card-operations { max-width: none; }   // drop the frontend percentage cap
}
```

Current column steps, mirroring each block's own frontend breakpoints:

| Block | desktop | ≤ 992px | ≤ 768px |
|---|---|---|---|
| Showcase (`.powerful__cards`) | 2 | 2 | 2 |
| Everything (`.everything__list`) | 4 | 4 | 4 |
| Process Slider (`.accept__splide`) | 4 | 4 | 4 |
| Manage Cards (`.manage__cards`) | 2 | 2 | 2 |
| Connect (`.connect__cards`) | 3 | 3 | 3 |
| Moves (`.moves__list`) | `1fr 1fr 1fr 20rem` — fixed |
| Locations (`.operations__cards`) | 4 | 2 | 1 |
| Team (`.understand__splide`) | 4 | 2 | 1 |

**The canvas iframe's width is not the device width.** A `max-width` media query
fires as soon as the sidebar opens, so a desktop user can land on the mobile
rule. Showcase and Manage Cards are deliberately breakpoint-free for that reason;
Locations and Team carry breakpoints because they were asked for explicitly. If someone reports
"wrong number of columns on desktop", this is why.

**A second reason to pin the column count: `nth-child` arithmetic.** Everything
Grid (`.everything__list`) draws its cell separators with
`.item-everything:nth-child(4n+1) { border-inline-start: none }` and `4n+4` for the
other edge — there are no gaps, the borders *are* the grid. Those selectors keep
matching inside the injected wrapper, but the `4n` only agrees with what the reader
sees while the grid really is four columns wide; at any other count the borders land
mid-row. So the editor rule holds 4 columns unconditionally, and the appender is
pushed to `grid-column: 1 / -1` so it cannot occupy a cell and shift every item's
`nth-child` index by one. Check for `nth-child` in a section's frontend CSS before
picking a canvas column count.

### A variant that is a grid placement

Moves Card's `variant` (`default` / `wide` / `tall-first` / `tall-last`) is not a
style — it is the grid cell the card occupies, and `blocks.css` places three of the
four explicitly:

```css
.card-moves.wide       { grid-column: span 2 }
.card-moves.tall-first { grid-column: 1; grid-row: 1 / span 2 }
.card-moves.tall-last  { grid-column: 4; grid-row: 1 / span 2 }
```

Those rules already reach the canvas, but they mean nothing without the column
*template*, so `editor.scss` restates `1fr 1fr 1fr 20rem` verbatim on the injected
wrapper. Note this grid cannot be re-columned for the canvas the way the others in
this file can: `tall-last` hard-codes column 4.

Two rules follow for any variant of this kind:

- **Whitelist the value before it becomes a class**, in Blade *and* `edit.js`.
  A variant that is interpolated straight into `className` lets hand-edited block
  markup put an arbitrary string in the class attribute.
- **Give the appender `grid-column: 1 / -1`.** In an auto-placed grid it merely
  looks wrong; here it can take a cell a variant is explicitly placed into.

### Absolutely positioned decor in the canvas

Several sections have an `position: absolute` layer much larger than the section.
On the front the next section paints over the overflow; in the canvas there is
nothing underneath, so it covers the appender and the following block.

Three different resolutions are in use, pick by how much the layer matters:

- **Don't render it in the editor at all** — Locations decor, FAQ's `.faq__decor`
  (86.5rem wide, hanging 41.6rem below and 61.4rem left of its own `section-wrap`),
  Manage Cards' `.manage__bg` (1202x674, anchored 3rem *above* its `section-wrap`,
  so most of it spills past the section bottom), Flow Promo's `.introflow__bg`
  (75.125rem, anchored 3rem above its own `section-wrap` — the same shape as
  `.manage__bg`), Highlight's `.never__decor` (90rem, centred with
  `translate(-50%, -50%)` on a section far shorter than itself, so it hangs off
  both ends), and Split's `.actually__blur`. The toggle still controls the front. Split's is the clearer
  case for this route: at 68.5rem x 55.375rem, `z-index: 2`, offset ~18rem above and
  ~45rem left of its own section, it does not merely cover the appender — it
  swallows clicks on whatever block sits above.
- **Reserve the overflow as margin** — Statement:
  `.exists { margin-block-end: 13.75rem }` (23.125rem below 768px).
- **Force the position back** — when the editor's own stylesheets reset it:
  `.operations__cards .card-operations__img` and
  `.understand__splide .card-understand__img` / `__icon` all need
  `position: absolute !important`. Always scope these to the section, never bare.

**Cards whose layers sit at a negative z-index need both fixes at once.** The
frontend pattern is a card with `position: relative; z-index: N; overflow: hidden`
and layers at `z-index: -1` / `-2`, which stay visible only because the card's own
stacking context lifts them above its `background-color`. The editor flattens that
context *and* resets `position` on the block wrapper, so the layers either vanish
behind the card or drop into the flow. Restate both, in the frontend's paint order,
with non-negative values — `isolation: isolate` on the card, explicit
`position: absolute; z-index: 0/1` on the layers, `position: relative; z-index: 2`
on the content. In use by `.card-layer` (Mosaic), `.card-connect`, `.card-moves`.

**But a negative z-index is not by itself the trigger — being a block element is.**
Control List's `.way__img` is `position: absolute; z-index: -1` and needs none of
this. The difference is which element owns the stacking context: on a card, that
element *is* the block wrapper, which Gutenberg re-classes and re-positions. On
Control List the context belongs to `.way__content` (`position: relative;
z-index: 5`), which is markup the block emits inside its own section and nothing
in the editor touches. `blocks.css` reaches the canvas unchanged, so the layer
paints there exactly as it does on the front. Before reaching for the fix, ask
whether the stacking context sits on the block wrapper or below it — restating
rules for a layer that already works only creates canvas-vs-front drift.

### `.wrapper`-scoped theme CSS never reaches the canvas

Every rule in the theme's `css/main.css` that overrides a third-party library is
written `.wrapper .ac …`, `.wrapper .splide …`, `.wrapper .ts-wrapper …` and so on —
69 of them. `.wrapper` is emitted by `header.php`, so it exists on the front and
**not** in the editor canvas, even though `main.css` itself is an `add_editor_style()`
file. The CSS custom properties those rules use are on `:root` and do carry over; the
rules themselves do not.

Two consequences, both already paid for:

- **Cuts both ways for the accordion.** FAQ needs no rule to open `.ac-panel` —
  the collapse is `.ac.js-enabled .ac-panel { visibility: hidden }` from `vendor.css`
  (not an editor style) plus an inline `height` accordion-js writes at runtime, and
  neither happens in the canvas. But the *layout* — `.ac-head`'s flex row, the
  `.ac-toggle` glyph — is `.wrapper`-scoped, so it has to be restated or the question
  and toggle stack vertically with no icon.

  The fix lives **theme-side**, in `css/editor.css` § *Accordion (.ac)*: the whole
  `.wrapper .ac …` block copied verbatim with the prefix stripped, plus a short
  deviation forcing the open state (nothing in the canvas can add `.is-active`).
  Theme-side because `.ac` is generic theme markup — any block emitting it gets the
  rules, not just FAQ — and because `css/editor.css` is editor-only, so the copy can
  never leak to the front. Re-copy it if a design drop changes the accordion.
- It is a second, independent reason the Splide rules below must supply a full
  layout rather than just flipping `visibility`.

Before assuming a frontend rule applies in the canvas, check whether it is
`.wrapper`-scoped:

```bash
grep -o '[{;}]\.wrapper [^{,]*' css/main.css | wc -l
```

Not `grep -c`: `main.css` is a single minified line, so a line count can only ever
return 0 or 1 — which reads as "no such rules" and gets the trap exactly backwards.

### Splide previews

Splide never initialises in the editor, and its CSS sets
`.splide { visibility: hidden }`. Every slider block needs its own editor rule to
reveal the track. Two strategies exist:

- **All slides at once**, as a grid or a column — Team (`.understand__splide`),
  Related Posts, Testimonials (`.testimonials__splide`), Process Slider
  (`.accept__splide`).

  Stacking every slide has a side effect worth knowing: it makes the slider column
  as tall as the whole list, and anything laid out beside it in a flex row stretches
  to match. Testimonials' side photo did exactly that and grew without bound as
  testimonials were added, so `.testimonials__main` gets `align-items: flex-start`
  in the canvas. The photo's own `min-height` then holds it at the height it has on
  the front.
- **One slide at a time + fake dots** — Promo Slider (`.infrastruct__splide`),
  Accordion. `edit.js` keeps the index in `useState` and renders
  `.ovch-editor-dots`; the active slide gets `.is-editor-active`. That class and
  the dots markup exist only in the editor and never reach the front.

**The choice is not free — it follows from how the slides are stored.** Every block
using the dots strategy drives its slides from a repeater attribute, so `edit.js`
renders each `<li>` itself and can tag one of them. A block whose slides are
InnerBlocks children cannot: the parent has no hook into how InnerBlocks renders a
child, so it cannot hand one of them an extra class. Testimonials runs `perPage: 1`
on the front and would have suited dots best, but it is an InnerBlocks parent, so it
stacks instead. Decide repeater vs InnerBlocks first; the preview strategy follows.

Since `vendor.css` (which carries Splide's CSS) is no longer an editor style,
the canvas has no Splide base styles at all — the editor rules must supply the
full layout, not just override visibility.

**`.arrows` is not rendered in the canvas.** Testimonials and Process Slider both
include `partials.splide-arrows` from Blade and omit it from `edit.js`: without a
mounted Splide the prev/next buttons do nothing, and `js/main.js` is what wires them
up. The class-inventory diff therefore shows `arrows`, `arrows__body`,
`arrows__prev` and `arrows__next` missing **from `edit.js` only** — an expected
editor-only delta, not a dropped class. Blade must still be 0/0.

### Placeholders

Editor-only stand-ins live in `resources/placeholders/` and are referenced via
`window.ovchBlocks?.url`. Blade never renders them — an empty image attribute
means no markup on the front.

| File | Used by | Notes |
|---|---|---|
| `card-visual.png` | Statement, Showcase Card, Mosaic Card | design photo at 35% alpha |
| `slide-visual.webp` | Promo Slider, Location Card | generated abstract art, **opaque** |
| `image.png` | Accordion | was also Testimonial Card's avatar — see below |

Location Card moved from `card-visual.png` to `slide-visual.webp` for the reason at
the end of this section: the translucent photo read as broken content, and the WebP
is 6.5 KB against 39 KB. Showcase Card and Mosaic Card still use the old one — worth
unifying when either is next touched.

**A fallback is not a placeholder.** Testimonial Card used to show
`placeholders/image.png` at 30% alpha for an author with no photo — editor-only, so
the front rendered no avatar at all and a card with a name sat next to empty space.
It now falls back to `assets/img/icons/ava_def_2.svg` in **both** places, so the
canvas shows exactly what will ship. Reach for `resources/placeholders/` only when
the thing genuinely must never reach the front.

Flow Promo and Highlight use the same route for their illustrations
(`introflow_img_1.png`, `never_img_1.png`). Neither could be settled by the
"same on every page" rule — each section exists on exactly one page — and a
fallback answers both halves: an untouched block already looks like the design,
and an editor can still replace the picture.

**Control List started as a hardcoded asset and was moved to this route.** By the
rule it qualified as fixed — `way_img_1.png` is identical on both pages carrying
`.way`. But "the design never varies it" answers what the *design* does, not
whether an editor will ever want to, and here they did. Where a layer is a picture
rather than a shape, prefer the fallback: it costs two attributes and keeps the
default identical. Reserve the hardcoded form for geometry the layout depends on —
`foundation_decor_1.svg`, `actually_icon_2.svg`, the numbered backdrops.

**Two default avatars, and the difference is the crop.** Team Card renders its
fallback at a CSS-controlled size in the middle of the card
(`.card-understand__icon`, 4.5rem), so `ava_def_1.svg` can fill its own viewBox. Testimonial Card's `.ava` is `ibg`, so the
image is `object-fit: cover`ed edge to edge at exactly the circle's size and has no
inset of its own — `blocks.css` is generated from the design drop and cannot be
hand-edited to add one. `ava_def_2.svg` therefore carries the breathing room inside
the artwork: the figure occupies about half the 56x56 viewBox against roughly 80%
in `ava_def_1`. Same colour and 32% opacity, so the two read as one design language.

If a block ever needs a default avatar, pick by how it is sized: CSS-inset →
`ava_def_1`, `ibg`-cropped → `ava_def_2`.

`slide-visual.webp` started as a translucent photo and was replaced: a
semi-transparent photo let the dark section background bleed through and read as
broken content rather than as a placeholder. Generated art in the theme palette
(`--cb3`, `--cg1`, `--cg2`) cannot be mistaken for real content. Keep new
placeholders opaque and abstract, and prefer WebP for photographic sizes — the
PNG of the same image was 520 KB against 38 KB.

### Two traps that cost real time

- **`__()` without its import.** `wp-scripts` maps `@wordpress/*` to globals, so a
  missing `import { __ } from "@wordpress/i18n"` is not a build error — it throws
  at runtime and Gutenberg shows *"This block has encountered an error and cannot
  be previewed"*. Confirm the fix by checking `wp-i18n` appears in that block's
  `build/<name>/index.asset.php` dependency array.
- **Stale bundles.** `fix-asset.js` writes an md5 content hash as the version, so
  the editor picks up rebuilt blocks. Theme CSS does not: `_S_VERSION` is a fixed
  `'1.0.3'`, so `config.css` and friends stay cached until a hard reload.

---

## Block reference

Only block-specific attributes are listed. Blocks with buttons use the standard
set (`buttonText`, `buttonType`, `buttonLink`, `buttonLinkId`, `buttonLinkTitle`,
`buttonLinkNewTab`, `buttonAnchor`, `buttonPopupId`, `buttonIcon`).

### Lead — `overchain/lead`

Page hero. Used as the first block on inner pages; `header-archive.php` emits the
same markup for archives.

| Attribute | Default | Notes |
|---|---|---|
| `backgroundType` | `bg2` | `blur` \| `bg1` \| `bg2` (`bg3` still renders but is not offered) |
| `backgroundId` / `backgroundUrl` | `0` / `''` | hidden when `blur` |
| `title` | `''` | `h1.tl1` |
| `textStyle` | `plain` | `plain` \| `medium` → `txt1[ medium]` |
| `text`, `textAlt` | `''` | `textAlt` renders `.txt1.col-alt1` |
| `minHeight` | `false` | adds `mh1` (41.875rem / 35.625rem) |
| `bottomSpacing` | `pbe1` | `none` \| `pbe2` \| `pbe1` |

Background variants — all centred at 90rem, differing in anchor and mobile
behaviour:

| Value | Anchor | Mobile | Editor label | Design |
|---|---|---|---|---|
| `blur` | — | two `.page-blur` glows | Glow only, no image | blogs, careers |
| `bg1` | bottom | full width, min 50rem | Image at the bottom | events, integrations |
| `bg2` | top | stays 90rem, crops | Image at the top | about, case, glossary |
| `bg3` | top | scales to viewport | — (removed from the picker) | none |

`bg3` was dropped from the select: no page in `_desigh/dist` uses it and its desktop
rule is shared with `bg2`. The Blade template still emits the class, so content saved
with it keeps rendering — only the option is gone.

Bottom spacing, with the values spelled out in the labels because the old ones
("No / Normal / Larger") described none of this:

| Value | Desktop | ≤992 | Editor label |
|---|---|---|---|
| `pbe2` | 3.5rem | 4rem | Small — 3.5rem (4rem on mobile) |
| `pbe1` | 5.5rem | 4rem | Standard — 5.5rem (4rem on mobile) |
| `none` | 5.5rem | 5.5rem | Base — 5.5rem at every width |

`none` is not "no spacing": `.lead__body` already carries 5.5rem, and it is the one
state that does **not** shrink on mobile — the only difference between it and `pbe1`.
The default stays `pbe1` so saved blocks do not shift.

`textStyle: medium` adds `.txt1.medium` — `font-weight: 500`, but only from 992px up
(below that the design resets it to 400). It applies to `text` only; `textAlt` is
always `.txt1.col-alt1`. One page in the design uses it: careers.

### Statement — `overchain/statement`

`noPaddingTop`, `imageId`/`imageUrl`, `title`, `lead`, `colOne`, `colTwo`.

`.exists__img` is 51rem wide and absolutely positioned, so the canvas needs
`.exists { margin-block-end: 13.75rem }` (23.125rem ≤ 768px) or it swallows the
next block. See *Absolutely positioned decor* above.

### Split — `overchain/split`

`noPaddingTop`, `mediaLayout`, `enableBlur`, `subtitleStyle`, `title`, `subtitle`,
`imageId`/`imageUrl`, `text`, `listStyle`, `steps`, `items`, button set.

`subtitleStyle` picks the class on the `.actually__top` paragraph:

| Value | Class | Editor label | Used by |
|---|---|---|---|
| `medium` *(default)* | `txt2 medium` | Medium weight | index, about |
| `alt-min` | `txt2 col-alt1 min-size` | Accent colour, smaller on mobile | aviation, igaming, platform-overview, move-money, control-treasury |

`min-size` is scoped as `.actually__top .txt2.min-size`, so it only ever applies to
this paragraph — do not reuse the class in `.actually__bottom`. It is also
**mobile-only**: there is no desktop rule, so on desktop `alt-min` differs from
`medium` by colour and weight alone. The old label "Small, muted" got both halves
wrong — `col-alt1` is the accent colour, not a muted one.

`enableBlur` (label **Show background glow**, same wording as Features) adds
`.actually__blur`, the radial glow anchored top-left. Five of the seven design
sections have it; `index.html` and `about.html` do not, which is why it defaults to
`false`. In the design it tracks `alt-min` exactly — the five platform pages have
both — but they stay independent switches.

Every `.actually` section in the design is `pbs2`, so the `pbs4` state of
`noPaddingTop` has no counterpart in the design build; it is an editorial
convenience only.

`listStyle` picks which of the two bottom lists renders — they are different
lists, not two looks of one:

| Value | Renders | Shape | Used by |
|---|---|---|---|
| `steps` *(default)* | `.actually__steps` / `.steps-actually` | number + title + text | platform-overview |
| `items` | `.actually__list` / `.item-actually` | fixed icon + one line of text | aviation, igaming |

The default **must** stay `steps`: every Split saved before this attribute
existed has no `listStyle` in its block comment, and anything else would swap
those blocks onto an empty list.

`items` carries no icon field — all four positions on both pages use the same
glyph, so it is a fixed asset: `actually_icon_2.svg`. That file had to be **merged
in from `_desigh/public/`**, because the design `dist/` ships only
`actually_icon_1.svg` — a reminder that `dist/` is not the whole asset set, and
that a missing icon may simply not have been synced yet.

The aviation/igaming variant also has no button; nothing extra was needed for
that, since `btn-icon` already renders only for a non-empty `buttonText`.

`steps` is an optional repeater of `{ title, text }` rendering `.actually__steps` /
`.steps-actually` inside `.actually__bottom` (platform-overview). The `01`/`02`
number is derived from the index with `str_pad`, never stored — an editor reordering
steps must not have to renumber them. `text` is optional per step: the design's first
step has a title and no description. An empty array renders nothing, so every Split
saved before this attribute existed is untouched.

`mediaLayout`:

- `single` — one `.actually__media` layer (index.html)
- `layered` — `.actually__decor` + `.actually__img` (about.html and 5 others)

The decor shape is fixed (`foundation_decor_1.svg`) and always renders in the
`layered` variant. The former `decorId`/`decorUrl` attributes are gone; old saved
blocks may still carry them in the block comment, which is harmless — Split is
dynamic (`save: () => null`), so unknown attributes are ignored and disappear on
the next save.

### Features — `overchain/features`

`noPaddingTop`, `topSpacing`, `enableBlur`, `title`, `text`. Children:
`overchain/feature-card` in a `.feature__cards.grid-settings.grid-4` list.

`enableBlur` (label **Show background glow**) gates the `.feature__blur` layer — the
radial glow in the section's top-right corner. It is on in five of the eight design
sections, which is why it defaults to `true`; the pattern in the drop is that the
first `.feature` on a page has it and a second one does not.

The card defaults are empty: `overchain/feature-card` ships `title: ""` / `text: ""`
with placeholders in the canvas, and the copy lives in the parent's
`example.innerBlocks` so the inserter preview still reads as a filled section.

`title` and `text` render `.heading > h2.tl2 + .txt2.col-alt1`, and the wrapper
disappears entirely when both are empty — the section that opens a page has no
heading at all, while the later one on the same page does. Blade drops it;
`edit.js` renders it unconditionally so an empty heading stays clickable. That
asymmetry is deliberate and is the same one Cards already has for its `text`.

`topSpacing` supersedes `noPaddingTop` and adds the third state the design needs:

| Value | Class | Used by |
|---|---|---|
| `pbs2` | `feature pbs2` (8.5rem) | about, index (as the later section) |
| `pbs4` | `feature pbs4` (3rem) | index (first section) |
| `none` | `feature` — no utility | integrations, platform-overview, aviation, igaming |

`none` is not a corner case: four pages in the drop open with a bare `<section class="feature">`
directly under a `.lead`/`.intro` that already carries `pbe1`. The attribute defaults
to `""`, and both `edit.js` and Blade resolve it as
`topSpacing ?: ( noPaddingTop ? 'pbs4' : 'pbs2' )` so saved blocks are untouched — see
the `SectionSettingsControls` note in `PLUGIN.md` for why the default must stay empty.

### Promo Slider — `overchain/promo-slider`

`noPaddingTop`, `enableBackground`, `title`, `text`, `textAlt`, `slides`, button
set.

`slides` defaults to **one empty item**, so a fresh block shows a placeholder
slide in both the canvas and the inserter preview. Blade filters out slides with
no `imageUrl` before rendering, so that default produces no markup on the front —
without the filter the empty slide left an `.infrastruct__splide` wrapper that
Splide would still initialise on.

Editor preview shows one slide at a time with `.ovch-editor-dots` beneath.

### Locations — `overchain/locations`

Parent: `noPaddingTop`, `title`, `text`. Children: `overchain/location-card` in
`.operations__cards`.

`overchain/location-card`: `imageId`/`imageUrl`, `label` (city), `tag` (optional
pill, "Soon" in the design). Both texts are `RichText` with
`allowedFormats={[]}` and are stripped through `wp_strip_all_tags()` in Blade.
An empty card shows `resources/placeholders/slide-visual.webp` — the same
placeholder Promo Slider uses.

The decor is **not rendered in the canvas at all** — it is a large absolutely
positioned image that covers the cards. On the front it always renders: there was an
`enableDecor` toggle, but the design has exactly one `.operations` section and it
carries the decor, so the attribute was removed rather than kept as an option with no
counterpart. No saved block had it switched off. (`faq` and `cards` keep their own
decor toggles — those are separate decisions, not this one.)

The cards are laid out in the canvas as a grid that mirrors the frontend steps —
4 columns, 2 at 992px, 1 at 768px. It is the reference implementation for the other
InnerBlocks grids; see `PLUGIN.md` § *Mirror the design's breakpoints*.

### Team — `overchain/team`

Parent: `noPaddingTop`, `title`, `text`. Children: `overchain/team-card` inside
`.understand__splide`.

`.understand__splide` has its own initialiser in the theme's `js/main.js` (perPage 4,
2 at `mqTouch: 992`, 1 at `mqTablet: 768`). It must **not** also carry `.base-splide`:
that is a second, generic initialiser, and the two would mount Splide twice on the
same element. The canvas grid mirrors 4 / 2 / 1.

`overchain/team-card` (rebuilt for the 2026-10 design drop) has one layout only:

| Attribute | Renders |
|---|---|
| `avatarId` / `avatarUrl` | `.card-understand__img.ibg` — the photo fills the whole card |
| *(no photo)* | `.card-understand__icon` + `ava_def_1.svg`, centred |
| `name` | `h3.card-understand__name` inside `.card-understand__content` |
| `role` | `p.card-understand__role` under the name |

The drop removed the intro text card and the bio along with their styles, so
`variant`, `textOne`, `textTwo`, `imageId`, `imageUrl` and `bio` are gone from
`block.json`. WordPress still hands attributes stored in a block comment to the
render callback, so a card saved as `variant: intro` prints nothing on the front
until an editor deletes it. The old `!important` padding override in the theme's
`css/config.css` went with it — the new card keeps its spacing on `__content`.

---

## Reveal animations (design drop 2026-10)

The drop added reveal animations driven by the theme's `js/main.js`. Blocks opt in
through classes and attributes **in Blade only** — never in `edit.js`, the same
rule as `.drag-arrow`, because nothing in the canvas runs the scripts that finish
the animation. Class-inventory diffs against the design therefore exclude these.

| Hook | Where | Effect |
|---|---|---|
| `.anim-txt` | section `h2` (and `h2.tl3` in `.infrastruct`) | Words rise in one by one |
| `.animated-block` › `.anim-block` [`gap-big`] | Hero / Lead / Intro body; Split `__top` / `__bottom` | Children appear in turn |
| `.anim-scroll` | section `__body`, automatically before a White Section | Fades out as it scrolls under the header |
| `.anim-cards` + `data-threshold-desktop="0.3"` + `--i` | card grids | Card text slides in, staggered |
| `data-threshold-desktop` + `--i` | `.way__body` (0.5), `.paid__tabs` (0.3), `.card-powerful__tags` (0.8) | Block-specific reveals in blocks.css |

**`--i` on InnerBlocks children.** A child's render callback cannot know its index,
so the parent numbers the rendered cards:
`{!! overchain_blocks_stagger( $content, 'card-feature' ) !!}` (defined in
`overchain-blocks.php`; uses `WP_HTML_Tag_Processor` and keeps any existing `style`).
Repeaters write `style="--i: {{ $index }}"` in their own `@foreach`; for a button,
pass `'inlineStyle' => '--i: N'` to `partials.btn-icon` / `btn-def`. Without `--i`
the `calc()` is invalid and the card simply does not animate.

**`anim-scroll` follows one rule: the section right before a White Section fades.**
That is exactly where the design puts it, on every page. A render callback cannot
see its siblings, so `overchain_blocks_mark_before_white()` (`the_content`,
priority 8, before `do_blocks`) parses the content, flags each block followed by
`overchain/white-section` — at every nesting level — with the internal attribute
`overchainBeforeWhite`, and re-serialises. Blade reads it through
`overchain_blocks_fade_class( $attributes )` on the section `__body`.

Every section block carries `disableWhiteFade` (default `false`) and
`SectionSettingsControls` shows it as *Disable fade-out before White Section*
(`showWhiteFade`, on by default). Intro and Lead include the panel with
`showNoPaddingTop={false}` just for this toggle. The theme's `past-events` and
`cases-slider` blocks apply the same rule inline (they must work with the plugin off).

Two exceptions, both as in the design: **Hero** always fades (it is followed by the
video, not a White Section), and the blog **catalog** (a theme template) never does.
Theme templates whose section is followed by block content apply the rule across the
seam with `overchain_content_starts_with_white_section()` (`archive-events.php`), or
directly (`archive-cases.php` — results fade when the white `.leader` follows).

**The canvas must show the final state.** `.way__body .item-way`, `.paid__tabs
.tab-paid` and `.card-powerful__tags li` are hidden or offset by blocks.css until
`.is-threshold`, and those classes *are* in `edit.js` — `editor.scss` § *Threshold
reveals* resets them. Generic reveal classes are reset theme-side in `css/editor.css`.

**Never inside AJAX-swapped markup.** The scripts collect their elements once, on
load; anything FacetWP, the custom pager or the glossary inserts later is never
revealed.

---

## Adding the next block of this kind

On top of the checklist in `CLAUDE.md`:

1. Pull the section's markup straight out of `_desigh/dist/*.html` and reproduce
   it class-for-class in both Blade and `edit.js`.
2. Grep every page in the drop for the section — a class that varies between
   pages is an attribute; one that never varies is a fixed asset.
3. Check `build/blocks.css` for the section's own breakpoints before writing any
   editor grid rule.
4. Diff the class inventory of your Blade + `edit.js` against the design section.
   A parser that collects `class="…"` and `className=…` and set-subtracts both
   ways catches silently dropped classes; the target is 0 missing / 0 extra
   (modulo the `pbs4` no-padding variant and editor-only helpers).
5. Smoke-render the Blade template with a stub before trusting it — every
   conditional branch, plus the "attribute absent" case that legacy saved blocks
   produce.
6. `npm run build`, then confirm the block's `index.asset.php` lists every
   `wp-*` package the editor script actually uses.
