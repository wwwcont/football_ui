# Frontend Architecture, Screen Map & Routing Specification

## 0) Scope и принципы

Документ задает implementable архитектуру frontend для tournament app на базе утвержденной Product + UX спецификации.

### Цели
- Зафиксировать **информационную архитектуру** (public/admin/auth/shared).
- Зафиксировать **route map** с единой URL-конвенцией и nested-структурой.
- Определить для каждого ключевого route: назначение, роли, блоки, действия, mobile/desktop поведение и состояния страницы.
- Зафиксировать app shell, паттерны навигации, search/filter UX и критические screen flows.
- Приоритизировать экраны для поставки MVP.

### Общие правила URL
- lower-case, kebab-case (без snake_case и camelCase).
- ресурсный стиль: `/entity` + `/:id`.
- контекст сезона/дивизиона как query params, не в path по умолчанию:
  - `?season=<id>&division=<id>`.
- admin всегда под префиксом `/admin`.
- служебные страницы под `/auth` и `/system`.

### Общие правила UI
- Mobile-first, desktop расширяет плотность и многоколонность.
- Строгий grayscale UI: акцент через типографику, размеры, контраст, stroke/border.
- Все страницы обязаны иметь явно описанные состояния:
  - loading / empty / error / permission-denied.

---

## 1) Information Architecture

## 1.1 Public Area

### Разделы
1. **Home** — агрегатор live/upcoming/standings/news.
2. **Matches** — список матчей + детали матча.
3. **Table** — турнирная таблица.
4. **Teams** — список команд + профиль команды.
5. **Players** — список игроков + профиль игрока.
6. **Stats** — лидеры/статвитрины.
7. **News** — новости/анонсы/пост-матч материалы.
8. **Search** — глобальный поиск по сущностям.

### Доменные read-модули
- Season context switcher.
- Match timeline renderer.
- Standings renderer.
- Team/player stat widgets.

## 1.2 Admin Area

### Разделы
1. **Admin Dashboard** — операционный хаб.
2. **Seasons** — сезоны и статусы.
3. **Divisions** — группы/дивизионы и membership.
4. **Schedule** — туры/календарь/конфликты.
5. **Matches** — список матчей, match center, confirmation.
6. **Teams** — реестр команд + редактирование + logo upload PNG.
7. **Players** — реестр игроков + eligibility/статусы.
8. **Standings/Stats Ops** — диагностика и пересчет.
9. **News CMS** — контент-публикации.
10. **Admin Users** — роли и scopes.
11. **Audit/Logs** — журнал изменений.
12. **Uploads/System** — технический реестр файлов/обработки.

## 1.3 Auth Area

- Login.
- Optional 2FA verify.
- Forgot/reset password (если включено).
- Session expired / forced relogin.

## 1.4 Shared / Global Flows

1. **Season/Division context picker** (доступен в public и admin).
2. **Global search overlay** (public + ограниченно admin).
3. **Notifications center** (изменение статуса матчей, публикаций, инциденты).
4. **Permission boundary** (403 pages + inline guards).
5. **Error boundary + retry patterns**.
6. **Unsaved changes guard** для форм.

---

## 2) Route Map (canonical)

## 2.1 Public routes

- `/` — Home.
- `/matches` — Matches list.
- `/matches/:matchId` — Match details.
- `/table` — Standings.
- `/teams` — Teams list.
- `/teams/:teamId` — Team details.
- `/players` — Players list.
- `/players/:playerId` — Player profile.
- `/stats` — Stats hub.
- `/news` — News list.
- `/news/:newsId` — News details.
- `/search` — Search results page.

### Query conventions (public)
- `season`, `division` — глобальный контекст.
- `date`, `status`, `team`, `round` — фильтры матчей.
- `q` — поисковая строка.
- `tab` — активная вкладка экрана (например на team/player pages).

## 2.2 Auth routes

- `/auth/login`
- `/auth/verify`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/auth/session-expired`

(совместимость: `/admin/login` редиректит на `/auth/login?next=/admin`)

## 2.3 Admin routes

- `/admin` — Admin dashboard.
- `/admin/seasons`
- `/admin/seasons/new`
- `/admin/seasons/:seasonId`
- `/admin/seasons/:seasonId/divisions`
- `/admin/seasons/:seasonId/divisions/:divisionId`

- `/admin/schedule`
- `/admin/schedule/rounds`
- `/admin/schedule/rounds/:roundId`
- `/admin/schedule/conflicts`

- `/admin/matches`
- `/admin/matches/:matchId`
- `/admin/matches/:matchId/center`
- `/admin/matches/:matchId/confirmation`
- `/admin/matches/:matchId/corrections`

- `/admin/teams`
- `/admin/teams/new`
- `/admin/teams/:teamId`
- `/admin/teams/:teamId/roster`

- `/admin/players`
- `/admin/players/new`
- `/admin/players/:playerId`

- `/admin/standings`
- `/admin/stats`
- `/admin/recalculate`

- `/admin/news`
- `/admin/news/new`
- `/admin/news/:newsId`

- `/admin/users`
- `/admin/users/:userId`

- `/admin/audit`
- `/admin/uploads`
- `/admin/system`

## 2.4 System routes

- `/403`
- `/404`
- `/500`
- `/offline`

---

## 3) Route-by-route screen specification

> Формат: цель → роли → блоки → действия → mobile/desktop → states.

## 3.1 Public

### `/` Home
- **Цель:** дать мгновенный snapshot турнира.
- **Роли:** viewer, captain/manager, admin (в public режиме).
- **Блоки:** live ticker, upcoming matches, mini table top-5, latest news, season switcher.
- **Действия:** открыть матч, таблицу, новость, сменить сезон/дивизион.
- **Mobile:** вертикальная лента, live блок sticky под хедером.
- **Desktop:** 3 колонки (live/upcoming | table | news).
- **States:**
  - loading: skeleton cards;
  - empty: “Нет матчей в выбранном контексте”; 
  - error: retry + fallback links;
  - permission-denied: не применимо (public).

### `/matches` Matches list
- **Цель:** найти нужный матч по времени/статусу/команде.
- **Роли:** все public.
- **Блоки:** filter bar, date selector, grouped list (live/upcoming/finished), pagination/infinite.
- **Действия:** открыть матч, применить фильтры, share link.
- **Mobile:** фильтры в bottom sheet, sticky date strip.
- **Desktop:** inline filters + table/list toggle.
- **States:** loading list, empty by filters, error API, permission N/A.

### `/matches/:matchId` Match details
- **Цель:** полный протокол и live-таймлайн матча.
- **Роли:** все public.
- **Блоки:** score header, status chip/time, squads tabs, timeline, stats summary, related news.
- **Действия:** refresh/live follow, перейти к команде/игроку, share.
- **Mobile:** sticky score header + tabbed content.
- **Desktop:** 2 колонки (timeline + squads/stats).
- **States:** loading event stream, empty timeline (до старта), error reconnect CTA, permission N/A.

### `/table` Standings
- **Цель:** показать ранжирование команд.
- **Роли:** все public.
- **Блоки:** standings table, tie-break hint, form-last-5.
- **Действия:** sort (ограниченно), открыть team details.
- **Mobile:** горизонтальный скролл таблицы + pinned team column.
- **Desktop:** full-width dense table.
- **States:** loading rows, empty division, error + retry, permission N/A.

### `/teams` Teams list
- **Цель:** каталог команд турнира.
- **Роли:** все public.
- **Блоки:** grid/list toggle, logo+name cards, quick stats.
- **Действия:** открыть команду, filter by division.
- **Mobile:** 1-column cards.
- **Desktop:** 3-4 column grid.
- **States:** loading cards, empty context, error.

### `/teams/:teamId` Team details
- **Цель:** профиль команды и ее результаты.
- **Роли:** все public.
- **Блоки:** team header/logo, tabs (roster | matches | stats | info).
- **Действия:** перейти к игроку/матчу, share.
- **Mobile:** tab pills + collapsible sections.
- **Desktop:** header + 2-column body.
- **States:** loading tabs, empty roster/matches, error.

### `/players` Players list
- **Цель:** найти игрока.
- **Роли:** все public.
- **Блоки:** search+filters, sortable list (goals/cards/team).
- **Действия:** открыть профиль.
- **Mobile:** compact cards, filter sheet.
- **Desktop:** data table.
- **States:** loading, empty result, error.

### `/players/:playerId` Player profile
- **Цель:** персональная карточка игрока.
- **Роли:** все public.
- **Блоки:** bio header, season stats, match history, discipline.
- **Действия:** перейти в матч/команду.
- **Mobile:** stacked sections.
- **Desktop:** sidebar bio + content pane.
- **States:** loading, empty history, error.

### `/stats` Stats hub
- **Цель:** лидеры турнира.
- **Роли:** все public.
- **Блоки:** top scorers, cards, team form, optional GK stats.
- **Действия:** drill-down к player/team.
- **Mobile:** segmented tabs.
- **Desktop:** multi-widget dashboard.
- **States:** loading widgets, empty metric, error widget-level.

### `/news` и `/news/:newsId`
- **Цель:** публикации турнира.
- **Роли:** все public.
- **Блоки:** news feed, tags, publish date, detail rich text.
- **Действия:** open article, share.
- **Mobile:** feed cards.
- **Desktop:** list + detail split (optional).
- **States:** loading feed/article, empty news, error.

### `/search`
- **Цель:** unified results по q.
- **Роли:** все public.
- **Блоки:** search input, grouped results (matches/teams/players/news), filter chips.
- **Действия:** quick open, clear filters.
- **Mobile:** full-screen search page.
- **Desktop:** sticky search bar + side filters.
- **States:** loading query, empty “ничего не найдено”, error.

## 3.2 Auth

### `/auth/login`
- **Цель:** вход в admin/captain контуры.
- **Роли:** captain/manager, operator, admins.
- **Блоки:** email/phone, password, remember me, recover link.
- **Действия:** submit, forgot-password.
- **Mobile:** centered single-card full-height.
- **Desktop:** split layout (brand/info + form).
- **States:** loading submit, validation errors, auth error, locked-account.

### `/auth/verify`
- **Цель:** 2FA подтверждение.
- **Блоки:** code input, resend timer.
- **States:** invalid code, too many attempts, expired session.

### `/auth/session-expired`
- **Цель:** безопасный re-login.
- **Действия:** sign-in again.

## 3.3 Admin

### `/admin` Dashboard
- **Цель:** операционная панель дня.
- **Роли:** operator, league admin, super admin.
- **Блоки:** today matches, incidents, pending confirmations, quick actions.
- **Действия:** jump to match center, approve queue.
- **Mobile:** prioritized cards.
- **Desktop:** KPI row + queue tables.
- **States:** loading widgets, empty no tasks, error partial widgets, permission guard.

### `/admin/seasons`, `/admin/seasons/new`, `/admin/seasons/:seasonId`
- **Цель:** lifecycle сезона.
- **Блоки:** seasons table, status controls, date windows, ruleset binding.
- **Действия:** create/edit/archive/publish season.
- **Mobile:** list + detail in separate screens.
- **Desktop:** master-detail.
- **States:** loading, empty first season, conflict error (locked season), permission-denied for non-admin.

### `/admin/seasons/:seasonId/divisions...`
- **Цель:** управление дивизионами и membership.
- **Блоки:** division list, team assignment, format settings.
- **Действия:** add/remove teams, reorder, lock division.
- **Mobile:** stepper flow.
- **Desktop:** side-by-side assignment.

### `/admin/schedule`, `/admin/schedule/rounds`, `/admin/schedule/conflicts`
- **Цель:** календарь и конфликты.
- **Блоки:** calendar grid, round list, conflict detector panel.
- **Действия:** generate rounds, move match, resolve conflicts, publish schedule.
- **Mobile:** agenda list + conflict drawer.
- **Desktop:** calendar + inspector pane.
- **States:** empty rounds, conflict warnings, permission.

### `/admin/matches` list
- **Цель:** входная точка всех матчевых операций.
- **Блоки:** filters (status/operator/date), bulk actions.
- **Действия:** open match, assign operator, batch publish.

### `/admin/matches/:matchId`
- **Цель:** read/write карточка матча.
- **Блоки:** metadata, squads status, score summary, audit snippet.
- **Действия:** edit metadata, navigate to center/confirmation/corrections.

### `/admin/matches/:matchId/center` Match Center
- **Цель:** live-ведение.
- **Блоки:** sticky score clock, event buttons, timeline, squad panel, sync status.
- **Действия:** start/stop periods, add/cancel events, finalize.
- **Mobile:** one-hand event rail + bottom action sheet.
- **Desktop:** split workspace (timeline left, controls right).
- **States:** offline queueing warning, event conflict, lock state after finalize, permission-denied for unauthorized operator.

### `/admin/matches/:matchId/confirmation`
- **Цель:** формальное подтверждение результата.
- **Блоки:** final score, events checksum, confirmations from parties.
- **Действия:** approve/reject/request correction.

### `/admin/matches/:matchId/corrections`
- **Цель:** контролируемые пост-матч правки.
- **Блоки:** current vs proposed diff, mandatory reason, recalc impact preview.
- **Действия:** submit correction, rollback.

### `/admin/teams`, `/admin/teams/new`, `/admin/teams/:teamId`, `/admin/teams/:teamId/roster`
- **Цель:** управление командами.
- **Блоки:** team registry, logo upload PNG validator, contacts, roster editor.
- **Действия:** create/edit team, manage roster, assign manager/captain.
- **States:** invalid upload format, duplicate team name, permission.

### `/admin/players`, `/admin/players/new`, `/admin/players/:playerId`
- **Цель:** реестр игроков.
- **Блоки:** players table, status/eligibility, team binding.
- **Действия:** create/edit/transfer/deactivate player.
- **States:** duplicate number conflict, invalid eligibility.

### `/admin/standings`, `/admin/stats`, `/admin/recalculate`
- **Цель:** контроль производных данных.
- **Блоки:** derived tables, drift alerts, recalc job status.
- **Действия:** trigger recalculation, inspect mismatches.

### `/admin/news`, `/admin/news/new`, `/admin/news/:newsId`
- **Цель:** публикации.
- **Блоки:** CMS editor, publish scheduler.
- **Действия:** draft/schedule/publish/archive.

### `/admin/users`, `/admin/users/:userId`
- **Цель:** admin RBAC.
- **Блоки:** users list, role/scopes editor, account status.
- **Действия:** grant/revoke role, suspend/reactivate.

### `/admin/audit`
- **Цель:** прозрачность изменений.
- **Блоки:** event log table, entity filters, diff modal.
- **Действия:** inspect changes, export report.

### `/admin/uploads`, `/admin/system`
- **Цель:** техобслуживание.
- **Блоки:** uploads health, failed processing queue, system flags.
- **Действия:** reprocess upload, purge orphan files.

## 3.4 System pages `/403`, `/404`, `/500`, `/offline`
- Единый нейтральный grayscale шаблон.
- Обязательные CTA: back, home, retry, login (где релевантно).

---

## 4) App Shell

## 4.1 Public Mobile Shell
- Top bar: logo + season switch + search icon.
- Main content viewport.
- Bottom nav (5 items): Home / Matches / Table / Teams / More.
- More sheet: Players, Stats, News, Search.
- Sticky elements: live ticker (на Home), match score header (на match details).

## 4.2 Public Desktop Shell
- Top horizontal header: logo, primary nav, season/division selector, search input.
- Optional secondary subnav на data-heavy страницах (matches/table/stats).
- Right utility area: profile/sign-in (если нужно).

## 4.3 Admin Mobile Shell
- Compact top bar: page title + actions + hamburger.
- Slide-in navigation drawer.
- Critical action bar sticky в match center.

## 4.4 Admin Desktop Shell
- Persistent left sidebar: Dashboard, Seasons, Schedule, Matches, Teams, Players, Stats, News, Users, Audit, System.
- Topbar: context switcher, quick search, notifications, user menu.
- Main area: breadcrumbs + page content.

---

## 5) Navigation patterns

## 5.1 Bottom Nav (mobile public)
- Показывается на всех public list/dashboard страницах.
- Скрывается на full-focus экранах (`/matches/:id` при live mode, `/search` full-screen).
- Active state: толстая underline + icon fill (grayscale).

## 5.2 Desktop Public Header/Nav
- Primary: Home, Matches, Table, Teams, Players, Stats, News.
- Search всегда доступен справа.
- Season/division selector global и sticky.

## 5.3 Admin Sidebar/Topbar
- Sidebar persistent ≥ 1024px.
- Для <1024px превращается в drawer.
- Topbar для quick actions (new match/news, pending confirmations).

## 5.4 Breadcrumbs
- Обязательны в admin depth ≥ 2:
  - Example: Admin / Matches / Match #123 / Center.
- В public breadcrumbs только на deep content (news detail optional).

## 5.5 Back-navigation
- Mobile: системная кнопка back + явный back в header на detail pages.
- Desktop: back link в верхней зоне деталей.
- При unsaved changes — confirm modal.

## 5.6 Sticky elements
- Match score header (public/admin match pages).
- Filter bar на long-scrolling списках.
- Admin action footer для destructive/commit действий.

---

## 6) Search UX

## 6.1 Global search scope
- Индексируемые типы: matches, teams, players, news.
- Поддержка частичного совпадения и транслита (если RU/EN имена).

## 6.2 Search entry points
- Dedicated `/search` page.
- Header quick search (desktop) с dropdown preview.
- Full-screen search overlay на mobile.

## 6.3 Results grouping
- Группы в порядке приоритета:
  1) Matches (live/upcoming приоритет выше finished)
  2) Teams
  3) Players
  4) News
- Для каждой группы: top N + “show all”.

## 6.4 Mobile behavior
- Tap search icon → full-screen input autofocus.
- Recent queries (локально).
- Быстрые фильтр chips под инпутом.

## 6.5 Filters behavior in search
- Inline chips для типа сущности.
- Доп. фильтры в sheet: season/division/status/date/team.
- Apply/Reset sticky на дне sheet.

## 6.6 Quick actions
- Long-press / action menu (desktop hover menu) в результатах:
  - Open,
  - Copy link,
  - Pin to recent.

---

## 7) Filter UX

## 7.1 Mobile filters
- Primary filters (1-3 ключевых) inline chips.
- Secondary filters в bottom sheet (fullscreen если >6 полей).
- Применение батчем: кнопка Apply.
- Reset all всегда видим.

## 7.2 Desktop filters
- Inline toolbar над списком/таблицей.
- Advanced filters в right drawer.
- Сохраненные presets (например: “Live today”, “Pending confirmation”).

## 7.3 Inline vs Drawer rules
- **Inline:** дата, статус, дивизион, сортировка.
- **Drawer/Sheet:** диапазоны дат, мультивыбор команд, операторы, технические флаги.

---

## 8) Важнейшие Screen Flows

## 8.1 Public Match Details flow
1. Пользователь открывает `/matches/:matchId`.
2. Видит score/status header + squads/timeline.
3. При live: автообновление, подсветка новых событий.
4. По финалу: статус `finished`, итоговые stats и ссылки на team/player.
5. Ошибка stream → fallback polling + retry.

## 8.2 Team page flow
1. `/teams/:teamId` с табом `roster` по умолчанию.
2. Переход на `matches`/`stats`/`info` через tab query.
3. Deep link на игрока/матч сохраняет контекст сезона.

## 8.3 Player page flow
1. `/players/:playerId` открывает bio + season stats.
2. История матчей фильтруется по season/division.
3. Drill-down в match details.

## 8.4 Admin Match Center flow
1. Оператор открывает `/admin/matches/:matchId/center`.
2. Pre-check squads и readiness.
3. Start match → события → period transitions.
4. Finalize match → go to confirmation.
5. Lock и автопересчет derived данных.

## 8.5 Admin Team Edit flow
1. `/admin/teams/:teamId`.
2. Редактирование base fields + PNG logo upload.
3. Save draft / publish changes.
4. Переход в `/roster` для состава.

## 8.6 Admin Player Edit flow
1. `/admin/players/:playerId`.
2. Edit identity/number/status/eligibility.
3. Валидация конфликтов номера и правок в locked сезоне.
4. Save + audit entry.

## 8.7 Admin Season/Schedule management flow
1. Создать/выбрать сезон.
2. Настроить divisions.
3. Сгенерировать rounds.
4. Resolve conflicts.
5. Publish schedule.
6. Monitor matches и инциденты.

---

## 9) Screen Priority

## P0 (MVP must-have)
- Public: `/`, `/matches`, `/matches/:matchId`, `/table`, `/teams`, `/teams/:teamId`, `/players`, `/players/:playerId`.
- Auth: `/auth/login`, `/auth/session-expired`.
- Admin: `/admin`, `/admin/seasons`, `/admin/schedule`, `/admin/matches`, `/admin/matches/:matchId/center`, `/admin/matches/:matchId/confirmation`, `/admin/teams`, `/admin/teams/:teamId`, `/admin/players`, `/admin/players/:playerId`.
- System: `/403`, `/404`, `/500`.

## P1 (first release)
- Public: `/stats`, `/news`, `/news/:newsId`, `/search`.
- Auth: `/auth/verify`, `/auth/forgot-password`, `/auth/reset-password`.
- Admin: divisions nested pages, corrections page, standings/stats ops, news CMS, audit.

## P2 (later)
- Admin: `/admin/uploads`, `/admin/system`, advanced recalc center.
- Public: расширенные search quick actions, rich bookmarks, personalization.
- System: `/offline` enhanced mode.

---

## 10) Route Tree

```text
/
├─ (public)
│  ├─ /
│  ├─ /matches
│  │  └─ /matches/:matchId
│  ├─ /table
│  ├─ /teams
│  │  └─ /teams/:teamId
│  ├─ /players
│  │  └─ /players/:playerId
│  ├─ /stats
│  ├─ /news
│  │  └─ /news/:newsId
│  └─ /search
├─ (auth)
│  ├─ /auth/login
│  ├─ /auth/verify
│  ├─ /auth/forgot-password
│  ├─ /auth/reset-password
│  └─ /auth/session-expired
├─ (admin)
│  ├─ /admin
│  ├─ /admin/seasons
│  │  ├─ /admin/seasons/new
│  │  └─ /admin/seasons/:seasonId
│  │     └─ /admin/seasons/:seasonId/divisions/:divisionId
│  ├─ /admin/schedule
│  │  ├─ /admin/schedule/rounds
│  │  │  └─ /admin/schedule/rounds/:roundId
│  │  └─ /admin/schedule/conflicts
│  ├─ /admin/matches
│  │  └─ /admin/matches/:matchId
│  │     ├─ /admin/matches/:matchId/center
│  │     ├─ /admin/matches/:matchId/confirmation
│  │     └─ /admin/matches/:matchId/corrections
│  ├─ /admin/teams
│  │  ├─ /admin/teams/new
│  │  └─ /admin/teams/:teamId/roster
│  ├─ /admin/players
│  │  ├─ /admin/players/new
│  │  └─ /admin/players/:playerId
│  ├─ /admin/standings
│  ├─ /admin/stats
│  ├─ /admin/recalculate
│  ├─ /admin/news
│  │  ├─ /admin/news/new
│  │  └─ /admin/news/:newsId
│  ├─ /admin/users
│  │  └─ /admin/users/:userId
│  ├─ /admin/audit
│  ├─ /admin/uploads
│  └─ /admin/system
└─ (system)
   ├─ /403
   ├─ /404
   ├─ /500
   └─ /offline
```

---

## 11) Screen Tree

```text
Public Shell
├─ Home
├─ Matches
│  └─ Match Details
├─ Table
├─ Teams
│  └─ Team Details (Roster/Matches/Stats/Info)
├─ Players
│  └─ Player Profile (Stats/History/Discipline)
├─ Stats
├─ News
│  └─ News Details
└─ Search

Auth Shell
├─ Login
├─ Verify
├─ Forgot Password
├─ Reset Password
└─ Session Expired

Admin Shell
├─ Dashboard
├─ Seasons
│  └─ Divisions
├─ Schedule
│  ├─ Rounds
│  └─ Conflicts
├─ Matches
│  └─ Match Workspace
│     ├─ Details
│     ├─ Center
│     ├─ Confirmation
│     └─ Corrections
├─ Teams
│  └─ Team Edit + Roster
├─ Players
│  └─ Player Edit
├─ Standings/Stats/Recalculate
├─ News CMS
├─ Users & Roles
├─ Audit
└─ Uploads/System
```

---

## 12) Navigation Summary

- Public mobile: bottom nav + full-screen search + sticky score header on match.
- Public desktop: top nav + global search + season/division switch.
- Admin mobile: topbar + drawer + sticky action bar.
- Admin desktop: persistent sidebar + topbar + breadcrumbs.
- Back behavior: explicit back on details, guarded by unsaved-changes modal.
- Sticky strategy: score headers, long-list filter bars, critical admin commit actions.

---

## 13) Page State Matrix

| State | Public list pages | Public detail pages | Admin list pages | Admin edit/workspace pages |
|---|---|---|---|---|
| Loading | skeleton list/cards | skeleton header + blocks | skeleton table | form skeleton + disabled actions |
| Empty | context-aware empty CTA | “данные появятся позже” | “нет записей” + create CTA | “нет данных для редактирования” |
| Error | inline error + retry | blocking alert + retry/back | inline + diagnostics ID | blocking + save disabled + diagnostics |
| Permission denied | обычно N/A | private data guard (если появится) | 403 with role hint | 403 + request access CTA |
| Offline | read cached snapshot | stale banner | stale list + no writes | write queue warning (match center critical) |

---

## 14) UX notes for implementation

1. На всех маршрутах поддерживать сезонный контекст в query (`season`, `division`) и переносить его при внутренних переходах.
2. Для live-данных матчей: приоритет WebSocket/SSE, fallback polling; визуально различать `live`, `delayed`, `stale`.
3. Для админ-форм: autosave draft (где безопасно), плюс explicit Save/Publish.
4. Для destructive действий: double-confirm + reason (для corrections обязательно).
5. Для таблиц на mobile: избегать перегруза колонками; использовать priority columns + details drawer.
6. Для загрузки логотипов: немедленная валидация PNG + предпросмотр + понятная ошибка.
7. Все permission-гейты реализовать на уровне route guard + UI-level guard (скрытие действий недостаточно).
8. Добавить единый паттерн telemetry:
   - screen_open,
   - filter_apply,
   - search_submit,
   - live_event_submit,
   - correction_submit.
9. Для admin match center предусмотреть keyboard shortcuts на desktop и крупные event кнопки на mobile.
10. Любая корректировка locked match должна иметь diff preview до подтверждения.

