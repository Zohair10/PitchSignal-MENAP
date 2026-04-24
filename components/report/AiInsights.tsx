"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Globe2,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  FileSearch,
  Sparkles,
} from "lucide-react";

interface AiInsightsProps {
  insights: {
    startupSummary: string;
    founderProfile: string;
    keyClaims: string[];
    sectorCategory: string;
    stageAssessment: string;
    strengths: string[];
    weaknesses: string[];
    marketObservations: string[];
    tractionObservations: string[];
    regionalRedFlags: string[];
    missingFields: string[];
    extractedFields?: Record<string, string>;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

const MISSING_FIELD_LABELS: Record<string, string> = {
  sector: "Sector / Industry",
  stage: "Startup Stage",
  oneLinePitch: "One-Line Pitch",
  problem: "Problem Statement",
  solution: "Solution Description",
  targetCustomer: "Target Customer",
  businessModel: "Business Model",
  traction: "Traction / Metrics",
  revenue: "Revenue Data",
  fundingAsk: "Funding Ask",
  useOfFunds: "Use of Funds",
};

export default function AiInsights({ insights }: AiInsightsProps) {
  const shouldReduce = useReducedMotion();
  const dur = shouldReduce ? 0 : 0.5;

  const hasMissingFields = insights.missingFields.length > 0;

  return (
    <div className="space-y-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: dur, ease }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Analysis Insights</h2>
          <p className="text-xs text-white/30 mt-0.5">What our AI extracted and understood from your pitch</p>
        </div>
      </motion.div>

      {/* Missing fields alert */}
      {hasMissingFields && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.1, ease }}
          className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-amber-300">Missing Key Details</h3>
                <p className="text-xs text-white/40 mt-1">
                  Your pitch is missing these details that MENAP investors expect:
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {insights.missingFields.map((field) => (
                  <span
                    key={field}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/15 text-sm text-amber-300"
                  >
                    <XCircle className="w-3 h-3" />
                    {MISSING_FIELD_LABELS[field] || field}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Two-column grid: Stage Assessment + Key Claims */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Stage Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.15, ease }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-white/50">
            <FileSearch className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold tracking-widest uppercase">Stage Assessment</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{insights.stageAssessment}</p>
          <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/15">
              {insights.sectorCategory}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-white/40 border border-white/[0.06]">
              {insights.founderProfile}
            </span>
          </div>
        </motion.div>

        {/* Key Claims */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.2, ease }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-white/50">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold tracking-widest uppercase">Key Claims Extracted</span>
          </div>
          <ul className="space-y-2">
            {insights.keyClaims.slice(0, 5).map((claim, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400/60 shrink-0 mt-0.5" />
                <span>{claim}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.25, ease }}
          className="rounded-2xl border border-green-500/15 bg-green-500/[0.02] p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-green-400">Strengths</span>
          </div>
          <ul className="space-y-2">
            {insights.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.3, ease }}
          className="rounded-2xl border border-red-500/15 bg-red-500/[0.02] p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-red-400">Weaknesses</span>
          </div>
          <ul className="space-y-2">
            {insights.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Regional Red Flags */}
      {insights.regionalRedFlags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.35, ease }}
          className="rounded-2xl border border-orange-500/15 bg-orange-500/[0.02] p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-orange-400">
              MENAP Regional Red Flags
            </span>
          </div>
          <ul className="space-y-2.5">
            {insights.regionalRedFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400/70 shrink-0 mt-0.5" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Market & Traction Observations */}
      <div className="grid gap-5 md:grid-cols-2">
        {insights.marketObservations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: dur, delay: 0.4, ease }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 space-y-4"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-400">Market Observations</span>
            <ul className="space-y-2">
              {insights.marketObservations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400/60 shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        {insights.tractionObservations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: dur, delay: 0.45, ease }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 space-y-4"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">Traction Observations</span>
            <ul className="space-y-2">
              {insights.tractionObservations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/60 shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
