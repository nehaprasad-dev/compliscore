"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, MessageSquare } from "lucide-react";
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
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
        <MessageSquare className="h-4 w-4" />
        Get this scan based on your real filings
      </div>
      <p className="mt-1 text-xs leading-relaxed text-emerald-900/80">
        Drop your WhatsApp number or email. I&rsquo;ll send a detailed
        compliance scan within 2 hours for{" "}
        <span className="font-semibold">₹5,000</span>.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 flex items-start gap-2 rounded-lg bg-white px-3 py-2.5 text-sm text-emerald-800 ring-1 ring-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Got it. I&rsquo;ll be in touch shortly with the next steps and
              payment details.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="mt-3 space-y-2"
            noValidate
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder="WhatsApp or email"
                aria-label="WhatsApp number or email"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (error) setError(null);
                }}
                disabled={submitting}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={!contact.trim() || submitting}
                className="sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Request scan"
                )}
              </Button>
            </div>
            {error && (
              <p
                role="alert"
                className="text-xs font-medium text-red-700"
              >
                {error}
              </p>
            )}
            <p className="text-[11px] leading-relaxed text-emerald-900/70">
              I&rsquo;ll only contact you about this scan. No spam, no list.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
