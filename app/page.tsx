import { ArrowRight, ShieldCheck } from "lucide-react";
import { Scanner } from "@/components/scanner";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.578v-2.234c-3.338.726-4.043-1.61-4.043-1.61-.546-1.386-1.334-1.755-1.334-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.81 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.467-2.382 1.236-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23.957-.266 1.984-.4 3.003-.404 1.02.004 2.046.138 3.005.404 2.29-1.553 3.297-1.23 3.297-1.23.654 1.653.243 2.874.12 3.176.77.84 1.234 1.912 1.234 3.223 0 4.608-2.806 5.622-5.48 5.92.43.37.823 1.103.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.795 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

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

      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
          <a
            href="/"
            aria-label="CompliScore home"
            className="group flex items-center gap-2.5"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 text-white shadow-sm ring-1 ring-zinc-900/10 transition-transform group-hover:scale-105">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
              <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={2.25} />
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-zinc-900">
              CompliScore
            </span>
            <span className="hidden items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-200 sm:inline-flex">
              Beta
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-zinc-200/70 bg-zinc-50/70 p-1 shadow-sm backdrop-blur-sm sm:flex"
          >
            <a
              href="#scanner"
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 hover:shadow-sm"
            >
              Scanner
            </a>
            <a
              href="#how"
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 hover:shadow-sm"
            >
              How it works
            </a>
            <a
              href="#lead-form"
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 hover:shadow-sm"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/nehaprasad-dev/compliscore"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 sm:inline-flex"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="#lead-form"
              className="group inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md"
            >
              <span className="hidden sm:inline">Get a real scan</span>
              <span className="sm:hidden">Get scan</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative flex-1">
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="bg-dots pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px]"
          />
          <div
            aria-hidden="true"
            className="warm-blob pointer-events-none absolute right-[-140px] top-[-60px] -z-10 h-[420px] w-[420px] rounded-full"
          />
          <div
            aria-hidden="true"
            className="cool-blob pointer-events-none absolute left-[-160px] top-[40px] -z-10 h-[380px] w-[380px] rounded-full"
          />
          <div
            aria-hidden="true"
            className="sky-blob pointer-events-none absolute left-1/2 top-[180px] -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full"
          />
          <div
            aria-hidden="true"
            className="headline-halo pointer-events-none absolute left-1/2 top-[60px] -z-10 h-[400px] w-[640px] -translate-x-1/2 rounded-full sm:top-[120px]"
          />
          <div
            aria-hidden="true"
            className="bg-noise pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]"
          />

          <section className="relative mx-auto max-w-3xl px-4 pt-14 pb-8 text-center sm:pt-24 sm:pb-12">
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
              className="mt-4 text-[11px] uppercase tracking-[0.18em] text-zinc-500"
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
