"use client"

import Link from "next/link"
import { Radio } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="h-7 w-7 rounded-md bg-gradient-hero flex items-center justify-center">
            <Radio className="h-3.5 w-3.5 text-white" />
          </div>
          <span>
            Pitch<span className="text-gradient">Signal</span>
          </span>
        </Link>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PitchSignal. Built for MENAP
          founders.
        </p>
      </div>
    </footer>
  )
}
