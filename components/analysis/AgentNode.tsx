"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThinkingDots } from "./ThinkingDots";
import { InsightReveal } from "./InsightReveal";

interface AgentNodeProps {
  icon: LucideIcon;
  agent: string;
  label: string;
  message: string;
  color: string;
  status: "pending" | "active" | "done";
  insight?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function AgentNode({ icon: Icon, agent, label, message, color, status, insight }: AgentNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease }}
      layout
      className="relative"
    >
      <div
        className={`rounded-xl border p-4 transition-all duration-300 ${
          status === "active"
            ? "border-orange-200 bg-white shadow-sm shimmer-border animate-agent-glow"
            : status === "done"
            ? "border-green-200 bg-green-50/30"
            : "border-gray-200 bg-gray-50/50 opacity-50"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Icon container */}
          <div className="relative z-10">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                status === "active"
                  ? `bg-gradient-to-br ${color}`
                  : status === "done"
                  ? "bg-gradient-to-br from-green-500 to-emerald-500"
                  : "bg-gray-200"
              }`}
            >
              {status === "active" ? (
                <ThinkingDots />
              ) : status === "done" ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Icon className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 relative z-10">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
              {status === "active" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium"
                >
                  Processing
                </motion.span>
              )}
              {status === "done" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium"
                >
                  Done
                </motion.span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900 mt-0.5">{agent}</p>
            <p className="text-sm text-gray-500 mt-0.5">
              {status === "pending" ? "Waiting..." : message}
            </p>
          </div>
        </div>
      </div>

      {/* Insight below the card (only for done state) */}
      {status === "done" && <InsightReveal insight={insight} />}
    </motion.div>
  );
}
