"use client";

import { Progress } from "@/components/ui/progress";

interface Scores {
  storyClarity: number;
  regionalMarketFit: number;
  tractionCredibility: number;
}

interface ScoreCardsProps {
  scores: Scores;
  overallScore: number;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
}

function getBarColor(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

const scoreLabels: { key: keyof Scores; label: string }[] = [
  { key: "storyClarity", label: "Story Clarity" },
  { key: "regionalMarketFit", label: "Regional Market Fit" },
  { key: "tractionCredibility", label: "Traction Credibility" },
];

export default function ScoreCards({ scores, overallScore }: ScoreCardsProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Score Breakdown</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Overall Score
          </span>
          <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}
            <span className="text-base font-normal text-muted-foreground">/100</span>
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all ${getBarColor(overallScore)}`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {scoreLabels.map(({ key, label }) => {
          const value = scores[key];
          return (
            <div
              key={key}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {label}
                </span>
                <span className={`text-xl font-bold ${getScoreColor(value)}`}>
                  {value}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full transition-all ${getBarColor(value)}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
