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

const scoreLabels: { key: keyof Scores; label: string }[] = [
  { key: "storyClarity", label: "Story Clarity" },
  { key: "regionalMarketFit", label: "Regional Market Fit" },
  { key: "tractionCredibility", label: "Traction Credibility" },
];

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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <BarChart3 className="w-4 h-4 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold">Score Breakdown</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {scoreLabels.map(({ key, label }, i) => {
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
              className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 flex flex-col items-center gap-3"
            >
              <AnimatedScoreRing score={value} size={80} strokeWidth={4} label={label} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
