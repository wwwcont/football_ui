# UI Design System Specification (Grayscale) — Football Tournament App

## 0) Scope

Документ фиксирует дизайн-систему и практические UI-правила для **public + admin** частей football tournament app.

- Mobile-first.
- Только grayscale (black/white/gray), без цветных акцентов.
- Подходит для публичных витрин и высоконагруженных операторских интерфейсов.
- Спецификация дана в implementable формате для следующего шага реализации.

---

## 1) Design Tokens

## 1.1 Color tokens (grayscale only)

### Base palette
- `black-1000`: `#000000`
- `gray-950`: `#0A0A0A`
- `gray-900`: `#111111`
- `gray-800`: `#1F1F1F`
- `gray-700`: `#2F2F2F`
- `gray-600`: `#4A4A4A`
- `gray-500`: `#6B6B6B`
- `gray-400`: `#8D8D8D`
- `gray-300`: `#B2B2B2`
- `gray-200`: `#D1D1D1`
- `gray-150`: `#E2E2E2`
- `gray-100`: `#EFEFEF`
- `gray-50`: `#F7F7F7`
- `white-0`: `#FFFFFF`

### Semantic usage (без цвета)
- `text-primary`: `gray-950`
- `text-secondary`: `gray-600`
- `text-tertiary`: `gray-500`
- `text-inverse`: `white-0`
- `bg-canvas`: `white-0`
- `bg-subtle`: `gray-50`
- `bg-elevated`: `white-0`
- `bg-inverse`: `gray-950`
- `border-strong`: `gray-300`
- `border-default`: `gray-200`
- `border-subtle`: `gray-150`
- `icon-default`: `gray-700`
- `icon-muted`: `gray-500`

## 1.2 Background / surface hierarchy

### Public
- L0 Canvas: `bg-canvas`.
- L1 Section blocks: `bg-subtle`.
- L2 Cards: `bg-elevated` + `border-default`.
- L3 Overlay (sheet/modal): `bg-elevated` + shadow-2.

### Admin
- L0 Canvas: `bg-canvas`.
- L1 Workspace panes: `white-0`.
- L2 Data panels: `white-0 + border-default`.
- L3 Sticky toolbars/action bars: `white-0 + border-strong`.

## 1.3 Text hierarchy tokens

- `text-title`: `text-primary`, medium/semibold.
- `text-body`: `text-primary`, regular.
- `text-meta`: `text-secondary`, regular.
- `text-disabled`: `text-tertiary` + reduced opacity (0.65 min).

## 1.4 Border tokens

- Default stroke: 1px `border-default`.
- Strong separators: 1px `border-strong`.
- Focus ring: 2px solid `gray-900` + 2px outer gap with `white-0` (на светлом фоне).
- Inverse surfaces: borders смещаются на +1 шаг светлее (например `gray-300`).

## 1.5 Spacing scale (4pt system)

- `sp-0`: 0
- `sp-1`: 4
- `sp-2`: 8
- `sp-3`: 12
- `sp-4`: 16
- `sp-5`: 20
- `sp-6`: 24
- `sp-8`: 32
- `sp-10`: 40
- `sp-12`: 48
- `sp-16`: 64

### Usage rules
- Внутренние отступы control: `sp-3`/`sp-4`.
- Между карточками в мобильной ленте: `sp-3`.
- Между секциями: `sp-6` mobile, `sp-8` desktop.

## 1.6 Radius scale

- `r-0`: 0 (таблицы, строгие панели)
- `r-2`: 8 (inputs, small cards)
- `r-3`: 12 (cards, sheets)
- `r-4`: 16 (modals, large surfaces)
- `r-pill`: 999 (chips, segmented)

Правило: admin data-heavy screens → более строгие `r-0/r-2`; public cards → `r-3`.

## 1.7 Shadow / elevation rules

- `shadow-0`: none
- `shadow-1`: `0 1px 2px rgba(0,0,0,0.06)`
- `shadow-2`: `0 6px 20px rgba(0,0,0,0.10)`
- `shadow-3`: `0 14px 40px rgba(0,0,0,0.14)`

Grayscale-принцип: приоритет границ над тяжелыми тенями. Тени использовать только для overlays/sticky surfaces.

## 1.8 Icon sizing

- `ic-xs`: 12 (только плотные таблицы)
- `ic-sm`: 16 (inline with text)
- `ic-md`: 20 (default)
- `ic-lg`: 24 (touch actions)
- `ic-xl`: 32 (empty/error illustrations)

## 1.9 Safe area (iPhone web app)

- Top padding: `max(sp-3, env(safe-area-inset-top))` для topbar.
- Bottom nav/action bar: `sp-2 + env(safe-area-inset-bottom)`.
- Bottom sheet footer buttons учитывают inset bottom.
- Запрет “мертвых” touch controls в unsafe зоне.

---

## 2) Typography

## 2.1 Font stack

- System-first sans-serif (SF Pro / Inter-like metrics fallback).
- Numeric fallback обязателен с поддержкой tabular figures.

## 2.2 Scale (mobile → desktop)

- `H1`: 28/34, semibold → 32/38.
- `H2`: 22/28, semibold → 26/32.
- `H3`: 18/24, semibold → 20/26.
- `Section title`: 16/22, semibold.
- `Body L`: 16/24 regular.
- `Body M`: 14/22 regular.
- `Caption`: 12/18 regular.
- `Meta XS`: 11/16 medium.

## 2.3 Numeric styles (score/stat/table)

- Score numbers: 32/34 semibold, **tabular lining**.
- Mini score (cards): 20/24 semibold, tabular.
- Table numbers: 13/18 medium, tabular.
- KPI/Stat number: 24/28 semibold.
- Minute/event time: 12/16 medium, tabular.

Правило: все статистические столбцы и счет — tabular figures для выравнивания.

---

## 3) Component Library (rules + variants)

## 3.1 Button

### Variants
- `Primary`: fill `gray-950`, text `white-0`.
- `Secondary`: `white-0` + border `gray-300` + text `gray-950`.
- `Ghost`: transparent, text `gray-800`.
- `Danger-equivalent` (без красного): `gray-900` + обязательный confirm dialog.

### Sizes
- `sm` 36h, `md` 44h, `lg` 48h.
- Horizontal padding: 12/16/20.

### States
- default / hover / pressed / disabled / loading.
- Disabled: opacity 0.45 + no shadow.

## 3.2 IconButton
- Размеры 36/44/48.
- Hitbox минимум 44x44.
- Фон по умолчанию transparent; в toolbars — subtle fill (`gray-50`).
- Focus ring обязателен.

## 3.3 Input
- Высота 44 mobile, 40 dense desktop-table filters.
- Label сверху, helper/error снизу.
- Prefix/suffix icons 16-20.
- States: default, focused, invalid, disabled, readonly.

## 3.4 SearchInput
- Input + clear button + optional submit icon.
- Mobile режим full-width sticky under topbar.
- Desktop режим в header с dropdown preview results.

## 3.5 Select
- Trigger как Input.
- Desktop: popover; mobile: bottom sheet picker.
- Multi-select только с summary chip (e.g. “Teams: 3”).

## 3.6 Tabs
- Line tabs, 2 уровня max.
- Active: 2px underline `gray-950`, text semibold.
- Inactive: `text-secondary`.

## 3.7 SegmentedControl
- Container `gray-100`, active segment `white-0` + border.
- Use cases: stats period switch, card/list view toggle.

## 3.8 BottomNav
- 5 пунктов max.
- Высота 64 + safe area.
- Label short (1 слово), icon 20.
- Active state только grayscale: fill icon + bold label + top indicator line.

## 3.9 Topbar
- Высота 56 mobile, 64 desktop public, 56 admin.
- Contains: title/context, quick actions, search entry.
- Border bottom default, optional shadow-1 on scroll.

## 3.10 Sidebar (admin desktop)
- Width 264 expanded / 72 collapsed.
- Item height 40.
- Section labels meta style.
- Active item: inset border-left 2px + bg `gray-50`.

## 3.11 Card
- Base: `r-3`, border default, bg white.
- Padding 16 mobile / 20 desktop.
- Optional header-actions slot.

## 3.12 StatCard
- Big number + label + optional trend glyph (без цвета).
- Trend direction через icon shape (↑/↓/→), не цвет.

## 3.13 MatchCard
- Header: competition/round + status chip.
- Body: teams + score/time.
- Footer: venue/time/meta.
- Live состояние добавляет monochrome pulse-dot (анимация opacity, не цвет).

## 3.14 TeamRow / TeamCard
- Logo slot 40x40 (PNG), fallback placeholder.
- TeamRow для таблиц, TeamCard для public catalog.
- Required secondary info: played + points (context-aware).

## 3.15 PlayerRow / PlayerCard
- Avatar placeholder monochrome.
- Main: name + team.
- Secondary: goals/cards/matches (tabular numerics).

## 3.16 Scoreboard
- Структура: Home | score | Away + status/time row.
- Large mode (details/live), compact mode (cards/lists).
- Всегда sticky на live detail pages.

## 3.17 TimelineEventItem
- Left rail minute marker, right event content.
- Event type различать icon+label (goal/card/substitution) и shape tokens.
- Canceled event: strikethrough + “canceled” tag.

## 3.18 DataTable
- Header sticky.
- Row height 44 comfortable / 36 dense.
- Zebra disabled (строгий вид); использовать row separators.
- Numeric columns right aligned + tabular.
- Mobile fallback: card list или horizontal-scroll with pinned first column.

## 3.19 EmptyState
- Icon 32, title, short explanation, primary CTA.
- Примеры CTA: “Сбросить фильтры”, “Создать первую команду”.

## 3.20 ErrorState
- Код ошибки/diagnostics id.
- Actions: Retry, Go back, Contact admin (admin-only).

## 3.21 Skeleton
- Pulsing neutral placeholders 1.2s ease.
- Структурно повторяет будущий контент.
- Max skeleton экран ≤ 2 viewport heights.

## 3.22 FilterDrawer / FilterSheet
- Mobile: FilterSheet bottom, full-height если >6 controls.
- Desktop: right drawer width 360-420.
- Footer sticky: Reset / Apply.

## 3.23 Modal / ConfirmDialog
- Modal width: 92vw mobile, 480/640 desktop.
- ConfirmDialog для destructive или irreversible действий.
- Обязательный text consequence + explicit confirm action label.

## 3.24 Toast / Inline Alert
- Toast для коротких success/info (4s auto-hide).
- Inline alert для persistent warnings/errors внутри страницы.
- Только grayscale: severity различать icon + border style (solid/dashed) + heading text.

## 3.25 FileUpload (PNG logos)
- Dropzone/card area + “Upload PNG”.
- Валидации: mime type `image/png`, размер, min dimensions.
- States: idle, dragging, uploading, success preview, failed with reason.
- Crop/fit preview (square) + original ratio retain option.

---

## 4) Match Status Visuals (grayscale-only semantics)

### Scheduled
- Status chip: outline `border-default`, icon `calendar`.
- Scoreboard: вместо счета kickoff time.
- No motion.

### Live
- Status chip: filled `gray-900`, text `white-0`, label “LIVE”.
- Optional pulse-dot (monochrome).
- Sticky scoreboard always visible.

### Finished
- Chip: subtle fill `gray-100`, text `gray-800`, icon `check`.
- Timeline locked appearance (no editing affordance on public).

### Postponed
- Chip: dashed border style + icon `clock-alert`.
- Card secondary line: “Перенесен, новая дата уточняется/указана”.

### Canceled
- Chip: strong border `gray-400`, icon `x`.
- MatchCard content reduced contrast + cancel reason line.

**Важно:** семантика строится на форме, плотности, иконке, типографике, а не на цвете.

---

## 5) Mobile UX Rules

1. Minimum touch target: **44x44**.
2. Bottom navigation sticky + safe-area aware.
3. Filters в bottom sheet, не в перегруженном inline тулбаре.
4. Long pages: sticky key controls (score header, apply/reset filters, save bar).
5. Forms:
   - single-column,
   - label сверху,
   - error сразу под полем,
   - клавиатура не перекрывает primary action.
6. Admin forms: sticky action bar (`Cancel`/`Save`) у нижнего края.
7. Scroll behavior:
   - preserve position при возврате в list,
   - pull-to-refresh только на public lists.
8. Full-screen focus mode для search и live operator flows.

---

## 6) Desktop UX Rules

1. Density modes:
   - Comfortable (public default),
   - Compact (admin tables/workspaces).
2. Data tables:
   - sticky header,
   - column visibility presets,
   - horizontal scroll indicators.
3. Split-pane layouts:
   - list + detail,
   - timeline + event controls (match center).
4. Sidebar navigation для admin persistent.
5. Keyboard-friendly:
   - logical tab order,
   - shortcuts в match center,
   - Enter submit, Esc close modal/sheet.
6. Multi-panel dashboards with stable card heights.

---

## 7) Page Patterns

## 7.1 List Page Pattern
- Top: title + context switcher + search/filters.
- Content: list/table with sticky filter row.
- Bottom: pagination/load more.
- States integrated inline.

## 7.2 Details Page Pattern
- Hero/header block (title/status/meta).
- Secondary tabs/sections.
- Related entities links.
- Sticky back + quick actions.

## 7.3 Editor Page Pattern
- Form sections grouped by domain.
- Right rail summary (desktop) / collapsible summary (mobile).
- Unsaved changes guard.
- Sticky save/publish bar.

## 7.4 Dashboard Page Pattern
- KPI row.
- Priority queues.
- Activity/events panel.
- Quick actions panel.

## 7.5 Live Match Center Pattern
- Sticky scoreboard + match clock.
- Primary event action cluster (goal/card/substitution).
- Timeline stream.
- Sync/connection status widget.
- Finalize flow with confirmation gate.

---

## 8) Accessibility

## 8.1 Contrast
- Все тексты и controls соответствуют WCAG AA.
- На `gray-100/50` поверхности текст минимум `gray-800`.
- Тонкие шрифты (<14px regular) не использовать на low-contrast фоне.

## 8.2 Focus states
- Видимый focus ring на всех interactive элементах.
- Не удалять outline без замены эквивалентной индикацией.
- Focus order строго соответствует visual order.

## 8.3 Keyboard navigation
- Полная доступность ключевых flow на desktop:
  - навигация в tables,
  - открытие модалок,
  - submit/cancel.
- Skip-to-content link для shell layouts.

## 8.4 ARIA considerations
- Landmark roles: header/nav/main/aside/footer.
- `aria-live="polite"` для live score updates (public).
- `aria-live="assertive"` осторожно для критических operator alerts.
- Labels для icon-only buttons обязательны.
- Dialogs: focus trap + return focus to trigger.

---

## 9) Implementation Readiness Checklist

1. Токены заведены как единый source of truth (design + frontend).
2. Все компоненты имеют state matrix и usage guidelines.
3. Match statuses реализуются shape/typography/icon language без цвета.
4. Mobile safe-area и sticky bars протестированы на iPhone Safari/PWA режиме.
5. Admin tables и match center покрыты keyboard сценариями.
6. Accessibility audit (contrast, focus, aria) пройден для P0 экранов.
7. FileUpload PNG валидации и error copy согласованы с backend constraints.

