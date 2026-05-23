"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Search,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { RiskLevel, ScanResult } from "@/lib/types";

const SAMPLE_QUERIES = [
  "Mumbai Chai",
  "Bengaluru Bytes",
  "Hyderabad Health",
];

function scoreColor(score: number): string {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-500";
  return "text-red-600";
}

function badgeVariant(level: RiskLevel): "success" | "warning" | "destructive" {
  if (level === "Low") return "success";
  if (level === "Medium") return "warning";
  return "destructive";
}

function iconColor(level: RiskLevel): string {
  if (level === "Low") return "text-zinc-400";
  if (level === "Medium") return "text-amber-500";
  return "text-red-500";
}

function RiskIcon({ level, className }: { level: RiskLevel; className?: string }) {
  if (level === "Low") {
    return <ShieldCheck className={cn("h-5 w-5 text-emerald-600", className)} />;
  }
  return <AlertTriangle className={cn("h-5 w-5", className)} />;
}

function ResultSkeleton() {
  return (
    <Card aria-busy="true" aria-label="Scanning company">
      <CardHeader>
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="mt-2 h-3 w-1/3" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <Skeleton className="h-16 w-24" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="rounded-lg border-l-4 border-zinc-200 bg-zinc-100 p-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-9/12" />
        </div>
      </CardContent>
    </Card>
  );
}

function ResultCard({ result }: { result: ScanResult }) {
  const tasks = result.pendingTasks;
  const visibleTasks = tasks.slice(0, 5);
  const extra = Math.max(0, tasks.length - visibleTasks.length);
  const summaryParagraphs = result.aiSummary
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold leading-tight text-zinc-900">
                {result.companyName}
              </h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                {result.industry}
              </p>
            </div>
            <Badge variant={badgeVariant(result.riskLevel)}>
              <RiskIcon level={result.riskLevel} className="h-3.5 w-3.5" />
              {result.riskLevel} Risk
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-end gap-3">
            <span
              className={cn(
                "font-extrabold leading-none tabular-nums text-5xl sm:text-6xl",
                scoreColor(result.score),
              )}
            >
              {result.score}
            </span>
            <span className="pb-2 text-sm font-medium text-zinc-500">
              / 100 compliance score
            </span>
          </div>

          <p className="text-sm text-zinc-700">{result.penaltyEstimate}</p>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Pending tasks
            </h3>
            <ul className="mt-2 space-y-2">
              {visibleTasks.map((task, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-zinc-700"
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
              <p className="mt-2 text-xs font-medium text-zinc-500">
                + {extra} more
              </p>
            )}
          </div>

          <div className="rounded-lg border-l-4 border-emerald-500 bg-zinc-50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI action plan
              {result.aiSummaryFallback && (
                <span className="ml-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-amber-800">
                  fallback
                </span>
              )}
            </div>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-zinc-800">
              {summaryParagraphs.map((p, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="border-red-200 bg-red-50">
        <CardContent className="flex items-start gap-2 p-5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{message}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Scanner() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = query.trim().length > 0 && !loading;

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
    <>
      <section aria-label="Scan input" className="space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (canSubmit) runScan(query);
          }}
          className="space-y-3"
        >
          <label
            htmlFor="company"
            className="block text-sm font-medium text-zinc-700"
          >
            Company name, PAN or GSTIN
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              id="company"
              autoComplete="off"
              autoCapitalize="words"
              placeholder="e.g. Mumbai Chai Co."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning…
              </>
            ) : (
              "Scan Now"
            )}
          </Button>
        </form>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-zinc-500">Try:</span>
          {SAMPLE_QUERIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                runScan(s);
              }}
              disabled={loading}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section aria-live="polite" className="mt-6">
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
          {!loading && error && (
            <ErrorCard key="error" message={error} />
          )}
          {!loading && result && (
            <ResultCard key={result.companyName} result={result} />
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
