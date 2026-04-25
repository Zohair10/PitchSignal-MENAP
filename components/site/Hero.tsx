"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Users, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const stats = [
  { icon: Users, value: "2,400+", label: "Founders Served" },
  { icon: TrendingUp, value: "87%", label: "Improved Pitch Score" },
  { icon: Zap, value: "<30s", label: "AI Analysis Time" },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pb-28 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="blob w-[600px] h-[600px] bg-orange-300/60 -top-20 -left-60 animate-float-slow" />
      <div
        className="blob w-[500px] h-[500px] bg-amber-200/50 top-10 -right-20 animate-float-slow"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="blob w-[350px] h-[350px] bg-orange-200/40 bottom-10 left-1/3 animate-float-slow"
        style={{ animationDelay: "-8s" }}
      />

      {/* Grid background */}
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column — Copy */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Deep Analysis Engine
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6"
            >
              Precision Intelligence for{" "}
              <span className="underline-highlight">Modern Pitches</span>
              <br />
              <span className="text-gradient">in the MENAP Region</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Deploy AI-driven diagnostics on your pitch deck. PitchSignal
              analyzes structure, clarity, and market fit in real-time — delivering
              actionable metrics to secure capital faster.
            </motion.p>

            {/* CTA */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button asChild variant="hero" size="xl">
                <Link href="/evaluate">
                  <Sparkles className="h-5 w-5" />
                  Run Analysis
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href="#report">
                  View Sample Report
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column — Scanner Mockup (from Stitch design) */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-elegant border border-border/60 overflow-hidden">
              {/* Browser Header */}
              <div className="h-11 border-b border-border/40 flex items-center px-4 gap-2 bg-gradient-to-r from-background to-background/80">
                <div className="w-3 h-3 rounded-full bg-red-300/80" />
                <div className="w-3 h-3 rounded-full bg-amber-300/80" />
                <div className="w-3 h-3 rounded-full bg-green-300/80" />
                <div className="ml-3 text-[11px] font-mono text-muted-foreground tracking-wide">
                  PitchSignal Diagnostics
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-grow p-5 sm:p-6 relative bg-white">
                {/* Fake Deck Slide */}
                <div className="w-full h-full relative flex flex-col justify-center gap-3">
                  <div className="w-3/4 h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded-md" />
                  <div className="w-full h-3 bg-gray-100 rounded" />
                  <div className="w-5/6 h-3 bg-gray-100 rounded" />
                  <div className="w-4/6 h-3 bg-gray-50 rounded mb-3" />
                  <div className="flex gap-3">
                    <div className="w-1/2 h-24 sm:h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg" />
                    <div className="w-1/2 h-24 sm:h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg" />
                  </div>

                  {/* Scanner Line Animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-20 pointer-events-none"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "70%", "0%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent border-t-2 border-orange-500/60" />
                  </motion.div>

                  {/* Floating Metrics */}
                  <motion.div
                    className="absolute top-3 right-3 glass rounded-lg px-3 py-2 shadow-card flex items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-foreground">
                      Clarity: 87
                    </span>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 shadow-card flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-foreground">
                      Risk Score: 42
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Decorative Glow behind mockup */}
            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 glass rounded-2xl p-8 max-w-3xl mx-auto shadow-card"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              >
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl sm:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
