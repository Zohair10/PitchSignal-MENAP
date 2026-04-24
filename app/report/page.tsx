"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { decodeReport } from "@/lib/utils/encodeReport";
import { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";

import ReportHeader from "@/components/report/ReportHeader";
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
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-400">
            No Report Data Found
          </h2>
          <p className="text-sm text-white/60">
            The report link appears to be invalid or has expired. Please generate a new report.
          </p>
        </div>
      </div>
    );
  }

  const report: EvaluationReport | null = decodeReport(data);

  if (!report) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-400">
            Invalid Report Data
          </h2>
          <p className="text-sm text-white/60">
            The report data could not be decoded. The link may be corrupted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-4 py-12">
      <ReportHeader
        startupName={report.startupName}
        verdict={report.verdict}
        overallScore={report.overallScore}
      />

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
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading report...</p>
            </div>
          </div>
        }
      >
        <ReportContent />
      </Suspense>
    </div>
  );
}
