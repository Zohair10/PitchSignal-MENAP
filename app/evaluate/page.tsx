"use client";

import { useState, useRef, useEffect, useCallback, type ChangeEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { encodeReport } from "@/lib/utils/encodeReport";
import type { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import { DEMO_OPTIONS } from "@/lib/data/demoData";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { Logo } from "@/components/shared/Logo";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileCheck,
  FileText,
  Loader2,
  Sparkles,
  AlertCircle,
  Check,
  Clock,
  Bot,
  X,
  ClipboardPaste,
} from "lucide-react";

// ─── Constants ───

const COUNTRIES = [
  "Pakistan", "UAE", "Saudi Arabia", "Egypt", "Jordan", "Morocco", "Tunisia",
  "Bahrain", "Kuwait", "Oman", "Qatar", "Other",
];

const STEPS = [
  { step: 0, agent: "Intake Agent", message: "Reading founder input..." },
  { step: 1, agent: "Intake Agent", message: "Extracting startup profile and key details..." },
  { step: 2, agent: "Regional Analyst", message: "Applying MENAP knowledge pack..." },
  { step: 3, agent: "Story & Market Reviewer", message: "Reviewing story and traction..." },
  { step: 4, agent: "Investor Simulator", message: "Generating investor objections..." },
  { step: 5, agent: "Memo Writer", message: "Building shareable report..." },
] as const;

const AGENT_COLORS: Record<string, string> = {
  "Intake Agent": "from-orange-500 to-amber-500",
  "Regional Analyst": "from-amber-500 to-yellow-500",
  "Story & Market Reviewer": "from-emerald-500 to-teal-500",
  "Investor Simulator": "from-red-500 to-orange-500",
  "Memo Writer": "from-orange-500 to-yellow-500",
  "System": "from-gray-500 to-gray-400",
};

const EXTRACT_FIELDS = [
  { key: "sector", label: "Sector" },
  { key: "stage", label: "Stage" },
  { key: "oneLinePitch", label: "One-Line Pitch" },
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "targetCustomer", label: "Target Customer" },
  { key: "businessModel", label: "Business Model" },
  { key: "traction", label: "Traction" },
  { key: "fundingAsk", label: "Funding Ask" },
] as const;

type ExtractFieldKey = (typeof EXTRACT_FIELDS)[number]["key"];

interface StepEntry {
  step: number;
  message: string;
  agent: string;
  timestamp: string;
  insight?: string;
}

// ─── Heuristic Extraction ───

function heuristicExtract(raw: string): Record<ExtractFieldKey, string | null> {
  const text = raw.toLowerCase();
  const find = (re: RegExp) => raw.match(re)?.[0]?.trim() ?? null;
  return {
    sector: /fintech|health|edtech|saas|ai|logistics|retail|agritech|cleantech|proptech/i.exec(text)?.[0] ?? null,
    stage: /pre[- ]?seed|seed|series\s?[abc]|bootstrapped/i.exec(text)?.[0] ?? null,
    oneLinePitch: raw.split(/\n|\./).map(s => s.trim()).find(s => s.length > 20 && s.length < 160) ?? null,
    problem: find(/(problem[:\s][^\n.]{20,200})/i),
    solution: find(/(solution[:\s][^\n.]{20,200})/i),
    targetCustomer: find(/(customers?|users?|target)[:\s][^\n.]{10,160}/i),
    businessModel: find(/(business model|revenue model|monetiz|pricing)[:\s][^\n.]{10,200}/i),
    traction: find(/(\d[\d,]*\+?\s*(users|signups|waitlist|customers|merchants|loi|mrr|arr|downloads))/i),
    fundingAsk: find(/(\$\s?\d[\d,.]*\s?(k|m|million|thousand)?\s*(pre[- ]?seed|seed|round)?)/i),
  };
}

// ─── PDF Renderer ───

async function renderPdfToImages(file: File): Promise<string[]> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  const images: string[] = [];
  for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport,
      canvas,
    } as unknown as Parameters<typeof page.render>[0]).promise;
    images.push(canvas.toDataURL("image/jpeg", 0.8));
  }
  return images;
}

// ─── Helpers ───

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Stepper Component ───

function Stepper({ current }: { current: number }) {
  const labels = ["Input", "Extracted", "Analyzing"];
  return (
    <div className="flex items-center justify-center gap-0">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                i < current
                  ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md"
                  : i === current
                  ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white ring-4 ring-orange-100 shadow-lg"
                  : "bg-gray-100 text-gray-400 border border-gray-200"
              }`}
            >
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium ${i <= current ? "text-gray-900" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < labels.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mx-2 mt-[-18px] rounded-full transition-all duration-500 ${
                i < current ? "bg-gradient-to-r from-orange-500 to-amber-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Agent Stage Card ───

function AgentStageCard({
  stepInfo,
  status,
  insight,
}: {
  stepInfo: (typeof STEPS)[number];
  status: "pending" | "active" | "done";
  insight?: string;
}) {
  const gradient = AGENT_COLORS[stepInfo.agent] || "from-orange-500 to-amber-500";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className={`rounded-xl border p-4 transition-all duration-300 ${
        status === "active"
          ? "border-orange-200 bg-orange-50/50 shadow-sm"
          : status === "done"
          ? "border-green-200 bg-green-50/30"
          : "border-gray-200 bg-gray-50/50 opacity-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            status === "active"
              ? `bg-gradient-to-br ${gradient}`
              : status === "done"
              ? "bg-gradient-to-br from-green-500 to-emerald-500"
              : "bg-gray-200"
          }`}
        >
          {status === "active" ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : status === "done" ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{stepInfo.agent}</p>
            {status === "active" && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">
                Running
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{stepInfo.message}</p>
          {insight && (
            <p className="text-sm text-orange-500/80 mt-1">{insight}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ───

export default function EvaluatePage() {
  const router = useRouter();

  // Flow state
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0);

  // Step 1: Input
  const [inputMode, setInputMode] = useState<"paste" | "upload">("paste");
  const [pitchText, setPitchText] = useState("");
  const [startupName, setStartupName] = useState("");
  const [country, setCountry] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<string>("paybridge");
  const [isExtractingPdf, setIsExtractingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 2: Extracted fields
  const [extractedFields, setExtractedFields] = useState<Record<ExtractFieldKey, string | null>>(
    () => ({
      sector: null, stage: null, oneLinePitch: null, problem: null,
      solution: null, targetCustomer: null, businessModel: null,
      traction: null, fundingAsk: null,
    })
  );

  // Step 3: Analyzing
  const [stepEntries, setStepEntries] = useState<StepEntry[]>([]);
  const [stepInsights, setStepInsights] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  // General
  const [error, setError] = useState<string | null>(null);

  // Elapsed timer
  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => setElapsed(Date.now() - startTime), 1000);
    return () => clearInterval(interval);
  }, [isAnalyzing, startTime]);

  // ─── Handlers ───

  function handleAutofill() {
    const demo = DEMO_OPTIONS.find((d) => d.key === selectedDemo);
    if (demo) {
      setStartupName(demo.data.startupName);
      setCountry(demo.data.country);
      setPitchText(demo.data.pitchText);
      setError(null);
    }
  }

  async function handlePdfFile(file: File) {
    if (file.size > 10 * 1024 * 1024) {
      setPdfError("PDF must be under 10MB.");
      return;
    }
    if (file.type !== "application/pdf") {
      setPdfError("Please select a PDF file.");
      return;
    }
    setIsExtractingPdf(true);
    setPdfError(null);
    setPdfFileName(file.name);
    try {
      const images = await renderPdfToImages(file);
      const response = await fetch("/api/extract-ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "OCR extraction failed");
      }
      const data = await response.json();
      setPitchText(data.text);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not extract PDF text.";
      setPdfError(message);
    } finally {
      setIsExtractingPdf(false);
    }
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handlePdfFile(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handlePdfFile(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function goToExtracted() {
    if (pitchText.trim().length < 20) {
      setError("Pitch text must be at least 20 characters.");
      return;
    }
    if (!startupName.trim()) {
      setError("Startup name is required.");
      return;
    }
    if (!country) {
      setError("Please select a country.");
      return;
    }
    setError(null);
    const extracted = heuristicExtract(pitchText);
    setExtractedFields(extracted);
    setCurrentStep(1);
  }

  function updateExtractedField(key: ExtractFieldKey, value: string) {
    setExtractedFields((prev) => ({ ...prev, [key]: value }));
  }

  async function startAnalysis() {
    setCurrentStep(2);
    setIsAnalyzing(true);
    setStepEntries([]);
    setStepInsights({});
    setStartTime(Date.now());
    setElapsed(0);
    setError(null);

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const response = await fetch("/api/evaluate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupName,
          country,
          pitchText,
          ...Object.fromEntries(
            Object.entries(extractedFields).filter(([, v]) => v)
          ),
        }),
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error("Evaluation failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let report: EvaluationReport | null = null;
      let currentEvent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("event: ")) {
            currentEvent = line.slice(7).trim();
          } else if (line.startsWith("data: ")) {
            const payload = line.slice(6);
            try {
              const parsed = JSON.parse(payload);
              if (currentEvent === "step" && parsed.step !== undefined && parsed.message) {
                setStepEntries((prev) => [...prev, parsed as StepEntry]);
                if (parsed.insight) {
                  setStepInsights((prev) => ({ ...prev, [parsed.step]: parsed.insight }));
                }
              }
              if (currentEvent === "result" && parsed.report) {
                report = parsed.report as EvaluationReport;
              }
            } catch {
              // skip unparseable lines
            }
            currentEvent = "";
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
      // Try non-streaming fallback
      try {
        const fallbackResponse = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ startupName, country, pitchText }),
        });
        if (!fallbackResponse.ok) throw new Error("Fallback failed");
        const fallbackReport: EvaluationReport = await fallbackResponse.json();
        const encoded = encodeReport(fallbackReport);
        router.push(`/report?data=${encoded}`);
      } catch {
        setIsAnalyzing(false);
        setCurrentStep(1);
        setError("Something went wrong. Please try again.");
      }
    }
  }

  function cancelAnalysis() {
    abortRef.current?.abort();
    setIsAnalyzing(false);
    setStepEntries([]);
    setStepInsights({});
    setCurrentStep(1);
  }

  // ─── Step renderers ───

  const filledCount = EXTRACT_FIELDS.filter((f) => extractedFields[f.key]).length;

  function renderStep1() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="space-y-6"
      >
        {/* Autofill bar */}
        <div className="flex items-center gap-3 justify-end">
          <select
            value={selectedDemo}
            onChange={(e) => setSelectedDemo(e.target.value)}
            className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500 focus:border-orange-400 focus:outline-none cursor-pointer"
          >
            {DEMO_OPTIONS.map((d) => (
              <option key={d.key} value={d.key}>{d.label}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAutofill}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Autofill Demo
          </button>
        </div>

        {/* Error */}
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
          {/* Startup name + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm text-gray-500">
                Startup Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                value={startupName}
                onChange={(e) => { setStartupName(e.target.value); if (error) setError(null); }}
                placeholder="e.g. PayBridge"
                className="flex h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm transition-colors outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-gray-500">
                Country <span className="text-orange-500">*</span>
              </label>
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); if (error) setError(null); }}
                className="flex h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm transition-colors outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 cursor-pointer"
              >
                <option value="" disabled>Select country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Input mode toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 w-fit">
            <button
              type="button"
              onClick={() => setInputMode("paste")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                inputMode === "paste"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ClipboardPaste className="w-3.5 h-3.5" />
              Paste Text
            </button>
            <button
              type="button"
              onClick={() => setInputMode("upload")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                inputMode === "upload"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload PDF
            </button>
          </div>

          {/* PDF upload area */}
          {inputMode === "upload" && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !isExtractingPdf && fileInputRef.current?.click()}
              className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                isExtractingPdf
                  ? "border-orange-200 bg-orange-50"
                  : pdfFileName && pitchText
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-white"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
              {isExtractingPdf ? (
                <div className="space-y-2">
                  <Loader2 className="w-6 h-6 text-orange-500 mx-auto animate-spin" />
                  <p className="text-sm text-gray-500">Reading PDF with AI vision...</p>
                </div>
              ) : pdfFileName && pitchText ? (
                <div className="space-y-1">
                  <FileCheck className="w-6 h-6 text-green-600 mx-auto" />
                  <p className="text-sm text-green-600">{pdfFileName}</p>
                  <p className="text-sm text-gray-400">Click or drop another PDF to replace</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-500">Upload a pitch deck PDF</p>
                  <p className="text-sm text-gray-400">AI vision will read your slides</p>
                </div>
              )}
            </div>
          )}
          {pdfError && <p className="text-sm text-red-500">{pdfError}</p>}

          {/* Pitch text area */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Pitch Text <span className="text-orange-500">*</span>
            </label>
            <textarea
              value={pitchText}
              onChange={(e) => { setPitchText(e.target.value); if (error) setError(null); }}
              placeholder="Paste your full pitch text here... Include your problem, solution, target market, business model, traction, team, and funding ask."
              rows={12}
              className="flex min-h-[200px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm transition-colors outline-none placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-y"
            />
            <p className={`text-sm ${pitchText.length < 20 ? "text-amber-500" : "text-gray-400"}`}>
              {pitchText.length} characters (minimum 20)
            </p>
          </div>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={goToExtracted}
          disabled={isExtractingPdf}
          className="group relative w-full flex items-center justify-center gap-2 h-14 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">Extract &amp; Preview</span>
          <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </motion.div>
    );
  }

  function renderStep2() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="space-y-6"
      >
        {/* Summary bar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Extracted Fields</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {filledCount} of {EXTRACT_FIELDS.length} fields detected. Edit any field before analysis.
            </p>
          </div>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
            filledCount >= 7
              ? "bg-green-100 text-green-600"
              : filledCount >= 4
              ? "bg-amber-100 text-amber-600"
              : "bg-red-100 text-red-600"
          }`}>
            {filledCount}/{EXTRACT_FIELDS.length}
          </span>
        </div>

        {/* Extracted fields grid */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXTRACT_FIELDS.map((field) => {
              const value = extractedFields[field.key];
              return (
                <div key={field.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-600">{field.label}</label>
                    {!value && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
                        Missing
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => updateExtractedField(field.key, e.target.value)}
                    placeholder={value ? "" : "Not detected — type to add..."}
                    className={`flex h-9 w-full rounded-lg border px-3 py-1 text-sm transition-colors outline-none placeholder:text-gray-400 focus:ring-2 ${
                      value
                        ? "border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-orange-100"
                        : "border-dashed border-gray-300 bg-white focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Raw text preview */}
        <details className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
          <summary className="px-5 py-3 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            View raw pitch text
          </summary>
          <div className="px-5 pb-4">
            <pre className="text-sm text-gray-500 whitespace-pre-wrap break-words max-h-[200px] overflow-y-auto leading-relaxed">
              {pitchText}
            </pre>
          </div>
        </details>

        {/* Gradient CTA card */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500" />
          <div className="relative p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Ready to analyze?</h3>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Our 6-agent AI pipeline will review your pitch from a MENAP investor perspective and generate specific objections and fixes.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="w-3.5 h-3.5" />
              <span>Takes about 15-30 seconds</span>
            </div>
          </div>
        </div>

        {/* Error */}
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

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { setCurrentStep(0); setError(null); }}
            className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="button"
            onClick={startAnalysis}
            className="group relative flex-1 flex items-center justify-center gap-2 h-14 rounded-xl text-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Run Investor Review</span>
            <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    );
  }

  function renderStep3() {
    const completedCount = stepEntries.filter((e) => e.step >= 0).length;
    const progress = Math.min((completedCount / 6) * 100, 100);
    const isComplete = completedCount >= 6;

    // Determine which steps are visible (show all once analysis starts)
    const visibleSteps = STEPS;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-900">
              {isComplete ? "Analysis Complete" : "Analyzing your pitch..."}
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Our AI agents are reviewing your startup from a MENAP investor perspective.
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isComplete ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
              )}
              <span className="text-sm font-medium text-gray-600">
                {isComplete ? "Redirecting to report..." : "Processing..."}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 tabular-nums font-medium">
                {Math.round(progress)}%
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="w-3 h-3" />
                <span className="tabular-nums">{formatTime(elapsed)}</span>
              </div>
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease }}
            />
          </div>
        </div>

        {/* Agent stage cards */}
        <div className="grid gap-3">
          {visibleSteps.map((stepInfo) => {
            const matchingEntries = stepEntries.filter((e) => e.step === stepInfo.step);
            const isActive = matchingEntries.length > 0 && !isComplete && stepEntries[stepEntries.length - 1]?.step === stepInfo.step;
            const isDone = matchingEntries.length > 0 && (!isActive || isComplete);
            // Find if any earlier entry is active
            const latestEntry = stepEntries[stepEntries.length - 1];
            const isCurrentlyActive = latestEntry?.step === stepInfo.step && !isComplete;

            const status: "pending" | "active" | "done" = isCurrentlyActive
              ? "active"
              : matchingEntries.length > 0
              ? "done"
              : "pending";

            const insight = stepInsights[stepInfo.step];

            return (
              <AgentStageCard
                key={stepInfo.step}
                stepInfo={stepInfo}
                status={status}
                insight={insight}
              />
            );
          })}
        </div>

        {/* Log entries */}
        {stepEntries.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 max-h-[200px] overflow-y-auto">
            <div className="p-4 space-y-0">
              <AnimatePresence initial={false}>
                {stepEntries.map((entry, i) => (
                  <motion.div
                    key={`${entry.step}-${i}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-start gap-3 py-2.5 ${
                      i < stepEntries.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600">{entry.message}</p>
                      {entry.insight && (
                        <p className="text-sm text-orange-500/70 mt-0.5">{entry.insight}</p>
                      )}
                      <div className="flex items-center gap-3 mt-0.5">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Bot className="w-2.5 h-2.5" />
                          <span>{entry.agent}</span>
                        </div>
                        <span className="text-xs text-gray-400 tabular-nums">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Cancel button */}
        {!isComplete && (
          <button
            type="button"
            onClick={cancelAnalysis}
            className="flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer mx-auto"
          >
            <X className="w-3.5 h-3.5" />
            Cancel analysis
          </button>
        )}
      </motion.div>
    );
  }

  // ─── Render ───

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden bg-white">
      {/* Ambient orbs */}
      <GradientOrb color="rgba(251, 146, 60, 0.06)" size={500} className="top-[-100px] right-[-150px]" />
      <GradientOrb color="rgba(245, 158, 11, 0.04)" size={400} className="bottom-[-100px] left-[-100px]" />

      {/* Nav */}
      <nav className="relative z-10 border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <Logo />
          </Link>
          {!isAnalyzing && (
            <span className="text-sm text-gray-400">
              Free &middot; No signup
            </span>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 w-full px-6 py-8 pb-20">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          {!isAnalyzing && (
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Evaluate Your Pitch
              </h1>
              <p className="text-gray-400 text-base max-w-xl mx-auto">
                {currentStep === 0
                  ? "Paste your pitch or upload a PDF. Our AI extracts the details."
                  : "Review the extracted fields below, then run the investor analysis."}
              </p>
            </div>
          )}

          {/* Stepper */}
          <Stepper current={currentStep} />

          {/* Step content */}
          {currentStep === 0 && renderStep1()}
          {currentStep === 1 && renderStep2()}
          {currentStep === 2 && renderStep3()}
        </div>
      </main>
    </div>
  );
}
