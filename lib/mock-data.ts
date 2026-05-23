import type { Company } from "./types";

/**
 * Returns a YYYY-MM string that is `monthsAgo` calendar months before today.
 * Using relative dates keeps the demo realistic forever — Mumbai Chai will
 * always be ~4 months behind on GST whether you run this in 2026 or 2030.
 */
function monthsAgo(n: number, now: Date = new Date()): string {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - n, 1));
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * Mock dataset of Indian companies. Designed to span the full risk spectrum
 * so the demo always has something interesting to show.
 *
 * `lastGstFilingMonth` is YYYY-MM, derived relative to today so the score
 * distribution stays meaningful as time passes.
 */
export const mockCompanies: Company[] = [
  {
    name: "Mumbai Chai Co.",
    pan: "AABCM1234E",
    gstin: "27AABCM1234E1Z5",
    industry: "Food & Beverage",
    lastGstFilingMonth: monthsAgo(4),
    mcaFilingStatus: "Overdue",
    pendingNotices: [
      "GST notice u/s 73 for last fiscal year",
      "MCA notice for delayed annual return",
    ],
    notes:
      "Single-founder D2C tea brand, recently raised an angel round; bookkeeping is informal.",
  },
  {
    name: "Bengaluru Bytes Pvt Ltd",
    pan: "AAACB7821K",
    gstin: "29AAACB7821K1ZP",
    industry: "SaaS",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
    notes:
      "Series A SaaS company with a CA on retainer; mostly clean compliance posture.",
  },
  {
    name: "Delhi Threads",
    pan: "AAACD4567L",
    gstin: "07AAACD4567L1Z9",
    industry: "Apparel & Retail",
    lastGstFilingMonth: monthsAgo(3),
    mcaFilingStatus: "Filed",
    pendingNotices: ["Professional Tax notice for last quarter"],
    notes: "Bootstrapped fashion brand, two co-founders, in-house ops team.",
  },
  {
    name: "Chennai Coders LLP",
    pan: "AAFCC9988M",
    gstin: "33AAFCC9988M1ZR",
    industry: "IT Services",
    lastGstFilingMonth: monthsAgo(5),
    mcaFilingStatus: "Overdue",
    pendingNotices: [
      "TDS short-payment notice",
      "GSTR-1 mismatch notice",
      "ROC penalty intimation",
    ],
    notes: "Mid-size dev shop, ~20 employees, juggling client work over compliance.",
  },
  {
    name: "Pune Fintech Labs",
    pan: "AABCP1010Q",
    gstin: "27AABCP1010Q1ZT",
    industry: "Fintech",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: ["RBI compliance query on KYC processes"],
    notes: "Early-stage fintech, RBI-regulated, very alert about filings.",
  },
  {
    name: "Hyderabad Health Co.",
    pan: "AAACH3344N",
    gstin: "36AAACH3344N1ZV",
    industry: "Healthtech",
    lastGstFilingMonth: monthsAgo(9),
    mcaFilingStatus: "Overdue",
    pendingNotices: [
      "GST notice u/s 74",
      "EPFO non-compliance notice",
      "MCA strike-off warning",
      "Income tax scrutiny notice",
    ],
    notes:
      "Scaling fast but compliance has been completely neglected for ~9 months.",
  },
];

/**
 * Case-insensitive partial match. Forgiving on purpose — founders often type
 * informal names ("chai" should match "Mumbai Chai Co.").
 */
export function findCompany(query: string): Company | undefined {
  const q = query.trim().toLowerCase();
  if (!q) return undefined;
  return mockCompanies.find(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.pan.toLowerCase() === q ||
      c.gstin.toLowerCase() === q,
  );
}
