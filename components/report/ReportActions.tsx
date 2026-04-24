"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import { buildMarkdownReport } from "@/lib/utils/markdownReport";

interface ReportActionsProps {
  report: EvaluationReport;
}

export default function ReportActions({ report }: ReportActionsProps) {
  const [copiedReport, setCopiedReport] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  function showFeedback(setter: (v: boolean) => void) {
    setter(true);
    setTimeout(() => setter(false), 2000);
  }

  function handleCopyReport() {
    const markdown = buildMarkdownReport(report);
    navigator.clipboard.writeText(markdown);
    showFeedback(setCopiedReport);
  }

  function handleDownload() {
    const markdown = buildMarkdownReport(report);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.startupName.replace(/\s+/g, "-")}-PitchSignal-Report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleShareLink() {
    navigator.clipboard.writeText(window.location.href);
    showFeedback(setCopiedLink);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
      <Button
        onClick={handleCopyReport}
        variant="outline"
        className="border-white/10 bg-white/5 hover:bg-white/10"
      >
        {copiedReport ? "Copied!" : "Copy Report"}
      </Button>

      <Button
        onClick={handleDownload}
        variant="outline"
        className="border-white/10 bg-white/5 hover:bg-white/10"
      >
        Download Markdown
      </Button>

      <Button
        onClick={handleShareLink}
        variant="outline"
        className="border-white/10 bg-white/5 hover:bg-white/10"
      >
        {copiedLink ? "Link Copied!" : "Share Link"}
      </Button>
    </div>
  );
}
