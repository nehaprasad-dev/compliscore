import { ShieldCheck } from "lucide-react";
import { Scanner } from "@/components/scanner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 pt-8 pb-32 sm:pt-12">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Free 60-second scan
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl">
            How healthy is your startup&rsquo;s compliance?
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Type your company name and get an instant score, the filings
            you&rsquo;ve missed, what they could cost you, and a plain-English
            action plan.
          </p>
        </header>

        <Scanner />
      </main>

      <footer
        className="sticky bottom-0 z-10 border-t border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
        aria-label="Call to action"
      >
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 py-3">
          <p className="text-sm text-zinc-700">
            Need a <span className="font-semibold">real, detailed scan</span>?
            <br className="sm:hidden" /> DM me on Twitter or LinkedIn —{" "}
            <span className="font-semibold">₹5,000, 2-hour delivery.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
