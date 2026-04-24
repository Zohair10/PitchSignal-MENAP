"use client";

import Link from "next/link";
import { FounderForm } from "@/components/evaluate/FounderForm";

export default function EvaluatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            &larr; PitchSignal MENAP
          </Link>
        </div>
      </nav>
      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Evaluate Your Pitch</h1>
          <p className="text-gray-400 mb-8">
            Share your startup details and pitch. We&apos;ll tell you what a
            Pakistan/MENAP investor is likely to challenge.
          </p>
          <FounderForm />
        </div>
      </main>
    </div>
  );
}
