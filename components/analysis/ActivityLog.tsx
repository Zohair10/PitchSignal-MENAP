"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Bot } from "lucide-react";

export interface LogEntry {
  step: number;
  message: string;
  agent: string;
  timestamp: string;
  insight?: string;
}

interface ActivityLogProps {
  entries: LogEntry[];
}

export function ActivityLog({ entries }: ActivityLogProps) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Activity Log</h3>
      </div>
      <div className="rounded-xl border border-gray-200 bg-gray-50 max-h-[240px] overflow-y-auto">
        <div className="p-3 space-y-0">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
              <motion.div
                key={`${entry.step}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-2.5 py-2 ${
                  i < entries.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="shrink-0 mt-0.5 w-4 h-4 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600">{entry.message}</p>
                  {entry.insight && (
                    <p className="text-xs text-orange-500/70 mt-0.5">{entry.insight}</p>
                  )}
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Bot className="w-2 h-2" />
                      <span>{entry.agent}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 tabular-nums">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
