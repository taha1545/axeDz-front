# AxeDz Next.js — AGENTS.md

first read /agent files (06 files covering architecture, standards, API, workflow)

## Stack
- **Next.js 16.2** (app router, RSC), **React 19**, **TypeScript 5**, **Tailwind CSS v4**, **ESLint 9** flat config (`eslint.config.mjs`)
- **shadcn/ui** (radix-lyra style, phosphor icons) — use `@/components/ui/*`
- **next-intl** for i18n (en/fr), `as-needed` locale prefix
- **@tanstack/react-query** with `staleTime: Infinity`, `retry: false`, `refetchOnWindowFocus: false`
- **Zustand** for client state, **react-hook-form + zod** for forms
- **Axios** with auto token refresh on 401 → redirect to `/login`
- **socket.io-client**, **framer-motion**, **date-fns**, **sonner** (toasts), **vaul** (drawers), **recharts**, **@dnd-kit**, **next-themes**

## Commands
```bash
npm run dev      # next dev (allowedDevOrigins: ["127.0.0.1"])
npm run build    # next build
npm run lint     # eslint (flat config via eslint.config.mjs, NOT next lint)
npm run start    # next start
```
No typecheck or test scripts; no test framework installed.

## Architecture

### Route groups
- `(auth)/` — login, signup (server components importing client forms), forget-password, reset-password, verify-phone, callback (all `'use client'` except login/signup)
- `(home)/` — landing page server component with client sub-components
- `dashboard/` — protected area; **uses hardcoded mock data** (no real API calls in layout or overview)

### Layering (golden rules)
| Layer | Role | Import from |
|---|---|---|
| **Components** | UI only — no business logic, no direct API calls | `@/components/*` |
| **Hooks** | ALL business logic + API calls | `@/hooks` (barrel) |
| **Services** | HTTP calls using Axios instance | `@/services` (barrel) |
| **Types** | Single source of truth — do not redefine | `@/types` (barrel) |
| **Schemas** | Zod validation schemas | `@/schemas` (barrel) |

### i18n
- Messages in `messages/{en,fr}.json`
- Config: `i18n/routing.ts` — exports `Link`, `usePathname`, `useRouter`, `redirect` from `next-intl/navigation`
- Locale layout (`app/[locale]/layout.tsx`) calls `setRequestLocale(locale)` for static rendering
- Next.js 16: `params` is wrapped in `Promise<>` (e.g., `params: Promise<{ locale: string }>`)
- Must validate locale against `["en", "fr"]` in `generateMetadata`

### Key files
- `services/api.ts` — Axios instance (NEXT_PUBLIC_API_URL, 40s timeout, withCredentials: true, auto-refresh on 401)
- `services/query-client.ts` — singleton QueryClient (staleTime: Infinity, retry: false)
- `services/token.ts` — localStorage JWT helpers (get/set/clear)
- `providers/query-provider.tsx` — `'use client'` QueryClientProvider wrapper
- `providers/theme-provider.tsx` — `'use client'` next-themes wrapper
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `lib/gtag.ts` — Google Analytics helpers (NEXT_PUBLIC_GOOGLE_ANALYTICS_ID)
- `lib/metadata.ts` — SEO metadata per route, LD+JSON schemas
- `app/head.tsx` — legacy file (pre-Next.js 13.4 pattern), kept for preload/preconnect
- `app/sitemap.ts` — dynamic sitemap with all locales

### Notable
- `case-exmple/` directory has a known typo
- Dashboard shows **mock data** — do not expect real API responses
- Root layout uses `suppressHydrationWarning` (required for next-themes)
- Three fonts configured: Geist (sans), Geist_Mono (mono), Space_Grotesk

## Conventions
- `cn()` from `@/lib/utils` for class merging
- shadcn/ui via `npx shadcn@latest add <name>`
- `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` are minimum env vars
- `.env*` is gitignored
- Hook pattern: `as const` query keys at module scope, `useQuery` with `enabled` guard, `useMutation` with cache invalidation via `queryClient.setQueryData()`, convenience hooks exposing `mutateAsync` + `isPending`
- API base path: `/auth/...`, `/contacts/...`, `/api-keys/...`, `/communication/...`, `/payments/...` (production: `https://api.axedz.com/api`)

## Agent authority
| Level | Allowed without approval |
|---|---|
| **Green** | Docs, readability, lint fixes, UI improvements (non-breaking), mock data |
| **Yellow** | New API endpoints in hooks, non-secret env vars, frontend fields |
| **Red** *(ask)* | Auth/security, CI/CD, rate limiting, encryption, token handling |
