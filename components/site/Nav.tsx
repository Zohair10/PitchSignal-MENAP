"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Radio, ArrowLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface NavProps {
  backHref?: string
  backLabel?: string
  showCTA?: boolean
}

export default function Nav({ backHref, backLabel, showCTA = true }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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

  const navLinks = [
    { href: "#how", label: "How It Works" },
    { href: "#features", label: "Features" },
    { href: "#diagnostics", label: "Diagnostics" },
    { href: "#report", label: "Sample Report" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg group">
            <div className="h-9 w-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-[0_4px_16px_hsl(22_100%_55%/0.4)] group-hover:shadow-[0_8px_24px_hsl(22_100%_55%/0.6)] transition-shadow duration-300">
              <Radio className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg tracking-tight">
              Pitch<span className="text-gradient font-extrabold">Signal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-foreground/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {showCTA && (
              <Button asChild variant="hero" size="sm">
                <Link href="/evaluate">Check Readiness</Link>
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 p-2 rounded-lg hover:bg-foreground/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold text-foreground hover:text-gradient transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button asChild variant="hero" size="xl">
                    <Link href="/evaluate" onClick={() => setMobileOpen(false)}>
                      Check Readiness
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
