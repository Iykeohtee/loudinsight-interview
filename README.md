# User Dashboard — Loudinsight Interview

A Next.js (App Router) user dashboard built against the DummyJSON Users API, matching the provided Figma design(to the very least).

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- lucide-react (icons)
- Data source: [DummyJSON Users API](https://dummyjson.com/docs/users)

## Running locally

No environment variables or API keys are required — the app calls the public DummyJSON API directly and there's no authentication layer, per the spec.

```bash
git clone <repo-url>
cd loudinsight-interview
npm install
npm run dev
```

Visit `http://localhost:3000/dashboard`.
```

## Caching / data-fetching strategy

All data fetching happens server-side, inside Server Components (`app/dashboard/layout.tsx` and `app/dashboard/page.tsx`) — there is no client-side `useEffect` fetch for the initial page load.

The single data-fetching function, `getUsers()` in `lib/api/users.ts`, uses:

```ts
fetch(url, { cache: 'no-store' })
```

**Why `no-store` rather than `force-cache` or a `revalidate` window:** the user list is driven entirely by URL search params (`q`, `page`, `sortBy`, `order`). Every distinct combination of those params produces a different, valid result set — there's no single "the user list" response that could be cached and safely reused across different searches or pages. Caching this data (even with a short revalidate window) risks serving one user's search results to a different query, or stale results after a param change. Since correctness of what's currently displayed matters more here than avoiding a redundant API call, `no-store` is the more defensible default for this specific route.

**Known tradeoff:** `getUsers()` is called twice per page load — once in `layout.tsx` (to get the live `total` for the "Total Customers" stat card) and once in `page.tsx` (for the actual table), each with different params. Both are uncached, so a single page load makes two separate round-trips to DummyJSON. For a dashboard at this scale that's an acceptable cost for correctness; with more time, the layout's fetch would be a good candidate to wrap in its own `<Suspense>` boundary so it doesn't block the whole page shell if it's slow (see "What I'd add" below).

## Assumptions & tradeoffs

The Figma design includes several elements with no corresponding field in the DummyJSON Users API. Rather than guess or fake real-looking data, these were handled as follows:

- **"Status" column (Active/Inactive):** No such field exists on DummyJSON users. Derived deterministically from `id % 3` so it's stable across re-fetches rather than random per render. This is a placeholder, not real status data.
- **"Short by: Newest" sort:** DummyJSON has no `createdAt`/registration timestamp. Mapped "Newest" to `sortBy=id&order=desc` as the closest available proxy (higher `id` roughly corresponds to later insertion in the seed data).
- **Stats cards (Total Customers / Members / Active Now):** Only "Total Customers" is backed by real data — it uses the live `total` count from the API response. "Members," "Active Now," and all the "% this month" deltas have no corresponding data in DummyJSON and are kept as static values matching the Figma mock, not computed or faked as if real.
- **Sidebar navigation:** Only "Customers" is a real, working route, since it's the only page in scope per the spec. The other nav items (Product, Income, Promote, Help) render statically and are not wired to actual pages.
- **Topbar search icon:** Decorative only. The functional search — the one actually specified in the requirements — is the search bar inside the "All Customers" card, not the one in the topbar.
- **"Active Members" sub-link:** Appears to be a filter tab in the full design; out of scope for the core requirements (search/pagination/sort only), so left as a static label rather than a working filter.
- **User name in the topbar/sidebar ("Evano"):** Hardcoded, since the spec states no authentication is required.

## What I'd add or improve with more time

- Responsive layout for smaller breakpoints (not yet addressed)
- A working "Active Members" filter tab, if that turns out to be in scope
- Deploy to Vercel for a live link

**Note:** the stats-total fetch (`layout.tsx`) is streamed via its own `<Suspense>` boundary (`StatsCardsContainer` + `StatsCardsSkeleton`), so a slow request there no longer blocks the sidebar/topbar from rendering. Since Next.js's `error.tsx` only covers `page.tsx` and below in a segment — not `layout.tsx` in the same folder — a failed request is handled locally inside `StatsCardsContainer` with a try/catch, falling back to a `—` on the Total Customers card rather than relying on the route's error boundary.

## AI tool usage

Claude ai was used for debugging, reasoning through the caching decision and also this README file

## Time spent

spent roughly five hours actively working on it from planning to execution