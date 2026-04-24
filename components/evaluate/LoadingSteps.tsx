"use client";

import { Progress } from "@/components/ui/progress";

const STEPS = [
  "Reading founder input",
  "Extracting startup profile",
  "Applying Pakistan/MENAP knowledge pack",
  "Reviewing story and traction",
  "Generating investor objections",
  "Building shareable report",
];

interface LoadingStepsProps {
  currentStep: number;
}

export function LoadingSteps({ currentStep }: LoadingStepsProps) {
  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-6">
      <Progress value={progressValue} className="w-full" />

      <div className="space-y-3">
        {STEPS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div key={label} className="flex items-center gap-3">
              {/* Status indicator */}
              {isCompleted && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              {isCurrent && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center animate-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-spin" />
                </div>
              )}

              {isFuture && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                </div>
              )}

              {/* Label */}
              <span
                className={`text-sm ${
                  isCompleted
                    ? "text-green-400"
                    : isCurrent
                    ? "text-white font-medium"
                    : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
