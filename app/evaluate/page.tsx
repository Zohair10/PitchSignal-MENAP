"use client";

import Link from "next/link";
import { FounderForm } from "@/components/evaluate/FounderForm";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { Logo } from "@/components/shared/Logo";
import { ArrowLeft } from "lucide-react";

export default function EvaluatePage() {
  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-white">
      <GradientOrb color="rgba(251, 146, 60, 0.06)" size={500} className="top-[-100px] right-[-150px]" />
      <GradientOrb color="rgba(245, 158, 11, 0.04)" size={400} className="bottom-[-100px] left-[-100px]" />

      <nav className="relative z-10 border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Logo />
          </Link>
        </div>
      </nav>
      <main className="relative z-10 flex-1 w-full px-6 py-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Evaluate Your Pitch</h1>
          <p className="text-gray-400 text-base mb-10 max-w-xl">
            Paste your pitch or upload a PDF. Our AI extracts the key details and tells you what a MENAP investor will challenge.
          </p>
          <FounderForm />
        </div>
      </main>
    </div>
  );
}
