"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface Objection {
  objection: string;
  whyItMatters: string;
  howToFix: string;
  severity: string;
}

interface InvestorObjectionsProps {
  objections: Objection[];
}

const SEVERITY_STYLES: Record<string, { label: string; badge: string; border: string; icon: string }> = {
  critical: {
    label: "Critical",
    badge: "bg-red-100 text-red-600 border-red-200",
    border: "border-l-red-500",
    icon: "text-red-500",
  },
  moderate: {
    label: "Moderate",
    badge: "bg-orange-100 text-orange-600 border-orange-200",
    border: "border-l-orange-500",
    icon: "text-orange-500",
  },
  watch: {
    label: "Watch",
    badge: "bg-yellow-100 text-yellow-600 border-yellow-200",
    border: "border-l-yellow-500",
    icon: "text-yellow-500",
  },
};

function getSeverityStyle(severity: string) {
  return SEVERITY_STYLES[severity.toLowerCase()] || SEVERITY_STYLES.watch;
}

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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 border border-red-200">
          <AlertTriangle className="w-4 h-4 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Why Investors May Say No</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-red-300 to-transparent" />
      </motion.div>

      <div className="space-y-4">
        {objections.map((obj, i) => {
          const severity = getSeverityStyle(obj.severity);
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
              className={`group rounded-2xl border border-gray-200 border-l-4 ${severity.border} bg-gray-50 p-6 hover:border-gray-300 transition-colors duration-200`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-600 tabular-nums`}>
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-gray-900">
                    {obj.objection}
                  </h3>
                </div>
                <Badge className={`shrink-0 border text-xs px-2.5 py-0.5 ${severity.badge}`}>
                  {severity.label}
                </Badge>
              </div>
              <div className="ml-11 space-y-3">
                <div>
                  <p className="mb-1 text-sm font-medium tracking-widest text-gray-400 uppercase">
                    Why it matters
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">{obj.whyItMatters}</p>
                </div>
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                  <p className="mb-1 text-sm font-medium tracking-widest text-orange-600 uppercase">
                    How to fix
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">{obj.howToFix}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
