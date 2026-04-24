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
        <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Analysis Insights</h2>
          <p className="text-sm text-gray-500 mt-0.5">What our AI extracted and understood from your pitch</p>
        </div>
      </motion.div>

      {/* Missing fields alert */}
      {hasMissingFields && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: dur, delay: 0.1, ease }}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold text-amber-700">Missing Key Details</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Your pitch is missing these details that MENAP investors expect:
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {insights.missingFields.map((field) => (
                  <span
                    key={field}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-200 text-sm text-amber-700"
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
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-gray-500">
            <FileSearch className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-600">Stage Assessment</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{insights.stageAssessment}</p>
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-medium px-2.5 py-1 rounded bg-orange-100 text-orange-700 border border-orange-200">
              {insights.sectorCategory}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded bg-gray-100 text-gray-500 border border-gray-200">
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
          className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-gray-500">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-600">Key Claims Extracted</span>
          </div>
          <ul className="space-y-2">
            {insights.keyClaims.slice(0, 5).map((claim, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
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
          className="rounded-2xl border border-green-200 bg-green-50 p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold tracking-widest uppercase text-green-600">Strengths</span>
          </div>
          <ul className="space-y-2">
            {insights.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
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
          className="rounded-2xl border border-red-200 bg-red-50 p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold tracking-widest uppercase text-red-500">Weaknesses</span>
          </div>
          <ul className="space-y-2">
            {insights.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
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
          className="rounded-2xl border border-orange-200 bg-orange-50 p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold tracking-widest uppercase text-orange-600">
              MENAP Regional Red Flags
            </span>
          </div>
          <ul className="space-y-2.5">
            {insights.regionalRedFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
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
            className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-orange-500">Market Observations</span>
            <ul className="space-y-2">
              {insights.marketObservations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
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
            className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-amber-500">Traction Observations</span>
            <ul className="space-y-2">
              {insights.tractionObservations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
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
