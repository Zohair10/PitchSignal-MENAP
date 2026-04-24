"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Zap,
  ArrowRight,
  ChevronRight,
  Globe2,
  Target,
  BarChart3,
  FileText,
  AlertCircle,
  CheckCircle2,
  Bot,
  BookOpen,
  Scale,
  Pen,
} from "lucide-react";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { AnimatedScoreRing } from "@/components/shared/AnimatedScoreRing";
import { Logo } from "@/components/shared/Logo";

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Animated counter hook ───
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!isInView || shouldReduce) {
      if (isInView) setCount(target);
      return;
    }
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration, shouldReduce]);

  return { count, ref };
}

// ─── Stats Section ───
const STATS = [
  { value: 4.5, prefix: "$", suffix: "B+", label: "MENAP VC funding in 2024" },
  { value: 72, prefix: "", suffix: "%", label: "of pitches fail on traction proof" },
  { value: 5, prefix: "", suffix: "", label: "objections that kill most deals" },
  { value: 30, prefix: "", suffix: "s", label: "to know your blind spots" },
];

function StatsSection() {
  return (
    <section className="relative z-10 w-full px-6 py-20 border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const { count, ref } = useCountUp(
    stat.value % 1 === 0 ? stat.value : Math.round(stat.value * 10),
    1500
  );
  const displayValue =
    stat.value % 1 === 0
      ? count.toString()
      : (count / 10).toFixed(1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      className="text-center space-y-2"
    >
      <p className="text-3xl md:text-4xl font-bold tabular-nums bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
        {stat.prefix}{displayValue}{stat.suffix}
      </p>
      <p className="text-sm text-gray-600 leading-snug">{stat.label}</p>
    </motion.div>
  );
}

// ─── Pipeline Visualization ───
const PIPELINE_STEPS = [
  { icon: Bot, label: "Intake Agent", desc: "Extracts startup profile from your pitch", color: "from-orange-500 to-amber-500" },
  { icon: Globe2, label: "Regional Analyst", desc: "Injects MENAP market knowledge", color: "from-amber-500 to-yellow-500" },
  { icon: BookOpen, label: "Story Reviewer", desc: "Scores narrative clarity & structure", color: "from-emerald-500 to-teal-500" },
  { icon: BarChart3, label: "Market Reviewer", desc: "Evaluates traction & regional fit", color: "from-teal-500 to-cyan-500" },
  { icon: Scale, label: "Investor Simulator", desc: "Generates real investor objections", color: "from-red-500 to-orange-500" },
  { icon: Pen, label: "Memo Writer", desc: "Assembles the full evaluation report", color: "from-orange-500 to-yellow-500" },
];

function PipelineSection() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="hidden md:block absolute top-[36px] left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-px bg-gradient-to-r from-orange-300/40 via-amber-300/40 to-yellow-300/40" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {PIPELINE_STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            className="relative flex flex-col items-center text-center space-y-3"
          >
            <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center ring-4 ring-white z-10`}>
              <step.icon className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{step.label}</p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Interactive Mini-Demo ───
const DEMO_DATA = {
  paybridge: {
    name: "PayBridge",
    score: 72,
    verdict: "Promising but needs sharper proof",
    verdictColor: "bg-orange-100 border-orange-200 text-orange-600",
    objections: [
      { severity: "Critical", text: "Your waitlist is not enough proof of payment trust.", fix: "Convert waitlist users into a small verified pilot with measurable transaction intent." },
      { severity: "Critical", text: "The regulatory path is unclear.", fix: "Add a regulatory awareness slide explaining pilot scope and licensing assumptions." },
      { severity: "Moderate", text: "The UAE-to-Pakistan corridor is still too broad.", fix: "Start with one narrow wedge, such as UAE-based agencies paying Pakistani freelancers." },
    ],
  },
  medconnect: {
    name: "MedConnect",
    score: 81,
    verdict: "Investor-ready with minor gaps",
    verdictColor: "bg-green-100 border-green-200 text-green-600",
    objections: [
      { severity: "Moderate", text: "Saudi/Qatar expansion assumptions are aggressive.", fix: "Show a phased market entry plan with regulatory milestones for each geography." },
      { severity: "Watch", text: "AI symptom triage is promised but not yet built.", fix: "Clarify the AI roadmap: what exists vs. what is funded by this round." },
      { severity: "Watch", text: "Corporate plan pricing may face margin pressure.", fix: "Demonstrate unit economics and path to profitability per corporate account." },
    ],
  },
};

function MiniDemo() {
  const [activeDemo, setActiveDemo] = useState<"paybridge" | "medconnect">("paybridge");
  const demo = DEMO_DATA[activeDemo];
  const shouldReduce = useReducedMotion();

  return (
    <div className="space-y-6">
      {/* Tab buttons */}
      <div className="flex items-center justify-center gap-3">
        {(Object.keys(DEMO_DATA) as Array<keyof typeof DEMO_DATA>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeDemo === key
                ? "bg-gray-100 border border-gray-300 text-gray-900"
                : "bg-transparent border border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {DEMO_DATA[key].name}
          </button>
        ))}
      </div>

      {/* Demo card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: shouldReduce ? 0 : 0.4, ease }}
          className="relative rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden"
        >
          {/* Mock header */}
          <div className="flex flex-col items-center gap-4 pt-10 pb-8 px-6 bg-gradient-to-b from-orange-50 via-transparent to-transparent border-b border-gray-200">
            <AnimatedScoreRing score={demo.score} size={100} strokeWidth={5} />
            <h3 className="text-2xl font-bold text-gray-900">{demo.name}</h3>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-medium ${demo.verdictColor}`}>
              {demo.verdict}
            </span>
          </div>

          {/* Mock objection preview */}
          <div className="p-6 md:p-8 space-y-4">
            <p className="text-sm font-semibold tracking-[0.15em] text-gray-500 uppercase text-left">Top Investor Objections</p>
            <div className="grid gap-3">
              {demo.objections.map((obj, i) => (
                <motion.div
                  key={`${activeDemo}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduce ? 0 : 0.4, delay: 0.1 + i * 0.08, ease }}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-left"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`shrink-0 mt-0.5 w-4 h-4 ${obj.severity === "Critical" ? "text-red-500" : obj.severity === "Moderate" ? "text-orange-500" : "text-yellow-500"}`} />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded ${
                          obj.severity === "Critical" ? "bg-red-100 text-red-600" :
                          obj.severity === "Moderate" ? "bg-orange-100 text-orange-600" :
                          "bg-yellow-100 text-yellow-600"
                        }`}>
                          {obj.severity}
                        </span>
                        <p className="text-sm text-gray-800 font-medium">{obj.text}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="shrink-0 mt-0.5 w-3.5 h-3.5 text-green-500/60" />
                        <p className="text-sm text-gray-500">{obj.fix}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-400 text-center pt-2">+ 2 more objections in full report</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Hero Components ───

function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2 text-sm"
    >
      <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-gray-600">Built for Pakistan / MENAP founders</span>
    </motion.div>
  );
}

function HeroTitle() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.2 }}
      className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900"
    >
      Know why investors
      <br />
      may say{" "}
      <span className="relative inline-block">
        <span className="relative z-10 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          no
        </span>
        <motion.span
          className="absolute -bottom-1 left-0 h-3 w-full bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.8, delay: 0.8, ease }}
          style={{ originX: 0 }}
        />
      </span>
      <br />
      before you pitch.
    </motion.h1>
  );
}

function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 items-center"
    >
      <Link href="/evaluate">
        <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">Check Investor Readiness</span>
          <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
      <span className="text-sm text-gray-400">Free &middot; No signup &middot; 30 seconds</span>
    </motion.div>
  );
}

const HOW_IT_WORKS = [
  {
    icon: FileText,
    title: "Share Your Pitch",
    desc: "Paste your pitch text or upload a PDF. Our AI extracts everything — no forms to fill.",
  },
  {
    icon: Zap,
    title: "AI Review Pipeline",
    desc: "6-step LangChain pipeline analyzes your story, traction, and regional market fit with a MENAP knowledge pack.",
  },
  {
    icon: AlertTriangle,
    title: "Get Investor Objections",
    desc: "See the exact 5 reasons a MENAP investor may reject you — and a specific fix for each one.",
  },
];

const FEATURES = [
  {
    icon: Target,
    title: "Region-Specific Signals",
    desc: "Uses a curated Pakistan/MENAP knowledge pack — not generic startup advice.",
  },
  {
    icon: Shield,
    title: "Investor-Perspective Review",
    desc: "Predicts real objections a local investor would raise, ordered by severity.",
  },
  {
    icon: Globe2,
    title: "MENAP Market Intelligence",
    desc: "Factors in regulatory awareness, distribution gaps, and willingness-to-pay proof.",
  },
  {
    icon: BarChart3,
    title: "Actionable Score Card",
    desc: "Story clarity, regional market fit, and traction credibility scored individually.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-white">
      {/* Ambient orbs */}
      <GradientOrb color="rgba(251, 146, 60, 0.06)" size={600} className="top-[-200px] left-[-200px]" />
      <GradientOrb color="rgba(245, 158, 11, 0.04)" size={500} className="top-[100px] right-[-150px]" />
      <GradientOrb color="rgba(249, 115, 22, 0.03)" size={400} className="bottom-[200px] left-[20%]" />

      {/* Nav */}
      <nav className="relative z-10 border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo />
          <Link
            href="/evaluate"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-all duration-200 cursor-pointer text-gray-700"
          >
            Check Investor Readiness
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex-1 flex items-center justify-center px-6 py-24 md:py-36">
        <div className="max-w-3xl w-full text-center space-y-8">
          <HeroBadge />
          <HeroTitle />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
            className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            PitchSignal reviews your startup like a Pakistan/MENAP investor and
            gives you the objections, risks, and fixes — before your
            fundraising conversation.
          </motion.p>
          <HeroCTA />
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* How It Works */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-sm font-semibold tracking-[0.15em] text-orange-500 uppercase mb-4">How it works</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">AI pipeline that thinks like an investor</h2>
          </motion.div>

          {/* Pipeline visualization */}
          <PipelineSection />

          {/* 3-step cards below */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="rounded-2xl border border-gray-200 bg-white p-8 space-y-5 hover:border-gray-300 transition-all duration-300 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-400 tabular-nums">0{i + 1}</span>
                  <h3 className="text-lg font-semibold mt-1 text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-sm font-semibold tracking-[0.15em] text-orange-500 uppercase mb-4">See it in action</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">What your report looks like</h2>
          </motion.div>

          <MiniDemo />
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-gray-200">
        <div className="max-w-5xl mx-auto space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
          >
            <p className="text-sm font-semibold tracking-[0.15em] text-amber-500 uppercase mb-4">Why PitchSignal</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Why MENAP-specific?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-300 transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-amber-500" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 w-full px-6 py-28 border-t border-gray-200">
        <GradientOrb color="rgba(251, 146, 60, 0.08)" size={500} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Ready to see your blind spots?
          </h2>
          <p className="text-gray-500 text-lg">
            Find out what a MENAP investor would challenge — before you walk into the room.
          </p>
          <Link href="/evaluate" className="inline-block">
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Check Investor Readiness Now</span>
              <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 px-6 py-10">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          PitchSignal MENAP — Built for Pakistan/MENAP founders. Not financial or legal advice.
        </div>
      </footer>
    </div>
  );
}
