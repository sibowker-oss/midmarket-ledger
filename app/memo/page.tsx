"use client";

import Link from "next/link";
import seedData from "@/data/seed-data.json";
import { COMPANY_NAME, FICTIONAL_DISCLAIMER, DATA_BOUNDARY_LINE, ENGAGEMENT_DATE, SCENARIO_CAVEAT } from "@/lib/constants";
import type { SeedData } from "@/lib/types";
import { formatCurrency } from "@/lib/calculations";

const data = seedData as unknown as SeedData;

export default function Memo() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="fictional-banner">
            {FICTIONAL_DISCLAIMER}
          </div>
          <h1 className="text-3xl font-bold mb-2">Decision Memo</h1>
          <p className="text-ink-muted">
            {COMPANY_NAME} — As at {ENGAGEMENT_DATE}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Use case decisions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-8">Material use cases: decisions and rationale</h2>

          {data.useCases.map((uc, idx) => (
            <div key={uc.id} className="mb-8 p-6 bg-surface rounded border border-border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{uc.name}</h3>
                  <p className="text-sm text-ink-muted mt-1">Owner: {uc.owner}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 bg-surface-muted text-ink-faint rounded">
                    {uc.stage}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded font-semibold decision-badge decision-${uc.decision}`}
                  >
                    {uc.decision.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="text-sm text-ink mb-4 leading-relaxed">
                {uc.rationale}
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs mt-4 pt-4 border-t border-border">
                {uc.promisedAnnualAud !== undefined && (
                  <div>
                    <div className="text-ink-faint">Promised</div>
                    <div className="font-semibold text-ink">
                      {formatCurrency(uc.promisedAnnualAud, true)}
                    </div>
                  </div>
                )}
                {uc.measuredAnnualAud !== undefined && (
                  <div>
                    <div className="text-ink-faint">Measured</div>
                    <div className="font-semibold text-ink">
                      {formatCurrency(uc.measuredAnnualAud, true)}
                    </div>
                  </div>
                )}
                {uc.bankedAnnualAud !== undefined && (
                  <div>
                    <div className="text-ink-faint">Banked</div>
                    <div className="font-semibold text-accent">
                      {formatCurrency(uc.bankedAnnualAud, true)}
                    </div>
                  </div>
                )}
              </div>

              {idx === 4 && (
                <div className="mt-4 pt-4 border-t border-border text-xs text-red-200 italic">
                  ⚠ This is the recommendation Acme's leadership "didn't want to hear": stopping the Twelve Labs video-analysis pilot closes a door, but the operating case didn't hold.
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Illustrative scenario */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Illustrative scenario: meter stress</h2>
          <div className="p-6 bg-amber-900/10 border border-amber-800/30 rounded">
            <p className="text-xs text-amber-200 mb-4 italic">
              {SCENARIO_CAVEAT}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-ink mb-2">Assumption</h3>
                <p className="text-sm text-ink-muted">
                  If Claude API usage increases by 50% (e.g., extending to a new team workflow), and the OpenAI support-bot meter continues its current growth trajectory without a cap:
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-amber-800/30">
                  <span className="text-ink-muted">Claude API (current)</span>
                  <span className="font-semibold">{formatCurrency(24000, true)}/yr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-amber-800/30">
                  <span className="text-ink-muted">Claude API (+50%)</span>
                  <span className="font-semibold text-accent">{formatCurrency(36000, true)}/yr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-amber-800/30">
                  <span className="text-ink-muted">Support bot (current)</span>
                  <span className="font-semibold">{formatCurrency(18000, true)}/yr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-amber-800/30">
                  <span className="text-ink-muted">Support bot (uncapped growth)</span>
                  <span className="font-semibold text-red-300">{formatCurrency(28000, true)}/yr</span>
                </div>
                <div className="flex justify-between py-2 bg-surface-muted p-2 rounded border border-border mt-2">
                  <span className="font-semibold">Incremental exposure</span>
                  <span className="font-bold text-red-300">+{formatCurrency(22000, true)}/yr</span>
                </div>
              </div>

              <p className="text-xs text-ink-faint mt-4">
                <strong>Why this matters:</strong> One tool (support bot) is already unmanaged. A 50% growth scenario across two meters with no alert policy could absorb a significant fraction of the AI budget with little visibility.
              </p>
            </div>
          </div>
        </section>

        {/* 90-day register */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">90-day action register</h2>
          <div className="space-y-3">
            {data.actions.map((action) => (
              <div
                key={action.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-surface rounded border border-border"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{action.description}</p>
                  <p className="text-xs text-ink-muted mt-1">Owner: {action.owner}</p>
                </div>
                <div className="text-sm font-semibold text-accent whitespace-nowrap">
                  {action.dueDate}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next steps */}
        <section className="mb-12 p-6 bg-surface rounded border border-accent/30">
          <h3 className="font-semibold mb-3">Next steps</h3>
          <ol className="text-sm text-ink-muted space-y-2 list-decimal list-inside">
            <li>Review this memo with the full leadership team in the decision session.</li>
            <li>Assign owners and dates for the 90-day actions above.</li>
            <li>Book the 60-day check-in to verify meter behaviour and action progress.</li>
            <li>If the estate grows beyond 8 material use cases, the AI Ledger Review may become the right instrument.</li>
          </ol>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link href="/" className="cta-secondary">
            ← Snapshot
          </Link>
          <Link href="/register" className="cta-secondary">
            Census
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
