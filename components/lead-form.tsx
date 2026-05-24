"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ScanResult } from "@/lib/types";

type Props = {
  result: ScanResult;
};

export function LeadForm({ result }: Props) {
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = contact.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: trimmed,
          companyName: result.companyName,
          score: result.score,
          riskLevel: result.riskLevel,
          isSample: result.isSample,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
        return;
      }
      setSent(true);
      setContact("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      id="lead-form"
      className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Paid scan
          </p>
          <h3 className="mt-1.5 font-serif text-[24px] leading-tight text-zinc-900 sm:text-[28px]">
            Get this on your <em className="italic">real</em> filings.
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600">
            A detailed PDF report based on your live GST &amp; MCA data,
            delivered within 2 hours.
          </p>
        </div>
        <div className="hidden text-right sm:block">
          <p className="font-serif text-[28px] leading-none text-zinc-900">
            ₹5,000
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-400">
            One-time
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 flex items-start gap-2 rounded-xl bg-emerald-50 px-3.5 py-3 text-[13px] font-medium text-emerald-900 ring-1 ring-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              Got it. I&rsquo;ll be in touch shortly with payment details and
              next steps.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="mt-5 space-y-2"
            noValidate
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder="WhatsApp number or email"
                aria-label="WhatsApp number or email"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (error) setError(null);
                }}
                disabled={submitting}
                className="h-11 flex-1 rounded-xl border-zinc-200 bg-zinc-50/60 shadow-none focus-visible:border-zinc-300 focus-visible:bg-white focus-visible:ring-zinc-900/10"
              />
              <Button
                type="submit"
                disabled={!contact.trim() || submitting}
                className="h-11 shrink-0 rounded-xl bg-zinc-900 px-5 text-[13px] font-medium text-white hover:bg-zinc-800 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Request scan
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            {error && (
              <p
                role="alert"
                className="text-[12px] font-medium text-red-700"
              >
                {error}
              </p>
            )}
            <p className="text-[11px] leading-relaxed text-zinc-500">
              I&rsquo;ll only contact you about this scan. No spam, no list.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
