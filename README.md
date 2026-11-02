# Folio · Next.js Pages Router examples

A TypeScript posts dashboard demonstrating CASL 7, HeroUI 3, Tailwind 4, Redux Toolkit, TanStack React Query, React Hook Form, Yup, react-icomoon, Jest, and Storybook. Existing Git practice notes are preserved.

## Run

Use Node.js 22.13+ (validated on Node 24) and npm.

```sh
npm ci
npm run dev
```

Open the server on port 3000. Routes: `/` (dashboard), `/posts/[id]` (read/edit/delete), `/guide` (code examples). Category tabs use `useRouter` shallow query updates. Search and compact view work on the dashboard. Switch the demo role in the sidebar to exercise authorization.

```sh
npm test
npm run typecheck
npm run build
npm start
npm run storybook
npm run build-storybook
```

Storybook runs on port 6006. Stories cover empty, populated and saving forms, plus custom IcoMoon SVGs. The form test isolates the HeroUI button; the real components are exercised by the application build and runtime checks.

## Code map

- `src/lib/ability.ts`: shared CASL rules, used by UI and API routes.
- `src/lib/store.ts`: Redux role and density state; server data belongs to React Query.
- `src/lib/schema.ts`: Yup validation shared by React Hook Form and API routes.
- `src/pages/api/posts/`: create, read, update and delete examples with authorization.
- `src/pages/index.tsx`: query caching, invalidation, query parameters, CASL `Can`.
- `src/components/`: reusable form, layout, IcoMoon component and stories.
- `tests/`: API permissions/CRUD and interactive form validation tests.

## Demo boundaries

The `x-demo-role` header is intentionally user-selectable. It demonstrates server-side CASL checks but is **not authentication**. In production, derive identity and role from a verified server session. Posts use process-local memory, reset when the server restarts, and are not shared reliably between serverless instances. Replace the store with a database before deployment. Redux preferences reset on refresh.

No secrets or external services are required. Do not push secrets or generated build output. Use the existing checkout in cloud tasks; no additional Git worktree is needed.
