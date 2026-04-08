# Axe DZ Frontend Team Guidelines

## Core Principles

* Write clean, readable, maintainable code.
* Follow the established project architecture.
* Keep components reusable and modular.
* Prioritize simplicity over cleverness.
* Respect separation of concerns.

---

## Required Libraries / Tools

Use the approved stack unless discussed with the team:

### Forms & Validation

* React Hook Form
* Zod
* @hookform/resolvers

### API / Server State

* Axios
* TanStack Query

### UI / Styling

* Tailwind CSS
* shadcn/ui
* Framer Motion (only when needed)
* Sonner (for toasts)

### Global State

* Zustand (only for shared client-side state)

### Utilities

* date-fns
* clsx / tailwind-merge

---

## Project Architecture Rules

### Every Feature/Page Should Be Modularized

Each major page/feature should be split into:

```bash
feature-name/
│
├── page.tsx
├── components/
├── hooks/
```

Example:

```bash
login/
│
├── page.tsx
├── components/
│   ├── login-form.tsx
│   └── social-login.tsx
├── hooks/
│   └── use-login.ts
├── services/
│   └── auth.service.ts
├── types/
│   └── login.types.ts
```

---

## Page/File Size Limits

### Hard Rule

* No page/component should exceed **250 lines**.
* If approaching 200+ lines, refactor into smaller components/hooks.

---

## Component Rules

* Components must be reusable when possible.
* Keep components focused on one responsibility.
* Avoid massive JSX blocks.
* Extract repeated UI into shared components.

---

## Hooks Rules

Use hooks for:

* Business logic
* Form logic
* Reusable state logic
* Side effects

Examples:

* `useLogin`
* `useUserProfile`
* `useDebounce`

---

## Services / API Rules

### NEVER Call Axios Directly Inside Components

Bad:

```ts
await axios.post(...)
```

Good:

```ts
authService.login(data)
```

All API logic belongs in:

```bash
services/
```

---

## Type Rules

Every feature should define its own types.

Examples:

```bash
types/
├── login.types.ts
├── user.types.ts
```

Avoid using `any`.

---

## React Query Rules

Use TanStack Query for:

* GET requests
* Server caching
* Mutations when appropriate

Do NOT manually manage loading/error state for server data when React Query can handle it.

---

## Zustand Rules

Use Zustand ONLY for:

* Auth state
* Theme/preferences
* Shared client-only UI state

Do NOT use Zustand for:

* Server/API data
* Form state

---

## Styling Rules

* Use Tailwind utility classes.
* Use shadcn/ui components whenever possible.
* Keep styling consistent with design system.
* Avoid arbitrary messy class combinations.

---


## Git Workflow

### Branching Rules

Never push directly to main.

Use your own branch:

```bash
feature/login-page
feature/dashboard-chart
fix/navbar-bug
refactor/auth-hooks
```

---

## Pull Request Rules

Before PR:

* Ensure code builds
* Ensure lint passes
* Ensure architecture rules followed
* Ensure no console.logs/debug code
* Ensure page/component size rules followed

---

## Folder Structure Reference

```bash
app/
components/
hooks/
lib/
services/
types/
config/
schemas/
```

---

## General Team Expectations

* Follow architecture strictly.
* Ask before introducing new libraries.
* Keep commits clean and meaningful.
* Write code for the next developer, not just for yourself.

---

## Final Rule

> If your code feels messy, overly complex, or too large:
> Refactor it before pushing.

```
```
