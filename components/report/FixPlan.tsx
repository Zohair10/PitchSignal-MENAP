"use client";

interface Fix {
  title: string;
  action: string;
  expectedImpact: string;
}

interface FixPlanProps {
  fixes: Fix[];
}

export default function FixPlan({ fixes }: FixPlanProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Top 3 Fixes</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
      </div>

      <div className="space-y-4">
        {fixes.map((fix, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-white">{fix.title}</h3>
            </div>

            <div className="ml-11 space-y-2">
              <div>
                <p className="mb-0.5 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Action
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  {fix.action}
                </p>
              </div>
              <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
                <p className="mb-0.5 text-xs font-medium tracking-wider text-purple-400 uppercase">
                  Expected Impact
                </p>
                <p className="text-sm leading-relaxed text-white/80">
                  {fix.expectedImpact}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
