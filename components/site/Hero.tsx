"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Users, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Users, value: "2,400+", label: "Founders Served" },
  { icon: TrendingUp, value: "87%", label: "Improved Pitch Score" },
  { icon: Zap, value: "<30s", label: "AI Analysis Time" },
]

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Blobs */}
      <div className="blob w-[500px] h-[500px] bg-orange-300 top-0 -left-40 animate-float-slow" />
      <div className="blob w-[400px] h-[400px] bg-amber-200 top-20 right-0 animate-float-slow" style={{ animationDelay: "-4s" }} />
      <div className="blob w-[300px] h-[300px] bg-orange-200 bottom-0 left-1/3 animate-float-slow" style={{ animationDelay: "-8s" }} />

      {/* Grid background */}
      <div className="grid-bg absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            AI-Powered Investor Objection Engine
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Know Why Investors May{" "}
            <span className="underline-highlight">Say No</span>
            <br />
            <span className="text-gradient">Before You Pitch</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            PitchSignal reviews your startup like a Pakistan/MENAP investor and
            gives you the objections, risks, and fixes — in under 30 seconds.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="hero" size="xl">
              <Link href="/evaluate">
                <Sparkles className="h-5 w-5" />
                Analyze My Pitch
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#how">
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 glass rounded-2xl p-8 max-w-3xl mx-auto shadow-card animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl sm:text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
