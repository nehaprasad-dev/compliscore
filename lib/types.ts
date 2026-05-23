export type RiskLevel = "Low" | "Medium" | "High";

export type Company = {
  name: string;
  pan: string;
  gstin: string;
  industry: string;
  /** YYYY-MM, the most recent month for which GSTR-3B has been filed. */
  lastGstFilingMonth: string;
  mcaFilingStatus: "Filed" | "Overdue";
  pendingNotices: string[];
  /** Optional: extra context the AI summary can use. */
  notes?: string;
};

export type ScanResult = {
  companyName: string;
  industry: string;
  score: number;
  riskLevel: RiskLevel;
  pendingTasks: string[];
  penaltyEstimate: string;
  monthsOverdue: number;
  aiSummary: string;
  aiSummaryFallback: boolean;
};
