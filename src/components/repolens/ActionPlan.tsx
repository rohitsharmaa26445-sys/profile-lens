import { motion } from "framer-motion";
import type { ActionStep } from "@/lib/mockData";

interface ActionPlanProps {
  steps: ActionStep[];
  currentScore: number;
}

const ActionPlan = ({ steps, currentScore }: ActionPlanProps) => {
  const projectedScore = Math.min(100, currentScore + steps.reduce((sum, s) => sum + s.impact, 0));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-bold text-foreground">Your 7-Day GitHub Upgrade Plan</h3>
          <p className="text-sm text-muted-foreground mt-1">Follow these steps to boost your score</p>
        </div>
        <div className="glass-card px-4 py-2 text-center">
          <span className="label-uppercase">Projected Score</span>
          <p className="text-2xl font-heading font-bold text-success mt-1">{projectedScore}</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 group"
            >
              <div className="relative z-10 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors">
                <span className="text-xs font-heading font-bold text-muted-foreground group-hover:text-primary transition-colors">
                  D{step.day}
                </span>
              </div>
              <div className="glass-card p-4 flex-1 group-hover:border-primary/30 transition-colors">
                <p className="text-sm text-foreground/90">{step.task}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="label-uppercase">Impact</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <div
                        key={j}
                        className={`w-2 h-2 rounded-full ${
                          j < step.impact ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
