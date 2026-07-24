"use client";

import Link from "next/link";
import seedData from "@/data/seed-data.json";
import { OFFER_NAME, COMPANY_NAME, FICTIONAL_DISCLAIMER, DATA_BOUNDARY_LINE, ENGAGEMENT_DATE, PRICE_EXPOSURE_INFO } from "@/lib/constants";
import type { SeedData } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/calculations";

const data = seedData as unknown as SeedData;

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">
            {COMPANY_NAME} — {OFFER_NAME}
          </h1>
          <p className="text-ink-muted">
            As at {ENGAGEMENT_DATE}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* All-in spend */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">All-in annual AI spend</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="lane-card">
              <div className="metric-label">Total annual spend</div>
              <div className="metric-value text-3xl">
                {formatCurrency(data.metrics.totalAnnualSpendAud, true)}
              </div>
              <div className="text-sm text-ink-muted mt-3 space-y-1 text-xs">
                <div>Subscriptions/seats: ~A$80k</div>
                <div>Consumption (tokens/usage): ~A$60k</div>
                <div>Integration: ~A$20k</div>
                <div>People (estimate): ~A$50k</div>
              </div>
            </div>
          </div>
        </section>

        {/* Four lanes */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">The four lanes: promise vs. reality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Promise */}
            <div className="lane-card">
              <div className="metric-label">Targetted Value</div>
              <div className="metric-value">
                {formatCurrency(data.metrics.promisedAnnualAud, true)}
              </div>
              <div className="text-xs text-ink-faint mt-2">
                Vendor decks & business cases (mostly Say-so / Vendor claim tagged)
              </div>
            </div>

            {/* Measured Value */}
            <div className="lane-card">
              <div className="metric-label">Measured Value</div>
              <div className="metric-value">
                {formatCurrency(data.metrics.measuredAnnualAud, true)}
              </div>
              <div className="text-xs text-ink-faint mt-2">
                Performance claims with Measured / Reconciled evidence
              </div>
            </div>

            {/* Time freed */}
            <div className="lane-card">
              <div className="metric-label">Time freed</div>
              <div className="metric-value">
                ~{data.metrics.timeFreedHoursAnnual} hrs
              </div>
              <div className="text-xs text-ink-faint mt-2">
                Not money. Value estimate ~A$140k (not banked)
              </div>
            </div>

            {/* Banked */}
            <div className="lane-card bg-green-900/20 border-green-800/40">
              <div className="metric-label text-green-300">Banked</div>
              <div className="metric-value text-green-300">
                {formatCurrency(data.metrics.bankedAnnualAud, true)}
              </div>
              <div className="text-xs text-green-200 mt-2">
                Contractor role not renewed + licence consolidation (Reconciled)
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="mt-6 p-4 bg-surface rounded border border-accent/30">
            <div className="text-sm text-ink-muted font-semibold">ROI</div>
            <div className="text-2xl font-bold text-accent mt-1">
              {formatPercent(data.metrics.cashConversionPercent)}
            </div>
            <div className="text-xs text-ink-faint mt-2">
              {formatCurrency(data.metrics.bankedAnnualAud, true)} banked ÷ {formatCurrency(data.metrics.promisedAnnualAud, true)} targetted value
            </div>
          </div>
        </section>

        {/* Idle seats */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Idle seats</h2>
          <div className="lane-card bg-amber-900/20 border-amber-800/40">
            <div className="metric-label text-amber-300">Copilot seats: bought vs. active</div>
            <div className="metric-value text-amber-300 text-2xl">
              {formatCurrency(data.metrics.idleSeatsValueAud, true)}/yr
            </div>
            <div className="text-sm text-amber-200 mt-3">
              120 seats purchased · ~60 actively used
              <br />
              ~60 idle @ A$300/seat/yr
            </div>
          </div>
        </section>

        {/* Meter exposure */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Meter exposure: usage-priced tools</h2>
          <p className="text-sm text-ink-muted mb-6 italic">{PRICE_EXPOSURE_INFO}</p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Monthly run-rate</th>
                  <th>Annual run-rate</th>
                  <th>Cap/Alert</th>
                  <th>Watcher</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {data.meters.map((meter) => (
                  <tr key={meter.toolId}>
                    <td className="font-semibold">{meter.toolName}</td>
                    <td>{formatCurrency(meter.monthlyRunRateAud, true)}</td>
                    <td className="font-semibold">{formatCurrency(meter.annualRunRateAud, true)}</td>
                    <td>
                      {meter.hasCapOrAlert ? (
                        <span className="text-green-300">✓ Yes</span>
                      ) : (
                        <span className="text-red-300 font-semibold">✗ None</span>
                      )}
                    </td>
                    <td>{meter.watcher || "—"}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          meter.riskStatus === "red"
                            ? "bg-red-900/30 text-red-300"
                            : meter.riskStatus === "amber"
                              ? "bg-amber-900/30 text-amber-300"
                              : "bg-green-900/30 text-green-300"
                        }`}
                      >
                        {meter.riskStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-faint mt-4 italic">
            The AI support-bot meter has no cap and no named watcher — this is the story.
          </p>
        </section>

        {/* Decision list */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Decisions: per material use case</h2>
          <div className="space-y-4">
            {data.useCases.map((uc) => (
              <div key={uc.id} className="lane-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink mb-1">{uc.name}</h3>
                    <div className="flex flex-wrap gap-3 mb-2 text-sm">
                      <span className="text-ink-muted">
                        Stage: <span className="text-ink capitalize">{uc.stage}</span>
                      </span>
                      <span
                        className={`decision-badge decision-${uc.decision}`}
                      >
                        {uc.decision.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-ink-muted mb-2">{uc.rationale}</p>
                    <p className="text-xs text-ink-faint">
                      <strong>Decider:</strong> {uc.owner}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 90-day actions */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">90-day actions</h2>
          <div className="space-y-3">
            {data.actions.map((action) => (
              <div key={action.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-surface rounded border border-border">
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

        {/* Navigation & CTAs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-surface p-6 rounded border border-border">
          <div>
            <h3 className="font-semibold mb-3">Explore this demo</h3>
            <div className="space-y-2">
              <div>
                <Link href="/register" className="cta-secondary block text-center">
                  Full Tool Census
                </Link>
              </div>
              <div>
                <Link href="/memo" className="cta-secondary block text-center">
                  Decision Memo
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Want this for your estate?</h3>
            <p className="text-sm text-ink-muted mb-3">
              The AI Ledger Snapshot: Two-week independent review, fixed fee.
            </p>
            <a
              href="https://hepburnadvisory.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary block text-center"
            >
              Get in touch
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Bigger estate or regulated?</h3>
            <p className="text-sm text-ink-muted mb-3">
              The AI Ledger Review: Enterprise grade, auditable pack.
            </p>
            <a
              href="https://enterprise.hepburnadvisory.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary block text-center"
            >
              Learn more
            </a>
          </div>
        </section>

        {/* Footer */}
        <div className="data-boundary">
          <strong>Data boundary:</strong> {DATA_BOUNDARY_LINE}
        </div>
      </div>
    </div>
  );
}
