"use client";

import { Badge } from "@/components/ui/badge";

interface RegionalSignalsProps {
  signals: string[];
}

export default function RegionalSignals({ signals }: RegionalSignalsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Regional Signals Used</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-muted-foreground/30 to-transparent" />
      </div>

      <p className="text-sm text-muted-foreground">
        These regional data points and market signals powered the analysis.
      </p>

      <div className="flex flex-wrap gap-2">
        {signals.map((signal, i) => (
          <Badge
            key={i}
            variant="outline"
            className="border-white/10 bg-white/5 text-white/60"
          >
            {signal}
          </Badge>
        ))}
      </div>
    </section>
  );
}
