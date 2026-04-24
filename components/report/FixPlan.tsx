"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Wrench } from "lucide-react";

interface Fix {
  title: string;
  action: string;
  expectedImpact: string;
}

interface FixPlanProps {
  fixes: Fix[];
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function FixPlan({ fixes }: FixPlanProps) {
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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Wrench className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold">Top 3 Fixes</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
      </motion.div>

      <div className="space-y-4">
        {fixes.map((fix, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: shouldReduce ? 0 : 0.5,
              delay: i * 0.1,
              ease,
            }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-sm font-bold text-blue-400 tabular-nums">
                {i + 1}
              </span>
              <h3 className="text-base font-semibold text-white">{fix.title}</h3>
            </div>
            <div className="ml-11 space-y-2">
              <div>
                <p className="mb-1 text-xs font-medium tracking-widest text-white/30 uppercase">
                  Action
                </p>
                <p className="text-sm leading-relaxed text-white/60">{fix.action}</p>
              </div>
              <div className="rounded-xl border border-purple-500/15 bg-purple-500/[0.04] p-4">
                <p className="mb-1 text-xs font-medium tracking-widest text-purple-400/80 uppercase">
                  Expected Impact
                </p>
                <p className="text-sm leading-relaxed text-white/70">{fix.expectedImpact}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
