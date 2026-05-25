# CompliScore

### Your startup's compliance health — checked in 60 seconds.

Every Indian startup founder knows the feeling. You're moving fast, shipping product, chasing revenue — and somewhere in the back of your mind there's a quiet voice asking: *"Have we filed everything? Are we going to get a notice?"*

CompliScore answers that question before it becomes a problem.

Type any company name. In under two seconds you get a **compliance score out of 100**, a list of what's overdue, a rough penalty estimate, and an **AI-written action plan** in plain English — not CA jargon.

It's free, it's instant, and it runs on your phone. No login, no documents, no waiting.

---

## The problem it solves

India's startup ecosystem is booming, but compliance is still confusing. GST returns, MCA annual filings, TDS deadlines, random notices — most early-stage founders don't know where they stand until a CA tells them they're behind. By then, penalties have already started piling up.

There's no simple way for a non-finance founder to just *check* if things are okay. That's what CompliScore is for.

You type your company name. You get a score. You see exactly what's pending. And if it's bad, you see how much it might cost you. That's it. The whole thing takes less time than ordering chai.

---

## What you actually get

When you scan a company, the result card shows:

- **Compliance score (0–100)** — green, amber, or red. You know instantly where you stand.
- **Risk badge** — Low, Medium, or High. No ambiguity.
- **Pending tasks** — every overdue filing and unresolved notice, spelled out one by one. GSTR-3B, MCA annual return, pending notices — all of it.
- **Penalty estimate** — a rough range of what the government could charge you if these stay unresolved. Not legal advice, but enough to make you pay attention.
- **AI action plan** — a short, founder-friendly breakdown of what to do first, what's urgent, and what can wait. Written by Groq's `llama-3.3-70b-versatile` model, scoped to under 150 words so you actually read it.
- **Paid scan CTA** — if the free scan scares you (or excites you), there's a one-tap path to request a real, filings-backed scan for ₹5,000 delivered in 2 hours.

---

## How it actually works under the hood

```
You type a name → we look it up → score it → generate an AI summary → show you everything
```

Here's the slightly longer version:

1. You enter a company name and hit **Scan** (or tap one of the suggestion chips — Razorpay, Zepto, Meesho, Khatabook).
2. The frontend sends `{ companyName }` to `POST /api/scan`.
3. We try to match that name against ~36 curated Indian company profiles. The match is fuzzy and forgiving — "razor" finds Razorpay, "cred" finds CRED.
4. **If we find a match**, we use that hand-built profile. **If we don't**, we generate a deterministic synthetic profile from the company name (same name always produces the same result, clearly labelled "Sample data" in the UI).
5. The scoring engine in `lib/scoring.ts` does the math:
   - Everyone starts at **100**.
   - You lose **15 points** for every month your GST return (GSTR-3B) is overdue.
   - You lose **20 points** if your MCA annual return hasn't been filed.
   - You lose **10 points** for each pending government notice.
   - Score is clamped between 0 and 100. **70+ is Low risk. 40–69 is Medium. Below 40 is High.**
6. That structured result goes to Groq with a tight prompt. The AI writes a short, three-part action plan in plain English. If the profile is synthetic, the prompt tells the model to phrase everything as illustrative, not factual.
7. If Groq is down or you haven't set an API key, the app still works perfectly — you just get a static fallback instead of the AI summary. The score, tasks, and penalty estimate are always there.

After the scan, a **lead capture form** lets founders drop their WhatsApp number or email to request the paid real scan. That submission goes to `POST /api/lead`, gets validated (Indian 10-digit mobile or email), and is forwarded to whatever webhook you've configured — Discord, Slack, Zapier, Formspree, anything.

---

## A note about the data

Let's be upfront: CompliScore runs on **demo data**. It does not connect to any government portal. Real GST filing history, MCA delinquency records, and pending notices are **private** in India — only the company itself (or its CA with OTP-authenticated access) can pull them.

That's the whole point of the business model. The free scan gives founders an instant, recognizable "oh shit" moment using curated or synthetic data. The **paid scan** (₹5,000, 2-hour delivery) is where we actually log into portals with the founder's credentials and pull real filings. See [PLAYBOOK.md](./PLAYBOOK.md) for the full fulfilment workflow.

All company names in the mock dataset are used for **demo recognition only**. PANs and GSTINs are format-plausible placeholders, not real identifiers. Nothing in this app makes any claim about any real company's actual compliance status.

---

## Tech stack

| What | Why |
|------|-----|
| **Next.js 16** (App Router) | Server-side API routes + React frontend in one project. No separate backend needed. |
| **Tailwind CSS v4** | Fast styling with a premium editorial feel — dot-grid backgrounds, aurora blobs, serif headlines. |
| **Framer Motion** | Smooth score count-up animation and result card transitions. Makes the 2-second scan feel alive. |
| **Groq SDK** (`llama-3.3-70b-versatile`) | Fast, cheap AI summaries. Falls back gracefully if the key is missing. |
| **TypeScript** (strict) | End-to-end type safety. Every API response, every component prop, every scoring function. |
| **shadcn-style primitives** | Hand-rolled `Button`, `Input`, `Card`, `Badge`, `Skeleton` in `components/ui/`. No external component library. |

No database. No auth. No government APIs. That's intentional — this ships in a day and runs on Vercel's free tier.

---

## Project structure

```
app/
  layout.tsx              # Root layout — fonts (Geist + Instrument Serif), metadata
  page.tsx                # Hero section, navbar, aurora background, scanner embed
  globals.css             # Tailwind v4 + custom background effects (dots, blobs, noise)
  api/
    scan/route.ts         # POST /api/scan — profile lookup, scoring, Groq call
    lead/route.ts         # POST /api/lead — validation, webhook forwarding

components/
  scanner.tsx             # The main event — search input, suggestion chips, skeleton
                          #   loader, animated score, result card, example preview
  lead-form.tsx           # Paid scan CTA card (₹5,000 / 2-hour delivery)
  ui/                     # Button, Input, Card, Badge, Skeleton primitives

lib/
  types.ts                # Company, ScanResult, RiskLevel types
  mock-data.ts            # ~36 curated Indian companies + synthetic profile builder
  scoring.ts              # Pure scoring engine + penalty estimator
  utils.ts                # cn() (clsx + tailwind-merge)

scripts/
  record-demo.mjs         # Playwright script — records a marketing demo as webm
  encode-demo.sh          # ffmpeg pipeline — converts to MP4 + GIF

PLAYBOOK.md               # Internal ops guide for fulfilling paid scans
.env.local.example        # Environment variable reference
```

---

## Getting started

**You need:** Node 20+ and npm.

```bash
git clone https://github.com/nehaprasad-dev/compliscore.git
cd compliscore
npm install
cp .env.local.example .env.local
```

Open `.env.local` and optionally fill in:

| Variable | Required? | What it does |
|----------|-----------|--------------|
| `GROQ_API_KEY` | No | Powers the AI action plan. Grab a free one at [console.groq.com/keys](https://console.groq.com/keys). Without it, everything still works — you just see a static fallback summary. |
| `LEAD_WEBHOOK_URL` | No (yes for prod) | Where lead form submissions get forwarded. Works with Discord webhooks, Slack incoming webhooks, Formspree, Zapier, n8n — anything that accepts a JSON POST. If empty, leads just print to the dev console. |

Then:

```bash
npm run dev          # start dev server
```

Open [http://localhost:3000](http://localhost:3000) and try scanning "Razorpay" or "Zepto".

```bash
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint check
```

---

## Companies you can try

**Suggestion chips on the homepage:** Razorpay, Zepto, Meesho, Khatabook

These are all real, well-known Indian startups (several are YC alumni). Their compliance details in this app are entirely fictional — used for demo recognition only.

**Full curated list:**

| Category | Companies |
|----------|-----------|
| Fintech | Razorpay, CRED, PhonePe, Paytm, Cashfree, Zerodha, Groww, BharatPe |
| Commerce | Flipkart, Meesho, Nykaa, Zepto, Zomato, Swiggy |
| SaaS & devtools | Postman, Freshworks, Khatabook, ClearTax, SpotDraft, Apna |
| Mobility / health / edtech | Ola, OYO, Urban Company, Practo, Unacademy |

**Fictional companies** (these show the full risk spectrum for demo purposes):

- **Mumbai Chai** — High risk. Overdue GST, overdue MCA, multiple notices.
- **Hyderabad Health** — Worst-case scenario. Score near zero.
- **Chennai Coders** — Medium risk. A few things slipping.
- **Bengaluru Bytes** — Clean. Score of 100.

**Type literally anything else** — you'll get a synthetic profile, clearly marked as sample data.

---

## Recording a demo video

With the dev server running:

```bash
node scripts/record-demo.mjs     # captures a webm via headless Playwright
bash scripts/encode-demo.sh      # encodes to MP4 (1.2 MB) + GIF (6.6 MB)
```

The script clicks through Razorpay (clean, score 100) and Khatabook (action items, score 75), scrolls through the AI action plan and lead form, and produces a ~20-second reel ready for X or LinkedIn.

Output files are gitignored. Upload them directly wherever you need them.

---

## Setting up lead capture

1. **Create a webhook.** For Discord: Server Settings → Integrations → Webhooks → New Webhook → Copy URL. Similar for Slack, Zapier, etc.
2. **Paste the URL** into `LEAD_WEBHOOK_URL` in `.env.local` (and in Vercel environment variables for production).
3. **Test it.** Run a scan, fill in the lead form at the bottom of the result, submit. You should see the payload arrive in your channel.

Each lead includes: company name, score, risk level, industry, and the founder's contact info. See [PLAYBOOK.md](./PLAYBOOK.md) for the complete playbook on turning leads into paid scans.

---

## Deploying to production

1. Push to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Add `GROQ_API_KEY` and `LEAD_WEBHOOK_URL` as environment variables.
4. Hit deploy.

That's it. No database to provision, no background workers, no cron jobs. It runs on Vercel's free tier.

---

## Disclaimer

- All compliance data in this app is **fictional and for demonstration only**. PAN and GSTIN values are format-plausible placeholders, not real government-issued identifiers.
- Penalty estimates are **rough and directional** — they exist to create awareness, not to be cited in front of a tax officer.
- CompliScore is a **diagnostic tool**, not legal or tax advice. For real filings and compliance work, consult a Chartered Accountant.

---

Built with Next.js, Groq, and a lot of chai.
