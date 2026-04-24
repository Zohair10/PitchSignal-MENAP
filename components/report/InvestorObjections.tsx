"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface Objection {
  objection: string;
  whyItMatters: string;
  howToFix: string;
}

interface InvestorObjectionsProps {
  objections: Objection[];
}

const severityConfig = [
  { label: "Critical", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  { label: "Critical", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  { label: "Moderate", className: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { label: "Moderate", className: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { label: "Watch", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function InvestorObjections({ objections }: InvestorObjectionsProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-4 h-4 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold">Why Investors May Say No</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
      </motion.div>

      <div className="space-y-4">
        {objections.map((obj, i) => {
          const severity = severityConfig[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: shouldReduce ? 0 : 0.5,
                delay: i * 0.08,
                ease,
              }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 hover:border-white/[0.1] transition-colors duration-200"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400 tabular-nums">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-white">
                    {obj.objection}
                  </h3>
                </div>
                <Badge className={`shrink-0 border text-xs px-2.5 py-0.5 ${severity.className}`}>
                  {severity.label}
                </Badge>
              </div>
              <div className="ml-11 space-y-3">
                <div>
                  <p className="mb-1 text-xs font-medium tracking-widest text-white/30 uppercase">
                    Why it matters
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">{obj.whyItMatters}</p>
                </div>
                <div className="rounded-xl border border-blue-500/15 bg-blue-500/[0.04] p-4">
                  <p className="mb-1 text-xs font-medium tracking-widest text-blue-400/80 uppercase">
                    How to fix
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">{obj.howToFix}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
