import type { Company, RiskLevel, ScanResult } from "./types";

const MONTH_PENALTY = 15;
const MCA_OVERDUE_PENALTY = 20;
const NOTICE_PENALTY = 10;

/** Number of full months between a YYYY-MM string and "now". Never negative. */
function monthsOverdue(lastFiledYYYYMM: string, now: Date = new Date()): number {
  const [yStr, mStr] = lastFiledYYYYMM.split("-");
  const filedYear = Number(yStr);
  const filedMonth = Number(mStr);
  if (!filedYear || !filedMonth) return 0;

  const nowYear = now.getUTCFullYear();
  const nowMonth = now.getUTCMonth() + 1;

  const diff = (nowYear - filedYear) * 12 + (nowMonth - filedMonth);
  // GSTR-3B is filed for the *previous* month, so we treat 1 month gap as
  // on-time, anything beyond that is overdue.
  return Math.max(0, diff - 1);
}

function riskFromScore(score: number): RiskLevel {
  if (score >= 70) return "Low";
  if (score >= 40) return "Medium";
  return "High";
}

function buildPendingTasks(company: Company, gstMonths: number): string[] {
  const tasks: string[] = [];

  if (gstMonths > 0) {
    tasks.push(
      `GSTR-3B overdue for ${gstMonths} ${
        gstMonths === 1 ? "month" : "months"
      } (last filed ${company.lastGstFilingMonth}).`,
    );
    tasks.push("File pending GSTR-1 returns to match outward supplies.");
  }

  if (company.mcaFilingStatus === "Overdue") {
    tasks.push("MCA annual return (AOC-4 / MGT-7) is overdue.");
  }

  for (const notice of company.pendingNotices) {
    tasks.push(`Respond to: ${notice}.`);
  }

  if (tasks.length === 0) {
    tasks.push("No critical filings pending — keep monthly cadence going.");
  }

  return tasks;
}

function estimatePenalty(gstMonths: number, company: Company): string {
  // Rough, directional ranges. Not legal advice.
  let low = 0;
  let high = 0;

  // GST late fees (CGST + SGST) ~ ₹50/day capped, plus interest.
  if (gstMonths > 0) {
    low += gstMonths * 1500;
    high += gstMonths * 5000;
  }

  if (company.mcaFilingStatus === "Overdue") {
    low += 10000;
    high += 50000;
  }

  const noticeCount = company.pendingNotices.length;
  low += noticeCount * 5000;
  high += noticeCount * 25000;

  if (low === 0 && high === 0) {
    return "No material penalty exposure right now.";
  }

  const fmt = (n: number) =>
    `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  if (low === high) return `Estimated exposure: up to ${fmt(high)}.`;
  return `Estimated exposure: ${fmt(low)}–${fmt(high)}.`;
}

export function computeHealth(
  company: Company,
  now: Date = new Date(),
): Omit<ScanResult, "aiSummary" | "aiSummaryFallback"> {
  const gstMonths = monthsOverdue(company.lastGstFilingMonth, now);

  let score = 100;
  score -= gstMonths * MONTH_PENALTY;
  if (company.mcaFilingStatus === "Overdue") score -= MCA_OVERDUE_PENALTY;
  score -= company.pendingNotices.length * NOTICE_PENALTY;
  score = Math.max(0, Math.min(100, score));

  return {
    companyName: company.name,
    industry: company.industry,
    score,
    riskLevel: riskFromScore(score),
    pendingTasks: buildPendingTasks(company, gstMonths),
    penaltyEstimate: estimatePenalty(gstMonths, company),
    monthsOverdue: gstMonths,
    isSample: company.isSample === true,
  };
}
