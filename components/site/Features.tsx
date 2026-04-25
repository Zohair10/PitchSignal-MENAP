"use client"

import { MapPin, ShieldCheck, Zap, BarChart3 } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="features" className="py-24 relative">
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
        </motion.div>

        {/* Features grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative glass rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`}
              />

              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative`}
              >
                <feature.icon className="h-6 w-6 text-white" />
                {/* Icon glow */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
