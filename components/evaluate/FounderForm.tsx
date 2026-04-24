"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { LoadingSteps } from "@/components/evaluate/LoadingSteps";
import { PAYBRIDGE_DEMO_DATA } from "@/lib/data/demoData";
import { encodeReport } from "@/lib/utils/encodeReport";
import type { FounderInput } from "@/lib/schemas/founderInput.schema";
import type { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";

const COUNTRIES = [
  "Pakistan",
  "UAE",
  "Saudi Arabia",
  "Egypt",
  "Jordan",
  "Morocco",
  "Tunisia",
  "Bahrain",
  "Kuwait",
  "Oman",
  "Qatar",
  "Other",
];

const SECTORS = [
  "Fintech",
  "E-commerce",
  "SaaS",
  "Healthtech",
  "Edtech",
  "Logistics",
  "Agri-tech",
  "Clean Energy",
  "AI/ML",
  "Proptech",
  "D2C",
  "Other",
];

const STAGES = [
  "Ideation",
  "Pre-seed",
  "Seed",
  "Pre-Series A",
  "Series A",
  "Series B+",
];

const initialFormState: FounderInput = {
  startupName: "",
  country: "",
  sector: "",
  stage: "",
  oneLinePitch: "",
  problem: "",
  solution: "",
  targetCustomer: "",
  businessModel: "",
  traction: "",
  revenue: "",
  fundingAsk: "",
  useOfFunds: "",
  pitchText: "",
};

export function FounderForm() {
  const router = useRouter();
  const [form, setForm] = useState<FounderInput>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  function updateField(field: keyof FounderInput, value: string | null) {
    setForm((prev) => ({ ...prev, [field]: value ?? "" }));
  }

  function handleAutofill() {
    setForm(PAYBRIDGE_DEMO_DATA);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setLoadingStep(0);

    // Simulate step progression while waiting for API
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 5 ? prev + 1 : prev));
    }, 2500);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Evaluation failed");
      }

      const report: EvaluationReport = await response.json();
      clearInterval(stepInterval);
      setLoadingStep(5);

      // Small delay so user sees final step
      await new Promise((r) => setTimeout(r, 600));

      const encoded = encodeReport(report);
      router.push(`/report?data=${encoded}`);
    } catch {
      clearInterval(stepInterval);
      setIsLoading(false);
      setLoadingStep(0);
      alert("Something went wrong. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-2">
          Analyzing your pitch...
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          This usually takes 15-30 seconds.
        </p>
        <LoadingSteps currentStep={loadingStep} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Autofill button */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAutofill}
        >
          Autofill PayBridge Demo
        </Button>
      </div>

      {/* Core identity */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Startup Identity</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Startup Name *</label>
            <Input
              value={form.startupName}
              onChange={(e) => updateField("startupName", e.target.value)}
              placeholder="e.g. PayBridge"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Country *</label>
            <Select
              value={form.country}
              onValueChange={(val) => updateField("country", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Sector *</label>
            <Select
              value={form.sector}
              onValueChange={(val) => updateField("sector", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {SECTORS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Stage *</label>
            <Select
              value={form.stage}
              onValueChange={(val) => updateField("stage", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {STAGES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Pitch & Problem */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Pitch & Problem-Solution
        </h2>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-400">One-Line Pitch *</label>
          <Input
            value={form.oneLinePitch}
            onChange={(e) => updateField("oneLinePitch", e.target.value)}
            placeholder="Describe your startup in one sentence"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-400">Problem *</label>
          <Textarea
            value={form.problem}
            onChange={(e) => updateField("problem", e.target.value)}
            placeholder="What problem are you solving?"
            rows={3}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-400">Solution *</label>
          <Textarea
            value={form.solution}
            onChange={(e) => updateField("solution", e.target.value)}
            placeholder="How does your startup solve this problem?"
            rows={3}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-400">Target Customer *</label>
          <Input
            value={form.targetCustomer}
            onChange={(e) => updateField("targetCustomer", e.target.value)}
            placeholder="Who specifically will use/pay for this?"
            required
          />
        </div>
      </section>

      {/* Optional details */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Traction & Funding
          </h2>
          <p className="text-xs text-gray-500">Optional but recommended</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Business Model</label>
            <Input
              value={form.businessModel ?? ""}
              onChange={(e) => updateField("businessModel", e.target.value)}
              placeholder="How do you make money?"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Traction</label>
            <Input
              value={form.traction ?? ""}
              onChange={(e) => updateField("traction", e.target.value)}
              placeholder="Users, revenue, partnerships, etc."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Revenue</label>
            <Input
              value={form.revenue ?? ""}
              onChange={(e) => updateField("revenue", e.target.value)}
              placeholder="Current revenue status"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm text-gray-400">Funding Ask</label>
            <Input
              value={form.fundingAsk ?? ""}
              onChange={(e) => updateField("fundingAsk", e.target.value)}
              placeholder="How much are you raising?"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-gray-400">Use of Funds</label>
          <Input
            value={form.useOfFunds ?? ""}
            onChange={(e) => updateField("useOfFunds", e.target.value)}
            placeholder="How will you use the funding?"
          />
        </div>
      </section>

      {/* Pitch text */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Full Pitch Text *
        </h2>
        <p className="text-xs text-gray-500">
          Paste your full pitch or upload a PDF below. Minimum 20 characters.
        </p>

        <PdfUpload
          onTextExtracted={(text) => updateField("pitchText", text)}
        />

        <Textarea
          value={form.pitchText}
          onChange={(e) => updateField("pitchText", e.target.value)}
          placeholder="Paste your full pitch text here..."
          rows={8}
          required
          className="text-sm"
        />
      </section>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity text-base font-semibold h-12"
      >
        Generate Investor Objections
      </Button>
    </form>
  );
}
