"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PipelineConnectorProps {
  state: "pending" | "handoff" | "complete";
  color?: string;
}

export function PipelineConnector({ state, color = "from-orange-400 to-amber-400" }: PipelineConnectorProps) {
  return (
    <div className="relative h-6 w-full flex justify-center ml-[19px]">
      {/* Static line */}
      <div
        className={`w-0.5 h-full transition-colors duration-500 ${
          state === "complete" ? "bg-green-400" : "bg-gray-200"
        }`}
        style={state === "complete" ? { background: "linear-gradient(to bottom, #22c55e, #34d399)" } : undefined}
      />

      {/* Animated particle during handoff */}
      <AnimatePresence>
        {state === "handoff" && (
          <motion.div
            className={`absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r ${color}`}
            style={{
              left: "calc(0px)",
              boxShadow: "0 0 12px rgba(251, 146, 60, 0.6)",
            }}
            initial={{ top: -4, opacity: 0, scale: 0.5 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
