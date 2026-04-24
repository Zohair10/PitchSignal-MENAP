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
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold">Improved Pitch</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
        className="rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-px"
      >
        <div className="rounded-[15px] bg-[#0c1022] p-6">
          <p className="mb-2 text-xs font-medium tracking-widest text-purple-400/70 uppercase">
            One-Liner
          </p>
          <p className="text-lg md:text-xl font-semibold leading-relaxed text-white">
            &ldquo;{pitch.oneLiner}&rdquo;
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.1, ease }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6"
      >
        <p className="mb-2 text-xs font-medium tracking-widest text-white/30 uppercase">
          Elevator Pitch
        </p>
        <p className="text-base leading-relaxed text-white/70">{pitch.elevatorPitch}</p>
      </motion.div>
    </section>
  );
}
