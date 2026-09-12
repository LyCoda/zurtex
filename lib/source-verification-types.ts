export type VerificationStage = "prepare" | "departure" | "arrival" | "compare" | "compose";
export type VerificationProgress = {
  stage: VerificationStage;
  state: "running" | "complete" | "limited";
  message: string;
  completed: number;
  total: number;
};
export type VerificationSource = {
  id: string;
  title: string;
  authority: string;
  url: string;
  status: "fetched" | "unavailable" | "unsupported" | "blocked";
  checkedAt: string;
  note: string;
  cachedComparison: boolean;
};
export type VerificationClaim = {
  id: string;
  requirementId: string;
  section: "departure" | "arrival";
  text: string;
  status: "supported" | "changed" | "unclear" | "unavailable";
  sourceIds: string[];
  note: string;
  quote?: string;
};
export type VerificationReport = {
  status: "supported" | "attention" | "limited";
  checkedAt: string;
  model: {
    provider: "workers-ai" | "openai-compatible" | "none";
    name: string;
    status: "available" | "unavailable" | "failed";
  };
  discovery: {
    method: "brave" | "official-links" | "none";
    status: "available" | "unavailable" | "failed";
    queried: number;
    found: number;
  };
  sources: VerificationSource[];
  claims: VerificationClaim[];
  summary: string;
};
