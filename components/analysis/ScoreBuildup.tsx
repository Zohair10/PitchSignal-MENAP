"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { TrendingUp, BarChart3, Target, Award } from "lucide-react";

interface Scores {
  storyClarity?: number;
  regionalMarketFit?: number;
  tractionCredibility?: number;
  overallScore?: number;
  objectionCount?: number;
}

interface ScoreBuildupProps {
  scores: Scores;
  sector?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

function ScoreCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: number;
  color: string;
}) {
  return (
    <AnimatePresence>
      {value !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${color}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">{label}</p>
            <p className="text-lg font-bold text-gray-900">
              <AnimatedCounter target={value} duration={1.2} suffix="/100" />
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScoreBuildup({ scores, sector }: ScoreBuildupProps) {
  const hasAnyScore = scores.storyClarity || scores.regionalMarketFit || scores.overallScore || scores.objectionCount;

  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Live Scores</h3>
      </div>

      {/* Sector badge */}
      <AnimatePresence>
        {sector && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            {sector}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score cards */}
      <div className="grid gap-2">
        <ScoreCard icon={BarChart3} label="Story Clarity" value={scores.storyClarity} color="from-orange-500 to-amber-500" />
        <ScoreCard icon={TrendingUp} label="Market Fit" value={scores.regionalMarketFit} color="from-emerald-500 to-teal-500" />
        <ScoreCard icon={Target} label="Traction" value={scores.tractionCredibility} color="from-amber-500 to-yellow-500" />
      </div>

      {/* Objection count */}
      <AnimatePresence>
        {scores.objectionCount !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <span className="font-medium text-orange-600">{scores.objectionCount}</span>
            investor objections generated
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overall score ring */}
      <AnimatePresence>
        {scores.overallScore !== undefined && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col items-center py-4 rounded-xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white"
          >
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f5f5f5" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - scores.overallScore / 100) }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter target={scores.overallScore} duration={1.5} />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Award className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-700">Overall Score</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!hasAnyScore && (
        <div className="text-center py-6">
          <div className="w-2 h-2 rounded-full bg-gray-300 mx-auto mb-2 animate-pulse" />
          <p className="text-xs text-gray-400">Waiting for agent scores...</p>
        </div>
      )}
    </div>
  );
}
