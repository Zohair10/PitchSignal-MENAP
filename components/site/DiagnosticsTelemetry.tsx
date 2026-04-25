"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, ArrowRight } from "lucide-react"

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

function ScoreRing({ score, color, size = 48 }: { score: number; color: string; size?: number }) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(30 20% 92%)"
          strokeWidth="4"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  )
}

function MiniBarChart() {
  const heights = [40, 60, 50, 80, 90, 100]
  return (
    <div className="w-full h-16 flex items-end gap-1">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className={`flex-1 rounded-t-sm ${
            i >= 4
              ? "bg-gradient-to-t from-orange-500 to-amber-400"
              : "bg-gray-200/80"
          }`}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

export default function DiagnosticsTelemetry() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="diagnostics" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.15em] mb-3">
            Diagnostic Telemetry
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Real-Time{" "}
            <span className="text-gradient">Metric Breakdown</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg">
            See how your deck scores across the metrics investors care about most.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 — Narrative Flow */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            className="group bg-white rounded-2xl p-6 shadow-card border border-border/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Narrative Flow
                </h3>
                <div className="text-2xl font-bold text-foreground">Strong</div>
              </div>
              <ScoreRing score={92} color="hsl(22, 100%, 50%)" />
            </div>
            <MiniBarChart />
            <p className="text-sm text-muted-foreground border-t border-border/40 pt-4 mt-4">
              Transition logic between problem and solution is optimal.
            </p>
          </motion.div>

          {/* Card 2 — Market Sizing */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            className="group bg-white rounded-2xl p-6 shadow-card border border-border/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Market Sizing
                </h3>
                <div className="text-2xl font-bold text-foreground">
                  Needs Work
                </div>
              </div>
              <ScoreRing score={42} color="hsl(30, 40%, 55%)" />
            </div>
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200/60">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="text-sm font-medium text-amber-900">
                TAM calculations appear inflated based on sector benchmarks.
              </span>
            </div>
            <a
              href="#"
              className="text-sm text-orange-600 hover:text-orange-700 border-t border-border/40 pt-4 mt-4 flex items-center gap-1.5 font-medium cursor-pointer group/link"
            >
              View Sector Benchmarks
              <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Card 3 — Financial Model */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            className="group bg-white rounded-2xl p-6 shadow-card border border-border/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Financial Model
                </h3>
                <div className="text-2xl font-bold text-foreground">Solid</div>
              </div>
              <ScoreRing score={78} color="hsl(160, 50%, 45%)" />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Burn Rate Logic</span>
                <span className="font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs">
                  Pass
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Revenue Projections</span>
                <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs">
                  Aggressive
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground border-t border-border/40 pt-4 mt-4">
              Consider adding sensitivity analysis to projections.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
