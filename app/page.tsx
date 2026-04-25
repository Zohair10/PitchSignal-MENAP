import type { Metadata } from "next"

import Nav from "@/components/site/Nav"
import Hero from "@/components/site/Hero"
import HowItWorks from "@/components/site/HowItWorks"
import Features from "@/components/site/Features"
import DiagnosticsTelemetry from "@/components/site/DiagnosticsTelemetry"
import SampleReport from "@/components/site/SampleReport"
import Footer from "@/components/site/Footer"

export const metadata: Metadata = {
  title: "PitchSignal MENAP — Know Why Investors May Say No",
  description:
    "PitchSignal reviews your startup like a Pakistan/MENAP investor and gives you the objections, risks, and fixes before your fundraising conversation.",
  openGraph: {
    title: "PitchSignal MENAP — Know Why Investors May Say No",
    description:
      "AI-powered pitch review for Pakistan/MENAP founders. Get investor objections, risk analysis, and actionable fixes in 30 seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchSignal MENAP",
    description:
      "Know why investors may say no before you pitch. AI-powered review for Pakistan/MENAP founders.",
  },
}

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <DiagnosticsTelemetry />
        <SampleReport />
      </main>
      <Footer />
    </>
  )
}
