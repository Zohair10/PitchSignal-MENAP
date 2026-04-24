"use client";

import { Badge } from "@/components/ui/badge";

interface Objection {
  objection: string;
  whyItMatters: string;
  howToFix: string;
}

interface InvestorObjectionsProps {
  objections: Objection[];
}

const severityConfig = [
  { label: "Severe", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  { label: "Severe", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  { label: "Moderate", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { label: "Moderate", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { label: "Mild", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
];

export default function InvestorObjections({ objections }: InvestorObjectionsProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Why Investors May Say No</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
      </div>

      <div className="space-y-4">
        {objections.map((obj, i) => {
          const severity = severityConfig[i];
          return (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-sm font-bold text-red-400">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug text-white">
                    {obj.objection}
                  </h3>
                </div>
                <Badge className={`shrink-0 border ${severity.className}`}>
                  {severity.label}
                </Badge>
              </div>

              <div className="ml-11 space-y-3">
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Why it matters
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">
                    {obj.whyItMatters}
                  </p>
                </div>

                <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                  <p className="mb-1 text-xs font-medium tracking-wider text-blue-400 uppercase">
                    How to fix
                  </p>
                  <p className="text-sm leading-relaxed text-white/80">
                    {obj.howToFix}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
