"use client"

import Link from "next/link"
import { Radio } from "lucide-react"
import { motion } from "framer-motion"

const links = [
  { href: "#how", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#diagnostics", label: "Diagnostics" },
  { href: "#report", label: "Sample Report" },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 mt-12">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-[0_4px_12px_hsl(22_100%_55%/0.3)] group-hover:shadow-[0_6px_20px_hsl(22_100%_55%/0.5)] transition-shadow duration-300">
              <Radio className="h-4 w-4 text-white" />
            </div>
            <span className="tracking-tight">
              Pitch<span className="text-gradient font-extrabold">Signal</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PitchSignal. Built for MENAP
            founders.
          </p>
        </div>
      </div>
    </footer>
  )
}
