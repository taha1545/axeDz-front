# Development Standards & Workflow

## Repository Structure

```
/project-root

├── app/[locale]/ *           # Next.js application code (App Router)
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom hooks (MANDATORY usage layer)
|   |__ page.tsx
├── public/                # Static assets
├── .env.example           # Environment template
|__ types
|__ hooks
|__ schemas
└── README.md
```

---

## Code Standards

### Style & Quality

* **Linter**: ESLint (strict mode)
* **Formatter**: Prettier
* **Type System**: Strict TypeScript (no `any` unless absolutely required)
* **Max Complexity**: Cyclomatic complexity < 10 per function
* **Line Length**: 130 characters max
* **Architecture Rule**: Feature-based modular design

---

### Critical Architecture Rules (MANDATORY)

* Always import types from:

  ```ts
  import type { X } from "@/types";
  ```

* Always use hooks for logic:

  * ❌ Do NOT put API logic inside components
  * ✅ Use `/hooks/*` for all business logic

* Always structure pages like:

  * `/components` → UI only
  * `/hooks` → logic + API calls and hooks call
  * `/types` → shared contracts

* Never bypass hooks for direct API calls in UI

---

### Naming Conventions

* **Files**: kebab-case (`user-profile.tsx`)
* **Components**: PascalCase (`user-profile.tsx`)
* **Hooks**: camelCase with `use` (`use-auth`, `use-payment`)
* **Functions**: camelCase
* **Constants**: SCREAMING_SNAKE_CASE
* **Types**: PascalCase interfaces/types

---

## Git Workflow

* **Branching Model**: GitHub Flow
* **Main Branch**: `main`
* **Feature Branches**: `feature/short-description`
* **Commit Format**: Conventional Commits

  * `feat:`
  * `fix:`
  * `refactor:`
  * `docs:`
* **Required Checks**:

  * Type check must pass
  * Lint must pass
  * Build must succeed
* **Merge Strategy**: Squash and merge

---

## Code Review Checklist

* [ ] Types imported from `@/types`
* [ ] Logic extracted into hooks (`/hooks`)
* [ ] UI separated from business logic
* [ ] No duplicated API calls in components
* [ ] Responsive design verified
* [ ] Dark/light mode support checked
* [ ] Translations (EN/FR) included
* [ ] No hardcoded strings where i18n is required
* [ ] No secrets in code
* [ ] Performance considered (no unnecessary re-renders)

---

## Environment Management

* **Local Dev**: Next.js dev server (`npm run dev`)
* **Required Tools**:

  * Node.js 20+
  * pnpm/npm
  * Git
* **Env File**: `.env.local` (never committed)
* **Secrets**: Stored in environment variables only

---

## CI/CD Pipeline

1. Lint check (ESLint)
2. Type check (TypeScript)
3. Build validation (`next build`)
4. Unit tests (hooks + utilities)
5. Security check (dependency audit)
6. Deploy to staging (auto on push to main)
7. Manual production deployment (if enabled)

---

## Database Migrations

* **Note**: No direct database layer (API-driven architecture)
* All schema changes are handled via backend/API provider
* Frontend only consumes versioned APIs

---

## Golden Rules (AxeDz Frontend Architecture)

* Components = UI only
* Hooks = ALL logic + API calls
* Types = ALWAYS from `@/types`
* No API calls directly inside components
* No duplicate logic between pages
* Everything must be reusable
* Keep pages thin, hooks thick
* Maintain strict separation of concerns
