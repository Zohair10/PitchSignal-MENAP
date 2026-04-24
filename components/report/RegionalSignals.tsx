"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Globe2 } from "lucide-react";

interface RegionalSignalsProps {
  signals: string[];
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function RegionalSignals({ signals }: RegionalSignalsProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100 border border-teal-200">
          <Globe2 className="w-4 h-4 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Regional Signals Used</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-teal-300 to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduce ? 0 : 0.4 }}
        className="text-sm text-gray-500"
      >
        These regional data points and market signals powered the analysis.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {signals.map((signal, i) => (
          <Badge
            key={i}
            variant="outline"
            className="border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {signal}
          </Badge>
        ))}
      </motion.div>
    </section>
  );
}
