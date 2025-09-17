# Ocean Notes Frontend (Astro)

Modern, minimalist personal notes manager UI built with Astro. Implements:
- Authentication (login/register/logout)
- Notes CRUD (create, read, update, delete)
- Organization by categories and tags
- Search and quick filters
- Ocean Professional theme (blue and amber accents, subtle gradients, rounded corners, smooth transitions)

## Quick Start

1. Install dependencies
```bash
npm install
```

2. Configure API base (optional)
- Set environment variable PUBLIC_API_BASE to point to your backend (e.g. https://api.example.com/api).
- If not set, the app falls back to same-origin `/api`.

Example:
```bash
export PUBLIC_API_BASE="https://api.example.com/api"
```

3. Run dev server
```bash
npm run dev
```

Open the app at http://localhost:3000

## Structure

- src/layouts/Layout.astro — App shell (Header, Footer, global styles)
- src/pages/ — Routes for landing, app, auth, and info pages
- src/components/ — Header, Footer, Sidebar, Notes list and editor
- src/services/api.ts — REST client for auth and notes operations
- src/styles/theme.css — Ocean Professional theme and base styles
- src/utils/env.ts — API base URL resolution

## Environment

- PUBLIC_API_BASE: optional. If provided, used as REST base URL; otherwise, same-origin `/api`.

## Notes

- This UI assumes a backend exposing REST endpoints for auth and notes CRUD.
- Token is stored in localStorage as `token`.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview built site
- `npm run lint` — Lint
