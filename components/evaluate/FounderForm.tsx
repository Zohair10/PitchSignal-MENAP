"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PdfUpload } from "@/components/evaluate/PdfUpload";
import { AgentLog, type AgentLogEntry } from "@/components/evaluate/AgentLog";
import { DEMO_OPTIONS } from "@/lib/data/demoData";
import { encodeReport } from "@/lib/utils/encodeReport";
import type { FounderInput } from "@/lib/schemas/founderInput.schema";
import type { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import { ArrowRight, Sparkles, AlertCircle, FileText } from "lucide-react";

const COUNTRIES = [
  "Pakistan", "UAE", "Saudi Arabia", "Egypt", "Jordan", "Morocco", "Tunisia",
  "Bahrain", "Kuwait", "Oman", "Qatar", "Other",
];

const initialFormState: FounderInput = {
  startupName: "", country: "", pitchText: "",
};

export function FounderForm() {
  const router = useRouter();
  const [form, setForm] = useState<FounderInput>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [agentLogEntries, setAgentLogEntries] = useState<AgentLogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<string>("paybridge");
  const [startTime, setStartTime] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  function updateField(field: keyof FounderInput, value: string | null) {
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));
    if (error) setError(null);
  }

  function handleAutofill() {
    const demo = DEMO_OPTIONS.find((d) => d.key === selectedDemo);
    if (demo) {
      setForm(demo.data);
      setError(null);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.startupName.trim() || !form.country || !form.pitchText.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setAgentLogEntries([]);
    setStartTime(Date.now());

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const response = await fetch("/api/evaluate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error("Evaluation failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let report: EvaluationReport | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const payload = line.slice(6);
            try {
              const parsed = JSON.parse(payload);
              if (parsed.step !== undefined && parsed.message) {
                setAgentLogEntries((prev) => [...prev, parsed as AgentLogEntry]);
              }
              if (parsed.report) {
                report = parsed.report as EvaluationReport;
              }
            } catch {
              // skip unparseable lines
            }
          }
        }
      }

      if (report) {
        const encoded = encodeReport(report);
        router.push(`/report?data=${encoded}`);
      } else {
        throw new Error("No report received");
      }
    } catch (err) {
      if (abortController.signal.aborted) return;
      console.error("SSE error:", err);
      // Fallback to non-streaming endpoint
      try {
        const fallbackResponse = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!fallbackResponse.ok) throw new Error("Fallback failed");
        const fallbackReport: EvaluationReport = await fallbackResponse.json();
        const encoded = encodeReport(fallbackReport);
        router.push(`/report?data=${encoded}`);
      } catch {
        setIsLoading(false);
        setAgentLogEntries([]);
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <>
      {/* Full-screen loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-lg space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-semibold text-gray-900">Analyzing your pitch...</h2>
                </div>
                <p className="text-gray-400 text-sm">Our AI agents are reviewing your startup. This takes 15-30 seconds.</p>
              </div>
              <AgentLog entries={agentLogEntries} totalSteps={6} startTime={startTime ?? undefined} />
              {agentLogEntries.filter((e) => e.step >= 0).length < 6 && (
                <button
                  type="button"
                  onClick={() => {
                    abortRef.current?.abort();
                    setIsLoading(false);
                    setAgentLogEntries([]);
                    setStartTime(null);
                  }}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  Cancel analysis
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Autofill + Error */}
        <div className="flex items-center gap-3 justify-end">
          <Select value={selectedDemo} onValueChange={(val) => val && setSelectedDemo(val)}>
            <SelectTrigger className="w-[200px] bg-gray-50 border-gray-200 text-sm text-gray-500 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DEMO_OPTIONS.map((d) => (
                <SelectItem key={d.key} value={d.key}>{d.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={handleAutofill}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Autofill
          </button>
        </div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main input card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Submit Your Pitch</h2>
            <p className="text-sm text-gray-500 mt-1">Our AI will extract all key details and identify gaps automatically.</p>
          </div>

          {/* Startup name + Country row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-gray-500">
                Startup Name <span className="text-orange-500">*</span>
              </label>
              <Input
                value={form.startupName}
                onChange={(e) => updateField("startupName", e.target.value)}
                placeholder="e.g. PayBridge"
                required
                className="bg-gray-50 border-gray-200 focus:border-orange-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-gray-500">
                Country <span className="text-orange-500">*</span>
              </label>
              <Select value={form.country} onValueChange={(val) => updateField("country", val)}>
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PDF upload */}
          <PdfUpload onTextExtracted={(text) => updateField("pitchText", text)} />

          {/* Pitch text */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Pitch Text <span className="text-orange-500">*</span>
              </div>
            </label>
            <Textarea
              value={form.pitchText}
              onChange={(e) => updateField("pitchText", e.target.value)}
              placeholder="Paste your full pitch text here... Include your problem, solution, target market, business model, traction, team, and funding ask. Our AI will extract the key details."
              rows={12}
              required
              className="text-sm bg-gray-50 border-gray-200 focus:border-orange-400 min-h-[200px]"
            />
            <p className={`text-sm ${form.pitchText.length < 20 ? "text-amber-500" : "text-gray-400"}`}>
              {form.pitchText.length} characters (minimum 20). The more detail you provide, the better the analysis.
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex items-center justify-center gap-2 h-14 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">Analyze My Pitch</span>
          <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </form>
    </>
  );
}
