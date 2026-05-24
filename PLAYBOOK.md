# CompliScore — Paid Scan Fulfillment Playbook

> **Internal operational doc.** Read this before the first lead lands.
> Print it. Tape it next to your laptop. Refine after every customer.

This playbook turns a lead from the website (`/api/lead`) into a paid ₹5,000 / 2-hour compliance scan, delivered as a PDF report. It assumes you are operating **solo, manually, in India**, using the founder's own portal sessions to pull real filing data.

This document has **no secrets** — it's safe in the repo. The credentials and data you will handle during fulfillment ARE highly sensitive. Never commit those.

---

## 0. Mindset

You are not a Chartered Accountant. You are a diagnostician. You produce a clear, short, urgency-driving snapshot — then point the founder at the right next action (DIY filing, or hand-off to a CA in your network).

If you do this well, ~30% of paid-scan customers will ask "can you just fix these for me?" That is your real product — a **monthly retainer at ₹15k–₹30k**. The scan is the funnel.

---

## 1. What you are selling (and not selling)

**You ARE selling**
- A one-time diagnostic scan of a single Indian entity
- Delivered as a PDF within 2 hours of payment confirmation
- Compliance health score, ranked risks, ₹-exposure, 90-day filing calendar, and a 3–5 step action plan
- One follow-up email within 48 hours answering up to 3 clarifying questions

**You are NOT selling**
- The actual filing (you diagnose; you don't file)
- Legal opinions (you are not a CA / advocate)
- Notice replies or representation (refer to a CA)
- Scans of more than one entity per ₹5,000 (group / subsidiaries cost extra)
- Audit-grade certification (just say "this is diagnostic, not certified")

**Be ruthless about scope.** Scope creep is what kills 2-hour delivery promises.

---

## 2. Pricing & invoicing

**Price:** ₹5,000 flat, per entity, **paid in advance**. No exceptions for the first 20 customers.

### Payment options (in priority order)
1. **UPI** — your VPA (e.g., `yourname@axl` / `yourname@ybl`) or a UPI QR. Fastest. Confirms in seconds. Use this 90% of the time.
2. **Razorpay Payment Page** — create one in 10 minutes from your Razorpay dashboard, reuse the same link. Use when the founder wants a card option.
3. **International (Stripe / Wise)** — only if the founder is paying from outside India. Add 5% to cover FX + fees.

### GST handling
- **Below ₹20 lakh annual turnover** → not GST-registered, no tax charged. Add this line to the invoice:
  > *Service provider not registered under GST (turnover below ₹20 lakh threshold).*
- **Above threshold** → 18% GST on professional services. Quote `₹5,000 + 18% GST = ₹5,900`. Issue a tax invoice with your GSTIN so the client can claim ITC (input tax credit).

### Invoice template (one Google Doc, reuse forever)
- Your name / business name + address
- Your PAN + GSTIN (if registered)
- Client's legal name + GSTIN (so ITC can be claimed)
- Service line: "One-time compliance health diagnostic — [Company Name]"
- Amount + GST (if applicable) + total in words
- Payment terms: 100% in advance
- Your bank / UPI details
- Invoice number sequence (e.g., `CS-2026-001`, `CS-2026-002`)

Use Refrens, Zoho Invoice, or a Google Doc template — don't waste time building one yourself.

---

## 3. Lead intake — first reply (target SLA: 30 minutes)

When a lead lands (form submission email, DM, or webhook notification), reply within 30 minutes. Faster is better — conversion drops sharply after 60 minutes.

### Reply template (paste into WhatsApp / email and edit the brackets)

> Hi [name], thanks for trying the free scan — saw you ran it for [Company Name].
>
> Quick confirmation on the paid scan:
>
> - Detailed report based on your **live** GST, MCA, and tax-portal data
> - Delivered as a PDF within **2 hours of payment**
> - **₹5,000 flat**, paid in advance (UPI or Razorpay)
>
> To start, please share:
> 1. Company legal name + CIN (or PAN)
> 2. GSTIN, if registered
> 3. The mobile number that's on your GST portal (we'll send OTPs there)
> 4. UPI ID, or "Razorpay" if you want a card link
>
> Once payment hits, the 2-hour clock starts. Confirm and I'll send my UPI / link.
>
> — [Your name]

### What this template does
- **Sets expectations** explicitly (data sources, format, time, price)
- **Filters tire-kickers** — the 4 questions weed out people who aren't serious
- **Makes payment-first non-negotiable** — without saying it bluntly
- **Removes ambiguity** about what they're getting

If the founder pushes back on payment-first, politely decline and move on. The first 20 paying customers establish the price; flexibility comes later.

---

## 4. Secure credential handoff (this is the part that goes wrong)

The single biggest operational risk is mishandling credentials. Indian portals have no read-only OAuth tokens — login is username + OTP. Take this seriously from day one.

### Rules

**Never**
- Ask for the GSTN / MCA / IT password over WhatsApp, SMS, or email
- Store credentials anywhere (no password manager entry, no notes)
- Log in from a shared / public laptop or browser session
- Run two clients' sessions in the same browser profile at once

**Always**
- Use a **fresh incognito window or a dedicated browser profile per client**
- Close every tab when delivery is done
- Take **notes only** — do not download CSVs / spreadsheets of the founder's filings; the deliverable is your PDF, not the raw data
- Wipe browser cookies + history after each client

### Two acceptable workflows

**A. Screen-share (recommended for your first 5 customers)**
- Founder joins a Google Meet / Zoom call
- Founder shares their screen and logs in themselves
- You watch, take notes, point them at sections to click
- Total time: ~30 minutes extra, but **zero credential risk**
- Charge an extra ₹1,000 ("rapid + supervised") if you want to upsell this

**B. Async OTP-only (for repeat / trusted customers)**
- Founder shares only the **username** (usually the GSTIN itself for GST, CIN for MCA)
- You navigate to the login screen, type the username
- You ping the founder on WhatsApp for the OTP
- They send it; you log in immediately and delete the message
- You stay logged in for ~20 minutes, then sign out
- **Never** ask for a re-usable password

If a founder refuses both, the scan cannot happen. Refund and decline. No exceptions.

---

## 5. The 2-hour clock — minute-by-minute

The clock starts the moment payment hits your account, not when the founder fills the form. Use a literal timer.

| Time | What you do |
|---|---|
| **T+0–10** | Confirm payment. Reply: "Payment received. Starting now. I'll need OTPs in real-time over the next 45 minutes — please stay reachable." Open fresh incognito. |
| **T+10–25** | **GST portal** (`gst.gov.in`): GSTR-3B last 12 months, GSTR-1 last 6 months, returns dashboard, notices section, electronic credit & cash ledgers. |
| **T+25–35** | **MCA21** (`mca.gov.in`): Company master data → AOC-4 + MGT-7 status, DIR-3 KYC status, last AGM date, registered charges, director list. |
| **T+35–45** | **Income Tax portal** (`incometax.gov.in`): Latest ITR filed + status, TDS returns (24Q / 26Q), Form 26AS, outstanding demands. |
| **T+45–55** | **TRACES** (`tdscpc.gov.in`) if a deductor: defaults, justification reports. **EPFO** if 20+ employees: ECR status, defaults. **State portals**: Professional Tax + Shop & Establishment renewal status. |
| **T+55–75** | **Analysis.** Plug numbers into the scoring engine (mentally or in a spreadsheet). Identify top 3 risks by ₹ exposure. List filings due in next 90 days. |
| **T+75–100** | **Write the report** using the template (§6). Don't write from scratch. |
| **T+100–110** | **Review.** Read it as a founder would. Check every ₹ number twice. PDF export with watermark. |
| **T+110–120** | **Deliver.** Email the PDF + 3-line summary in the body + your retainer pitch. |

### If you'll slip past 2 hours
- At **T+1h 45m**, send: "Still pulling data from [portal]. Real ETA is now [X]. Sorry about the slip." Honest > silent.
- One slip in 10 deliveries is acceptable, two is a pattern, three is your fault.

---

## 6. Report template (2 pages max)

Build this once as a Google Doc → duplicate per client → "Download as PDF" → done.

### Page 1
1. **Header**
   - Company legal name, CIN, GSTIN, scan date
   - "Prepared by [Your Name], CompliScore"
   - "Confidential — for [Founder Name] only"
2. **Compliance Score** — large number, colour-coded (green ≥70 / amber 40–69 / red <40), risk band label, one-line summary.
3. **Top 3 Risks** — a 3-row table:

   | Risk | Penalty Exposure | Fix by |
   |---|---|---|
   | GSTR-3B overdue 4 months | ₹6,000–₹20,000 + interest | Within 30 days |
   | MCA AOC-4 not filed (FY 2024-25) | ₹100/day = ~₹18,000 | Before next AGM |
   | TDS short payment, Q3 | ₹12,000 + 1.5% interest/month | Immediately |
4. **90-day Filing Calendar** — date / form / one-line description.

### Page 2
5. **Detailed Findings** — 1 paragraph per area (GST / MCA / IT / TDS / PF / PT). Plain English. Name the section but explain it.
6. **Recommended Action Plan** — 3 to 5 numbered steps in priority order. Each step: what to do, who does it (CA / founder / you), rough cost.
7. **What's NOT in scope** — one paragraph: didn't audit books, didn't review contracts, didn't verify directors' KYC, etc.
8. **Disclaimer** (mandatory, copy verbatim):
   > This report is a diagnostic summary based on data available in [Founder]'s government portals as of [date / time]. It does not constitute legal, tax, or filing advice. Always confirm specific actions with a qualified Chartered Accountant or Company Secretary before filing. The author is not liable for actions taken based on this report.

Use a single clean font (Inter / Source Sans / Geist), generous whitespace, one accent colour for the score. Don't over-design — clients judge clarity, not aesthetics.

---

## 7. Delivery

- **Format:** PDF only (never Word — editable docs scare founders).
- **Watermark:** Subtle diagonal "Prepared for [Company Name] — Confidential" across each page, 10% opacity.
- **Filename:** `CompliScore-[CompanyShortName]-[YYYY-MM-DD].pdf`
- **Email subject:** `Compliance Scan Report — [Company Name]`
- **Email body** (3 lines max):
  > Hi [Name],
  >
  > Attached is your full compliance scan. Headline: score of [X]/100, [Risk Level] — the biggest risk is [one-line]. Details + the 3-step action plan are in the PDF.
  >
  > Reply with any questions in the next 48 hours, those are included. If you'd like me to help fix the top items, I run a monthly retainer at ₹[X] — happy to set up a 20-min call.
  >
  > — [Your name]
- Also send the PDF on WhatsApp if that's where the conversation started. Don't make the founder hunt their inbox.

---

## 8. The upsell (this is where the money actually is)

The ₹5,000 scan is a **loss-leader**. The real revenue is the retainer.

### Retainer offer (send at T+24h after delivery)

> Hope the report was useful. If you'd like, I can take the top 3 items off your plate — typically **₹15,000 / month** covers:
> - Filing reminders 7 days before every due date
> - Monthly health re-scan
> - One 30-minute call per month
> - Direct WhatsApp line for compliance questions
>
> No contract — month-to-month. Want to try it for a month?

About **20–30% of paid-scan customers** convert to this if the report was useful. That's where ₹50k/month becomes ₹50k/month consistently, not just from scans.

### Do NOT
- Push during the scan delivery itself — let the report speak first.
- Discount below ₹10,000 / month — you're trading hours for rupees, protect your floor.
- Promise filing in the retainer unless you have a CA partner who actually does the filings. Diagnosis ≠ filing.

---

## 9. Edge cases

| Case | Handle |
|---|---|
| **LLP** | MCA forms differ (Form 8 + Form 11). Same workflow, different forms. Same price. |
| **OPC (One Person Company)** | Same as Pvt Ltd, simpler reporting. Same price. |
| **Section 8 / Trust / Society** | Different regulator (Charity Commissioner). **Decline** unless you've studied this segment. |
| **Foreign subsidiary / Indian arm of foreign co.** | FEMA + FLA + APR involved. **Decline** unless you've done it before. |
| **NBFC / payment aggregator / regulated fintech** | RBI returns involved. **Decline OR quote ₹15,000+** — these are real domain hours. |
| **Newly-incorporated (< 6 months)** | Usually clean. Offer a "starter audit" at the same ₹5,000 — value is flagging setup gaps (board resolutions, ESOP pool, share certificates). |
| **Group company / multiple entities** | One scan = one entity. Each additional entity = ₹4,000 (small bulk discount). |
| **You find genuinely criminal-grade non-compliance** (fraud, deliberate evasion, strike-off in progress) | State findings factually in the report. Recommend the founder consult a CA + lawyer immediately. Do NOT moralise. Do NOT advise. |

---

## 10. Legal & data handling (DPDP / professional liability)

### DPDP Act, 2023 — the bare minimum
The Digital Personal Data Protection Act applies to you the moment you handle a founder's portal data. Minimum hygiene:

- **Collect minimum** — only the info you need for this scan.
- **Retain minimum** — delete OTPs immediately, notes within 24h of delivery, the PDF on your side after 90 days.
- **Disclose purpose** — your engagement letter (next bullet) should explicitly state what you'll access and why.
- **No re-use** — never use one customer's data to enrich another customer's report.

### Engagement letter (one page, sign before first scan)
For your first 10 customers, a 1-page Google Doc is enough. Include:
1. Scope (what's in / not in)
2. Price + payment terms
3. Confidentiality (you won't share their data with anyone)
4. Data retention (you'll delete within X days)
5. Limitation of liability (capped at the fee paid)
6. Both names + date + signatures (DocuSign / Aadhaar e-sign / scanned signature all work)

After ~10 customers, get a proper professional services agreement drafted by a lawyer. ~₹5,000 one-time spend, reusable forever.

### Insurance
Once you cross ~20 paying customers, consider **professional indemnity insurance** (typically ₹15,000–₹25,000/year for ₹25 lakh cover via ICICI Lombard / Bajaj Allianz / Tata AIG). One angry founder can wipe out your year of savings without it.

---

## 11. After every customer — debrief in 5 minutes

Open a Google Sheet, log:

| Date | Company | Industry | Score delivered | Time taken | Source (DM / form / referral) | Retainer pitch sent? | Converted? |

After 20 rows you'll see:
- Which industries are most profitable / fastest
- Which channels deliver the highest-ticket leads
- What your real average delivery time is (it won't be 2 hours; it'll be 2.5)
- What % of customers convert to retainer

That sheet is your business. Treat it like a CRM.

---

## 12. Things that will go wrong (and how to handle them)

| Failure | Response |
|---|---|
| Payment received, founder ghosts before sharing OTPs | Wait 24h. Send one nudge. Then refund minus 10% (₹500) for time blocked. Move on. |
| You hit 2h without OTPs because founder went offline | Pause the clock. The 2-hour SLA is on you when the data is in your hands; when it's blocked on the founder, the clock waits. Document this in the engagement letter. |
| You find data is wildly different from the free-tool's sample profile | This will happen often — the free tool is illustrative. The report is real. Just deliver the real one, no need to mention. |
| Founder disputes a finding | Reply with the screenshot from their own portal where you saw it. Offer one free re-scan in 30 days if they fix it. |
| Groq is down during delivery | Doesn't matter — you're writing the report by hand, not calling an LLM. The AI summary is for the **free** tool, not the paid report. |
| Server gets traffic spike | The free tool can be rate-limited; the paid pipeline is manual and unaffected. (Add Vercel's free-tier rate-limit middleware if `/api/scan` starts getting hit > 100x / minute.) |

---

## 13. The number that matters

The single metric to track for the first 3 months: **scans delivered per week.**

- Week 1–2: target 1 scan
- Week 3–4: target 3 scans / week
- Month 2: target 5 scans / week
- Month 3: target 8 scans / week + 2 retainer conversions

At month 3 steady state:
- 8 scans × 4 weeks × ₹5,000 = **₹1,60,000 / month** from scans
- 2 retainers × ₹15,000 = **₹30,000 / month**
- **Total ≈ ₹1,90,000 / month**

That's a real business. Built on a one-day tool + this playbook.

---

*Last updated: keep this dated.*
*Edits welcome — every customer teaches you what to improve here.*
