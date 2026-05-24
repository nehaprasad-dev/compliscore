import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Indian mobile: 10 digits starting 6-9, optionally prefixed with +91 / 91 / 0. */
const PHONE_RE = /^[6-9]\d{9}$/;

type Classified =
  | { type: "email"; value: string }
  | { type: "phone"; value: string };

function classifyContact(raw: string): Classified | null {
  const clean = raw.trim();
  if (!clean) return null;

  if (EMAIL_RE.test(clean)) {
    return { type: "email", value: clean.toLowerCase() };
  }

  const digits = clean.replace(/\D/g, "");
  // Drop a leading country / trunk prefix if present
  const last10 = digits.length > 10 ? digits.slice(-10) : digits;
  if (PHONE_RE.test(last10)) {
    return { type: "phone", value: `+91${last10}` };
  }

  return null;
}

type LeadPayload = {
  contact?: unknown;
  companyName?: unknown;
  score?: unknown;
  riskLevel?: unknown;
  isSample?: unknown;
};

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const rawContact = typeof body.contact === "string" ? body.contact : "";
  const classified = classifyContact(rawContact);
  if (!classified) {
    return NextResponse.json(
      {
        error:
          "Please enter a valid Indian mobile number (10 digits) or email address.",
      },
      { status: 400 },
    );
  }

  const lead = {
    contact: classified.value,
    contactType: classified.type,
    companyName:
      typeof body.companyName === "string" ? body.companyName : null,
    score: typeof body.score === "number" ? body.score : null,
    riskLevel: typeof body.riskLevel === "string" ? body.riskLevel : null,
    isSample: typeof body.isSample === "boolean" ? body.isSample : null,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent"),
    referer: req.headers.get("referer"),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[lead] webhook returned", res.status, text.slice(0, 200));
      }
    } catch (err) {
      console.error("[lead] webhook delivery failed:", err);
    }
  } else {
    console.log("[lead] received (no LEAD_WEBHOOK_URL configured):", lead);
  }

  return NextResponse.json({ ok: true });
}
