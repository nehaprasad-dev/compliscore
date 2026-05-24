import type { Company } from "./types";

/** YYYY-MM string `n` calendar months before `now`. Keeps the demo from going stale. */
function monthsAgo(n: number, now: Date = new Date()): string {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - n, 1));
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * FICTIONAL DEMO DATA — all compliance details are invented; PAN / GSTIN are
 * format-correct placeholders, not real identifiers. Nothing here makes any
 * claim about a real company's actual compliance posture. Real well-funded
 * companies are biased Low / Medium risk; dramatic High-Risk scenarios use
 * fictional founder-size companies at the bottom of the list.
 */
export const mockCompanies: Company[] = [
  // Fintech
  {
    name: "Razorpay Software Private Limited",
    pan: "AAACR1001P",
    gstin: "29AAACR1001P1ZA",
    industry: "Fintech — Payments",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "CRED (Dreamplug Technologies Pvt Ltd)",
    pan: "AAACD2002R",
    gstin: "29AAACD2002R1ZB",
    industry: "Fintech — Consumer",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "PhonePe Private Limited",
    pan: "AAACP3003E",
    gstin: "29AAACP3003E1ZC",
    industry: "Fintech — UPI & Payments",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Paytm (One97 Communications Limited)",
    pan: "AAACO4004N",
    gstin: "07AAACO4004N1ZD",
    industry: "Fintech — Listed",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Cashfree Payments India Pvt Ltd",
    pan: "AAACC5005A",
    gstin: "29AAACC5005A1ZE",
    industry: "Fintech — Payments",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "BharatPe (Resilient Innovations Pvt Ltd)",
    pan: "AAACR6006B",
    gstin: "07AAACR6006B1ZF",
    industry: "Fintech — Merchant Payments",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: ["Pending GST clarification on inter-state input credit"],
  },
  {
    name: "Zerodha Broking Limited",
    pan: "AAACZ7007R",
    gstin: "29AAACZ7007R1ZG",
    industry: "Broking — Discount",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Groww (Nextbillion Technology Pvt Ltd)",
    pan: "AAACN8008G",
    gstin: "29AAACN8008G1ZH",
    industry: "WealthTech",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Slice (Garagepreneurs Internet Pvt Ltd)",
    pan: "AAACG9009S",
    gstin: "29AAACG9009S1ZJ",
    industry: "Fintech — Cards & Credit",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },

  // E-commerce & Quick Commerce
  {
    name: "Flipkart Internet Pvt Ltd",
    pan: "AAACF1010K",
    gstin: "29AAACF1010K1ZK",
    industry: "E-commerce",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Meesho (Fashnear Technologies Pvt Ltd)",
    pan: "AAACF1111M",
    gstin: "29AAACF1111M1ZL",
    industry: "E-commerce — Social",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Nykaa (FSN E-Commerce Ventures Limited)",
    pan: "AAACN2222Y",
    gstin: "27AAACN2222Y1ZM",
    industry: "E-commerce — Beauty (Listed)",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Zepto (Kiranakart Technologies Pvt Ltd)",
    pan: "AAACK3333Z",
    gstin: "27AAACK3333Z1ZN",
    industry: "Quick Commerce",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Zomato Limited",
    pan: "AAACZ4444O",
    gstin: "07AAACZ4444O1ZP",
    industry: "Food Tech (Listed)",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Swiggy (Bundl Technologies Pvt Ltd)",
    pan: "AAACB5555W",
    gstin: "29AAACB5555W1ZQ",
    industry: "Food Tech & Quick Commerce",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Atoms (Atoms Shoes Pvt Ltd)",
    pan: "AAACA6666T",
    gstin: "29AAACA6666T1ZR",
    industry: "D2C — Footwear",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Dukaan (Inflektion Labs Pvt Ltd)",
    pan: "AAACI7777D",
    gstin: "29AAACI7777D1ZS",
    industry: "SaaS — SMB Commerce",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },

  // SaaS / DevTools
  {
    name: "Postman (Postdot Technologies Pvt Ltd)",
    pan: "AAACP8888O",
    gstin: "29AAACP8888O1ZT",
    industry: "DevTools SaaS",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Freshworks Technologies Pvt Ltd",
    pan: "AAACF9999R",
    gstin: "33AAACF9999R1ZU",
    industry: "SaaS — CRM (Listed)",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Khatabook Internet Pvt Ltd",
    pan: "AAACK1212K",
    gstin: "29AAACK1212K1ZV",
    industry: "SaaS — SMB Bookkeeping",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "ClearTax (Defmacro Software Pvt Ltd)",
    pan: "AAACD1313C",
    gstin: "29AAACD1313C1ZW",
    industry: "Tax & GST SaaS",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "SpotDraft Technologies Pvt Ltd",
    pan: "AAACS1414P",
    gstin: "29AAACS1414P1ZX",
    industry: "Legal SaaS",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Plum Benefits Pvt Ltd",
    pan: "AAACP1515L",
    gstin: "29AAACP1515L1ZY",
    industry: "InsurTech — Group Health",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Apna (Apnatime Tech Pvt Ltd)",
    pan: "AAACA1616N",
    gstin: "29AAACA1616N1ZZ",
    industry: "Jobs Marketplace",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },

  // Mobility, Travel, Services, Health, EdTech
  {
    name: "Ola (ANI Technologies Pvt Ltd)",
    pan: "AAACA1717O",
    gstin: "29AAACA1717O2ZA",
    industry: "Mobility",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: ["Professional Tax assessment notice"],
  },
  {
    name: "OYO Rooms (Oravel Stays Pvt Ltd)",
    pan: "AAACO1818Y",
    gstin: "07AAACO1818Y1ZB",
    industry: "Travel & Hospitality",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: ["Pending response on GST input-credit query"],
  },
  {
    name: "Urban Company (UrbanClap Technologies India Pvt Ltd)",
    pan: "AAACU1919U",
    gstin: "07AAACU1919U1ZC",
    industry: "Home Services Marketplace",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Practo Technologies Pvt Ltd",
    pan: "AAACP2020P",
    gstin: "29AAACP2020P1ZD",
    industry: "Healthtech",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Unacademy (Sorting Hat Technologies Pvt Ltd)",
    pan: "AAACS2121U",
    gstin: "29AAACS2121U1ZE",
    industry: "EdTech",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: ["TDS reconciliation query for prior fiscal year"],
  },

  // Fictional founder-size companies (full risk spectrum)
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
  },
  {
    name: "Bengaluru Bytes Pvt Ltd",
    pan: "AAACB7821K",
    gstin: "29AAACB7821K1ZP",
    industry: "SaaS",
    lastGstFilingMonth: monthsAgo(1),
    mcaFilingStatus: "Filed",
    pendingNotices: [],
  },
  {
    name: "Delhi Threads",
    pan: "AAACD4567L",
    gstin: "07AAACD4567L1Z9",
    industry: "Apparel & Retail",
    lastGstFilingMonth: monthsAgo(3),
    mcaFilingStatus: "Filed",
    pendingNotices: ["Professional Tax notice for last quarter"],
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
  },
  {
    name: "Pune Fintech Labs",
    pan: "AABCP1010Q",
    gstin: "27AABCP1010Q1ZT",
    industry: "Fintech",
    lastGstFilingMonth: monthsAgo(2),
    mcaFilingStatus: "Filed",
    pendingNotices: ["RBI compliance query on KYC processes"],
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
  },
];

/**
 * Case-insensitive partial match on name, plus exact match on PAN / GSTIN.
 * Forgiving on purpose — "chai" matches "Mumbai Chai Co.", "razor" matches
 * "Razorpay Software …".
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

// Synthetic fallback profile — generated deterministically from the typed name
// when no curated match exists. India does not expose a public API for filing
// history by company name, so synthetic results carry `isSample: true` and the
// UI discloses this clearly.

const NOTICE_POOL = [
  "Pending GST clarification on input credit",
  "Professional Tax assessment notice",
  "TDS reconciliation query for prior fiscal year",
  "ROC penalty intimation for delayed filing",
  "GSTR-1 / GSTR-3B mismatch notice",
  "Income tax scrutiny notice for prior assessment year",
  "EPFO compliance notice for delayed PF remittance",
  "Shop & Establishment renewal pending",
];

const INDUSTRY_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/\b(pay|fin|bank|loan|credit|capital|wealth|invest|brok)/i, "Fintech"],
  [/\b(tech|labs?|software|byte|code|cloud|data|ai|ml|saas|digital|app|systems?)/i, "Technology / SaaS"],
  [/\b(food|kitchen|chai|tea|coffee|restaurant|cafe|brew|dairy|beverage|bites)/i, "Food & Beverage"],
  [/\b(health|med|care|clinic|pharma|bio|wellness|hospital)/i, "Healthcare"],
  [/\b(edu|learn|school|academy|tutor|study|skill|training)/i, "EdTech"],
  [/\b(shop|store|mart|retail|commerce|kart|cart|bazaar|bazar)/i, "E-commerce / Retail"],
  [/\b(logistic|delivery|transport|shipping|cargo|freight|courier)/i, "Logistics"],
  [/\b(media|content|studio|news|publish|entertainment)/i, "Media & Entertainment"],
  [/\b(real|estate|property|housing|build|construction|infra)/i, "Real Estate / Infra"],
  [/\b(fashion|apparel|thread|cloth|design|style|wear)/i, "Apparel & Retail"],
  [/\b(auto|motor|vehicle|car|bike|mobility|ev)/i, "Mobility"],
  [/\b(travel|tour|trip|stay|hotel|hospitality|tourism)/i, "Travel & Hospitality"],
  [/\b(consult|services?|agency|solutions?|advisory)/i, "Professional Services"],
  [/\b(energy|solar|power|renewable|electric)/i, "Energy / CleanTech"],
  [/\b(agri|farm|crop|kisan|rural)/i, "Agritech"],
];

function guessIndustry(name: string): string {
  for (const [re, industry] of INDUSTRY_RULES) {
    if (re.test(name)) return industry;
  }
  return "Private Limited Company";
}

/** djb2 hash → unsigned 32-bit int. Stable and well-distributed. */
function hash32(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function buildSyntheticCompany(rawName: string): Company {
  const cleanName = rawName.trim().replace(/\s+/g, " ");
  const h = hash32(cleanName.toLowerCase());

  const r1 = h % 100;
  const r2 = Math.floor(h / 100) % 100;
  const r3 = Math.floor(h / 10_000) % 100;
  const r4 = Math.floor(h / 1_000_000) % 100;

  // Distribution biased toward "behind" so the demo creates urgency; ~18% clean.
  let monthsBack: number;
  if (r1 < 18) monthsBack = 1;
  else if (r1 < 45) monthsBack = 2;
  else if (r1 < 70) monthsBack = 3;
  else if (r1 < 88) monthsBack = 4;
  else monthsBack = 5 + (r1 % 4);

  const mcaOverdue = r2 < 30;
  const noticeCount = r3 < 45 ? 0 : r3 < 75 ? 1 : r3 < 92 ? 2 : 3;
  const notices: string[] = [];
  for (let i = 0; i < noticeCount; i++) {
    notices.push(NOTICE_POOL[(r4 + i * 3) % NOTICE_POOL.length]);
  }

  const displayName = cleanName.length <= 2 ? cleanName.toUpperCase() : cleanName;

  return {
    name: displayName,
    pan: "SAMPLE0000X",
    gstin: "00SAMPLE0000X1Z0",
    industry: guessIndustry(cleanName),
    lastGstFilingMonth: monthsAgo(monthsBack),
    mcaFilingStatus: mcaOverdue ? "Overdue" : "Filed",
    pendingNotices: notices,
    isSample: true,
  };
}

/**
 * Curated lookup first; falls back to a deterministic synthetic profile so
 * the scanner always returns a result. Returns undefined only for empty input.
 */
export function findOrBuildCompany(query: string): Company | undefined {
  const q = query.trim();
  if (!q) return undefined;
  const curated = findCompany(q);
  if (curated) return curated;
  return buildSyntheticCompany(q);
}
