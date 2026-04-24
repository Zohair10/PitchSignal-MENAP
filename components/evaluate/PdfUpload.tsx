"use client";

import { useState, useRef } from "react";
import { Upload, FileCheck, Loader2 } from "lucide-react";

interface PdfUploadProps {
  onTextExtracted: (text: string) => void;
}

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
    await page.render({ canvasContext: ctx as unknown as CanvasRenderingContext2D, viewport, canvas } as unknown as Parameters<typeof page.render>[0]).promise;
    images.push(canvas.toDataURL("image/jpeg", 0.8));
  }

  return images;
}

export function PdfUpload({ onTextExtracted }: PdfUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(file: File) {
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }
    setIsUploading(true);
    setError(null);
    setFileName(file.name);

    try {
      // Step 1: Render PDF pages to images in the browser
      const images = await renderPdfToImages(file);

      // Step 2: Send images to OCR endpoint
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
      onTextExtracted(data.text);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not extract PDF text.";
      setError(message);
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isUploading
            ? "border-purple-500/20 bg-purple-500/[0.03]"
            : fileName
            ? "border-green-500/20 bg-green-500/[0.03]"
            : "border-white/[0.08] hover:border-white/[0.15] bg-white/[0.01] hover:bg-white/[0.03]"
        }`}
      >
        <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleInputChange} className="hidden" />
        {isUploading ? (
          <div className="space-y-2">
            <Loader2 className="w-6 h-6 text-purple-400 mx-auto animate-spin" />
            <p className="text-sm text-white/50">Reading PDF with AI vision...</p>
            <p className="text-xs text-white/25">Rendering pages and extracting text via OCR</p>
          </div>
        ) : fileName ? (
          <div className="space-y-1">
            <FileCheck className="w-6 h-6 text-green-400 mx-auto" />
            <p className="text-sm text-green-400">{fileName}</p>
            <p className="text-xs text-white/30">Click or drop another PDF to replace</p>
          </div>
        ) : (
          <div className="space-y-1">
            <Upload className="w-6 h-6 text-white/30 mx-auto" />
            <p className="text-sm text-white/50">Upload a pitch deck PDF</p>
            <p className="text-xs text-white/25">AI vision will read your slides — even image-based decks</p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
