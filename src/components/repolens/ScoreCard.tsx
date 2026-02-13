import { motion } from "framer-motion";
import type { CategoryScore } from "@/lib/mockData";

interface ScoreCardProps {
  category: CategoryScore;
  index: number;
}

const ScoreCard = ({ category, index }: ScoreCardProps) => {
  const statusColor = {
    strong: "bg-success/20 text-success border-success/30",
    moderate: "bg-warning/20 text-warning border-warning/30",
    weak: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const barColor = {
    strong: "bg-success",
    moderate: "bg-warning",
    weak: "bg-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card p-5 group hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{category.icon}</span>
          <h3 className="text-sm font-heading font-semibold text-foreground">{category.name}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[category.status]}`}>
          {category.score}
        </span>
      </div>
      
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-3">
        <motion.div
          className={`h-full rounded-full ${barColor[category.status]}`}
          initial={{ width: 0 }}
          animate={{ width: `${category.score}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{category.summary}</p>
    </motion.div>
  );
};

export default ScoreCard;
