"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedScoreRing } from "@/components/shared/AnimatedScoreRing";

interface ReportHeaderProps {
  startupName: string;
  verdict: string;
  overallScore: number;
}

function getVerdictColor(score: number): string {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-600";
  if (score >= 50) return "text-orange-600";
  return "text-red-500";
}

function getVerdictBg(score: number): string {
  if (score >= 85) return "bg-green-100 border-green-200";
  if (score >= 70) return "bg-yellow-100 border-yellow-200";
  if (score >= 50) return "bg-orange-100 border-orange-200";
  return "bg-red-100 border-red-200";
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ReportHeader({ startupName, verdict, overallScore }: ReportHeaderProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center gap-6 pt-10 pb-8 px-6 rounded-2xl border border-gray-200 bg-gradient-to-b from-orange-50 via-transparent to-transparent">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduce ? 0 : 0.5 }}
        className="text-sm font-semibold tracking-[0.15em] text-gray-500 uppercase"
      >
        PitchSignal MENAP Report
      </motion.p>

      <AnimatedScoreRing score={overallScore} size={140} strokeWidth={5} />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.3, ease }}
        className="text-center text-3xl font-bold tracking-tight sm:text-4xl text-gray-900"
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
