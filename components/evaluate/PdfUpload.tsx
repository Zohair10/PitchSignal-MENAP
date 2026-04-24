"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface PdfUploadProps {
  onTextExtracted: (text: string) => void;
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
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Extraction failed");
      }

      const data = await response.json();
      onTextExtracted(data.text);
    } catch {
      setError("Could not extract PDF text. Please paste your pitch text.");
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${
            fileName
              ? "border-green-500/30 bg-green-500/5"
              : "border-white/10 hover:border-white/20 bg-white/[0.02]"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-2">
            <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-gray-400">Extracting text from PDF...</p>
          </div>
        ) : fileName ? (
          <div className="space-y-1">
            <svg
              className="w-8 h-8 text-green-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm text-green-400">{fileName}</p>
            <p className="text-xs text-gray-500">
              Click or drop another PDF to replace
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <svg
              className="w-8 h-8 text-gray-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-400">
              Upload a pitch deck PDF
            </p>
            <p className="text-xs text-gray-500">
              Drag and drop or click to browse
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
