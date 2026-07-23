"use client";

import Link from "next/link";
import seedData from "@/data/seed-data.json";
import { COMPANY_NAME, FICTIONAL_DISCLAIMER, DATA_BOUNDARY_LINE, ENGAGEMENT_DATE } from "@/lib/constants";
import type { SeedData } from "@/lib/types";
import { formatCurrency, calculateTotalSpend } from "@/lib/calculations";

const data = seedData as unknown as SeedData;

export default function Register() {
  const totalSpend = calculateTotalSpend(data.tools);

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="fictional-banner">
            {FICTIONAL_DISCLAIMER}
          </div>
          <h1 className="text-3xl font-bold mb-2">Tool Census & Register</h1>
          <p className="text-ink-muted mb-3">
            {COMPANY_NAME} — As at {ENGAGEMENT_DATE}
          </p>
          <p className="text-sm text-ink-muted">
            Every AI tool, subscription and use case: seats bought vs. active, owner, annual cost with source tag, evidence tag.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-6 p-4 bg-surface rounded border border-border">
          <div className="text-sm text-ink-muted font-semibold">Total register spend</div>
          <div className="text-2xl font-bold text-accent mt-1">
            {formatCurrency(totalSpend, true)}
          </div>
        </div>

        {/* Register table */}
        <div className="overflow-x-auto border border-border rounded">
          <table className="min-w-full bg-surface">
            <thead>
              <tr className="bg-nav-bg">
                <th className="border-b border-border">Tool</th>
                <th className="border-b border-border">Owner</th>
                <th className="border-b border-border">Vendor</th>
                <th className="border-b border-border text-right">Annual cost</th>
                <th className="border-b border-border">Cost type</th>
                <th className="border-b border-border">Evidence tag</th>
                <th className="border-b border-border">Material</th>
              </tr>
            </thead>
            <tbody>
              {data.tools.map((tool, idx) => (
                <tr
                  key={tool.id}
                  className={idx % 2 === 0 ? "bg-surface" : "bg-surface-muted"}
                >
                  <td>
                    <div className="font-semibold text-ink">{tool.name}</div>
                    {tool.description && (
                      <div className="text-xs text-ink-faint mt-1">{tool.description}</div>
                    )}
                    {tool.seatsOrUnits && (
                      <div className="text-xs text-ink-muted mt-1">{tool.seatsOrUnits}</div>
                    )}
                  </td>
                  <td className="text-sm">{tool.owner}</td>
                  <td className="text-sm">{tool.vendor}</td>
                  <td className="text-sm text-right font-semibold">
                    {formatCurrency(tool.annualCostAud, true)}
                  </td>
                  <td>
                    <div className="text-xs space-y-1">
                      {tool.costTypes.licences && (
                        <div>
                          <span className="evidence-tag">Subscriptions</span>
                          <span className="text-ink-faint ml-2">
                            {formatCurrency(tool.costTypes.licences, true)}
                          </span>
                        </div>
                      )}
                      {tool.costTypes.tokens && (
                        <div>
                          <span className="evidence-tag">Consumption</span>
                          <span className="text-ink-faint ml-2">
                            {formatCurrency(tool.costTypes.tokens, true)}
                          </span>
                        </div>
                      )}
                      {tool.costTypes.cloud && (
                        <div>
                          <span className="evidence-tag">Cloud</span>
                          <span className="text-ink-faint ml-2">
                            {formatCurrency(tool.costTypes.cloud, true)}
                          </span>
                        </div>
                      )}
                      {tool.costTypes.integration && (
                        <div>
                          <span className="evidence-tag">Integration</span>
                          <span className="text-ink-faint ml-2">
                            {formatCurrency(tool.costTypes.integration, true)}
                          </span>
                        </div>
                      )}
                      {tool.costTypes.people && (
                        <div>
                          <span className="evidence-tag">People</span>
                          <span className="text-ink-faint ml-2">
                            {formatCurrency(tool.costTypes.people, true)}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`evidence-tag ${
                        tool.evidenceTag === "Reconciled"
                          ? "bg-green-900/30 text-green-300"
                          : tool.evidenceTag === "Measured"
                            ? "bg-blue-900/30 text-blue-300"
                            : tool.evidenceTag === "Say-so"
                              ? "bg-amber-900/30 text-amber-300"
                              : "bg-red-900/30 text-red-300"
                      }`}
                    >
                      {tool.evidenceTag}
                    </span>
                  </td>
                  <td className="text-center">
                    {tool.material ? (
                      <span className="text-green-300 font-semibold">✓</span>
                    ) : (
                      <span className="text-ink-faint">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key insights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="lane-card">
            <h3 className="font-semibold mb-3">Tools by evidence</h3>
            <div className="space-y-2 text-sm">
              {["Reconciled", "Measured", "Say-so", "Vendor claim"].map((tag) => {
                const count = data.tools.filter((t) => t.evidenceTag === tag).length;
                return (
                  <div key={tag} className="flex justify-between">
                    <span className="text-ink-muted">{tag}</span>
                    <span className="font-semibold">{count} tools</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lane-card">
            <h3 className="font-semibold mb-3">Cost type breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">Subscriptions/seats</span>
                <span className="font-semibold">~A$80k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Consumption (tokens)</span>
                <span className="font-semibold">~A$60k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Integration</span>
                <span className="font-semibold">~A$20k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">People (estimate)</span>
                <span className="font-semibold">~A$50k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link href="/" className="cta-secondary">
            ← Back to Snapshot
          </Link>
          <Link href="/memo" className="cta-secondary">
            Decision Memo →
          </Link>
        </div>

        {/* Footer */}
        <div className="data-boundary">
          <strong>Data boundary:</strong> {DATA_BOUNDARY_LINE}
        </div>
      </div>
    </div>
  );
}
