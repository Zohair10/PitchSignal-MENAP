"use client";

import { motion, AnimatePresence } from "framer-motion";

interface InsightRevealProps {
  insight?: string;
}

export function InsightReveal({ insight }: InsightRevealProps) {
  return (
    <AnimatePresence>
      {insight && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: 6 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 px-3 py-2 rounded-lg bg-orange-50 border border-orange-100"
        >
          <p className="text-sm text-orange-700">{insight}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
