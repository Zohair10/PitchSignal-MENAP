"use client"

import {
  Search,
  Brain,
  TrendingDown,
  FileText,
  Shield,
  Lightbulb,
} from "lucide-react"

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

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
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
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {agents.map((agent) => (
            <div
              key={agent.title}
              className="group glass rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-300"
            >
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <agent.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{agent.title}</h3>
              <p className="text-sm text-muted-foreground">
                {agent.description}
              </p>
              {/* Hover glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 pointer-events-none`}
              />
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <div key={step.step} className="relative text-center">
                <div className="text-6xl font-bold text-gradient opacity-30 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
