"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EvaluationReport } from "@/lib/schemas/evaluationReport.schema";
import { buildMarkdownReport } from "@/lib/utils/markdownReport";
import { Copy, Download, Link2, Check, ArrowRight } from "lucide-react";

interface ReportActionsProps {
  report: EvaluationReport;
}

function ActionButton({
  onClick,
  label,
  icon: Icon,
  done,
}: {
  onClick: () => void;
  label: string;
  icon: React.ElementType;
  done?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-white/60 hover:text-white/80 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
    >
      {done ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Icon className="w-3.5 h-3.5" />}
      {done ? "Copied!" : label}
    </button>
  );
}

export default function ReportActions({ report }: ReportActionsProps) {
  const [copiedReport, setCopiedReport] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const shouldReduce = useReducedMotion();

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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: shouldReduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center justify-center gap-3 pt-8 border-t border-white/[0.06]"
    >
      <ActionButton onClick={handleCopyReport} label="Copy Report" icon={Copy} done={copiedReport} />
      <ActionButton onClick={handleDownload} label="Download Markdown" icon={Download} />
      <ActionButton onClick={handleShareLink} label="Share Link" icon={Link2} done={copiedLink} />
      <Link href="/evaluate">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-sm text-white font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer">
          New Analysis
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Link>
    </motion.div>
  );
}
