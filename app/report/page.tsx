"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { decodeReport } from "@/lib/utils/encodeReport";
import { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { ArrowLeft } from "lucide-react";

import ReportHeader from "@/components/report/ReportHeader";
import AiInsights from "@/components/report/AiInsights";
import InvestorObjections from "@/components/report/InvestorObjections";
import ScoreCards from "@/components/report/ScoreCards";
import VcMemo from "@/components/report/VcMemo";
import FixPlan from "@/components/report/FixPlan";
import ImprovedPitch from "@/components/report/ImprovedPitch";
import RegionalSignals from "@/components/report/RegionalSignals";
import ReportActions from "@/components/report/ReportActions";

function ReportContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-400">No Report Data Found</h2>
          <p className="text-sm text-white/40">The report link appears to be invalid or has expired.</p>
          <Link href="/evaluate" className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300 cursor-pointer">
            Generate a new report
          </Link>
        </div>
      </div>
    );
  }

  const report: EvaluationReport | null = decodeReport(data);

  if (!report) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-400">Invalid Report Data</h2>
          <p className="text-sm text-white/40">The report data could not be decoded.</p>
          <Link href="/evaluate" className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300 cursor-pointer">
            Try again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl w-full space-y-16 px-6 py-12">
      <ReportHeader
        startupName={report.startupName}
        verdict={report.verdict}
        overallScore={report.overallScore}
      />
      {report.aiInsights && <AiInsights insights={report.aiInsights} />}
      <InvestorObjections objections={report.topInvestorObjections} />
      <ScoreCards scores={report.scores} overallScore={report.overallScore} />
      <VcMemo memo={report.vcMemo} />
      <FixPlan fixes={report.topThreeFixes} />
      <ImprovedPitch pitch={report.improvedPitch} />
      <RegionalSignals signals={report.regionalSignalsUsed} />
      <ReportActions report={report} />
    </div>
  );
}

export default function ReportPage() {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-[#0a0e1a]">
      <GradientOrb color="rgba(139, 92, 246, 0.06)" size={500} className="top-[-150px] right-[-200px]" />
      <GradientOrb color="rgba(59, 130, 246, 0.04)" size={400} className="bottom-[200px] left-[-100px]" />

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            PitchSignal
          </Link>
        </div>
      </nav>

      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center space-y-3">
              <div className="mx-auto w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
              <p className="text-sm text-white/40">Loading report...</p>
            </div>
          </div>
        }
      >
        <ReportContent />
      </Suspense>
    </div>
  );
}
