"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, XCircle, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const tabs = ["Score", "Top Objections", "Fixes"]

const sampleObjections = [
  {
    icon: XCircle,
    severity: "Critical",
    severityColor: "bg-red-100 text-red-700",
    title: "No evidence of revenue or traction validation",
    description:
      "Investors in MENAP markets need to see at least early revenue signals before committing Series A-level capital.",
  },
  {
    icon: AlertTriangle,
    severity: "High",
    severityColor: "bg-amber-100 text-amber-700",
    title: "Unclear defensible moat in competitive market",
    description:
      "Without patents, exclusive partnerships, or significant network effects, the business model is easily replicable.",
  },
  {
    icon: AlertTriangle,
    severity: "High",
    severityColor: "bg-amber-100 text-amber-700",
    title: "Team gap: No technical co-founder identified",
    description:
      "For a tech-first product, the absence of a CTO or technical co-founder is a significant red flag for investors.",
  },
]

export default function SampleReport() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="report" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
            Sample Report
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            See What You{" "}
            <span className="text-gradient">Get Back</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A preview of the investor objection report you'll receive — complete
            with scores, severity-rated objections, and actionable fixes.
          </p>
        </div>

        {/* Report card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl shadow-card overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border/50">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === i
                      ? "text-orange-600 border-b-2 border-orange-500"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === 0 && (
                <div className="flex flex-col items-center py-8">
                  {/* Score ring */}
                  <div className="relative h-36 w-36 mb-4">
                    <svg
                      className="h-36 w-36 -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="hsl(30 20% 90%)"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 52 * 0.42} ${2 * Math.PI * 52}`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="hsl(22 100% 50%)" />
                          <stop offset="100%" stopColor="hsl(36 100% 55%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gradient">
                        42
                      </span>
                      <span className="text-xs text-muted-foreground">
                        /100
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Overall Investor Readiness Score
                  </p>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4">
                  {sampleObjections.map((objection) => (
                    <div
                      key={objection.title}
                      className="flex gap-3 p-4 rounded-xl bg-background/50 border border-border/50"
                    >
                      <objection.icon className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">
                            {objection.title}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full ${objection.severityColor}`}
                          >
                            {objection.severity}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {objection.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 2 && (
                <div className="py-6 text-center">
                  <div className="glass rounded-xl p-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Fix #1:
                      </span>{" "}
                      Add a traction slide showing MRR growth or user
                      acquisition metrics — even early signals strengthen your
                      case significantly.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Full report includes 8+ actionable fixes ranked by impact
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ready to see what investors will actually think?
            </p>
            <Button asChild variant="hero" size="xl">
              <Link href="/evaluate">
                <Sparkles className="h-5 w-5" />
                Analyze My Pitch Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
