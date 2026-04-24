"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedScoreRing } from "@/components/shared/AnimatedScoreRing";

interface ReportHeaderProps {
  startupName: string;
  verdict: string;
  overallScore: number;
}

function getVerdictColor(score: number): string {
  if (score >= 85) return "text-green-400";
  if (score >= 70) return "text-yellow-400";
  if (score >= 50) return "text-orange-400";
  return "text-red-400";
}

function getVerdictBg(score: number): string {
  if (score >= 85) return "bg-green-500/10 border-green-500/20";
  if (score >= 70) return "bg-yellow-500/10 border-yellow-500/20";
  if (score >= 50) return "bg-orange-500/10 border-orange-500/20";
  return "bg-red-500/10 border-red-500/20";
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ReportHeader({ startupName, verdict, overallScore }: ReportHeaderProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center gap-6 pt-10 pb-8 px-6 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-purple-500/[0.04] via-transparent to-transparent">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduce ? 0 : 0.5 }}
        className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase"
      >
        PitchSignal MENAP Report
      </motion.p>

      <AnimatedScoreRing score={overallScore} size={140} strokeWidth={5} />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.3, ease }}
        className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {startupName}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduce ? 0 : 0.4, delay: 0.5, ease }}
        className={`inline-flex items-center px-5 py-2 rounded-full border text-sm font-medium ${getVerdictBg(overallScore)} ${getVerdictColor(overallScore)}`}
      >
        {verdict}
      </motion.div>
    </div>
  );
}
