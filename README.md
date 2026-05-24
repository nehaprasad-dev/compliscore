# CompliScore

**A 60-second compliance health check for Indian startups.**

Type a company name. Get a score, overdue filings, a rough penalty range, and a plain-English action plan — in under two seconds. Built mobile-first for founders who want to know *“are we in trouble?”* before talking to a CA.

> **Important:** This app uses **demo data only**. It does not pull live GST, MCA, or notice records from any government system. Real filing history is private to the company (or its CA with OTP access). The free scan is a diagnostic teaser; the paid scan is where filings-backed work happens. See [PLAYBOOK.md](./PLAYBOOK.md) for how to deliver that service.

---

## What you get

- **Compliance score (0–100)** with Low / Medium / High risk badge  
- **Pending tasks** — GST, MCA, notices spelled out as checkboxes  
- **Penalty estimate** — directional ranges, not legal advice  
- **AI action plan** — short, founder-friendly summary via Groq (`llama-3.3-70b-versatile`)  
- **Lead capture** — WhatsApp or email for the paid ₹5,000 real scan  
- **Works for any name** — curated profiles for well-known companies; deterministic synthetic profiles for everything else (clearly labelled “Sample data”)

---

## How it works

```
Founder types a name → POST /api/scan → lookup or synthesize profile
                    → scoring engine → Groq summary → result card + lead form
```

1. User enters a company name and taps **Scan** (or picks a suggestion chip).
2. The client calls `POST /api/scan` with `{ companyName }`.
3. **Curated match** — `lib/mock-data.ts` finds a hand-written profile (partial, case-insensitive match; e.g. `razor` → Razorpay).  
   **No match** — `buildSyntheticCompany()` builds a deterministic demo profile from the name hash. Same name → same result every time. Flagged `isSample: true` in the API and shown in the UI.
4. `lib/scoring.ts` computes the score:
   - Start at **100**
   - **−15** per overdue GST month (GSTR-3B cadence)
   - **−20** if MCA annual return is overdue
   - **−10** per pending notice  
   - Clamped to 0–100. Risk: **≥70 Low**, **40–69 Medium**, **&lt;40 High**
5. Structured health data goes to Groq with a tight prompt (&lt;150 words, three sections). Sample profiles are described as illustrative, not factual.
6. If `GROQ_API_KEY` is missing or the call fails, the user still gets scores and tasks — only `aiSummary` falls back to static text (`aiSummaryFallback: true`).

After the scan, **LeadForm** posts to `POST /api/lead`, validates Indian mobile or email, and forwards JSON to `LEAD_WEBHOOK_URL` (or logs in dev if unset).

---

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| UI | Hand-rolled shadcn-style primitives in `components/ui/` |
| Motion | Framer Motion (score count-up, result transitions) |
| AI | Groq SDK → `llama-3.3-70b-versatile` |
| Language | TypeScript (strict) |

No database, no auth, no government APIs — by design.

---

## Project structure

```
app/
  layout.tsx              # Fonts, metadata, global shell
  page.tsx                # Hero, navbar, background, scanner section
  globals.css             # Tailwind + editorial background utilities
  api/
    scan/route.ts         # Scoring + Groq summary
    lead/route.ts         # Lead validation + webhook forward

components/
  scanner.tsx             # Input, chips, skeleton, result card, example preview
  lead-form.tsx           # Paid scan CTA (₹5,000)
  ui/                     # Button, Input, Card, Badge, Skeleton

lib/
  types.ts                # Shared types (Company, ScanResult, RiskLevel)
  mock-data.ts            # ~36 curated companies + synthetic builder
  scoring.ts              # Pure scoring + penalty estimate
  utils.ts                # cn() helper

scripts/
  record-demo.mjs         # Playwright — records marketing demo (webm)
  encode-demo.sh          # ffmpeg — exports MP4 + GIF

PLAYBOOK.md               # How to fulfil paid scans (internal ops)
.env.local.example        # GROQ_API_KEY, LEAD_WEBHOOK_URL
```

---

## Run locally

**Prerequisites:** Node 20+, npm

```bash
git clone https://github.com/nehaprasad-dev/compliscore.git
cd compliscore
npm install
cp .env.local.example .env.local
```

Edit `.env.local`:

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `GROQ_API_KEY` | No | AI action plan. [Free key](https://console.groq.com/keys). Without it, fallback text is used. |
| `LEAD_WEBHOOK_URL` | No (yes for prod) | JSON `POST` target for leads — Formspree, Discord, Slack, Zapier, n8n, etc. Empty = console log in dev. |

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

---

## Try it

**Suggestion chips on the homepage:** Razorpay · Zepto · Meesho · Khatabook

**More curated names** (fictional compliance details — real names for demo recognition only):

| Category | Examples |
|----------|----------|
| Fintech | Razorpay, CRED, PhonePe, Paytm, Cashfree, Zerodha, Groww, BharatPe |
| Commerce | Flipkart, Meesho, Nykaa, Zepto, Zomato, Swiggy |
| SaaS / devtools | Postman, Freshworks, Khatabook, ClearTax, SpotDraft, Apna |
| Mobility / health / edtech | Ola, OYO, Urban Company, Practo, Unacademy |

**Fictional companies** (full risk range for demos):

- `Mumbai Chai` — high risk (overdue GST + MCA + notices)  
- `Hyderabad Health` — worst-case  
- `Chennai Coders` — medium  
- `Bengaluru Bytes` — clean  

Type anything else — you’ll get a **sample** profile with a banner in the result card.

---

## Record a demo GIF / video

With the dev server running:

```bash
node scripts/record-demo.mjs    # → .recordings/compliscore-demo.webm
bash scripts/encode-demo.sh     # → compliscore-demo.mp4 + compliscore-demo.gif
```

Requires Playwright (dev dependency) and ffmpeg. Output files are gitignored — upload them to X, LinkedIn, or your README separately.

---

## Lead capture setup

1. Create a webhook (e.g. Discord: Server Settings → Integrations → Webhooks → New Webhook).  
2. Paste the URL into `LEAD_WEBHOOK_URL` in `.env.local` (and Vercel env in production).  
3. Submit the form on a scan result — you should see the payload in your channel.

Payload includes company name, score, risk level, and contact. Full fulfilment workflow: **[PLAYBOOK.md](./PLAYBOOK.md)**.

---

## Deploy

1. Push to GitHub.  
2. Import the repo in [Vercel](https://vercel.com).  
3. Add environment variables: `GROQ_API_KEY`, `LEAD_WEBHOOK_URL`.  
4. Deploy — no other infra.

---

## Disclaimer

- All compliance numbers, PANs, and GSTINs in `lib/mock-data.ts` are **invented for demonstration**. They are format-plausible placeholders, not real identifiers.  
- Penalty estimates are **directional** — meant to create urgency, not to use in front of a tax officer.  
- CompliScore is a **diagnostic tool**, not legal or tax advice.

---

## License

Private project — all rights reserved unless you add a license file.

Built with Next.js, Groq, and a lot of chai ☕
