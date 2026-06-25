# Agent Workflow Context

## Agent Role Definition
- **Scope**: Frontend (Next.js application), hooks layer (`/hooks`), TypeScript types (`@/types`), UI components, and API integration layer.
  Agents are NOT allowed to modify backend (Laravel API) or authentication/security systems.

- **Decision Authority**:
  - Can refactor UI and components freely
  - cannot update hooks or types without permission
  - Cannot modify authentication logic
  - Cannot modify payment/billing logic
  - Cannot change backend API behavior

- **Primary Users**:
  - Frontend developers
  - Full-stack developers
  - QA engineers
  - AI coding agents (Cursor, Codex, OpenCode)
  - pro designer

---

## Common Agent Tasks

### 🟢 Green (Autonomous — No Human Approval)

- Generate documentation from code
- Refactor for readability (no behavior change)
- Update dependency patches (security fixes)
- Lint/format fixes
- Generate OpenAPI specs from frontend usage
- Create seed/mock data for local development
- Improve UI components (non-breaking changes)

---

### 🟡 Yellow (Human Notification — Proceed Unless Stopped)

- Add new API endpoints usage in hooks
- Implement feature flags (frontend only)
- Update environment variables (non-secret)
- Add database-related frontend fields (nullable, safe)
- Create new background job triggers (frontend side)
- Extend API integration logic in hooks

---

### 🔴 Red (Human Approval Required)

- Authentication or authorization changes
- Encryption or token handling modifications
- CI/CD pipeline changes
- Rate limiting or security policy changes

---

## Context Files This Agent Should Read

Before starting work, load in this order:

1. `01-project-overview.md` — Understand project goals and constraints  
2. `02-technical-architecture.md` — Understand system structure  
3. `03-development-standards.md` — Follow coding rules  
4. `04-api-and-interfaces.md` — API contracts (CRITICAL)  
5. `05-environment-and-operations.md` — Deployment and runtime rules  
6. `06-agent-workflow-context.md` — This file (authority boundaries)

---

## Codebase Navigation

### Entry Points

- Frontend App: `app/` 
- Hooks Layer: `hooks/`
- Types Layer: `types/`
- Components: `components/`

---

### Configuration Files

- Environment: `.env.local`
- Dependencies: `package.json`
- TypeScript: `tsconfig.json`
- Next.js: `next.config.js`

---


## Working Patterns

### When Implementing a Feature

1. Read existing hooks before writing new logic  and types
2. Check `04-api-and-interfaces.md` for API contract rules  
3. Implement API logic inside `/hooks`  if needed 
4. Keep UI inside `/components` only  
5. Always import types from `@/types`  
6. Keep pages as composition-only (no business logic)  
7. Ensure responsive design (mobile-first)  
8. Support dark/light mode (global CSS variables)  
9. Support EN/FR localization  

---

### When Debugging

1. Check hook logic first (`/hooks`)  
2. Verify API response matches `@/types`  
3. Inspect UI rendering separately  
4. Check network requests (DevTools)  
5. Validate environment variables  
6. Review console + server logs  

---

### When Refactoring

- Refactor hooks before UI components  
- Never mix refactor + feature work in same commit  
- Maintain backward compatibility of types  
- Use incremental small changes  
- Do not break `/hooks` exports  
- Ensure API contract compatibility  

---

## Communication Style

- Provide structured error reports:
  - File path
  - Hook/component name
  - Error message
  - Attempted fix

- Ask clarification when:
  - API behavior is unclear
  - Types are missing or incomplete
  - Backend response is inconsistent

- Never assume backend behavior — always rely on API documentation

---

## Safety Rules

- Never commit `.env` files or secrets
- Never hardcode API keys in frontend
- Never bypass hooks to call APIs directly in components
- Always validate API responses before use
- Respect API rate limits (use retry/backoff)
- Never break type contracts (`@/types`)
- Never modify authentication flow without approval
- Never modify payment/billing logic without approval
- Always log frontend errors safely (no sensitive data)
- Always test changes before production deployment

---

## Core Architecture Rule (AxeDz)

> Components = UI only  
> Hooks = Business logic + API calls  
> Types = Single source of truth (`@/types`)  
> Pages = Composition layer only (no business logic)