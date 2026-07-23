export type EvidenceTag = "Reconciled" | "Measured" | "Say-so" | "Vendor claim";
export type DecisionType = "scale" | "fix" | "pause" | "stop" | "discover";
export type Stage = "trying" | "in use" | "embedded";

export interface Tool {
  id: string;
  name: string;
  owner: string;
  vendor: string;
  annualCostAud: number;
  costTypes: {
    licences?: number;
    tokens?: number;
    cloud?: number;
    integration?: number;
    people?: number;
  };
  evidenceTag: EvidenceTag;
  material: boolean;
  description?: string;
  seatsOrUnits?: string;
}

export interface UseCase {
  id: string;
  name: string;
  owner: string;
  stage: Stage;
  decision: DecisionType;
  rationale: string;
  tools: string[]; // tool IDs
  promisedAnnualAud?: number;
  measuredAnnualAud?: number;
  bankedAnnualAud?: number;
  timeFreedHoursAnnual?: number;
}

export interface MeterTool {
  toolId: string;
  toolName: string;
  monthlyRunRateAud: number;
  annualRunRateAud: number;
  hasCapOrAlert: boolean;
  watcher?: string;
  riskStatus: "green" | "amber" | "red";
}

export interface Action {
  id: string;
  description: string;
  owner: string;
  dueDate: string; // DD/MM/YYYY
  useCase?: string;
}

export interface PortfolioMetrics {
  totalAnnualSpendAud: number;
  promisedAnnualAud: number;
  measuredAnnualAud: number;
  bankedAnnualAud: number;
  timeFreedHoursAnnual: number;
  idleSeatsValueAud: number;
  cashConversionPercent: number;
}

export interface SeedData {
  meta: {
    currency: string;
    period: string;
    engagementDate: string;
    disclaimer: string;
  };
  company: {
    name: string;
    sector: string;
    employees: number;
    headquarter: string;
    sponsor: string;
  };
  metrics: PortfolioMetrics;
  tools: Tool[];
  useCases: UseCase[];
  meters: MeterTool[];
  actions: Action[];
}
