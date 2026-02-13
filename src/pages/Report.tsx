import { useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import LoadingSequence from "@/components/repolens/LoadingSequence";
import CircularScore from "@/components/repolens/CircularScore";
import ScoreCard from "@/components/repolens/ScoreCard";
import RecruiterPanel from "@/components/repolens/RecruiterPanel";
import RepoCard from "@/components/repolens/RepoCard";
import ActionPlan from "@/components/repolens/ActionPlan";
import ImprovementSimulator from "@/components/repolens/ImprovementSimulator";
import { mockAnalysis } from "@/lib/mockData";

type Tab = "overview" | "recruiter" | "repos" | "plan" | "simulator";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "recruiter", label: "Recruiter View" },
  { id: "repos", label: "Repositories" },
  { id: "plan", label: "Action Plan" },
  { id: "simulator", label: "Simulator" },
];

const Report = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get("user") || "demo";
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const handleLoadComplete = useCallback(() => setLoading(false), []);
  const data = mockAnalysis;

  if (loading) return <LoadingSequence onComplete={handleLoadComplete} />;

  return (
    <div className="min-h-screen bg-background mesh-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <img src={data.avatarUrl} alt="" className="w-8 h-8 rounded-full bg-muted" />
              <div>
                <h1 className="text-sm font-heading font-bold text-foreground">{username}</h1>
                <p className="text-xs text-muted-foreground">Portfolio Analysis</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-uppercase">Score</span>
            <span className="text-lg font-heading font-bold text-primary">{data.score}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            {/* Score Hero */}
            <div className="flex flex-col items-center text-center">
              <CircularScore score={data.score} />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-sm text-muted-foreground mt-4 max-w-md"
              >
                {data.summary}
              </motion.p>
            </div>

            {/* Breakdown Grid */}
            <div>
              <h2 className="label-uppercase mb-4">Score Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.categories.map((cat, i) => (
                  <ScoreCard key={cat.name} category={cat} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "recruiter" && <RecruiterPanel data={data.recruiter} />}

        {activeTab === "repos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="label-uppercase">Top Repositories</h2>
              <span className="text-xs text-muted-foreground">{data.repos.length} analyzed</span>
            </div>
            {data.repos.map((repo, i) => (
              <RepoCard key={repo.name} repo={repo} index={i} />
            ))}
          </motion.div>
        )}

        {activeTab === "plan" && <ActionPlan steps={data.actionPlan} currentScore={data.score} />}

        {activeTab === "simulator" && <ImprovementSimulator baseScore={data.score} />}
      </main>
    </div>
  );
};

export default Report;
