"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ThumbsUp, ThumbsDown, FileText } from "lucide-react";

interface VcMemoProps {
  memo: {
    summary: string;
    whatWorks: string[];
    whatBreaksThePitch: string[];
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function VcMemo({ memo }: VcMemoProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 border border-orange-200">
          <FileText className="w-4 h-4 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">VC-Style Memo</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-orange-300 to-transparent" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduce ? 0 : 0.5 }}
        className="text-base leading-relaxed text-gray-600"
      >
        {memo.summary}
      </motion.p>

      <div className="grid gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
          className="rounded-2xl border border-green-200 bg-green-50 p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-green-600">
            <ThumbsUp className="w-4 h-4" />
            What Works
          </h3>
          <ul className="space-y-3">
            {memo.whatWorks.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/50" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
          className="rounded-2xl border border-red-200 bg-red-50 p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-red-500">
            <ThumbsDown className="w-4 h-4" />
            What Breaks the Pitch
          </h3>
          <ul className="space-y-3">
            {memo.whatBreaksThePitch.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/50" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
