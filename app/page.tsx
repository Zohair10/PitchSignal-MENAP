"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { AnimatedScoreRing } from "@/components/shared/AnimatedScoreRing";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.1 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm"
    >
      <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-white/70">Built for Pakistan / MENAP founders</span>
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
      className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight"
    >
      Know why investors
      <br />
      may say{" "}
      <span className="relative inline-block">
        <span className="relative z-10 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
          no
        </span>
        <motion.span
          className="absolute -bottom-1 left-0 h-3 w-full bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full"
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
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600" />
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">Check Investor Readiness</span>
          <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Link>
      <span className="text-sm text-white/40">Free &middot; No signup &middot; 30 seconds</span>
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
    desc: "5-step LangChain pipeline analyzes your story, traction, and regional market fit with a MENAP knowledge pack.",
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
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-[#0a0e1a]">
      {/* Ambient orbs */}
      <GradientOrb color="rgba(139, 92, 246, 0.08)" size={600} className="top-[-200px] left-[-200px]" />
      <GradientOrb color="rgba(59, 130, 246, 0.06)" size={500} className="top-[100px] right-[-150px]" />
      <GradientOrb color="rgba(249, 115, 22, 0.05)" size={400} className="bottom-[200px] left-[20%]" />

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            PitchSignal
          </span>
          <Link
            href="/evaluate"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-200 cursor-pointer"
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
            className="text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
          >
            PitchSignal reviews your startup like a Pakistan/MENAP investor and
            gives you the objections, risks, and fixes — before your
            fundraising conversation.
          </motion.p>
          <HeroCTA />
        </div>
      </section>

      {/* Problem */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 text-center space-y-5"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold">The Problem</h2>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Generic pitch tools give you a score. They don&apos;t tell you what a
              Pakistan or MENAP investor will actually challenge. Founders walk
              into meetings unprepared for the real objections — regulatory
              blind spots, traction gaps, distribution weaknesses that local VCs
              care about most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase mb-4">How it works</p>
            <h2 className="text-2xl md:text-4xl font-bold">Three steps to investor readiness</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 space-y-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white/20 tabular-nums">0{i + 1}</span>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-orange-400 uppercase mb-4">See it in action</p>
            <h2 className="text-2xl md:text-4xl font-bold">What your report looks like</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
            className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
          >
            {/* Mock header */}
            <div className="flex flex-col items-center gap-4 pt-10 pb-8 px-6 bg-gradient-to-b from-purple-500/[0.04] via-transparent to-transparent border-b border-white/[0.06]">
              <AnimatedScoreRing score={72} size={100} strokeWidth={5} />
              <h3 className="text-2xl font-bold">PayBridge</h3>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border bg-orange-500/10 border-orange-500/20 text-sm font-medium text-orange-400">
                Promising but needs sharper proof
              </span>
            </div>

            {/* Mock objection preview */}
            <div className="p-6 md:p-8 space-y-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase text-left">Top Investor Objections</p>
              <div className="grid gap-3">
                {[
                  { severity: "Critical", text: "Your waitlist is not enough proof of payment trust.", fix: "Convert waitlist users into a small verified pilot with measurable transaction intent." },
                  { severity: "Critical", text: "The regulatory path is unclear.", fix: "Add a regulatory awareness slide explaining pilot scope and licensing assumptions." },
                  { severity: "Moderate", text: "The UAE-to-Pakistan corridor is still too broad.", fix: "Start with one narrow wedge, such as UAE-based agencies paying Pakistani freelancers." },
                ].map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`shrink-0 mt-0.5 w-4 h-4 ${obj.severity === "Critical" ? "text-red-400" : "text-orange-400"}`} />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded ${obj.severity === "Critical" ? "bg-red-500/10 text-red-400" : "bg-orange-500/10 text-orange-400"}`}>
                            {obj.severity}
                          </span>
                          <p className="text-sm text-white/80 font-medium">{obj.text}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="shrink-0 mt-0.5 w-3.5 h-3.5 text-green-400/60" />
                          <p className="text-xs text-white/40">{obj.fix}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-white/20 text-center pt-2">+ 2 more objections in full report</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 w-full px-6 py-24 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="text-center"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">Why PitchSignal</p>
            <h2 className="text-2xl md:text-4xl font-bold">Why MENAP-specific?</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 w-full px-6 py-28 border-t border-white/[0.06]">
        <GradientOrb color="rgba(139, 92, 246, 0.1)" size={500} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="relative max-w-2xl mx-auto text-center space-y-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold">
            Ready to see your blind spots?
          </h2>
          <p className="text-white/50 text-lg">
            Find out what a MENAP investor would challenge — before you walk into the room.
          </p>
          <Link href="/evaluate" className="inline-block">
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Check Investor Readiness Now</span>
              <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-10">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/25">
          PitchSignal MENAP — Built for Pakistan/MENAP founders. Not financial or legal advice.
        </div>
      </footer>
    </div>
  );
}
