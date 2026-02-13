import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (url.trim()) {
      const username = url.trim().replace(/https?:\/\/github\.com\/?/, "").replace(/\/$/, "").split("/")[0];
      navigate(`/report?user=${encodeURIComponent(username || "demo")}`);
    } else {
      navigate("/report?user=demo");
    }
  };

  return (
    <div className="min-h-screen bg-background mesh-gradient flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-heading font-bold text-sm">R</span>
          </div>
          <span className="font-heading font-bold text-foreground">RepoLens</span>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="max-w-2xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6"
          >
            Turn Your GitHub Into{" "}
            <span className="text-gradient-primary">Recruiter-Ready Proof.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto"
          >
            See your profile the way hiring managers do — strengths, red flags, and clear next steps.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto mb-4"
          >
            <div className="flex-1 relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="https://github.com/yourusername"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
            <Button variant="glow" size="xl" onClick={handleAnalyze}>
              Analyze Profile
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-muted-foreground"
          >
            No login required. Public data only.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex items-center justify-center gap-8 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              Used by 1,200+ developers
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Avg. score improvement: +23 points
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
