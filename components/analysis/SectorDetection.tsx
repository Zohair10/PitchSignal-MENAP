"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

function useTypewriter(text: string, speed = 50) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

interface SectorDetectionProps {
  sector: string;
  insight?: string;
}

export function SectorDetection({ sector, insight }: SectorDetectionProps) {
  const typedSector = useTypewriter(sector, 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: [0.97, 1.02, 1] }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white shadow-elegant"
    >
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5" />
        <span className="font-semibold text-sm uppercase tracking-wide">Sector Detected</span>
      </div>
      <p className="text-2xl font-bold mt-1">{typedSector}<span className="animate-blink-cursor">&nbsp;</span></p>
      {insight && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-sm text-white/80 mt-1"
        >
          {insight}
        </motion.p>
      )}
    </motion.div>
  );
}
