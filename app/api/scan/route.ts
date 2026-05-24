import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { findOrBuildCompany } from "@/lib/mock-data";
import { computeHealth } from "@/lib/scoring";
import type { ScanResult } from "@/lib/types";

export const runtime = "nodejs";

const FALLBACK_SUMMARY =
  "AI summary is currently unavailable. Please review the score, pending tasks, and penalty estimate above to decide what to fix first.";

function buildPrompt(
  health: Omit<ScanResult, "aiSummary" | "aiSummaryFallback">,
): string {
  const lines: string[] = [
    `You are a friendly Indian compliance consultant writing a quick health report for a startup founder.`,
    ``,
    `Company: ${health.companyName}`,
    `Industry: ${health.industry}`,
    `Compliance score: ${health.score}/100`,
    `Risk level: ${health.riskLevel}`,
    `GST months overdue: ${health.monthsOverdue}`,
    `Penalty estimate: ${health.penaltyEstimate}`,
    `Pending items:`,
    ...health.pendingTasks.map((t) => `- ${t}`),
    ``,
    `Write a report under 150 words with three short sections separated by blank lines:`,
    `1. A one-sentence overall summary in plain English.`,
    `2. The single biggest risk and what it could cost them.`,
    `3. A numbered 3-step action plan ordered by urgency.`,
    ``,
    `Rules: Use plain English. Briefly explain any acronym (e.g. "GSTR-3B (monthly GST return)"). No legal disclaimers. No headings in markdown — just plain paragraphs and a numbered list.`,
  ];

  if (health.isSample) {
    lines.push(
      ``,
      `IMPORTANT: This profile was NOT pulled from this company's actual government filings (that data is not publicly available). It is an illustrative sample generated from a typical profile. Phrase findings as illustrative — use language like "based on a typical profile for a company of this type" or "if this scenario matched your real filings" rather than asserting specific facts about ${health.companyName}. End by encouraging the founder to confirm with a real scan.`,
    );
  }

  return lines.join("\n");
}

async function generateAiSummary(
  health: Omit<ScanResult, "aiSummary" | "aiSummaryFallback">,
): Promise<{ summary: string; fallback: boolean }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { summary: FALLBACK_SUMMARY, fallback: true };
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 250,
      messages: [{ role: "user", content: buildPrompt(health) }],
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) return { summary: FALLBACK_SUMMARY, fallback: true };
    return { summary: text, fallback: false };
  } catch (err) {
    console.error("[scan] Groq call failed:", err);
    return { summary: FALLBACK_SUMMARY, fallback: true };
  }
}

export async function POST(req: Request) {
  let body: { companyName?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const companyName =
    typeof body.companyName === "string" ? body.companyName.trim() : "";

  if (!companyName) {
    return NextResponse.json(
      { error: "Please enter a company name." },
      { status: 400 },
    );
  }

  const company = findOrBuildCompany(companyName);
  if (!company) {
    return NextResponse.json(
      { error: "Please enter a company name." },
      { status: 400 },
    );
  }

  const health = computeHealth(company);
  const { summary, fallback } = await generateAiSummary(health);

  const result: ScanResult = {
    ...health,
    aiSummary: summary,
    aiSummaryFallback: fallback,
  };

  return NextResponse.json(result);
}
