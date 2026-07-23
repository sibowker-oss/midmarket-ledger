import type { SeedData, Tool, UseCase, PortfolioMetrics } from "./types";

/**
 * Selector calculations — pure functions for data reconciliation.
 * Used in tests to verify seed data integrity.
 */

export function calculateTotalSpend(tools: Tool[]): number {
  return tools.reduce((sum, tool) => sum + tool.annualCostAud, 0);
}

export function calculatePromisedValue(useCases: UseCase[]): number {
  return useCases.reduce((sum, uc) => sum + (uc.promisedAnnualAud || 0), 0);
}

export function calculateMeasuredValue(useCases: UseCase[]): number {
  return useCases.reduce((sum, uc) => sum + (uc.measuredAnnualAud || 0), 0);
}

export function calculateBankedValue(useCases: UseCase[]): number {
  return useCases.reduce((sum, uc) => sum + (uc.bankedAnnualAud || 0), 0);
}

export function calculateCashConversion(
  banked: number,
  promised: number
): number {
  if (promised === 0) return 0;
  return (banked / promised) * 100;
}

export function calculateIdleSeats(tools: Tool[]): number {
  const copilotTool = tools.find((t) =>
    t.name.toLowerCase().includes("copilot")
  );
  if (!copilotTool) return 0;
  // Assume the description has "X seats (Y active)" format
  const match = copilotTool.seatsOrUnits?.match(/(\d+)\s+seats\s+\((\d+)\s+active\)/);
  if (!match) return 0;
  const total = parseInt(match[1], 10);
  const active = parseInt(match[2], 10);
  const idleCount = total - active;
  const costPerSeat = copilotTool.annualCostAud / total;
  return idleCount * costPerSeat;
}

export function validateReconciliation(data: SeedData): {
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Total spend should match sum of tools
  const calculatedSpend = calculateTotalSpend(data.tools);
  if (Math.abs(calculatedSpend - data.metrics.totalAnnualSpendAud) > 1) {
    errors.push(
      `Total spend mismatch: calculated A$${calculatedSpend}, seed says A$${data.metrics.totalAnnualSpendAud}`
    );
  }

  // Promised value should match sum of use cases
  const calculatedPromised = calculatePromisedValue(data.useCases);
  if (Math.abs(calculatedPromised - data.metrics.promisedAnnualAud) > 1) {
    errors.push(
      `Promised value mismatch: calculated A$${calculatedPromised}, seed says A$${data.metrics.promisedAnnualAud}`
    );
  }

  // Banked should be ≤ promised
  if (data.metrics.bankedAnnualAud > data.metrics.promisedAnnualAud) {
    errors.push(
      `Banked (A$${data.metrics.bankedAnnualAud}) exceeds promised (A$${data.metrics.promisedAnnualAud})`
    );
  }

  // Cash conversion should be correct
  const calculatedConversion = calculateCashConversion(
    data.metrics.bankedAnnualAud,
    data.metrics.promisedAnnualAud
  );
  if (Math.abs(calculatedConversion - data.metrics.cashConversionPercent) > 0.5) {
    errors.push(
      `Cash conversion mismatch: calculated ${calculatedConversion.toFixed(1)}%, seed says ${data.metrics.cashConversionPercent}%`
    );
  }

  // All material use cases should have a decision
  const materialUseCases = data.useCases;
  const noDecisionUseCases = materialUseCases.filter((uc) => !uc.decision);
  if (noDecisionUseCases.length > 0) {
    errors.push(
      `${noDecisionUseCases.length} use case(s) missing decision: ${noDecisionUseCases.map((uc) => uc.name).join(", ")}`
    );
  }

  // All decisions should have a decider (owner)
  const noOwnerUseCases = data.useCases.filter((uc) => !uc.owner);
  if (noOwnerUseCases.length > 0) {
    warnings.push(
      `${noOwnerUseCases.length} use case(s) missing owner/decider`
    );
  }

  return { errors, warnings };
}

export function formatCurrency(value: number, omitDecimals = false): string {
  const formatted = value.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: omitDecimals ? 0 : 0,
    maximumFractionDigits: omitDecimals ? 0 : 0,
  });
  return formatted;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
