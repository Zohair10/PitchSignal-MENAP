"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { decodeReport } from "@/lib/utils/encodeReport";
import { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { Logo } from "@/components/shared/Logo";
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

function ReportSummary({ report }: { report: EvaluationReport }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Score:</span>
          <span className="text-2xl font-bold tabular-nums text-gray-900">{report.overallScore}<span className="text-base text-gray-400">/100</span></span>
        </div>
        <div className="h-6 w-px bg-gray-200" />
        <span className={`text-sm font-medium px-3 py-1 rounded-full border ${
          report.overallScore >= 75 ? "bg-green-100 border-green-200 text-green-600" :
          report.overallScore >= 60 ? "bg-yellow-100 border-yellow-200 text-yellow-600" :
          report.overallScore >= 40 ? "bg-orange-100 border-orange-200 text-orange-600" :
          "bg-red-100 border-red-200 text-red-500"
        }`}>
          {report.verdict}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>Story: <span className="text-gray-600 font-medium">{report.scores.storyClarity}</span></span>
        <span>Market Fit: <span className="text-gray-600 font-medium">{report.scores.regionalMarketFit}</span></span>
        <span>Traction: <span className="text-gray-600 font-medium">{report.scores.tractionCredibility}</span></span>
      </div>
      {report.vcMemo.summary && (
        <p className="text-sm text-gray-500 leading-relaxed">{report.vcMemo.summary}</p>
      )}
    </div>
  );
}

function ReportContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-500">No Report Data Found</h2>
          <p className="text-sm text-gray-500">The report link appears to be invalid or has expired.</p>
          <Link href="/evaluate" className="inline-block mt-4 text-sm text-orange-500 hover:text-orange-600 cursor-pointer">
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
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-500">Invalid Report Data</h2>
          <p className="text-sm text-gray-500">The report data could not be decoded.</p>
          <Link href="/evaluate" className="inline-block mt-4 text-sm text-orange-500 hover:text-orange-600 cursor-pointer">
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
        sectorCategory={report.sectorCategory || report.aiInsights?.sectorCategory}
      />
      <ReportSummary report={report} />
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
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-white">
      <GradientOrb color="rgba(251, 146, 60, 0.06)" size={500} className="top-[-150px] right-[-200px]" />
      <GradientOrb color="rgba(245, 158, 11, 0.04)" size={400} className="bottom-[200px] left-[-100px]" />

      {/* Nav */}
      <nav className="relative z-10 border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            <Logo />
          </Link>
        </div>
      </nav>

      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center space-y-3">
              <div className="mx-auto w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
              <p className="text-sm text-gray-400">Loading report...</p>
            </div>
          </div>
        }
      >
        <ReportContent />
      </Suspense>
    </div>
  );
}
