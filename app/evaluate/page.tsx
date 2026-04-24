"use client";

import Link from "next/link";
import { FounderForm } from "@/components/evaluate/FounderForm";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { ArrowLeft } from "lucide-react";

export default function EvaluatePage() {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-[#0a0e1a]">
      <GradientOrb color="rgba(139, 92, 246, 0.06)" size={500} className="top-[-100px] right-[-150px]" />
      <GradientOrb color="rgba(59, 130, 246, 0.04)" size={400} className="bottom-[-100px] left-[-100px]" />

      <nav className="relative z-10 border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            PitchSignal
          </Link>
        </div>
      </nav>
      <main className="relative z-10 flex-1 w-full px-6 py-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Evaluate Your Pitch</h1>
          <p className="text-white/40 text-base mb-10 max-w-xl">
            Paste your pitch or upload a PDF. Our AI extracts the key details and tells you what a MENAP investor will challenge.
          </p>
          <FounderForm />
        </div>
      </main>
    </div>
  );
}
