"use client";

import { useState, useEffect } from "react";

export function AnimatedCounter({
  target,
  duration = 1.5,
  suffix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}
