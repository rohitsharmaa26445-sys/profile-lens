import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, ChevronDown } from "lucide-react";
import type { RepoData } from "@/lib/mockData";

interface RepoCardProps {
  repo: RepoData;
  index: number;
}

const RepoCard = ({ repo, index }: RepoCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="text-sm font-heading font-semibold text-foreground truncate">{repo.name}</h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
              {repo.language}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{repo.description}</p>
        </div>

        <div className="flex items-center gap-4 ml-4 shrink-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3" />
            {repo.stars}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {repo.lastUpdated}
          </div>
          <span className={`text-lg font-heading font-bold ${getScoreColor(repo.score)}`}>
            {repo.score}
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border/50 pt-4">
              <h5 className="label-uppercase mb-3">Issues Detected</h5>
              <div className="space-y-2">
                {repo.issues.map((issue, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                    <span className="text-foreground/80">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RepoCard;
