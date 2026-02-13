import { motion } from "framer-motion";

interface CircularScoreProps {
  score: number;
  size?: number;
  label?: string;
}

const CircularScore = ({ score, size = 200, label = "GitHub Portfolio Score" }: CircularScoreProps) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return "hsl(var(--success))";
    if (score >= 60) return "hsl(var(--primary))";
    if (score >= 40) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getGlowClass = () => {
    if (score >= 80) return "glow-success";
    if (score >= 60) return "glow-primary";
    if (score >= 40) return "glow-warning";
    return "glow-destructive";
  };

  return (
    <div className={`relative inline-flex flex-col items-center ${getGlowClass()} rounded-full`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
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
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-heading font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground font-medium mt-1">/ 100</span>
      </div>
      <p className="label-uppercase mt-4">{label}</p>
    </div>
  );
};

export default CircularScore;
