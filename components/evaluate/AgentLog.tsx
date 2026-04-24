"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Clock, Bot, Sparkles } from "lucide-react";

export interface AgentLogEntry {
  step: number;
  message: string;
  agent: string;
  timestamp: string;
  insight?: string;
}

interface AgentLogProps {
  entries: AgentLogEntry[];
  totalSteps: number;
}

const AGENT_COLORS: Record<string, string> = {
  "Intake Agent": "from-purple-500 to-violet-500",
  "Regional Analyst": "from-blue-500 to-cyan-500",
  "Story & Market Reviewer": "from-green-500 to-emerald-500",
  "Investor Simulator": "from-red-500 to-orange-500",
  "Memo Writer": "from-amber-500 to-yellow-500",
  "System": "from-gray-500 to-gray-400",
};

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function AgentLog({ entries, totalSteps }: AgentLogProps) {
  const logRef = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  // Auto-scroll to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [entries]);

  // Elapsed timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const completedCount = entries.filter((e) => e.step >= 0).length;
  const progress = Math.min((completedCount / totalSteps) * 100, 100);
  const isComplete = completedCount >= totalSteps;
  const activeEntry = entries.length > 0 && !isComplete ? entries[entries.length - 1] : null;

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isComplete ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            )}
            <span className="text-sm font-medium text-white/70">
              {isComplete ? "Analysis complete" : "Analyzing your pitch..."}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/40 tabular-nums font-medium">{Math.round(progress)}%</span>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <Clock className="w-3 h-3" />
              <span className="tabular-nums">{formatTime(elapsed)}</span>
            </div>
          </div>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Active agent highlight */}
      {activeEntry && !isComplete && (
        <motion.div
          key={activeEntry.agent}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r opacity-[0.03] animate-pulse" style={{
            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
          }} />
          <div className="relative flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${AGENT_COLORS[activeEntry.agent] || "from-purple-500 to-blue-500"} flex items-center justify-center`}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{activeEntry.agent}</p>
              <p className="text-xs text-white/40">{activeEntry.message}</p>
            </div>
            <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
          </div>
        </motion.div>
      )}

      {/* Agent log entries */}
      <div
        ref={logRef}
        className="rounded-xl border border-white/[0.06] bg-white/[0.01] max-h-[300px] overflow-y-auto"
      >
        <div className="p-4 space-y-0">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => {
              const isLast = i === entries.length - 1;
              const gradient = AGENT_COLORS[entry.agent] || "from-purple-500 to-blue-500";
              return (
                <motion.div
                  key={`${entry.step}-${i}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-3 py-3 ${
                    i < entries.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <div className={`shrink-0 mt-0.5 w-6 h-6 rounded-md bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    {isLast && !isComplete ? (
                      <Loader2 className="w-3 h-3 text-white animate-spin" />
                    ) : (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70">{entry.message}</p>
                    {entry.insight && (
                      <p className="text-xs text-purple-300/60 mt-1">{entry.insight}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-[11px] text-white/30">
                        <Bot className="w-2.5 h-2.5" />
                        <span>{entry.agent}</span>
                      </div>
                      <span className="text-[11px] text-white/20 tabular-nums">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
