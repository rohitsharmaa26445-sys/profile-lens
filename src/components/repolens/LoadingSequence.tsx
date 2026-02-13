import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Fetching repositories",
  "Evaluating documentation quality",
  "Analyzing commit consistency",
  "Detecting technical depth",
  "Simulating recruiter review",
];

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence = ({ onComplete }: LoadingSequenceProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 2000;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const targetProgress = ((activeStep + 1) / steps.length) * 100;
    const timer = setTimeout(() => setProgress(targetProgress), 100);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <div className="fixed inset-0 bg-background mesh-gradient flex items-center justify-center z-50">
      <div className="w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Analyzing Profile
          </h2>
          <p className="text-muted-foreground text-sm">This takes about 10 seconds</p>
        </motion.div>

        <div className="space-y-4 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
                i < activeStep
                  ? "bg-success/20 border border-success"
                  : i === activeStep
                  ? "bg-primary/20 border border-primary animate-glow-pulse"
                  : "bg-muted border border-border"
              }`}>
                {i < activeStep && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-success"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
                {i === activeStep && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-sm transition-colors duration-300 ${
                i < activeStep
                  ? "text-success"
                  : i === activeStep
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSequence;
