"use client"

import { MapPin, ShieldCheck, Zap, BarChart3 } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "MENAP-Specific Signals",
    description:
      "Built for Pakistan and MENAP markets — investor expectations, regulatory red flags, and regional benchmarks you won't find in generic tools.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "Investor-Grade Objections",
    description:
      "Our agents think like real VCs and angel investors in the region — surfacing the actual concerns that kill deals.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "No waiting, no scheduling. Paste your pitch and get a comprehensive objection report in under 30 seconds.",
    color: "from-orange-600 to-red-500",
  },
  {
    icon: BarChart3,
    title: "Actionable Fixes",
    description:
      "Every objection comes with a concrete fix. Not just what's wrong — exactly how to address it before your next meeting.",
    color: "from-amber-600 to-orange-500",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Built for{" "}
            <span className="text-gradient">MENAP Founders</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every feature is designed to address the unique challenges of
            fundraising in Pakistan and the broader MENAP region.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300"
            >
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
