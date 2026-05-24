import { ArrowRight, ShieldCheck } from "lucide-react";
import { Scanner } from "@/components/scanner";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white">
      <div className="border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 px-4 py-2 text-center text-[12px] text-zinc-600">
          <span className="font-semibold text-zinc-900">CompliScore is live.</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            Free 60-second scans for Indian startups.
          </span>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-0.5 font-semibold text-zinc-900 underline-offset-4 hover:underline"
          >
            Get a real one
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      <header className="relative z-20 border-b border-zinc-200/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <a
            href="/"
            className="flex items-center gap-2.5 text-zinc-900"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-[16px] font-semibold tracking-tight">
              Compli
              <span className="font-serif italic text-zinc-700">Score</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-zinc-600 sm:flex">
            <a href="#scanner" className="transition-colors hover:text-zinc-900">
              Scanner
            </a>
            <a href="#how" className="transition-colors hover:text-zinc-900">
              How it works
            </a>
            <a href="#lead-form" className="transition-colors hover:text-zinc-900">
              Pricing
            </a>
          </nav>

          <a
            href="#lead-form"
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
          >
            Get a real scan
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main className="relative flex-1">
        <div className="relative">
          <div
            aria-hidden="true"
            className="bg-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
          />
          <div
            aria-hidden="true"
            className="warm-blob pointer-events-none absolute right-[-120px] top-[-40px] -z-10 h-[360px] w-[360px] rounded-full"
          />
          <div
            aria-hidden="true"
            className="cool-blob pointer-events-none absolute left-[-140px] top-[60px] -z-10 h-[320px] w-[320px] rounded-full"
          />

          <section className="mx-auto max-w-3xl px-4 pt-14 pb-8 text-center sm:pt-24 sm:pb-12">
            <h1 className="font-serif text-[44px] leading-[1.02] tracking-tight text-zinc-900 sm:text-[72px]">
              Is your startup&rsquo;s compliance{" "}
              <em className="italic text-zinc-700">healthy</em>?
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              Instant compliance score, missed filings, a rough penalty
              estimate, and a plain-English action plan — for any Indian
              company, in under two seconds.
            </p>
            <p
              id="how"
              className="mt-4 text-[11px] uppercase tracking-[0.18em] text-zinc-400"
            >
              Free · Mobile-first · Built by an AI engineer
            </p>
          </section>
        </div>

        <section
          id="scanner"
          className="relative mx-auto max-w-2xl px-4 pb-24 sm:pb-32"
        >
          <Scanner />
        </section>
      </main>

      <footer className="border-t border-zinc-200/60 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-[12px] text-zinc-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} CompliScore · A diagnostic tool, not
            legal advice.
          </p>
          <p>Built with Next.js, Groq, and a lot of chai.</p>
        </div>
      </footer>
    </div>
  );
}
