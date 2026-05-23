# CompliScore — Compliance Health Scanner for Indian Startups

A mobile-first, single-page app that gives Indian founders an **instant compliance health score**, a list of pending filings, a rough penalty estimate, and an **AI-written action plan** — all in under two seconds.

It runs entirely on mock data, so there are no government APIs, no auth, and no database. The point is to surface "oh, I need to fix this" moments fast enough to drive the user toward a paid follow-up scan.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** for styling
- **shadcn-style** primitives (`Button`, `Input`, `Card`, `Badge`, `Skeleton`) hand-rolled in `components/ui/*`
- **Framer Motion** for the result fade-in
- **lucide-react** for icons
- **Groq SDK** with `llama-3.3-70b-versatile` for the AI summary
- **TypeScript** strict mode end-to-end

## Project layout

```
app/
  layout.tsx            # Root layout, metadata, fonts
  page.tsx              # Page shell + sticky CTA
  globals.css           # Tailwind v4 entry
  api/scan/route.ts     # POST /api/scan — scoring + Groq call
components/
  scanner.tsx           # Client component: input, skeleton, result card
  ui/                   # Button, Input, Card, Badge, Skeleton primitives
lib/
  types.ts              # Shared TS types
  mock-data.ts          # 6 mock Indian companies + lookup helper
  scoring.ts            # Pure scoring engine
  utils.ts              # cn() helper
```

## How it works

1. User types a company name and hits **Scan Now**.
2. The client POSTs `{ companyName }` to `/api/scan`.
3. The route runs a case-insensitive partial match against `lib/mock-data.ts` (so "chai" matches "Mumbai Chai Co.").
4. `lib/scoring.ts` computes a deterministic score:
   - Start at 100.
   - **−15** per overdue GST month.
   - **−20** if MCA annual return is overdue.
   - **−10** per pending notice.
   - Clamped to `[0, 100]`. Risk thresholds: ≥70 Low, 40–69 Medium, <40 High.
5. The structured health object is sent to Groq with a tightly scoped prompt (under 150 words, plain English, three short sections).
6. If `GROQ_API_KEY` is missing **or** the call fails, the response still contains the structured data — only the `aiSummary` field falls back to a static message and `aiSummaryFallback: true` is flagged in the JSON.

## Running locally

```bash
cp .env.local.example .env.local
# add your free Groq key from https://console.groq.com/keys
npm install
npm run dev
```

Open <http://localhost:3000>. The app works **without** a Groq key — you'll just see the fallback summary instead of a real one.

## Try these names

- `Mumbai Chai` — high risk, overdue GST + MCA + notices
- `Hyderabad Health` — worst-case scenario
- `Chennai Coders` — medium risk
- `Delhi Threads` — low-medium
- `Bengaluru Bytes` / `Pune Fintech` — clean

## Deploy

Push to GitHub and import in Vercel. Add `GROQ_API_KEY` in the Vercel project settings. That's it — no other infra.

## Notes

- The penalty estimates are **directional, not legal advice**. They are designed to create urgency, not to stand up in front of a tax officer.
- The Groq call is wrapped in `try/catch`; the API never returns a 500 due to AI failures. The user always sees a usable result.
- All touch targets are ≥44 px, the layout caps at `max-w-md`, and the sticky CTA stays visible while scrolling — built mobile-first.
