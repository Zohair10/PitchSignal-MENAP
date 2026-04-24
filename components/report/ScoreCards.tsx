"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedScoreRing } from "@/components/shared/AnimatedScoreRing";
import { BarChart3 } from "lucide-react";

interface Scores {
  storyClarity: number;
  regionalMarketFit: number;
  tractionCredibility: number;
}

interface ScoreCardsProps {
  scores: Scores;
  overallScore: number;
}

const scoreLabels: { key: keyof Scores; label: string; weight: string }[] = [
  { key: "storyClarity", label: "Story Clarity", weight: "30%" },
  { key: "regionalMarketFit", label: "Regional Market Fit", weight: "35%" },
  { key: "tractionCredibility", label: "Traction Credibility", weight: "35%" },
];

const INVESTOR_READY_THRESHOLD = 75;

function getThresholdLabel(score: number): { text: string; color: string } {
  if (score >= 75) return { text: "Investor-ready", color: "text-green-600" };
  if (score >= 60) return { text: "Promising", color: "text-yellow-600" };
  if (score >= 40) return { text: "Too early", color: "text-orange-600" };
  return { text: "High risk", color: "text-red-500" };
}

function ThresholdBar({ score }: { score: number }) {
  const pct = Math.min(Math.max(score, 0), 100);
  const threshold = getThresholdLabel(score);
  const gap = score - INVESTOR_READY_THRESHOLD;

  return (
    <div className="w-full space-y-2 mt-2">
      <div className="relative h-2 w-full rounded-full overflow-hidden bg-gray-100">
        {/* Colored zones */}
        <div className="absolute inset-0 flex">
          <div className="w-[40%] bg-red-200" />
          <div className="w-[20%] bg-orange-200" />
          <div className="w-[15%] bg-yellow-200" />
          <div className="w-[25%] bg-green-200" />
        </div>
        {/* Score indicator */}
        <div
          className="absolute top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-gray-900 shadow-[0_0_6px_rgba(0,0,0,0.3)]"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>High risk</span>
        <span>Too early</span>
        <span>Investor-ready</span>
      </div>
      <p className="text-sm text-center">
        <span className={threshold.color}>{threshold.text}</span>
        {gap < 0 && (
          <span className="text-gray-400"> — {Math.abs(Math.round(gap))} pts below investor-ready</span>
        )}
        {gap >= 0 && gap > 0 && (
          <span className="text-gray-400"> — above investor-ready threshold</span>
        )}
      </p>
    </div>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ScoreCards({ scores, overallScore }: ScoreCardsProps) {
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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 border border-orange-200">
          <BarChart3 className="w-4 h-4 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Score Breakdown</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-300 to-transparent" />
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {scoreLabels.map(({ key, label, weight }, i) => {
          const value = scores[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: shouldReduce ? 0 : 0.5,
                delay: i * 0.1,
                ease,
              }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-col items-center gap-3"
            >
              <AnimatedScoreRing score={value} size={80} strokeWidth={4} label={label} />
              <p className="text-xs text-gray-500 font-medium">{weight} weight</p>
              <ThresholdBar score={value} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
