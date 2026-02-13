import { motion } from "framer-motion";
import type { RecruiterView } from "@/lib/mockData";
import CircularScore from "./CircularScore";

interface RecruiterPanelProps {
  data: RecruiterView;
}

const RecruiterPanel = ({ data }: RecruiterPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* First Impression */}
      <div className="glass-card p-6">
        <h3 className="label-uppercase mb-3">First Impression — 10-Second Scan</h3>
        <p className="text-sm text-foreground/90 leading-relaxed">{data.firstImpression}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="glass-card p-6">
          <h3 className="label-uppercase mb-4 text-success">Strengths</h3>
          <ul className="space-y-3">
            {data.strengths.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="text-success mt-0.5 shrink-0">+</span>
                {s}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Red Flags */}
        <div className="glass-card p-6">
          <h3 className="label-uppercase mb-4 text-destructive">Red Flags</h3>
          <ul className="space-y-3">
            {data.redFlags.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="text-destructive mt-0.5 shrink-0">!</span>
                {f}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interview Questions */}
      <div className="glass-card p-6">
        <h3 className="label-uppercase mb-4">What I Would Ask In Interview</h3>
        <div className="space-y-3">
          {data.interviewQuestions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-sm text-foreground/80"
            >
              <span className="text-primary font-heading font-semibold shrink-0">Q{i + 1}</span>
              <span>{q}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hiring Confidence */}
      <div className="flex flex-col items-center py-6">
        <CircularScore score={data.hiringConfidence} size={140} label="Hiring Confidence" />
      </div>
    </motion.div>
  );
};

export default RecruiterPanel;
