"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ImprovedPitchProps {
  pitch: {
    oneLiner: string;
    elevatorPitch: string;
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ImprovedPitch({ pitch }: ImprovedPitchProps) {
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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 border border-amber-200">
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Improved Pitch</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-300 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
        className="rounded-2xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 p-px"
      >
        <div className="rounded-[15px] bg-white p-6">
          <p className="mb-2 text-sm font-medium tracking-widest text-orange-500 uppercase">
            One-Liner
          </p>
          <p className="text-lg md:text-xl font-semibold leading-relaxed text-gray-900">
            &ldquo;{pitch.oneLiner}&rdquo;
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.1, ease }}
        className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
      >
        <p className="mb-2 text-sm font-medium tracking-widest text-gray-400 uppercase">
          Elevator Pitch
        </p>
        <p className="text-base leading-relaxed text-gray-600">{pitch.elevatorPitch}</p>
      </motion.div>
    </section>
  );
}
