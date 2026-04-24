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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 border border-amber-200">
          <Wrench className="w-4 h-4 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Top 3 Fixes</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-300 to-transparent" />
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
            className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-600 tabular-nums">
                {i + 1}
              </span>
              <h3 className="text-base font-semibold text-gray-900">{fix.title}</h3>
            </div>
            <div className="ml-11 space-y-2">
              <div>
                <p className="mb-1 text-sm font-medium tracking-widest text-gray-400 uppercase">
                  Action
                </p>
                <p className="text-sm leading-relaxed text-gray-600">{fix.action}</p>
              </div>
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                <p className="mb-1 text-sm font-medium tracking-widest text-orange-600 uppercase">
                  Expected Impact
                </p>
                <p className="text-sm leading-relaxed text-gray-600">{fix.expectedImpact}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
