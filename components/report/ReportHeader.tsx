"use client";

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

function getScoreGradient(score: number): string {
  if (score >= 85) return "from-green-500 to-emerald-600";
  if (score >= 70) return "from-yellow-500 to-amber-600";
  if (score >= 50) return "from-orange-500 to-red-500";
  return "from-red-500 to-rose-600";
}

export default function ReportHeader({
  startupName,
  verdict,
  overallScore,
}: ReportHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-6 pb-8">
      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        PitchSignal MENAP Report
      </p>

      <div
        className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${getScoreGradient(overallScore)} shadow-lg`}
      >
        <span className="text-4xl font-bold text-white">{overallScore}</span>
      </div>

      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        {startupName}
      </h1>

      <p className={`text-center text-lg font-medium ${getVerdictColor(overallScore)}`}>
        {verdict}
      </p>
    </div>
  );
}
