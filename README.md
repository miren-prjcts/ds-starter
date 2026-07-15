# ds-starter

Якісний стартовий monorepo для дизайн-системи: **tokens → ui → storybook**, на **shadcn/ui-стилі + Tailwind 4**. Це foundation для нового продукту або шаблон для команди, а не завершений продукт.

Репозиторій містить production-minded основу: семантичні токени, reusable React-компоненти, Storybook, Next.js surface, accessibility-перевірки та CI. Sample-компоненти й demo-сторінка навмисно залишаються відправною точкою: перед використанням у конкретному продукті їх потрібно адаптувати під власний бренд, контент, доменні сценарії та вимоги.

## Структура

```
packages/
  tokens/      @repo/tokens — семантичні CSS-змінні (єдине джерело значень)
  ui/          @repo/ui     — компоненти (Badge, Button…) у shadcn-стилі (cva + cn)
apps/
  storybook/   @repo/storybook — Storybook 8 + Tailwind 4 + a11y + theme toggle
  web/         @repo/web — Next.js 15 surface consuming the same tokens and UI package
```

Шари: **токени** (значення) → **ui** (компоненти, що вживають токени через класи `bg-success`) → **storybook** (середовище, де видно все). Tailwind-тему збирає застосунок (storybook); компоненти лишаються чистими.

## Швидкий старт

```bash
corepack enable pnpm        # один раз: вмикає pnpm через node
pnpm install
pnpm storybook              # → http://localhost:6006
pnpm --filter @repo/web dev # → http://localhost:3000
```

Інші команди:

```bash
pnpm typecheck       # TS strict по всіх пакетах
pnpm lint            # ESLint (+ jsx-a11y, react-hooks)
pnpm test            # unit/UI-тести компонентів
pnpm test:e2e        # Playwright smoke-тести Next.js
pnpm format          # Prettier --write (+ сортування Tailwind-класів)
pnpm format:check    # Prettier --check (як у CI)
pnpm build-storybook # статична збірка (як у CI)
pnpm build           # повна збірка web + Storybook (як у CI)
```

## Демо «поширення»

Відкрий `packages/tokens/src/tokens.css`, зміни один семантичний токен (напр. `--warning-foreground` або `--radius`) → онови Storybook. **Усі** інстанси змінились одразу — бо вони вживають токен, а не хардкод. Один правок → скрізь.

> Як перенести ці токени у Figma Variables (Light/Dark) — `docs/figma-tokens.md`.

## Як додати компонент

Новий файл у `packages/ui/src/components/`, варіанти через `cva`, кольори **тільки** з токенів (`bg-*`), експорт у `src/index.ts`, story у `apps/storybook/stories/`. Опційно — shadcn CLI (`components.json` готовий), але компоненти працюють і без нього.

## Тести та вимоги до PR

Кожна зміна поведінки має супроводжуватися тестами. Це правило стосується і нових компонентів, і змін у вже наявних.

- Новий або змінений UI-компонент: unit/UI-тест у `packages/ui/src/**/*.test.tsx`.
- Новий компонент або новий варіант: Storybook story для візуальної перевірки та документації.
- Зміна доступності або інтеракцій: semantic queries у Testing Library й перевірка через Storybook a11y addon.
- Критичний користувацький сценарій у Next.js: Playwright smoke-тест у `tests/e2e/`.
- PR вважається готовим після проходження всіх локальних і CI-перевірок.

Для локального запуску E2E один раз встанови браузер Playwright:

```bash
pnpm exec playwright install chromium
```

## Перевірки (checks)

- **TS strict** (per package) · **ESLint** (typescript + react-hooks + jsx-a11y) · **Prettier** (+ Tailwind class-sort) · **Vitest + Testing Library** · **Playwright smoke** · **Storybook a11y addon** (`a11y.test: error`).
- **Git hooks** (husky): `pre-commit` → lint-staged (eslint --fix + prettier на staged); `pre-push` → typecheck. Ставляться автоматично на `pnpm install` (`prepare`).
- **CI** (`.github/workflows/ci.yml`): install → format:check → typecheck → lint → unit/UI-тести → build web + Storybook → Playwright E2E.
- `dist`/`node_modules`/`storybook-static` — у `.gitignore` (артефакти не комітимо).

## Як використати як шаблон

1. Скопіюй теку (або «Use this template», якщо буде на GitHub).
2. Переймень `name` у root `package.json`.
3. `corepack enable pnpm && pnpm install`.
4. Заміни sample-компоненти на свої; постав свої токени у `packages/tokens`.

## Стек

pnpm workspaces · turborepo · TypeScript (strict) · React 19 · Tailwind CSS 4 · shadcn-стиль (cva + clsx + tailwind-merge) · Storybook 8 (react-vite) · ESLint 9 (flat).
