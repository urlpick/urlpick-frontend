"use client";

import { memo } from "react";
import type { CountdownCircleProps } from "@/types";

const CountdownCircle = memo(function CountdownCircle({
  countdown,
  total,
}: CountdownCircleProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - countdown / total);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-28 h-28" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-primary/10"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />

        {/* Progress circle with gradient */}
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>

        {/* Progress circle */}
        <circle
          className="transition-all duration-1000 ease-linear"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="url(#progressGradient)"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
});

export default CountdownCircle;
