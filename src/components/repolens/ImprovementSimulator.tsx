import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Improvement {
  label: string;
  points: number;
}

const improvements: Improvement[] = [
  { label: "Add profile README", points: 6 },
  { label: "Add deployment links", points: 4 },
  { label: "Add screenshots to READMEs", points: 5 },
  { label: "Improve documentation quality", points: 7 },
  { label: "Add consistent commits (30 days)", points: 4 },
  { label: "Set up CI/CD pipelines", points: 3 },
  { label: "Add test coverage", points: 5 },
  { label: "Clean unused repositories", points: 2 },
];

interface ImprovementSimulatorProps {
  baseScore: number;
}

const ImprovementSimulator = ({ baseScore }: ImprovementSimulatorProps) => {
  const [toggled, setToggled] = useState<Set<number>>(new Set());

  const newScore = useMemo(() => {
    const bonus = Array.from(toggled).reduce((sum, i) => sum + improvements[i].points, 0);
    return Math.min(100, baseScore + bonus);
  }, [toggled, baseScore]);

  const toggle = (index: number) => {
    setToggled((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-foreground">Improvement Simulator</h3>
        <p className="text-sm text-muted-foreground mt-1">Toggle improvements to see your projected score</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-3">
          {improvements.map((imp, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 text-left ${
                toggled.has(i)
                  ? "bg-primary/10 border-primary/40"
                  : "bg-card border-border hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  toggled.has(i) ? "bg-primary border-primary" : "border-muted-foreground/40"
                }`}>
                  {toggled.has(i) && (
                    <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-foreground/90">{imp.label}</span>
              </div>
              <span className={`text-xs font-heading font-bold ${toggled.has(i) ? "text-primary" : "text-muted-foreground"}`}>
                +{imp.points}
              </span>
            </button>
          ))}
        </div>

        <div className="lg:w-48 flex flex-col items-center justify-center">
          <div className="glass-card p-8 text-center w-full">
            <span className="label-uppercase">New Score</span>
            <motion.p
              key={newScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-5xl font-heading font-bold mt-3 ${
                newScore >= 80 ? "text-success" : newScore >= 60 ? "text-primary" : "text-warning"
              }`}
            >
              {newScore}
            </motion.p>
            <p className="text-xs text-muted-foreground mt-2">
              {newScore > baseScore ? `+${newScore - baseScore} points` : "Select improvements"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSimulator;
