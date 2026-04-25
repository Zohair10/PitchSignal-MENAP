"use client"

import {
  Search,
  Brain,
  TrendingDown,
  FileText,
  Shield,
  Lightbulb,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const agents = [
  {
    icon: Search,
    title: "Intake Agent",
    description: "Extracts your startup profile from raw pitch text",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Brain,
    title: "Story Agent",
    description: "Scores narrative clarity and founder-market fit",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: TrendingDown,
    title: "Market Agent",
    description: "Evaluates regional traction and market credibility",
    color: "from-orange-600 to-red-500",
  },
  {
    icon: Shield,
    title: "Risk Agent",
    description: "Identifies regulatory and operational red flags",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: FileText,
    title: "Objection Agent",
    description: "Generates top 5 investor objections specific to MENAP",
    color: "from-amber-600 to-orange-500",
  },
  {
    icon: Lightbulb,
    title: "Memo Agent",
    description: "Assembles the full investment memo with fixes",
    color: "from-yellow-500 to-amber-500",
  },
]

const steps = [
  {
    step: "01",
    title: "Paste Your Pitch",
    description:
      "Drop in your pitch deck text, summary, or one-liner. Our intake agent extracts the key signals.",
  },
  {
    step: "02",
    title: "AI Agents Analyze",
    description:
      "Six specialized agents run sequentially, each building on the last — injecting MENAP investor expectations and regional data.",
  },
  {
    step: "03",
    title: "Get Your Report",
    description:
      "Receive a full investor objection report with severity ratings, risk analysis, and actionable fixes you can implement today.",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function HowItWorks() {
  const agentsRef = useRef(null)
  const stepsRef = useRef(null)
  const agentsInView = useInView(agentsRef, { once: true, margin: "-80px" })
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" })

  return (
    <section id="how" className="py-24 relative">
      {/* Subtle section divider gradient */}
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
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Six AI Agents.{" "}
            <span className="text-gradient">One Mission.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Each agent specializes in a different aspect of investor scrutiny,
            working together to give you the most complete pitch review.
          </p>
        </motion.div>

        {/* Agents grid */}
        <div ref={agentsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.title}
              custom={i}
              initial="hidden"
              animate={agentsInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative glass rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`}
              />

              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
              >
                <agent.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{agent.title}</h3>
              <p className="text-sm text-muted-foreground">
                {agent.description}
              </p>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${agent.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-orange-300/40 via-orange-500/30 to-amber-300/40" />

            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                initial="hidden"
                animate={stepsInView ? "visible" : "hidden"}
                variants={stepVariants}
                className="relative text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className="text-6xl font-bold text-gradient opacity-25">
                    {step.step}
                  </div>
                  {/* Dot on the connecting line */}
                  <div className="hidden md:block absolute -bottom-[21px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-hero shadow-[0_0_12px_hsl(22_100%_55%/0.5)]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
