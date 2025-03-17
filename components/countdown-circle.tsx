"use client";

export default function CountdownCircle({
  countdown,
  total,
}: {
  countdown: number;
  total: number;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - countdown / total);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-28 h-28" viewBox="0 0 100 100">
        {/* Background circle with gradient */}
        <defs>
          <linearGradient
            id="circleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          className="text-muted-foreground/10"
          strokeWidth="8"
          stroke="url(#circleGradient)"
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
            <stop offset="0%" stopColor="hsl(221.2, 83.2%, 53.3%)" />
            <stop offset="100%" stopColor="hsl(271.2, 91.2%, 65.8%)" />
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
      <span className="absolute text-2xl font-bold">{countdown}</span>
    </div>
  );
}
