/**
 * Reconciliation tests — verify seed data integrity.
 * All numbers must balance before the build is considered valid.
 */

import { describe, it, expect } from "vitest";
import seedData from "../data/seed-data.json";
import {
  calculateTotalSpend,
  calculatePromisedValue,
  calculateMeasuredValue,
  calculateBankedValue,
  calculateCashConversion,
  calculateIdleSeats,
  validateReconciliation,
} from "../lib/calculations";
import type { SeedData } from "../lib/types";

const data = seedData as unknown as SeedData;

describe("Reconciliation — seed data integrity", () => {
  it("Total spend reconciles: sum of tools = metrics.totalAnnualSpendAud", () => {
    const calculated = calculateTotalSpend(data.tools);
    expect(calculated).toBe(data.metrics.totalAnnualSpendAud);
  });

  it("Promised value reconciles: sum of use cases = metrics.promisedAnnualAud", () => {
    const calculated = calculatePromisedValue(data.useCases);
    expect(calculated).toBe(data.metrics.promisedAnnualAud);
  });

  it("Measured value matches sum of use cases", () => {
    const calculated = calculateMeasuredValue(data.useCases);
    expect(calculated).toBe(data.metrics.measuredAnnualAud);
  });

  it("Banked value matches sum of use cases", () => {
    const calculated = calculateBankedValue(data.useCases);
    expect(calculated).toBe(data.metrics.bankedAnnualAud);
  });

  it("Banked ⊂ Promised (banked never exceeds promised)", () => {
    expect(data.metrics.bankedAnnualAud).toBeLessThanOrEqual(
      data.metrics.promisedAnnualAud
    );
  });

  it("Cash conversion is correct: banked ÷ promised", () => {
    const calculated = calculateCashConversion(
      data.metrics.bankedAnnualAud,
      data.metrics.promisedAnnualAud
    );
    expect(Math.abs(calculated - data.metrics.cashConversionPercent)).toBeLessThan(
      0.5
    );
  });

  it("All use cases have a decision", () => {
    const missing = data.useCases.filter((uc) => !uc.decision);
    expect(missing).toHaveLength(0);
  });

  it("All use cases have a named owner (decider)", () => {
    const missing = data.useCases.filter((uc) => !uc.owner);
    expect(missing).toHaveLength(0);
  });

  it("Idle seats calculation (Copilot)", () => {
    const idleValue = calculateIdleSeats(data.tools);
    expect(idleValue).toBe(data.metrics.idleSeatsValueAud);
  });

  it("At least one meter has no cap (the runaway story)", () => {
    const uncapped = data.meters.filter((m) => !m.hasCapOrAlert);
    expect(uncapped.length).toBeGreaterThan(0);
  });

  it("At least one meter has red risk status", () => {
    const red = data.meters.filter((m) => m.riskStatus === "red");
    expect(red.length).toBeGreaterThan(0);
  });

  it("All 90-day actions have owner and dueDate", () => {
    const invalid = data.actions.filter((a) => !a.owner || !a.dueDate);
    expect(invalid).toHaveLength(0);
  });

  it("Full validation pass", () => {
    const validation = validateReconciliation(data);
    expect(validation.errors).toHaveLength(0);
  });

  it("Seed data has 14 tools", () => {
    expect(data.tools).toHaveLength(14);
  });

  it("Seed data has 6 use cases", () => {
    expect(data.useCases).toHaveLength(6);
  });

  it("Decisions cover all types: scale, fix, pause, stop, discover", () => {
    const decisions = new Set(data.useCases.map((uc) => uc.decision));
    const expectedDecisions = new Set(["scale", "fix", "pause", "stop", "discover"]);
    expectedDecisions.forEach((d) => {
      expect(Array.from(decisions)).toContain(d);
    });
  });
});
