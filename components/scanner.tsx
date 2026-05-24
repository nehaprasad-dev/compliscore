"use client";

import { useEffect, useState } from "react";
import { animate, motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Search,
  Loader2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { LeadForm } from "@/components/lead-form";
import { cn } from "@/lib/utils";
import type { RiskLevel, ScanResult } from "@/lib/types";

const SAMPLE_QUERIES = ["Razorpay", "Zepto", "Meesho", "Khatabook"];

const EXAMPLE_RESULT: ScanResult = {
  companyName: "Mumbai Chai Co.",
  industry: "Food & Beverage",
  score: 25,
  riskLevel: "High",
  pendingTasks: [
    "GSTR-3B overdue for 4 months (last filed 2026-01).",
    "File pending GSTR-1 returns to match outward supplies.",
    "MCA annual return (AOC-4 / MGT-7) is overdue.",
    "Respond to: GST notice u/s 73 for last fiscal year.",
  ],
  penaltyEstimate: "Estimated exposure: ₹26,000–₹95,000.",
  monthsOverdue: 4,
  aiSummary:
    "Your compliance is in the danger zone — several filings are overdue and there's an active GST notice.\n\nThe biggest risk: the GST notice u/s 73 can compound penalties quickly if unanswered.\n\n1. Reply to the GST notice this week.\n2. File the four overdue GSTR-3Bs in order.\n3. Get the MCA annual return submitted before any strike-off action.",
  aiSummaryFallback: false,
  isSample: false,
};

function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-500";
  return "text-red-600";
}

function badgeClass(level: RiskLevel): string {
  if (level === "Low")
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (level === "Medium") return "bg-amber-50 text-amber-800 ring-amber-200";
  return "bg-red-50 text-red-700 ring-red-200";
}

function iconColor(level: RiskLevel): string {
  if (level === "Low") return "text-emerald-500";
  if (level === "Medium") return "text-amber-500";
  return "text-red-500";
}

function RiskIcon({ level, className }: { level: RiskLevel; className?: string }) {
  if (level === "Low") {
    return <ShieldCheck className={cn("h-3.5 w-3.5", className)} />;
  }
  return <AlertTriangle className={cn("h-3.5 w-3.5", className)} />;
}

function AnimatedScore({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayed}</>;
}

function ResultSkeleton() {
  return (
    <div aria-busy="true" aria-label="Scanning company" className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex items-end gap-3">
        <Skeleton className="h-20 w-28" />
        <Skeleton className="mb-2 h-4 w-16" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <div className="rounded-xl bg-zinc-50 p-4">
        <Skeleton className="h-3 w-24" />
        <div className="mt-2 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-9/12" />
        </div>
      </div>
    </div>
  );
}

function ResultView({
  result,
  isExample = false,
}: {
  result: ScanResult;
  isExample?: boolean;
}) {
  const tasks = result.pendingTasks;
  const visibleTasks = tasks.slice(0, 5);
  const extra = Math.max(0, tasks.length - visibleTasks.length);
  const summaryParagraphs = result.aiSummary
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-[17px] font-semibold tracking-tight text-zinc-900 sm:text-lg">
            {result.companyName}
          </h2>
          <p className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-zinc-400">
            {result.industry}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1",
            badgeClass(result.riskLevel),
          )}
        >
          <RiskIcon level={result.riskLevel} />
          {result.riskLevel} Risk
        </span>
      </div>

      {result.isSample && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50/80 px-3 py-2.5 ring-1 ring-amber-200/70">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
          <p className="text-[12px] leading-relaxed text-amber-900">
            <span className="font-semibold">Sample data.</span> Generated from
            the name you typed — not {result.companyName}&rsquo;s real filings.
            For a real scan, request the paid one below.
          </p>
        </div>
      )}

      <div className="flex items-baseline gap-3 border-y border-zinc-100 py-6">
        <span
          className={cn(
            "font-serif leading-none tabular-nums text-[88px] sm:text-[112px]",
            scoreColor(result.score),
          )}
        >
          {isExample ? (
            result.score
          ) : (
            <AnimatedScore value={result.score} />
          )}
        </span>
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            Compliance Score
          </p>
          <p className="mt-1 text-sm leading-snug text-zinc-700">
            {result.penaltyEstimate}
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Pending tasks
        </h3>
        <ul className="mt-3 space-y-2.5">
          {visibleTasks.map((task, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-[14px] leading-snug text-zinc-700"
            >
              <CheckCircle2
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  iconColor(result.riskLevel),
                )}
              />
              <span>{task}</span>
            </li>
          ))}
        </ul>
        {extra > 0 && (
          <p className="mt-2 text-xs text-zinc-400">+ {extra} more</p>
        )}
      </div>

      <figure className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200/70">
        <figcaption className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          <Sparkles className="h-3 w-3 text-amber-500" />
          AI action plan
          {result.aiSummaryFallback && (
            <span className="ml-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-amber-800">
              fallback
            </span>
          )}
        </figcaption>
        <blockquote className="mt-3 space-y-2.5 text-[14px] leading-[1.6] text-zinc-800">
          {summaryParagraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </blockquote>
      </figure>

      {!isExample && <LeadForm result={result} />}
    </motion.div>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-2 rounded-lg bg-red-50/80 p-3 ring-1 ring-red-200/70"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
      <p className="text-sm leading-snug text-red-700">{message}</p>
    </motion.div>
  );
}

export function Scanner() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = query.trim().length > 0 && !loading;
  const showExample = !loading && !result && !error;

  async function runScan(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }
      setResult(data as ScanResult);
    } catch {
      setError("Network error. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_40px_-12px_rgba(0,0,0,0.08)]">
      <section aria-label="Scan input" className="p-6 sm:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) runScan(query);
          }}
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              id="company"
              autoComplete="off"
              autoCapitalize="words"
              placeholder="Type any Indian company name…"
              className="h-14 rounded-2xl border-zinc-200 bg-zinc-50/50 pl-11 pr-32 text-base shadow-none focus-visible:border-zinc-300 focus-visible:bg-white focus-visible:ring-zinc-900/10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="h-10 rounded-xl bg-zinc-900 px-4 text-[13px] font-medium text-white hover:bg-zinc-800"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scanning
                  </>
                ) : (
                  <>
                    Scan
                    <Sparkles className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-400">
            Try
          </span>
          {SAMPLE_QUERIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                runScan(s);
              }}
              disabled={loading}
              className="rounded-full bg-zinc-100 px-3 py-1 text-[12px] font-medium text-zinc-700 transition-colors hover:bg-zinc-900 hover:text-white disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <div className="border-t border-zinc-100 bg-zinc-50/40 px-6 py-6 sm:px-8 sm:py-8">
        <div aria-live="polite" className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ResultSkeleton />
              </motion.div>
            )}
            {!loading && error && <ErrorView key="error" message={error} />}
            {!loading && result && (
              <ResultView key={result.companyName} result={result} />
            )}
            {showExample && (
              <motion.div
                key="example"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Example
                  </span>
                  <span className="text-[12px] text-zinc-500">
                    This is what you&rsquo;ll get
                  </span>
                </div>
                <div className="opacity-90">
                  <ResultView result={EXAMPLE_RESULT} isExample />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
