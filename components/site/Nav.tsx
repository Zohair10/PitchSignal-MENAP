"use client"

import Link from "next/link"
import { Radio, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavProps {
  backHref?: string
  backLabel?: string
  showCTA?: boolean
}

export default function Nav({ backHref, backLabel, showCTA = true }: NavProps) {
  if (backHref) {
    return (
      <nav className="relative z-10 border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Radio className="h-5 w-5 text-orange-500" />
            <span className="font-bold">
              Pitch<span className="text-gradient">Signal</span>
            </span>
          </Link>
          {backLabel && (
            <span className="text-sm text-muted-foreground">{backLabel}</span>
          )}
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
          <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Radio className="h-4 w-4 text-white" />
          </div>
          <span>
            Pitch<span className="text-gradient">Signal</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#report" className="hover:text-foreground transition-colors">
            Sample Report
          </a>
        </div>

        {showCTA && (
          <Button asChild variant="hero" size="sm">
            <Link href="/evaluate">Check Readiness</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
