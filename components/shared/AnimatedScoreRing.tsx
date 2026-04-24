"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export function AnimatedScoreRing({
  score,
  size = 120,
  strokeWidth = 6,
  label,
  color,
}: AnimatedScoreRingProps) {
  const shouldReduce = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    if (score >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: shouldReduce ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3,
          }}
          style={{
            filter: `drop-shadow(0 0 6px ${getColor()}40)`,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          className={`${size >= 120 ? "text-3xl" : "text-xl"} font-bold text-white`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduce ? 0 : 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {score}
        </motion.span>
        {label && (
          <span className={`${size >= 120 ? "text-xs" : "text-[10px]"} font-medium tracking-wider text-white/50 uppercase text-center leading-tight mt-0.5 px-1`}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
