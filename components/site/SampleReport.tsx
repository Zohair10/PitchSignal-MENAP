"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, XCircle, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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

const tabContent = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
}

export default function SampleReport() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="report" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.15em] mb-3">
            Sample Report
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            See What You{" "}
            <span className="text-gradient">Get Back</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A preview of the investor objection report you&apos;ll receive — complete
            with scores, severity-rated objections, and actionable fixes.
          </p>
        </motion.div>

        {/* Report card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-2xl shadow-card overflow-hidden relative">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />

            {/* Tabs */}
            <div className="flex border-b border-border/50 relative">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex-1 px-4 py-3.5 text-sm font-medium transition-colors ${
                    activeTab === i
                      ? "text-orange-600"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {activeTab === i && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="score"
                    variants={tabContent}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center py-8"
                  >
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
                          stroke="hsl(30 20% 92%)"
                          strokeWidth="8"
                        />
                        <motion.circle
                          cx="60"
                          cy="60"
                          r="52"
                          fill="none"
                          stroke="url(#scoreGradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 52}
                          initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                          animate={{
                            strokeDashoffset:
                              2 * Math.PI * 52 - 2 * Math.PI * 52 * 0.42,
                          }}
                          transition={{
                            duration: 1.5,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.3,
                          }}
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
                        <motion.span
                          className="text-4xl font-bold text-gradient"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, duration: 0.5 }}
                        >
                          42
                        </motion.span>
                        <span className="text-xs text-muted-foreground">
                          /100
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Overall Investor Readiness Score
                    </p>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="objections"
                    variants={tabContent}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    {sampleObjections.map((objection, i) => (
                      <motion.div
                        key={objection.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex gap-3 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-border transition-colors"
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
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="fixes"
                    variants={tabContent}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="py-6 text-center"
                  >
                    <div className="glass rounded-xl p-6 mb-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-12"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
