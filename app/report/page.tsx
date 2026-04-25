"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { decodeReport } from "@/lib/utils/encodeReport";
import type { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share2,
  Download,
  AlertTriangle,
  Wrench,
  FileText,
  Sparkles,
  Globe2,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Target,
  Bot,
} from "lucide-react";

// ─── Types ───

type Severity = "critical" | "moderate" | "watch";

// ─── Helpers ───

function humanize(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

// ─── ScoreRing ───

function ScoreRing({
  score,
  size = 140,
  strokeWidth = 5,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    if (score >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="score-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#score-ring-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            filter: `drop-shadow(0 0 8px ${getColor()}40)`,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground tabular-nums">{score}</span>
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase mt-0.5">
          / 100
        </span>
      </div>
    </div>
  );
}

// ─── Sub-Components ───

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
  accentColor = "orange",
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  accentColor?: "orange" | "red" | "amber" | "teal" | "green";
}) {
  const colorMap = {
    orange: "bg-orange-100 border-orange-200 text-orange-500 from-orange-300",
    red: "bg-red-100 border-red-200 text-red-500 from-red-300",
    amber: "bg-amber-100 border-amber-200 text-amber-500 from-amber-300",
    teal: "bg-teal-100 border-teal-200 text-teal-600 from-teal-300",
    green: "bg-green-100 border-green-200 text-green-500 from-green-300",
  };
  const c = colorMap[accentColor];

  return (
    <div className="flex items-center gap-3 animate-fade-up">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-xl ${c.split(" ").slice(0, 3).join(" ")}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className={`h-px flex-1 bg-gradient-to-r ${c.split(" ")[3]} to-transparent`} />
    </div>
  );
}

function InsightBlock({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 shadow-card animate-fade-up space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function ListBlock({
  title,
  items,
  variant = "neutral",
}: {
  title: string;
  items: string[];
  variant?: "positive" | "negative" | "neutral";
}) {
  const dotColor = {
    positive: "bg-green-500",
    negative: "bg-red-500",
    neutral: "bg-gray-400",
  }[variant];

  const borderColor = {
    positive: "border-green-200 bg-green-50",
    negative: "border-red-200 bg-red-50",
    neutral: "border-border bg-secondary",
  }[variant];

  return (
    <div className={`rounded-2xl border p-6 ${borderColor} animate-fade-up`}>
      <h3 className="mb-4 text-sm font-semibold tracking-widest uppercase text-foreground">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor} opacity-60`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Report Sections ───

function ReportHeader({ report }: { report: EvaluationReport }) {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-up">
      <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
        PitchSignal MENAP Report
      </p>

      <ScoreRing score={report.overallScore} />

      <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl text-gradient">
        {report.startupName}
      </h1>

      {report.sectorCategory && (
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
          {report.sectorCategory}
        </span>
      )}

      <span
        className={`inline-flex items-center px-5 py-2 rounded-full border text-sm font-medium ${
          report.overallScore >= 75
            ? "bg-green-100 border-green-200 text-green-600"
            : report.overallScore >= 60
              ? "bg-yellow-100 border-yellow-200 text-yellow-600"
              : report.overallScore >= 40
                ? "bg-orange-100 border-orange-200 text-orange-600"
                : "bg-red-100 border-red-200 text-red-500"
        }`}
      >
        {report.verdict}
      </span>

      {/* Sub-score progress bars */}
      <div className="w-full max-w-md space-y-3 mt-2">
        {[
          {
            label: "Story Clarity",
            value: report.scores.storyClarity,
            weight: "30%",
          },
          {
            label: "Regional Market Fit",
            value: report.scores.regionalMarketFit,
            weight: "35%",
          },
          {
            label: "Traction Credibility",
            value: report.scores.tractionCredibility,
            weight: "35%",
          },
        ].map(({ label, value, weight }) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">{label}</span>
              <span className="text-foreground font-semibold tabular-nums">
                {value}
                <span className="text-muted-foreground text-xs ml-1">({weight})</span>
              </span>
            </div>
            <div className="h-2 w-full rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full bg-gradient-hero transition-all duration-1000 ease-out"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopFixes({ fixes }: { fixes: EvaluationReport["topThreeFixes"] }) {
  return (
    <section className="space-y-6">
      <SectionHeading
        icon={Wrench}
        title="Top 3 Fixes"
        subtitle="Highest-impact actions to improve your pitch"
        accentColor="amber"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {fixes.map((fix, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-6 shadow-card animate-fade-up space-y-4"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-gradient text-2xl font-bold tabular-nums">
                {i + 1}
              </span>
              <h3 className="text-base font-semibold text-foreground">{fix.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {fix.action}
            </p>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-1 text-xs font-medium tracking-widest text-primary uppercase">
                Expected Impact
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fix.expectedImpact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Objections({
  objections,
}: {
  objections: EvaluationReport["topInvestorObjections"];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const severityStyles: Record<
    Severity,
    { badge: string; border: string; icon: string }
  > = {
    critical: {
      badge: "bg-red-100 text-red-600 border-red-200",
      border: "border-l-red-500",
      icon: "text-red-500",
    },
    moderate: {
      badge: "bg-orange-100 text-orange-600 border-orange-200",
      border: "border-l-orange-500",
      icon: "text-orange-500",
    },
    watch: {
      badge: "bg-yellow-100 text-yellow-600 border-yellow-200",
      border: "border-l-yellow-500",
      icon: "text-yellow-500",
    },
  };

  return (
    <section className="space-y-6">
      <SectionHeading
        icon={AlertTriangle}
        title="Why Investors May Say No"
        subtitle="The top 5 objections a MENAP investor would raise"
        accentColor="red"
      />
      <div className="space-y-3">
        {objections.map((obj, i) => {
          const severity = severityStyles[obj.severity as Severity] ?? severityStyles.watch;
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className={`glass rounded-2xl border-l-4 ${severity.border} shadow-card overflow-hidden transition-all duration-200 animate-fade-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-sm font-bold text-red-600 tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      {obj.objection}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold border ${severity.badge}`}
                  >
                    {obj.severity.charAt(0).toUpperCase() + obj.severity.slice(1)}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 ml-11 space-y-3 animate-fade-up">
                  <div>
                    <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      Why it matters
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {obj.whyItMatters}
                    </p>
                  </div>
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="mb-1 text-xs font-medium tracking-widest text-primary uppercase">
                      How to fix
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {obj.howToFix}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MemoSidebar({ memo }: { memo: EvaluationReport["vcMemo"] }) {
  return (
    <section className="space-y-6">
      <SectionHeading
        icon={FileText}
        title="VC-Style Memo"
        accentColor="orange"
      />

      <div className="glass rounded-2xl p-6 shadow-card animate-fade-up">
        <blockquote className="border-l-4 border-primary/30 pl-4 mb-6">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            &ldquo;{memo.summary}&rdquo;
          </p>
        </blockquote>

        <ListBlock title="What Works" items={memo.whatWorks} variant="positive" />

        <div className="mt-4">
          <ListBlock
            title="What Breaks the Pitch"
            items={memo.whatBreaksThePitch}
            variant="negative"
          />
        </div>
      </div>
    </section>
  );
}

function ImprovedPitchCard({
  pitch,
}: {
  pitch: EvaluationReport["improvedPitch"];
}) {
  return (
    <section className="space-y-6">
      <SectionHeading
        icon={Sparkles}
        title="Improved Pitch"
        subtitle="AI-refined versions of your pitch"
        accentColor="amber"
      />
      <div className="rounded-2xl bg-gradient-hero p-px animate-fade-up">
        <div className="rounded-[15px] bg-background p-8 space-y-6">
          <div>
            <p className="mb-2 text-xs font-medium tracking-widest text-primary uppercase">
              One-Liner
            </p>
            <p className="text-lg md:text-xl font-semibold leading-relaxed text-foreground">
              &ldquo;{pitch.oneLiner}&rdquo;
            </p>
          </div>
          <div className="h-px bg-border" />
          <div>
            <p className="mb-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Elevator Pitch
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {pitch.elevatorPitch}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionalSignals({ signals }: { signals: string[] }) {
  return (
    <section className="space-y-6">
      <SectionHeading
        icon={Globe2}
        title="Regional Signals Used"
        subtitle="MENAP data points that powered the analysis"
        accentColor="teal"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal, i) => (
          <div
            key={i}
            className="glass rounded-xl p-4 shadow-card animate-fade-up flex items-start gap-3"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <Globe2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">{signal}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AiInsightsSection({
  insights,
}: {
  insights: NonNullable<EvaluationReport["aiInsights"]>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between glass rounded-2xl p-6 shadow-card cursor-pointer hover:bg-white/80 transition-all duration-200 animate-fade-up"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 border border-orange-200">
            <Bot className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-foreground">
              AI Analysis Insights
            </h2>
            <p className="text-sm text-muted-foreground">
              What our AI extracted and understood from your pitch
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="space-y-6 animate-fade-up">
          {/* Startup Summary + Founder Profile */}
          <div className="grid gap-5 md:grid-cols-2">
            <InsightBlock
              icon={Target}
              title="Startup Summary"
              body={insights.startupSummary}
            />
            <InsightBlock
              icon={Bot}
              title="Founder Profile"
              body={insights.founderProfile}
            />
          </div>

          {/* Stage Assessment */}
          <div className="glass rounded-2xl p-6 shadow-card animate-fade-up space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
                Stage Assessment
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {insights.stageAssessment}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                {insights.sectorCategory}
              </span>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid gap-5 md:grid-cols-2">
            <ListBlock title="Strengths" items={insights.strengths} variant="positive" />
            <ListBlock title="Weaknesses" items={insights.weaknesses} variant="negative" />
          </div>

          {/* Market & Traction Observations */}
          <div className="grid gap-5 md:grid-cols-2">
            {insights.marketObservations.length > 0 && (
              <ListBlock
                title="Market Observations"
                items={insights.marketObservations}
                variant="neutral"
              />
            )}
            {insights.tractionObservations.length > 0 && (
              <ListBlock
                title="Traction Observations"
                items={insights.tractionObservations}
                variant="neutral"
              />
            )}
          </div>

          {/* Regional Red Flags */}
          {insights.regionalRedFlags.length > 0 && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 animate-fade-up space-y-4">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold tracking-widest uppercase text-orange-600">
                  MENAP Regional Red Flags
                </span>
              </div>
              <ul className="space-y-2.5">
                {insights.regionalRedFlags.map((flag, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Claims */}
          {insights.keyClaims.length > 0 && (
            <div className="glass rounded-2xl p-6 shadow-card animate-fade-up space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
                  Key Claims Extracted
                </span>
              </div>
              <ul className="space-y-2">
                {insights.keyClaims.map((claim, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Extracted Fields Grid */}
          {insights.extractedFields &&
            Object.keys(insights.extractedFields).length > 0 && (
              <div className="glass rounded-2xl p-6 shadow-card animate-fade-up space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
                    Extracted Fields
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(insights.extractedFields).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="rounded-lg border border-border bg-secondary p-3"
                      >
                        <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                          {humanize(key)}
                        </p>
                        <p className="text-sm text-foreground">{value}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Missing Fields */}
          {insights.missingFields.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 animate-fade-up">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-amber-700">
                      Missing Key Details
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
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
                        {humanize(field)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ─── Error Card ───

function ErrorCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass rounded-2xl p-8 text-center max-w-md shadow-card">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Link href="/evaluate">
          <Button variant="default" className="mt-6">
            <ArrowLeft className="w-4 h-4" />
            Generate a new report
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Top Action Bar ───

function TopBar() {
  const [copied, setCopied] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center justify-between animate-fade-up">
      <Link
        href="/evaluate"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to evaluation
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="glass" size="sm" onClick={handleShare}>
          <Share2 className="w-3.5 h-3.5" />
          {copied ? "Copied!" : "Share"}
        </Button>
        <Button variant="glass" size="sm" onClick={() => window.print()}>
          <Download className="w-3.5 h-3.5" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}

// ─── Main Content ───

function ReportContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return (
      <ErrorCard
        title="No Report Data Found"
        message="The report link appears to be invalid or has expired."
      />
    );
  }

  const report: EvaluationReport | null = decodeReport(data);

  if (!report) {
    return (
      <ErrorCard
        title="Invalid Report Data"
        message="The report data could not be decoded."
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl w-full space-y-16 px-6 py-12">
      {/* Top action bar */}
      <TopBar />

      {/* Hero header with score ring */}
      <ReportHeader report={report} />

      {/* Top 3 Fixes */}
      <TopFixes fixes={report.topThreeFixes} />

      {/* Two-column: Objections (2/3) + VC Memo (1/3) */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Objections objections={report.topInvestorObjections} />
        </div>
        <div>
          <MemoSidebar memo={report.vcMemo} />
        </div>
      </div>

      {/* Improved Pitch */}
      <ImprovedPitchCard pitch={report.improvedPitch} />

      {/* Regional Signals */}
      <RegionalSignals signals={report.regionalSignalsUsed} />

      {/* AI Insights (collapsible) */}
      {report.aiInsights && <AiInsightsSection insights={report.aiInsights} />}

      {/* Evaluate another pitch CTA */}
      <div className="text-center pt-8 border-t border-border animate-fade-up">
        <p className="text-muted-foreground mb-4">
          Want to evaluate another pitch?
        </p>
        <Link href="/evaluate">
          <Button variant="hero" size="lg">
            Evaluate Another Pitch
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Page Export ───

export default function ReportPage() {
  return (
    <main className="min-h-dvh flex flex-col relative overflow-hidden">
      <Nav />

      <section className="flex-1 relative pt-16">
        <div className="absolute inset-0 bg-gradient-soft pointer-events-none" />

        <Suspense
          fallback={
            <div className="flex min-h-[60vh] items-center justify-center">
              <div className="text-center space-y-3">
                <div className="mx-auto w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Loading report...
                </p>
              </div>
            </div>
          }
        >
          <ReportContent />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
