"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  BrainCircuit,
  Globe,
  MessageSquareHeart,
  UserRoundX,
  FileSignature,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AgentNode } from "./AgentNode";
import { PipelineConnector } from "./PipelineConnector";
import { ScoreBuildup } from "./ScoreBuildup";
import { SectorDetection } from "./SectorDetection";
import { ActivityLog, type LogEntry } from "./ActivityLog";

// ─── Pipeline definition ───

interface AgentDef {
  step: number;
  agent: string;
  icon: LucideIcon;
  label: string;
  message: string;
  color: string;
}

export const AGENT_PIPELINE: AgentDef[] = [
  { step: 0, agent: "Intake Agent",           icon: FileSearch,         label: "INTAKE",   message: "Reading founder input...",           color: "from-orange-500 to-amber-500" },
  { step: 1, agent: "Intake Agent",           icon: BrainCircuit,       label: "PROFILE",  message: "Extracting startup profile...",      color: "from-orange-500 to-amber-500" },
  { step: 2, agent: "Regional Analyst",       icon: Globe,              label: "REGIONAL", message: "Applying MENAP knowledge pack...",   color: "from-amber-500 to-yellow-500" },
  { step: 3, agent: "Story & Market Reviewer",icon: MessageSquareHeart, label: "REVIEW",   message: "Reviewing story and traction...",    color: "from-emerald-500 to-teal-500" },
  { step: 4, agent: "Investor Simulator",     icon: UserRoundX,         label: "SIMULATE", message: "Generating investor objections...",   color: "from-red-500 to-orange-500" },
  { step: 5, agent: "Memo Writer",            icon: FileSignature,      label: "MEMO",     message: "Building shareable report...",        color: "from-orange-500 to-yellow-500" },
];

// ─── Types ───

export type AgentStatus = "pending" | "active" | "done";

export interface PartialScores {
  storyClarity?: number;
  regionalMarketFit?: number;
  tractionCredibility?: number;
  overallScore?: number;
  objectionCount?: number;
}

interface AgentPipelineProps {
  agentStatuses: Record<number, AgentStatus>;
  stepInsights: Record<number, string>;
  partialScores: PartialScores;
  stepEntries: LogEntry[];
  sector?: string;
  isComplete: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function AgentPipeline({
  agentStatuses,
  stepInsights,
  partialScores,
  stepEntries,
  sector,
  isComplete,
}: AgentPipelineProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left column: Agent Pipeline (3/5 width on desktop) */}
      <motion.div
        className="lg:col-span-3 space-y-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {AGENT_PIPELINE.map((agent, i) => {
          const status = isComplete
            ? "done"
            : agentStatuses[agent.step] || "pending";

          // Determine connector state
          const prevStatus = i > 0 ? agentStatuses[AGENT_PIPELINE[i - 1].step] : undefined;
          const connectorState: "pending" | "handoff" | "complete" =
            status === "done"
              ? "complete"
              : status === "active" && prevStatus === "done"
              ? "handoff"
              : "pending";

          return (
            <div key={agent.step}>
              <AgentNode
                icon={agent.icon}
                agent={agent.agent}
                label={agent.label}
                message={agent.message}
                color={agent.color}
                status={status}
                insight={status === "done" ? stepInsights[agent.step] : undefined}
              />

              {/* Connector between nodes (not after last) */}
              {i < AGENT_PIPELINE.length - 1 && (
                <PipelineConnector
                  state={connectorState}
                  color={agent.color}
                />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Right column: Live Dashboard (2/5 width on desktop) */}
      <div className="lg:col-span-2 space-y-4">
        {/* Sector detection banner */}
        {sector && (
          <SectorDetection
            sector={sector}
            insight={stepInsights[1]}
          />
        )}

        {/* Score buildup */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <ScoreBuildup
            scores={partialScores}
            sector={undefined} // sector shown above via SectorDetection
          />
        </div>

        {/* Activity log */}
        <ActivityLog entries={stepEntries} />
      </div>
    </div>
  );
}
