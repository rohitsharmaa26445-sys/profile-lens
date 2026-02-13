export interface AnalysisData {
  username: string;
  avatarUrl: string;
  score: number;
  summary: string;
  categories: CategoryScore[];
  recruiter: RecruiterView;
  repos: RepoData[];
  actionPlan: ActionStep[];
}

export interface CategoryScore {
  name: string;
  score: number;
  status: "strong" | "moderate" | "weak";
  summary: string;
  icon: string;
}

export interface RecruiterView {
  firstImpression: string;
  strengths: string[];
  redFlags: string[];
  interviewQuestions: string[];
  hiringConfidence: number;
}

export interface RepoData {
  name: string;
  description: string;
  stars: number;
  lastUpdated: string;
  score: number;
  issues: string[];
  language: string;
}

export interface ActionStep {
  day: number;
  task: string;
  impact: number;
}

export const mockAnalysis: AnalysisData = {
  username: "alexchen",
  avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=alexchen",
  score: 72,
  summary: "Strong technical depth. Needs better project storytelling.",
  categories: [
    { name: "Documentation Quality", score: 58, status: "moderate", summary: "READMEs exist but lack depth. Missing setup instructions in 3 repos.", icon: "📄" },
    { name: "Activity Consistency", score: 81, status: "strong", summary: "Regular commits over the past 6 months. Good momentum.", icon: "📈" },
    { name: "Project Impact", score: 65, status: "moderate", summary: "2 projects with meaningful stars. Others lack visibility.", icon: "🎯" },
    { name: "Technical Depth", score: 88, status: "strong", summary: "Diverse tech stack. Complex problem-solving demonstrated.", icon: "🧠" },
    { name: "Repository Structure", score: 62, status: "moderate", summary: "Some repos missing proper folder structure and configs.", icon: "📁" },
    { name: "Profile Hygiene", score: 45, status: "weak", summary: "No profile README. Bio is minimal. Missing social links.", icon: "👤" },
  ],
  recruiter: {
    firstImpression: "Profile shows genuine technical ability but lacks polish. The repos demonstrate real problem-solving, but a recruiter scanning quickly might miss the value without better presentation.",
    strengths: [
      "Consistent commit history shows reliability",
      "Full-stack capability demonstrated across projects",
      "Real-world projects, not just tutorials",
      "Clean code patterns in recent repositories",
    ],
    redFlags: [
      "No profile README — missed opportunity for first impression",
      "3 repos with no description or documentation",
      "Gaps in commit history (Feb–April)",
      "No deployment links on any project",
    ],
    interviewQuestions: [
      "Walk me through the architecture of your maintenance-log-system",
      "Why did you choose this tech stack for RepoLens?",
      "How would you improve the test coverage in your projects?",
      "Tell me about a technical challenge you solved in your recent work",
    ],
    hiringConfidence: 68,
  },
  repos: [
    { name: "repolens", description: "GitHub portfolio analyzer tool", stars: 12, lastUpdated: "2 days ago", score: 78, issues: ["Missing tests", "No CI/CD pipeline"], language: "TypeScript" },
    { name: "maintenance-log-system", description: "Vehicle maintenance tracking app", stars: 5, lastUpdated: "1 week ago", score: 71, issues: ["README needs screenshots", "No deployment link"], language: "Python" },
    { name: "api-gateway", description: "Microservices API gateway with rate limiting", stars: 23, lastUpdated: "3 weeks ago", score: 82, issues: ["Missing changelog"], language: "Go" },
    { name: "portfolio-site", description: "Personal portfolio website", stars: 3, lastUpdated: "1 month ago", score: 45, issues: ["Outdated dependencies", "No responsive design", "Generic template"], language: "JavaScript" },
    { name: "data-pipeline", description: "ETL data processing pipeline", stars: 8, lastUpdated: "2 months ago", score: 69, issues: ["No usage examples", "Missing error handling docs"], language: "Python" },
  ],
  actionPlan: [
    { day: 1, task: "Add a comprehensive profile README with bio, skills, and featured projects", impact: 8 },
    { day: 2, task: "Improve README for repolens — add screenshots, demo link, and architecture diagram", impact: 6 },
    { day: 3, task: "Deploy portfolio-site and add live link to repository", impact: 5 },
    { day: 4, task: "Add tests to maintenance-log-system", impact: 4 },
    { day: 5, task: "Clean up or archive 3 inactive repositories", impact: 3 },
    { day: 6, task: "Add consistent commit messages and contribution guidelines", impact: 3 },
    { day: 7, task: "Set up CI/CD pipeline for top 2 repositories", impact: 4 },
  ],
};
