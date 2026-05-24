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

1. User types **any** company name and hits **Scan Now**.
2. The client POSTs `{ companyName }` to `/api/scan`.
3. The route looks the name up in `lib/mock-data.ts` (case-insensitive partial match — "chai" matches "Mumbai Chai Co.", "razor" matches "Razorpay Software Private Limited").
4. **Curated hit** → use the hand-written profile.
   **No match** → `buildSyntheticCompany()` generates a deterministic sample profile from a hash of the name (same input always produces the same output). The result is flagged `isSample: true` and the UI shows a prominent "Sample data — not pulled from actual filings" banner inside the card.
5. `lib/scoring.ts` computes a deterministic score from whichever profile we have:
   - Start at 100.
   - **−15** per overdue GST month.
   - **−20** if MCA annual return is overdue.
   - **−10** per pending notice.
   - Clamped to `[0, 100]`. Risk thresholds: ≥70 Low, 40–69 Medium, <40 High.
6. The structured health object is sent to Groq with a tightly scoped prompt (under 150 words, plain English, three short sections). When `isSample` is true, the prompt instructs the model to phrase findings as illustrative rather than factual.
7. If `GROQ_API_KEY` is missing **or** the call fails, the response still contains the structured data — only the `aiSummary` field falls back to a static message and `aiSummaryFallback: true` is flagged in the JSON.

## Why synthetic profiles, not live data?

Real GST filing history, MCA delinquency status, and pending-notice data are **private to the taxpayer** in India — there is no public API that returns them by company name. They can only be pulled by the company itself (or its CA, with the company's OTP-authenticated session). That is the entire reason the spec uses a demo dataset.

To still feel responsive for any name a founder types, unknown names fall through to a deterministic synthetic profile, **clearly labelled "Sample data" in the UI and prompt**. The real, filings-backed scan is the paid follow-up service advertised in the sticky CTA.

## Lead capture

After every scan, the result card shows a small green form asking for the founder's WhatsApp or email so they can request the real ₹5,000 scan. Submissions are validated server-side (Indian 10-digit mobile or RFC-style email) and posted to `/api/lead`.

The route forwards each lead as JSON to `process.env.LEAD_WEBHOOK_URL` — that can be:

- A **Formspree** form endpoint (free 50 submissions / month)
- A **Web3Forms** endpoint
- A **Discord** or **Slack** incoming webhook (lead pings you in real time)
- A **Zapier / n8n** webhook (push to Notion, Sheets, CRM, etc.)
- Anything that accepts a JSON `POST`

If `LEAD_WEBHOOK_URL` is empty, the lead is still captured and logged to the server console. See `PLAYBOOK.md` for what to do with each lead once it lands.

## Running locally

```bash
cp .env.local.example .env.local
# add your free Groq key from https://console.groq.com/keys
# (optionally) add your LEAD_WEBHOOK_URL
npm install
npm run dev
```

Open <http://localhost:3000>. The app works **without** a Groq key — you'll just see the fallback summary instead of a real one. It also works without `LEAD_WEBHOOK_URL` — leads land in the dev server log.

## Try these names

**Real Indian companies & YC-backed startups (all bias toward Low / Medium risk in the demo — see note below):**

- `Razorpay`, `CRED`, `PhonePe`, `Paytm`, `Cashfree`, `Zerodha`, `Groww`, `Slice`, `BharatPe` — fintech
- `Flipkart`, `Meesho`, `Nykaa`, `Zepto`, `Zomato`, `Swiggy`, `Atoms`, `Dukaan` — commerce
- `Postman`, `Freshworks`, `Khatabook`, `ClearTax`, `SpotDraft`, `Plum`, `Apna` — SaaS / YC India
- `Ola`, `OYO`, `Urban Company`, `Practo`, `Unacademy` — mobility / services / health / edtech

**Fictional founder-size companies (full risk spectrum, including the dramatic high-risk demos):**

- `Mumbai Chai` — high risk, overdue GST + MCA + notices
- `Hyderabad Health` — worst-case scenario
- `Chennai Coders` — medium risk
- `Delhi Threads` — low-medium
- `Bengaluru Bytes` / `Pune Fintech` — clean

> **Note:** All compliance details in `lib/mock-data.ts` are **fictional demo data**. PAN/GSTIN values are format-correct placeholders, not real identifiers. Real company names are recognised so the demo is more impressive, but nothing in this file makes any claim about the actual compliance status of any named company.

## Deploy

Push to GitHub and import in Vercel. Add `GROQ_API_KEY` in the Vercel project settings. That's it — no other infra.

## Notes

- The penalty estimates are **directional, not legal advice**. They are designed to create urgency, not to stand up in front of a tax officer.
- The Groq call is wrapped in `try/catch`; the API never returns a 500 due to AI failures. The user always sees a usable result.
- All touch targets are ≥44 px, the layout caps at `max-w-md`, and the sticky CTA stays visible while scrolling — built mobile-first.
